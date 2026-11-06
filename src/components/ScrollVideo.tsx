import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  useCallback,
} from 'react';

export interface ScrollVideoHandle {
  seekToProgress: (progress: number) => void;
  getDuration: () => number;
  isReady: () => boolean;
}

interface ScrollVideoProps {
  videoId: string;
  desktopVideoUrl: string;
  mobileVideoUrl: string;
  posterUrl: string;
  endFrameUrl: string;
  frameSequencePrefix: string;
  frameCount: number;
  fallbackDuration: number;
  isActiveOrNear: boolean;
  isMobileViewport: boolean;
  prefersReducedMotion: boolean;
  onMetadataReady?: (duration: number) => void;
}

/**
 * ScrollVideo
 * Implements the 10k-websites-skill scrub pipeline standard combined with
 * GSAP ScrollTrigger synchronization:
 * - Deadlock-safe gated seek (seekBusy + pendingTime coalescing)
 * - Streamed Blob / ObjectURL loading with progress ring so HTTP Range limitations never break seeking
 * - Pre-extracted frame-sequence <canvas> fallback when video seeking is unavailable or still loading
 * - Respects prefers-reduced-motion and mobile vertical asset optimization
 */
export const ScrollVideo = forwardRef<ScrollVideoHandle, ScrollVideoProps>(
  (
    {
      videoId,
      desktopVideoUrl,
      mobileVideoUrl,
      posterUrl,
      frameSequencePrefix,
      frameCount,
      fallbackDuration,
      isActiveOrNear,
      isMobileViewport,
      prefersReducedMotion,
      onMetadataReady,
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [videoReady, setVideoReady] = useState(false);
    const [videoFailed, setVideoFailed] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    // Deadlock-safe seek gating state (from 10k-websites-skill scrub-pipeline.md)
    const seekBusyRef = useRef(false);
    const seekUnlockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const pendingTimeRef = useRef<number | null>(null);
    const currentProgressRef = useRef(0);
    const durationRef = useRef(fallbackDuration);
    const blobUrlRef = useRef<string | null>(null);
    const loadStartedRef = useRef(false);

    // Preloaded Image objects for frame-sequence fallback
    const framesCacheRef = useRef<(HTMLImageElement | null)[]>([]);
    const lastDrawnFrameIndexRef = useRef<number>(-1);

    // Draw frame-sequence fallback onto canvas when video is not yet ready or if video scrubbing is unreliable
    const drawFallbackFrame = useCallback(
      (progress: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const frames = framesCacheRef.current;
        if (!frames.length) return;

        const clamped = Math.max(0, Math.min(1, progress));
        const idx = Math.min(
          frameCount - 1,
          Math.max(0, Math.round(clamped * (frameCount - 1)))
        );
        if (idx === lastDrawnFrameIndexRef.current) return;

        const img = frames[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
          }
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          lastDrawnFrameIndexRef.current = idx;
        }
      },
      [frameCount]
    );

    // Deadlock-safe requestSeek function
    const requestSeek = useCallback(
      (targetTime: number) => {
        const video = videoRef.current;
        if (
          !video ||
          videoFailed ||
          video.readyState < 2 ||
          !video.duration ||
          Number.isNaN(video.duration)
        ) {
          drawFallbackFrame(currentProgressRef.current);
          return;
        }

        const safeTime = Math.max(0, Math.min(video.duration - 0.03, targetTime));

        // Delta gate: avoid redundant seeks smaller than half a 24fps frame (0.018s)
        if (!seekBusyRef.current && Math.abs(video.currentTime - safeTime) < 0.018) {
          return;
        }

        if (seekBusyRef.current) {
          pendingTimeRef.current = safeTime;
          return;
        }

        seekBusyRef.current = true;
        if (seekUnlockTimerRef.current) clearTimeout(seekUnlockTimerRef.current);
        seekUnlockTimerRef.current = setTimeout(() => {
          seekBusyRef.current = false;
          if (pendingTimeRef.current !== null) {
            const next = pendingTimeRef.current;
            pendingTimeRef.current = null;
            requestSeek(next);
          }
        }, 280);

        try {
          video.currentTime = safeTime;
        } catch {
          if (seekUnlockTimerRef.current) clearTimeout(seekUnlockTimerRef.current);
          seekBusyRef.current = false;
          pendingTimeRef.current = null;
          drawFallbackFrame(currentProgressRef.current);
        }
      },
      [drawFallbackFrame, videoFailed]
    );

    // Expose imperative handle for the chapter's GSAP ScrollTrigger timeline
    useImperativeHandle(
      ref,
      () => ({
        seekToProgress: (progress: number) => {
          const clamped = Math.max(0, Math.min(1, progress));
          currentProgressRef.current = clamped;
          if (prefersReducedMotion) return;

          const dur = durationRef.current || fallbackDuration;
          requestSeek(clamped * dur);
          // Also keep canvas frame updated underneath in case video layer is still fading in
          if (!videoReady || videoFailed) {
            drawFallbackFrame(clamped);
          }
        },
        getDuration: () => durationRef.current || fallbackDuration,
        isReady: () => videoReady || videoFailed,
      }),
      [
        prefersReducedMotion,
        fallbackDuration,
        requestSeek,
        videoReady,
        videoFailed,
        drawFallbackFrame,
      ]
    );

    // Preload lightweight frame sequence when active/near for instant fallback
    useEffect(() => {
      if (!isActiveOrNear || prefersReducedMotion) return;
      if (framesCacheRef.current.length > 0) return;

      const arr: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);
      framesCacheRef.current = arr;

      for (let i = 1; i <= frameCount; i++) {
        const img = new Image();
        const padded = String(i).padStart(2, '0');
        img.src = `${frameSequencePrefix}${padded}.jpg`;
        img.onload = () => {
          arr[i - 1] = img;
          if (i === 1 && lastDrawnFrameIndexRef.current === -1) {
            drawFallbackFrame(currentProgressRef.current);
          }
        };
      }
    }, [isActiveOrNear, prefersReducedMotion, frameCount, frameSequencePrefix, drawFallbackFrame]);

    // Load video via streamed Blob (10k-websites-skill Range rule) only when chapter is active or near
    useEffect(() => {
      if (!isActiveOrNear || prefersReducedMotion) return;
      if (loadStartedRef.current) return;
      loadStartedRef.current = true;

      const video = videoRef.current;
      if (!video) return;

      const targetUrl = isMobileViewport ? mobileVideoUrl : desktopVideoUrl;
      const abortCtrl = new AbortController();
      let watchdogTimer: ReturnType<typeof setTimeout> | null = setTimeout(() => {
        abortCtrl.abort();
      }, 20000);

      const handleSeeked = () => {
        if (seekUnlockTimerRef.current) clearTimeout(seekUnlockTimerRef.current);
        seekBusyRef.current = false;
        if (pendingTimeRef.current !== null) {
          const nextTime = pendingTimeRef.current;
          pendingTimeRef.current = null;
          requestSeek(nextTime);
        }
      };

      const handleError = () => {
        if (seekUnlockTimerRef.current) clearTimeout(seekUnlockTimerRef.current);
        seekBusyRef.current = false;
        pendingTimeRef.current = null;
        setVideoFailed(true);
        drawFallbackFrame(currentProgressRef.current);
        onMetadataReady?.(fallbackDuration);
      };

      const handleLoadedMetadata = () => {
        if (video.duration && !Number.isNaN(video.duration) && Number.isFinite(video.duration)) {
          durationRef.current = video.duration;
        }
        onMetadataReady?.(durationRef.current);
      };

      const handleCanPlay = () => {
        if (seekUnlockTimerRef.current) clearTimeout(seekUnlockTimerRef.current);
        seekBusyRef.current = false;
        setLoadProgress(100);
        setVideoReady(true);
        requestSeek(currentProgressRef.current * durationRef.current);
      };

      video.addEventListener('seeked', handleSeeked);
      video.addEventListener('error', handleError);
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
      video.addEventListener('loadeddata', handleCanPlay);
      video.addEventListener('canplay', handleCanPlay);

      let fetchTriggered = false;
      async function fetchVideoStream() {
        if (fetchTriggered) return;
        fetchTriggered = true;
        try {
          const response = await fetch(targetUrl, {
            signal: abortCtrl.signal,
          });
          if (!response.ok || !response.body) {
            throw new Error(`HTTP ${response.status}`);
          }

          const contentLength = Number(response.headers.get('Content-Length')) || 6500000;
          const reader = response.body.getReader();
          const chunks: Uint8Array[] = [];
          let received = 0;
          let lastUpdate = 0;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (watchdogTimer) clearTimeout(watchdogTimer);
            watchdogTimer = setTimeout(() => abortCtrl.abort(), 20000);

            if (value) {
              chunks.push(value);
              received += value.length;
              const now = performance.now();
              if (now - lastUpdate > 110) {
                lastUpdate = now;
                setLoadProgress(Math.min(99, Math.round((received / contentLength) * 100)));
              }
            }
          }

          if (watchdogTimer) clearTimeout(watchdogTimer);
          const blob = new Blob(chunks as BlobPart[], { type: 'video/mp4' });
          const objectUrl = URL.createObjectURL(blob);
          blobUrlRef.current = objectUrl;

          if (videoRef.current) {
            videoRef.current.src = objectUrl;
            videoRef.current.load();
          }
        } catch {
          if (watchdogTimer) clearTimeout(watchdogTimer);
          // Fallback to direct src if fetch/Blob fails (e.g. local file or restricted CORS)
          if (videoRef.current && !videoRef.current.src) {
            videoRef.current.src = targetUrl;
            videoRef.current.load();
          }
        }
      }

      // Let the poster image win the first paint race before starting the video stream
      const posterProbe = new Image();
      const triggerFetch = () => {
        fetchVideoStream();
      };
      posterProbe.onload = triggerFetch;
      posterProbe.onerror = triggerFetch;
      posterProbe.src = posterUrl;
      const safetyTimer = setTimeout(triggerFetch, 800);

      return () => {
        clearTimeout(safetyTimer);
        if (watchdogTimer) clearTimeout(watchdogTimer);
        abortCtrl.abort();
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('loadeddata', handleCanPlay);
        video.removeEventListener('canplay', handleCanPlay);
      };
    }, [
      isActiveOrNear,
      prefersReducedMotion,
      isMobileViewport,
      desktopVideoUrl,
      mobileVideoUrl,
      posterUrl,
      fallbackDuration,
      onMetadataReady,
      requestSeek,
      drawFallbackFrame,
    ]);

    // Cleanup Blob ObjectURL on unmount
    useEffect(() => {
      return () => {
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
          blobUrlRef.current = null;
        }
      };
    }, []);

    const strokeDashoffset = Math.round(126 * (1 - loadProgress / 100));

    return (
      <div
        className="relative w-full h-full overflow-hidden bg-canvas select-none"
        data-video-stage={videoId}
      >
        {/* Layer A: High-resolution responsive poster background (always available immediately) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: `url('${posterUrl}')` }}
          aria-hidden="true"
        />

        {/* Layer B: Pre-extracted frame-sequence <canvas> fallback */}
        {!prefersReducedMotion && (
          <canvas
            ref={canvasRef}
            className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500 ${
              videoReady && !videoFailed ? 'opacity-0' : 'opacity-100'
            }`}
            aria-hidden="true"
          />
        )}

        {/* Layer C: Scrub-synchronized HTML5 <video> element */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            muted
            playsInline
            preload="none"
            tabIndex={-1}
            aria-hidden="true"
            poster={posterUrl}
            className={`scrub-video-layer absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
              videoReady && !videoFailed ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Layer D: 10k-websites-skill Layer 1 Global Base Scrim */}
        <div className="scrim-global" aria-hidden="true" />

        {/* Honest SVG Loading Ring while video Blob streams (hidden once ready or in reduced motion) */}
        {!prefersReducedMotion && !videoReady && !videoFailed && isActiveOrNear && (
          <div
            className="hud-secondary absolute bottom-6 right-6 z-20 flex items-center gap-2.5 px-3 py-1.5 rounded-full chip-scrim text-[11px] font-mono tracking-widest text-travertine"
            aria-hidden="true"
          >
            <svg className="w-4 h-4 -rotate-90 text-accent" viewBox="0 0 48 48">
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.2"
                strokeWidth="3.5"
              />
              <circle
                cx="24"
                cy="24"
                r="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeDasharray="126"
                style={{ strokeDashoffset }}
              />
            </svg>
            <span>STREAM {loadProgress}%</span>
          </div>
        )}
      </div>
    );
  }
);

ScrollVideo.displayName = 'ScrollVideo';
