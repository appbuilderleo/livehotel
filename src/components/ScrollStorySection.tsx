import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChapterConfig, Locale } from '../data/hotelData';
import { ScrollVideo, ScrollVideoHandle } from './ScrollVideo';
import { NarrativeText } from './NarrativeText';
import { ChevronDown, Film } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ScrollStorySectionProps {
  chapter: ChapterConfig;
  locale: Locale;
  isHeroChapter?: boolean;
  locationBadge?: string;
  isMobileViewport: boolean;
  prefersReducedMotion: boolean;
  onChapterActive?: (chapterId: string, progress: number) => void;
}

export const ScrollStorySection: React.FC<ScrollStorySectionProps> = ({
  chapter,
  locale,
  isHeroChapter = false,
  locationBadge,
  isMobileViewport,
  prefersReducedMotion,
  onChapterActive,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const videoHandleRef = useRef<ScrollVideoHandle | null>(null);
  const progressFillRef = useRef<HTMLDivElement | null>(null);
  const timecodeRef = useRef<HTMLSpanElement | null>(null);
  const scrollCueRef = useRef<HTMLDivElement | null>(null);

  const [isActiveOrNear, setIsActiveOrNear] = useState<boolean>(
    isHeroChapter || chapter.chapterNumber === '02'
  );
  const [verifiedDuration, setVerifiedDuration] = useState<number>(chapter.durationSeconds);
  const verifiedDurationRef = useRef<number>(chapter.durationSeconds);
  const [activeBeatIndex, setActiveBeatIndex] = useState<number>(0);

  // Delta-gated HUD updater (throttled ~10Hz and only writes on string change per 10k-websites-skill)
  const lastTimecodeTextRef = useRef<string>('');
  const lastHudUpdateAtRef = useRef<number>(0);
  const lastBeatIdxRef = useRef<number>(0);

  const updateChapterHud = useCallback(
    (progress: number) => {
      const clamped = Math.max(0, Math.min(1, progress));

      if (progressFillRef.current) {
        progressFillRef.current.style.transform = `scaleX(${clamped.toFixed(3)})`;
      }

      if (sectionRef.current) {
        sectionRef.current.setAttribute('data-chapter-progress', clamped.toFixed(3));
      }

      // Determine active beat index from progress
      let foundBeat = 0;
      for (let i = 0; i < chapter.beats.length; i++) {
        const b = chapter.beats[i];
        if (clamped >= b.startProgress && clamped <= b.endProgress + 0.03) {
          foundBeat = i;
          break;
        } else if (clamped > b.endProgress) {
          foundBeat = i;
        }
      }
      if (foundBeat !== lastBeatIdxRef.current) {
        lastBeatIdxRef.current = foundBeat;
        setActiveBeatIndex(foundBeat);
      }

      const now = performance.now();
      if (now - lastHudUpdateAtRef.current < 90 && clamped > 0.01 && clamped < 0.99) {
        return;
      }
      lastHudUpdateAtRef.current = now;

      const dur = verifiedDurationRef.current;
      const curSec = (clamped * dur).toFixed(1).padStart(4, '0');
      const totSec = dur.toFixed(1).padStart(4, '0');
      const nextText = `${curSec}s / ${totSec}s`;

      if (timecodeRef.current && nextText !== lastTimecodeTextRef.current) {
        lastTimecodeTextRef.current = nextText;
        timecodeRef.current.textContent = nextText;
      }
    },
    [chapter.beats]
  );

  // IntersectionObserver to lazy-load video assets before the visitor reaches the chapter
  // (Prevents loading and decoding all 5 videos simultaneously - Brief Section 4)
  useEffect(() => {
    if (isHeroChapter || chapter.chapterNumber === '02') {
      setIsActiveOrNear(true);
      return;
    }
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsActiveOrNear(true);
          }
        }
      },
      { rootMargin: '250% 0px 250% 0px' }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [isHeroChapter, chapter.chapterNumber]);

  // Handle video metadata ready without tearing down the active ScrollTrigger timeline
  const handleMetadataReady = useCallback((duration: number) => {
    if (duration && duration > 0) {
      verifiedDurationRef.current = duration;
      setVerifiedDuration(duration);
    }
  }, []);

  // Build individual GSAP ScrollTrigger timeline for this chapter
  useEffect(() => {
    if (prefersReducedMotion) return;
    const sectionEl = sectionRef.current;
    const stageEl = stageRef.current;
    if (!sectionEl || !stageEl) return;

    const ctx = gsap.context(() => {
      const effectiveVh = isMobileViewport
        ? Math.round(chapter.scrollHeightVh * 0.72)
        : chapter.scrollHeightVh;

      const playheadProxy = { progress: 0 };

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        scrollTrigger: {
          id: `st-${chapter.id}`,
          trigger: sectionEl,
          start: 'top top',
          end: () => `+=${Math.round((window.innerHeight * effectiveVh) / 100)}`,
          pin: true,
          scrub: 0.45,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onEnter: () => onChapterActive?.(chapter.id, 0),
          onEnterBack: () => onChapterActive?.(chapter.id, 1),
          onUpdate: (self) => {
            updateChapterHud(self.progress);
            onChapterActive?.(chapter.id, self.progress);
          },
        },
      });

      // 1. Master Video CurrentTime Scrub Synchronization across 0..100 timeline units
      tl.to(
        playheadProxy,
        {
          progress: 1,
          ease: 'none',
          duration: 100,
          onUpdate: () => {
            videoHandleRef.current?.seekToProgress(playheadProxy.progress);
          },
        },
        0
      );

      // 2. Discreet opening scroll indicator fade-out on Chapter 01
      if (isHeroChapter && scrollCueRef.current) {
        tl.to(
          scrollCueRef.current,
          {
            autoAlpha: 0,
            y: 14,
            duration: 9,
            ease: 'power2.inOut',
          },
          2
        );
      }

      // 3. Choreograph each Narrative Beat along the 0..100 timeline
      const beatEls = gsap.utils.toArray<HTMLElement>('[data-beat-id]', stageEl);

      beatEls.forEach((beatEl, idx) => {
        const beatData = chapter.beats[idx];
        if (!beatData) return;

        const startPos = beatData.startProgress * 100;
        const endPos = beatData.endProgress * 100;
        const span = endPos - startPos;
        const ramp = Math.min(7.5, span * 0.27);

        const words = beatEl.querySelectorAll('.beat-word');
        const kicker = beatEl.querySelector('.beat-kicker');
        const body = beatEl.querySelector('.beat-body');
        const archNote = beatEl.querySelector('.beat-arch-note');
        const ctaRow = beatEl.querySelector('.beat-cta-row');

        const isOpeningBeat = isHeroChapter && idx === 0;
        const isFinalBeat = idx === beatEls.length - 1;

        if (isOpeningBeat) {
          // Chapter 01 Beat 0 starts settled at scroll 0 and transitions out as the camera approaches the entrance
          gsap.set(beatEl, { autoAlpha: 1, y: 0, '--k': 1 });
          gsap.set([kicker, words, body, archNote], { autoAlpha: 1, y: 0, x: 0, scale: 1 });

          // Subtle upward drift across the opening plateau
          tl.to(
            beatEl,
            {
              y: -12,
              ease: 'none',
              duration: Math.max(1, endPos - ramp),
            },
            0
          );

          // Exit transition before Beat 1 arrives
          tl.to(
            words,
            {
              yPercent: -110,
              autoAlpha: 0,
              stagger: 0.25,
              duration: ramp,
              ease: 'power2.in',
            },
            endPos - ramp
          );
          tl.to(
            [kicker, body, archNote],
            {
              autoAlpha: 0,
              y: -16,
              duration: ramp * 0.85,
              ease: 'power2.in',
            },
            endPos - ramp
          );
          tl.to(
            beatEl,
            {
              autoAlpha: 0,
              '--k': 0,
              duration: ramp,
              ease: 'power2.in',
            },
            endPos - ramp
          );
        } else {
          // Determine entrance starting offsets based on beatData.entrance personality
          const wordFromVars: gsap.TweenVars = { autoAlpha: 0 };
          if (beatData.entrance === 'masked-rise' || beatData.entrance === 'word-settle') {
            wordFromVars.yPercent = 105;
          } else if (beatData.entrance === 'drift-down') {
            wordFromVars.yPercent = -95;
          } else if (beatData.entrance === 'grid-snap') {
            wordFromVars.x = -24;
          } else if (beatData.entrance === 'approach-depth') {
            wordFromVars.scale = 0.84;
            wordFromVars.y = 18;
          } else if (beatData.entrance === 'halves-parting') {
            wordFromVars.x = (wIdx: number) => (wIdx < words.length / 2 ? -22 : 22);
          } else if (beatData.entrance === 'scatter') {
            wordFromVars.y = (wIdx: number) => (wIdx % 2 === 0 ? -20 : 20);
            wordFromVars.x = (wIdx: number) => ((wIdx % 3) - 1) * 14;
          } else if (beatData.entrance === 'blur-sharp') {
            wordFromVars.y = 14;
          }

          gsap.set(beatEl, { autoAlpha: 0, y: 22, '--k': 0 });
          gsap.set(kicker, { autoAlpha: 0, y: 12 });
          gsap.set(words, wordFromVars);
          gsap.set(body, { autoAlpha: 0, y: 18 });
          if (archNote) gsap.set(archNote, { autoAlpha: 0, x: -12 });
          if (ctaRow) gsap.set(ctaRow, { autoAlpha: 0, y: 16 });

          // Entrance ramp
          tl.to(
            beatEl,
            {
              autoAlpha: 1,
              y: 0,
              '--k': 1,
              duration: ramp,
              ease: 'power2.out',
            },
            startPos
          );

          tl.to(
            kicker,
            {
              autoAlpha: 1,
              y: 0,
              duration: ramp * 0.7,
              ease: 'power2.out',
            },
            startPos + 0.4
          );

          tl.to(
            words,
            {
              autoAlpha: 1,
              yPercent: 0,
              y: 0,
              x: 0,
              scale: 1,
              stagger: Math.min(0.45, (ramp * 0.5) / Math.max(1, words.length)),
              duration: ramp * 0.85,
              ease: 'power3.out',
            },
            startPos + 0.8
          );

          // Progressive supporting paragraph reveal after headline enters
          tl.to(
            body,
            {
              autoAlpha: 1,
              y: 0,
              duration: ramp * 0.85,
              ease: 'power2.out',
            },
            startPos + ramp * 0.42
          );

          if (archNote) {
            tl.to(
              archNote,
              {
                autoAlpha: 1,
                x: 0,
                duration: ramp * 0.75,
                ease: 'power2.out',
              },
              startPos + ramp * 0.58
            );
          }

          if (ctaRow) {
            tl.to(
              ctaRow,
              {
                autoAlpha: 1,
                y: 0,
                duration: ramp * 0.85,
                ease: 'power2.out',
              },
              startPos + ramp * 0.7
            );
          }

          // Slow spatial drift across the readable plateau
          tl.to(
            beatEl,
            {
              y: -10,
              ease: 'none',
              duration: Math.max(1, endPos - startPos - ramp * 2),
            },
            startPos + ramp
          );

          // Exit ramp (for non-final beats, clear completely; for final beat, hold until 96% then soften)
          if (!isFinalBeat) {
            tl.to(
              words,
              {
                yPercent: -90,
                autoAlpha: 0,
                stagger: 0.18,
                duration: ramp * 0.85,
                ease: 'power2.in',
              },
              endPos - ramp
            );
            tl.to(
              [kicker, body, archNote],
              {
                autoAlpha: 0,
                y: -14,
                duration: ramp * 0.8,
                ease: 'power2.in',
              },
              endPos - ramp
            );
            tl.to(
              beatEl,
              {
                autoAlpha: 0,
                '--k': 0,
                duration: ramp,
                ease: 'power2.in',
              },
              endPos - ramp
            );
          }
        }
      });
    }, sectionEl);

    return () => {
      ctx.revert();
    };
  }, [
    chapter,
    isHeroChapter,
    isMobileViewport,
    prefersReducedMotion,
    locale,
    onChapterActive,
    updateChapterHud,
  ]);

  // Accessible alternative layout when prefers-reduced-motion is enabled (Brief Section 11)
  if (prefersReducedMotion) {
    return (
      <section
        id={chapter.id}
        ref={sectionRef}
        aria-label={`${chapter.chapterNumber} ${chapter.chapterTitle[locale]}`}
        className="relative z-10 py-20 md:py-28 border-b border-accent/15 bg-canvas"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 relative overflow-hidden rounded-sm border border-accent/20 aspect-video">
              <img
                src={chapter.posterUrl}
                alt={chapter.chapterTitle[locale]}
                className="w-full h-full object-cover"
                loading={isHeroChapter ? 'eager' : 'lazy'}
              />
              <div className="absolute bottom-4 left-4 chip-scrim px-3 py-1 rounded-full font-mono text-xs text-accent">
                CHAPTER {chapter.chapterNumber} · {chapter.chapterTitle[locale]}
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-8">
              {chapter.beats.map((beat, bIdx) => (
                <div
                  key={beat.id}
                  className="p-6 rounded-sm bg-panel/90 border border-accent/15 flex flex-col gap-2.5"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {beat.kicker[locale]}
                  </span>
                  {isHeroChapter && bIdx === 0 ? (
                    <h1 className="font-serif text-4xl text-ivory">{beat.headline[locale]}</h1>
                  ) : (
                    <h2 className="font-serif text-2xl text-ivory">{beat.headline[locale]}</h2>
                  )}
                  <p className="font-sans text-sm text-travertine leading-relaxed">
                    {beat.body[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id={chapter.id}
      ref={sectionRef}
      data-chapter-id={chapter.id}
      data-chapter-number={chapter.chapterNumber}
      data-chapter-progress="0.000"
      aria-label={`Chapter ${chapter.chapterNumber}: ${chapter.chapterTitle[locale]}`}
      className="relative w-full h-screen overflow-hidden bg-canvas"
    >
      <div ref={stageRef} className="relative w-full h-full overflow-hidden">
        {/* Scrubbed Video Stage + Poster + Frame-Sequence Fallback */}
        <ScrollVideo
          ref={videoHandleRef}
          videoId={chapter.videoId}
          desktopVideoUrl={chapter.desktopVideoUrl}
          mobileVideoUrl={chapter.mobileVideoUrl}
          posterUrl={chapter.posterUrl}
          endFrameUrl={chapter.endFrameUrl}
          frameSequencePrefix={chapter.frameSequencePrefix}
          frameCount={chapter.frameCount}
          fallbackDuration={chapter.durationSeconds}
          isActiveOrNear={isActiveOrNear}
          isMobileViewport={isMobileViewport}
          prefersReducedMotion={prefersReducedMotion}
          onMetadataReady={handleMetadataReady}
        />

        {/* Top-Left Chapter Header Pill & Sequence Progress Bar */}
        <div className="hud-secondary absolute top-20 sm:top-24 left-4 sm:left-6 md:left-14 lg:left-20 z-20 flex items-center gap-3 pointer-events-none">
          <div className="chip-scrim flex items-center gap-2.5 sm:gap-3 px-3 sm:px-3.5 py-1.5 rounded-full whitespace-nowrap">
            <Film className="w-3.5 h-3.5 text-accent shrink-0" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.18em] sm:tracking-[0.2em] text-ivory">
              CH.{chapter.chapterNumber}
              <span className="hidden sm:inline"> · {chapter.chapterTitle[locale]}</span>
            </span>
            <span className="text-accent/40">|</span>
            <span
              ref={timecodeRef}
              className="font-mono text-[10px] sm:text-[11px] tracking-wider text-travertine"
            >
              00.0s / {verifiedDuration.toFixed(1).padStart(4, '0')}s
            </span>
          </div>

          {/* Beat Step Dots */}
          <div className="chip-scrim hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full">
            {chapter.beats.map((b, idx) => (
              <span
                key={b.id}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeBeatIndex ? 'w-5 bg-accent' : 'w-1.5 bg-ivory/30'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Synchronized Narrative Beats Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {chapter.beats.map((beat, idx) => (
            <NarrativeText
              key={beat.id}
              beat={beat}
              beatIndex={idx}
              locale={locale}
              isFirstChapterOpening={isHeroChapter && idx === 0}
              locationBadge={locationBadge}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        {/* Discreet Opening Scroll Indicator on Chapter 01 */}
        {isHeroChapter && (
          <div
            ref={scrollCueRef}
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none"
          >
            <span className="chip-scrim px-3.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.26em] text-ivory/90 flex items-center gap-2">
              <span>{locale === 'en' ? 'SCROLL TO BEGIN THE JOURNEY' : 'DESLIZE PARA INICIAR A JORNADA'}</span>
              <ChevronDown className="w-3.5 h-3.5 text-accent animate-bounce" />
            </span>
          </div>
        )}

        {/* Bottom Chapter Scrub Progress Rail */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-ivory/10 z-20 pointer-events-none"
          aria-hidden="true"
        >
          <div
            ref={progressFillRef}
            className="h-full w-full bg-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </div>
    </section>
  );
};
