import React from 'react';
import { Locale, NarrativeBeat } from '../data/hotelData';
import { ArrowUpRight, Compass } from 'lucide-react';

interface NarrativeTextProps {
  beat: NarrativeBeat;
  beatIndex: number;
  locale: Locale;
  isFirstChapterOpening?: boolean;
  locationBadge?: string;
  prefersReducedMotion: boolean;
}

const POSITION_CLASSES: Record<NarrativeBeat['position'], string> = {
  'bottom-left':
    'bottom-12 md:bottom-16 left-6 md:left-14 lg:left-20 items-start text-left max-w-[38rem]',
  'bottom-right':
    'bottom-12 md:bottom-16 right-6 md:right-14 lg:right-20 items-start md:items-end text-left md:text-right max-w-[38rem]',
  'center-left':
    'top-1/2 -translate-y-1/2 left-6 md:left-14 lg:left-20 items-start text-left max-w-[36rem]',
  'center-right':
    'top-1/2 -translate-y-1/2 right-6 md:right-14 lg:right-20 items-start md:items-end text-left md:text-right max-w-[36rem]',
  center:
    'top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 items-center text-center w-[90vw] max-w-[46rem]',
  'bottom-center':
    'bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 items-center text-center w-[90vw] max-w-[44rem]',
};

export const NarrativeText: React.FC<NarrativeTextProps> = ({
  beat,
  beatIndex,
  locale,
  isFirstChapterOpening = false,
  locationBadge,
  prefersReducedMotion,
}) => {
  const headlineText = beat.headline[locale];
  const words = headlineText.split(' ');

  return (
    <div
      data-beat-id={beat.id}
      data-beat-index={beatIndex}
      data-entrance={beat.entrance}
      style={{ '--k': prefersReducedMotion ? 1 : isFirstChapterOpening ? 1 : 0 } as React.CSSProperties}
      className={`narrative-band absolute z-10 flex flex-col gap-3.5 px-5 py-5 md:px-7 md:py-6 rounded-sm pointer-events-none ${
        POSITION_CLASSES[beat.position]
      } ${
        prefersReducedMotion
          ? 'opacity-100'
          : isFirstChapterOpening
          ? 'opacity-100'
          : 'opacity-0'
      }`}
    >
      {/* Kicker & Architectural Coordinate Chip */}
      <div className="beat-kicker flex flex-wrap items-center gap-2.5">
        <span className="chip-scrim inline-flex items-center gap-2 px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          {beat.kicker[locale]}
        </span>

        {isFirstChapterOpening && locationBadge && (
          <span className="chip-scrim inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-mono text-[11px] tracking-[0.14em] text-ivory/90">
            <Compass className="w-3 h-3 text-accent" />
            {locationBadge}
          </span>
        )}
      </div>

      {/* Masked Editorial Headline */}
      <div className="mask-line w-full">
        {isFirstChapterOpening ? (
          <h1
            className="beat-headline font-serif font-normal tracking-tight text-ivory leading-[1.04] text-5xl sm:text-6xl md:text-7xl lg:text-[5.4rem]"
            style={{ maxWidth: '18ch' }}
          >
            <span className="sr-only">{headlineText}</span>
            <span aria-hidden="true" className="inline-flex flex-wrap gap-x-[0.26em] gap-y-1">
              {words.map((word, wIdx) => (
                <span key={wIdx} className="beat-word inline-block will-change-transform">
                  {word}
                </span>
              ))}
            </span>
          </h1>
        ) : (
          <h2
            className="beat-headline font-serif font-normal tracking-tight text-ivory leading-[1.08] text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem]"
            style={{ maxWidth: '22ch' }}
          >
            <span className="sr-only">{headlineText}</span>
            <span
              aria-hidden="true"
              className={`inline-flex flex-wrap gap-x-[0.25em] gap-y-1 ${
                beat.position === 'center' || beat.position === 'bottom-center'
                  ? 'justify-center'
                  : beat.position === 'bottom-right' || beat.position === 'center-right'
                  ? 'md:justify-end'
                  : 'justify-start'
              }`}
            >
              {words.map((word, wIdx) => (
                <span key={wIdx} className="beat-word inline-block will-change-transform">
                  {word}
                </span>
              ))}
            </span>
          </h2>
        )}
      </div>

      {/* Progressive Supporting Paragraph (sized in ch on the text element itself per 10k-websites-skill quality floor) */}
      <p
        className="beat-body font-sans font-light text-base sm:text-lg md:text-[1.125rem] text-ivory/90 leading-relaxed"
        style={{ maxWidth: '54ch' }}
      >
        {beat.body[locale]}
      </p>

      {/* Subtle Architectural Coordinate Readout */}
      <div className="beat-arch-note hud-secondary pt-1 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-travertine/85">
        <span className="w-6 h-[1px] bg-accent/50" />
        <span>{beat.architecturalNote[locale]}</span>
      </div>

      {/* Optional Climax CTA Row (Chapter 05 Final Beat) */}
      {beat.showCta && (
        <div className="beat-cta-row pt-4 flex flex-wrap items-center justify-center gap-4 pointer-events-auto">
          <a
            href="#booking"
            className="btn group inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-canvas font-mono text-xs uppercase tracking-[0.2em] font-medium px-7 py-4 rounded-sm transition-all duration-300"
          >
            <span>{locale === 'en' ? 'BOOK YOUR STAY' : 'RESERVE A SUA ESTADIA'}</span>
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          <a
            href="#gallery"
            className="btn inline-flex items-center justify-center gap-2 chip-scrim hover:border-accent text-ivory font-mono text-xs uppercase tracking-[0.2em] px-6 py-4 rounded-sm transition-all duration-300"
          >
            <span>{locale === 'en' ? 'EXPLORE GALLERY' : 'EXPLORAR GALERIA'}</span>
          </a>
        </div>
      )}
    </div>
  );
};
