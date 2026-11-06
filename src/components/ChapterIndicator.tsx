import React from 'react';
import { CHAPTERS_DATA, Locale } from '../data/hotelData';

interface ChapterIndicatorProps {
  locale: Locale;
  activeChapterId: string;
  activeChapterProgress: number;
}

export const ChapterIndicator: React.FC<ChapterIndicatorProps> = ({
  locale,
  activeChapterId,
  activeChapterProgress,
}) => {
  return (
    <aside
      aria-label={locale === 'en' ? 'Chapter Indicator' : 'Indicador de Capítulos'}
      className="hud-secondary fixed right-5 xl:right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3"
    >
      {CHAPTERS_DATA.map((ch) => {
        const isCurrent = ch.id === activeChapterId;
        const pct = isCurrent
          ? Math.round(Math.max(0, Math.min(1, activeChapterProgress)) * 100)
          : 0;

        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            aria-label={`${ch.chapterNumber} ${ch.chapterTitle[locale]}`}
            aria-current={isCurrent ? 'step' : undefined}
            className="group flex items-center gap-3 py-1 focus:outline-none"
          >
            {/* Hover / Focus Chapter Tooltip Label */}
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 rounded-sm whitespace-nowrap pointer-events-none transition-all duration-300 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0 ${
                isCurrent
                  ? 'chip-scrim text-accent'
                  : 'chip-scrim text-ivory/80'
              }`}
            >
              {ch.chapterNumber} · {ch.chapterTitle[locale]}
              {isCurrent ? ` (${pct}%)` : ''}
            </span>

            {/* Vertical Chapter Bar */}
            <div className="relative w-1.5 h-8 rounded-full bg-ivory/15 overflow-hidden border border-accent/20">
              <div
                className="w-full bg-accent origin-top transition-transform duration-150"
                style={{
                  height: '100%',
                  transform: `scaleY(${isCurrent ? Math.max(0.15, activeChapterProgress) : 0})`,
                }}
              />
            </div>
          </a>
        );
      })}
    </aside>
  );
};
