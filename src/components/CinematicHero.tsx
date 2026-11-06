import React from 'react';
import { ChapterConfig, HOTEL_CONFIG, Locale } from '../data/hotelData';
import { ScrollStorySection } from './ScrollStorySection';

interface CinematicHeroProps {
  chapter: ChapterConfig;
  locale: Locale;
  isMobileViewport: boolean;
  prefersReducedMotion: boolean;
  onChapterActive?: (chapterId: string, progress: number) => void;
}

/**
 * CinematicHero
 * Chapter 01 - The First Impression (cena1.mp4)
 * Full-screen establishing introduction with LIVE HOTEL editorial title,
 * verified editable location badge, hospitality statement, and GSAP ScrollTrigger timeline.
 */
export const CinematicHero: React.FC<CinematicHeroProps> = ({
  chapter,
  locale,
  isMobileViewport,
  prefersReducedMotion,
  onChapterActive,
}) => {
  return (
    <ScrollStorySection
      chapter={chapter}
      locale={locale}
      isHeroChapter={true}
      locationBadge={HOTEL_CONFIG.locationPlaceholder[locale]}
      isMobileViewport={isMobileViewport}
      prefersReducedMotion={prefersReducedMotion}
      onChapterActive={onChapterActive}
    />
  );
};
