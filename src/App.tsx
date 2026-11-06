import React, { useEffect, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CHAPTERS_DATA, Locale } from './data/hotelData';
import { HotelNavigation } from './components/HotelNavigation';
import { ChapterIndicator } from './components/ChapterIndicator';
import { CinematicHero } from './components/CinematicHero';
import { ScrollStorySection } from './components/ScrollStorySection';
import { AccommodationSection } from './components/AccommodationSection';
import { ExperienceSection } from './components/ExperienceSection';
import { HotelGallery } from './components/HotelGallery';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [locale, setLocale] = useState<Locale>('en');
  const [activeChapterId, setActiveChapterId] = useState<string>('chapter-01');
  const [activeChapterProgress, setActiveChapterProgress] = useState<number>(0);
  const [globalScrollProgress, setGlobalScrollProgress] = useState<number>(0);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  const [isMobileViewport, setIsMobileViewport] = useState<boolean>(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(max-width: 768px)').matches
      : false
  );

  const [externalSelectedPhoto, setExternalSelectedPhoto] = useState<{
    src: string;
    title: string;
    caption: string;
  } | null>(null);

  // Sync document lang attribute when locale changes
  useEffect(() => {
    document.documentElement.lang = locale === 'en' ? 'en' : 'pt';
  }, [locale]);

  // Live media query listeners for prefers-reduced-motion and mobile viewport (10k-websites-skill live gate rule)
  useEffect(() => {
    const rmQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobQuery = window.matchMedia('(max-width: 768px)');

    const handleRmChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    const handleMobChange = (e: MediaQueryListEvent) => {
      setIsMobileViewport(e.matches);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    };

    rmQuery.addEventListener('change', handleRmChange);
    mobQuery.addEventListener('change', handleMobChange);

    return () => {
      rmQuery.removeEventListener('change', handleRmChange);
      mobQuery.removeEventListener('change', handleMobChange);
    };
  }, []);

  // Pause CSS background loops when browser tab is hidden (10k-websites-skill rule)
  useEffect(() => {
    const handleVisibility = () => {
      document.body.classList.toggle('paused', document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Initialize Lenis smooth scroll integrated with GSAP ticker and ScrollTrigger
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      syncTouch: false,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  // Global scroll progress bar listener
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      setGlobalScrollProgress(Math.min(1, Math.max(0, window.scrollY / maxScroll)));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChapterActive = useCallback((chapterId: string, progress: number) => {
    setActiveChapterId(chapterId);
    setActiveChapterProgress(progress);
  }, []);

  const handleSelectPhoto = useCallback((src: string, title: string, caption: string) => {
    setExternalSelectedPhoto({ src, title, caption });
  }, []);

  return (
    <div className="relative min-h-screen bg-canvas text-ivory">
      {/* Keyboard Skip Link */}
      <a href="#main" className="skip-link">
        {locale === 'en' ? 'Skip to main content' : 'Saltar para o conteúdo principal'}
      </a>

      {/* Fixed Atmospheric Coastal Background Layer */}
      <div className="ambient-environment" aria-hidden="true" />

      {/* Minimal Luxury Header Navigation */}
      <HotelNavigation
        locale={locale}
        onToggleLocale={setLocale}
        activeChapterId={activeChapterId}
        globalScrollProgress={globalScrollProgress}
      />

      {/* Right-Edge Chapter Progress Rail */}
      <ChapterIndicator
        locale={locale}
        activeChapterId={activeChapterId}
        activeChapterProgress={activeChapterProgress}
      />

      {/* Main Narrative & Editorial Experience */}
      <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
        {/* CHAPTER 01: THE FIRST IMPRESSION (cena1.mp4) */}
        <CinematicHero
          chapter={CHAPTERS_DATA[0]}
          locale={locale}
          isMobileViewport={isMobileViewport}
          prefersReducedMotion={prefersReducedMotion}
          onChapterActive={handleChapterActive}
        />

        {/* CHAPTER 02: THE ARRIVAL (cena2.mp4) */}
        <ScrollStorySection
          chapter={CHAPTERS_DATA[1]}
          locale={locale}
          isMobileViewport={isMobileViewport}
          prefersReducedMotion={prefersReducedMotion}
          onChapterActive={handleChapterActive}
        />

        {/* CHAPTER 03: THE ART OF STAYING (cena4.mp4) */}
        <ScrollStorySection
          chapter={CHAPTERS_DATA[2]}
          locale={locale}
          isMobileViewport={isMobileViewport}
          prefersReducedMotion={prefersReducedMotion}
          onChapterActive={handleChapterActive}
        />

        {/* VERIFIED ACCOMMODATION EDITORIAL SHOWCASE */}
        <AccommodationSection locale={locale} onSelectPhoto={handleSelectPhoto} />

        {/* CHAPTER 04: EXPERIENCES BEYOND THE ROOM (cena2.1.mp4) */}
        <ScrollStorySection
          chapter={CHAPTERS_DATA[3]}
          locale={locale}
          isMobileViewport={isMobileViewport}
          prefersReducedMotion={prefersReducedMotion}
          onChapterActive={handleChapterActive}
        />

        {/* VERIFIED EXPERIENCES & INTERACTIVE GOLDEN HOUR MOMENT */}
        <ExperienceSection
          locale={locale}
          prefersReducedMotion={prefersReducedMotion}
          onSelectPhoto={handleSelectPhoto}
        />

        {/* CHAPTER 05: THE LIVE HOTEL EXPERIENCE CLIMAX (cena3.mp4) */}
        <ScrollStorySection
          chapter={CHAPTERS_DATA[4]}
          locale={locale}
          isMobileViewport={isMobileViewport}
          prefersReducedMotion={prefersReducedMotion}
          onChapterActive={handleChapterActive}
        />

        {/* ASYMMETRIC EDITORIAL GALLERY OF ALL 27 AUTHENTIC PHOTOGRAPHS */}
        <HotelGallery
          locale={locale}
          externalSelectedPhoto={externalSelectedPhoto}
          onClearExternalPhoto={() => setExternalSelectedPhoto(null)}
        />

        {/* FINAL SECTION: YOUR STAY BEGINS HERE (RESERVATIONS & CONTACT) */}
        <BookingSection locale={locale} />
      </main>

      {/* Editorial Footer */}
      <Footer locale={locale} onToggleLocale={setLocale} />
    </div>
  );
};

export default App;
