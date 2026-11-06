import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Locale } from '../data/hotelData';
import { Sun, Moon, Sparkles, ArrowUpRight } from 'lucide-react';

interface ExperienceSectionProps {
  locale: Locale;
  prefersReducedMotion: boolean;
  onSelectPhoto?: (src: string, title: string, caption: string) => void;
}

interface ExperiencePillar {
  id: string;
  number: string;
  category: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  dayImage: string;
  duskImage: string;
  highlightNote: Record<Locale, string>;
}

const EXPERIENCE_PILLARS: ExperiencePillar[] = [
  {
    id: 'pool',
    number: '01',
    category: { en: 'WATER & HORIZON', pt: 'ÁGUA E HORIZONTE' },
    title: {
      en: 'The Oceanfront Infinity Pool',
      pt: 'A Piscina Infinita Frente ao Mar',
    },
    description: {
      en: 'Stretching parallel to the white sand beach and coral reef, the infinity pool merges visually with the turquoise sea. Bordered by honed limestone decks, shaded teak loungers, and tropical palms.',
      pt: 'Paralela à praia de areia branca e ao recife, a piscina infinita funde-se visualmente com o mar turquesa. Ladeada por decks de pedra calcária, espreguiçadeiras em teca e palmeiras.',
    },
    dayImage: '/assets/images/08_infinity_pool_at_beachfront_resort_67665cf0_2k.jpg',
    duskImage: '/assets/images/24_resort_infinity_pool_at_sunset_56c8964f_2k.jpg',
    highlightNote: {
      en: 'Underwater evening lanterns illuminate the basin at sunset.',
      pt: 'Iluminação subaquática suave transforma o espelho de água ao pôr do sol.',
    },
  },
  {
    id: 'spa',
    number: '02',
    category: { en: 'RESTORATION & CALM', pt: 'RESTAURO E SERENIDADE' },
    title: {
      en: 'Holistic Wellness & Spa Sanctuary',
      pt: 'Santuário de Bem-Estar e Spa',
    },
    description: {
      en: 'Set beside a tranquil stone water basin and lush courtyard palms, our open-air treatment suites feature twin teak tables, warm candlelit niches, and natural botanical oils accompanied by the sound of the waves.',
      pt: 'Situado junto a um espelho de água em pedra e palmeiras tropicais, o nosso spa oferece marquesas duplas em teca, nichos iluminados por velas e óleos botânicos ao som das ondas.',
    },
    dayImage: '/assets/images/15_luxury_wellness_spa_interior_pho_513e40dd_2k.jpg',
    duskImage: '/assets/images/16_luxury_wellness_spa_interior_pho_8701d7be_2k.jpg',
    highlightNote: {
      en: 'Private couples treatment pavilion opening onto the coastal garden.',
      pt: 'Pavilhão privado de tratamento com vista direta para o jardim costeiro.',
    },
  },
  {
    id: 'dining',
    number: '03',
    category: { en: 'CULINARY MOMENTS', pt: 'GASTRONOMIA À BEIRA-MAR' },
    title: {
      en: 'Ocean Terrace Breakfast & Shore Dining',
      pt: 'Pequeno-Almoço no Terraço e Jantar na Praia',
    },
    description: {
      en: 'Mornings begin on the upper timber veranda with fresh tropical fruit, warm pastries, and French-press coffee overlooking the surf. At dusk, private linen-draped bamboo canopies and hurricane lanterns set the stage on the sand.',
      pt: 'As manhãs começam na varanda superior com frutas tropicais, pastelaria fresca e café de frente para o mar. Ao anoitecer, pérgolas privadas na areia recebem jantares à luz das velas.',
    },
    dayImage: '/assets/images/01_breakfast_experience_on_oceanfro_9d29d097_2k.jpg',
    duskImage: '/assets/images/26_romantic_dinner_on_beach_c81cb4ad_2k.jpg',
    highlightNote: {
      en: 'From sunlit oceanfront veranda tables to private candlelit canopies on the beach.',
      pt: 'Das mesas matinais na varanda às pérgolas privadas iluminadas por velas na areia.',
    },
  },
  {
    id: 'grounds',
    number: '04',
    category: { en: 'THE COASTAL GROUNDS', pt: 'JARDINS E ARQUITETURA' },
    title: {
      en: 'Tropical Gardens & Veranda Lounges',
      pt: 'Jardins Tropicais e Varandas Lounge',
    },
    description: {
      en: 'Flagstone pathways wind through manicured coastal flora and traveler palms, linking the shaded pergola lounges directly to the shoreline.',
      pt: 'Caminhos em pedra natural serpenteiam pela flora costeira e palmeiras-do-viajante, ligando as pérgolas sombreadas diretamente à praia.',
    },
    dayImage: '/assets/images/23_resort_garden_near_ocean_90b8d78f_2k.jpg',
    duskImage: '/assets/images/13_luxury_resort_oceanfront_terrace_c6e0173f_2k.jpg',
    highlightNote: {
      en: 'Direct private access from the garden walkways to the white sand shore.',
      pt: 'Acesso privado e direto dos jardins para a praia de areia branca.',
    },
  },
];

/**
 * ExperienceSection
 * Presents the verified hotel experiences alongside the 10k-websites-skill
 * Signature Interactive Moment: "Press and Hold to Awaken Golden Hour".
 */
export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  locale,
  prefersReducedMotion,
  onSelectPhoto,
}) => {
  const [holdProgress, setHoldProgress] = useState<number>(prefersReducedMotion ? 1 : 0);
  const [isCompleted, setIsCompleted] = useState<boolean>(prefersReducedMotion);
  const isHoldingRef = useRef<boolean>(false);
  const progressRef = useRef<number>(prefersReducedMotion ? 1 : 0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      progressRef.current = 1;
      setHoldProgress(1);
      setIsCompleted(true);
    }
  }, [prefersReducedMotion]);

  const stepHoldAnimation = useCallback((now: number) => {
    const dt = Math.min(64, now - (lastTimeRef.current || now));
    lastTimeRef.current = now;

    if (isHoldingRef.current) {
      progressRef.current = Math.min(1, progressRef.current + dt / 1400);
      if (progressRef.current >= 1) {
        progressRef.current = 1;
        setIsCompleted(true);
      }
    } else if (progressRef.current < 1) {
      // Releasing early eases progress smoothly back down; never snaps to zero (10k-websites-skill)
      progressRef.current = Math.max(0, progressRef.current - dt / 1800);
    }

    setHoldProgress(Number(progressRef.current.toFixed(3)));

    if (
      (isHoldingRef.current && progressRef.current < 1) ||
      (!isHoldingRef.current && progressRef.current > 0 && progressRef.current < 1)
    ) {
      rafRef.current = requestAnimationFrame(stepHoldAnimation);
    } else {
      rafRef.current = null;
      lastTimeRef.current = 0;
    }
  }, []);

  const startHold = useCallback(() => {
    if (prefersReducedMotion) {
      setIsCompleted((prev) => !prev);
      setHoldProgress((prev) => (prev > 0.5 ? 0 : 1));
      return;
    }
    if (progressRef.current >= 1) {
      // Allow resetting back to daylight if already completed
      progressRef.current = 0;
      setIsCompleted(false);
      setHoldProgress(0);
      return;
    }
    isHoldingRef.current = true;
    if (rafRef.current === null) {
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(stepHoldAnimation);
    }
  }, [prefersReducedMotion, stepHoldAnimation]);

  const stopHold = useCallback(() => {
    isHoldingRef.current = false;
    if (progressRef.current > 0 && progressRef.current < 1 && rafRef.current === null) {
      lastTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(stepHoldAnimation);
    }
  }, [stepHoldAnimation]);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const pct = Math.round(holdProgress * 100);

  return (
    <section
      id="experiences"
      aria-labelledby="experiences-heading"
      className="relative z-10 py-28 md:py-36 bg-panel/60 border-b border-accent/15"
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Top Editorial Banner + Interactive Press-and-Hold Golden Hour Moment */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pb-20 border-b border-accent/15">
          <div className="lg:col-span-6 flex flex-col gap-5">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {locale === 'en'
                ? 'EXPERIENCES BEYOND THE ROOM'
                : 'EXPERIÊNCIAS ALÉM DO QUARTO'}
            </span>
            <h2
              id="experiences-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight leading-[1.06]"
              style={{ maxWidth: '19ch' }}
            >
              {locale === 'en'
                ? 'Every hour shifts the light across the shore.'
                : 'Cada hora transforma a luz sobre a costa.'}
            </h2>
            <p
              className="font-sans font-light text-base md:text-lg text-travertine leading-relaxed"
              style={{ maxWidth: '52ch' }}
            >
              {locale === 'en'
                ? 'From morning swims in the oceanfront infinity pool and botanical spa rituals to candlelit dinners directly on the sand, life at LIVE HOTEL unfolds in step with the sun and tide.'
                : 'De mergulhos matinais na piscina infinita e rituais botânicos no spa a jantares à luz das velas na areia, a vida no LIVE HOTEL acompanha o sol e a maré.'}
            </p>

            {/* Interactive Press-and-Hold Control */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center gap-5">
              <button
                type="button"
                id="atmosphere-hold-btn"
                onMouseDown={startHold}
                onMouseUp={stopHold}
                onMouseLeave={stopHold}
                onTouchStart={startHold}
                onTouchEnd={stopHold}
                onKeyDown={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    startHold();
                  }
                }}
                onKeyUp={(e) => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    stopHold();
                  }
                }}
                aria-pressed={isCompleted}
                className="btn relative overflow-hidden inline-flex items-center justify-center gap-3 px-7 py-4 rounded-sm border border-accent bg-canvas text-ivory font-mono text-xs uppercase tracking-[0.2em] select-none transition-colors"
              >
                {/* Dynamic Hold Progress Fill */}
                <span
                  className="absolute inset-0 bg-accent/25 origin-left pointer-events-none"
                  style={{ transform: `scaleX(${holdProgress})` }}
                  aria-hidden="true"
                />
                {isCompleted ? (
                  <Moon className="w-4 h-4 text-accent relative z-10" />
                ) : (
                  <Sun className="w-4 h-4 text-accent relative z-10" />
                )}
                <span className="relative z-10">
                  {isCompleted
                    ? locale === 'en'
                      ? 'GOLDEN HOUR ACTIVE · CLICK TO RESET'
                      : 'HORA DOURADA ATIVA · CLIQUE PARA DIA'
                    : locale === 'en'
                    ? `PRESS & HOLD FOR GOLDEN HOUR (${pct}%)`
                    : `SEGURE PARA A HORA DOURADA (${pct}%)`}
                </span>
              </button>

              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-travertine">
                {isCompleted
                  ? locale === 'en'
                    ? 'Evening lantern atmosphere unlocked across all spaces'
                    : 'Atmosfera noturna iluminada em todos os espaços'
                  : locale === 'en'
                  ? 'Hold to transition the sanctuary from noon to twilight'
                  : 'Mantenha premido para transformar o dia em entardecer'}
              </span>
            </div>
          </div>

          {/* Interactive Dual-Exposure Visual Stage */}
          <div className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-sm border border-accent/25 aspect-[16/10] bg-canvas shadow-2xl">
              {/* Daylight Layer */}
              <img
                src="/assets/images/08_infinity_pool_at_beachfront_resort_67665cf0_2k.jpg"
                alt={locale === 'en' ? 'Infinity pool at sunlit noon' : 'Piscina infinita ao sol'}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              {/* Golden Hour / Twilight Layer Crossfaded by Hold Progress */}
              <img
                src="/assets/images/24_resort_infinity_pool_at_sunset_56c8964f_2k.jpg"
                alt={locale === 'en' ? 'Infinity pool at sunset' : 'Piscina infinita ao pôr do sol'}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-150"
                style={{ opacity: holdProgress }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-4">
                <span className="chip-scrim px-3.5 py-1.5 rounded-full font-mono text-[11px] uppercase tracking-[0.18em] text-ivory">
                  {holdProgress > 0.5
                    ? locale === 'en'
                      ? 'TWILIGHT & LANTERN GLOW'
                      : 'CREPÚSCULO E LANTERNAS'
                    : locale === 'en'
                    ? 'SUNLIT COASTAL NOON'
                    : 'LUZ NATURAL DO MEIO-DIA'}
                </span>
                <span className="chip-scrim px-3 py-1.5 rounded-full font-mono text-[11px] text-accent">
                  {pct}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Staggered Editorial Grid of the 4 Verified Experience Pillars */}
        <div className="pt-20 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {EXPERIENCE_PILLARS.map((pillar, index) => {
            const activeImg = holdProgress > 0.5 ? pillar.duskImage : pillar.dayImage;
            const isOffset = index % 2 === 1;

            return (
              <article
                key={pillar.id}
                className={`group flex flex-col gap-6 ${isOffset ? 'md:mt-14' : ''}`}
              >
                <div
                  onClick={() =>
                    onSelectPhoto?.(
                      activeImg,
                      pillar.title[locale],
                      pillar.description[locale]
                    )
                  }
                  className="relative overflow-hidden rounded-sm border border-accent/20 bg-canvas aspect-[16/10] cursor-pointer"
                >
                  <img
                    src={pillar.dayImage}
                    alt={pillar.title[locale]}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <img
                    src={pillar.duskImage}
                    alt={`${pillar.title[locale]} twilight`}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    style={{ opacity: holdProgress }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/75 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 chip-scrim px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                    {pillar.number} · {pillar.category[locale]}
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3
                    className="font-serif text-3xl md:text-4xl text-ivory font-normal"
                    style={{ maxWidth: '24ch' }}
                  >
                    {pillar.title[locale]}
                  </h3>
                  <p
                    className="font-sans font-light text-base text-travertine leading-relaxed"
                    style={{ maxWidth: '52ch' }}
                  >
                    {pillar.description[locale]}
                  </p>
                  <div
                    className={`mt-2 p-3.5 rounded-sm border transition-all duration-500 ${
                      isCompleted
                        ? 'bg-accent/10 border-accent/40 text-ivory'
                        : 'bg-canvas/60 border-accent/15 text-travertine'
                    }`}
                  >
                    <p className="font-mono text-xs tracking-wide flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                      <span>{pillar.highlightNote[locale]}</span>
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Funnel to Reservation CTA */}
        <div className="mt-20 pt-12 border-t border-accent/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <p
            className="font-serif italic text-2xl md:text-3xl text-ivory"
            style={{ maxWidth: '34ch' }}
          >
            {locale === 'en'
              ? 'Prepared around your rhythm, from first morning coffee to starlight on the shore.'
              : 'Preparado ao seu ritmo, do primeiro café matinal às estrelas sobre a praia.'}
          </p>
          <a
            href="#booking"
            className="btn inline-flex items-center gap-2.5 bg-accent hover:bg-accent-hover text-canvas font-mono text-xs uppercase tracking-[0.2em] font-medium px-7 py-4 rounded-sm transition-all"
          >
            <span>{locale === 'en' ? 'PLAN YOUR STAY' : 'PLANEAR A SUA ESTADIA'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};
