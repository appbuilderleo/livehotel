import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Locale } from '../data/hotelData';
import { ArrowUpRight, Maximize2, Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface AccommodationSectionProps {
  locale: Locale;
  onSelectPhoto?: (src: string, title: string, caption: string) => void;
}

interface SuiteZone {
  id: string;
  tag: Record<Locale, string>;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
  primaryImage: string;
  secondaryImage: string;
  details: Record<Locale, string[]>;
}

const SUITE_ZONES: SuiteZone[] = [
  {
    id: 'bedroom',
    tag: {
      en: '01 · INTERIOR SANCTUARY',
      pt: '01 · SANTUÁRIO INTERIOR',
    },
    title: {
      en: 'Ocean-View Bedroom & Timber Pavilion',
      pt: 'Quarto Vista Mar e Pavilhão em Madeira',
    },
    description: {
      en: 'Oriented directly toward the water, the bedroom pairs rough-hewn limestone walls with a coffered timber ceiling, custom teak bedside joinery, and floor-to-ceiling glass frames that draw the coastal light indoors.',
      pt: 'Orientado diretamente para o mar, o quarto combina paredes em pedra calcária rústica com teto em madeira trabalhada, marcenaria em teca sob medida e caixilhos de vidro do chão ao teto.',
    },
    primaryImage: '/assets/images/11_luxury_hotel_bedroom_ocean_view_05cea4e5_2k.jpg',
    secondaryImage: '/assets/images/12_luxury_ocean_view_hotel_suite_91d4e8a9_2k.jpg',
    details: {
      en: [
        'Hand-cut limestone feature wall and warm recessed lighting',
        'Coffered tropical hardwood ceiling with natural acoustic warmth',
        'King bed dressed in crisp organic linen facing the horizon',
        'Integrated lounge seating and natural woven floor textiles',
      ],
      pt: [
        'Parede em pedra calcária talhada à mão e iluminação indireta quente',
        'Teto em madeira tropical trabalhada com conforto acústico natural',
        'Cama King vestida com linho orgânico de frente para o horizonte',
        'Área de estar integrada e tapetes em fibras naturais tecidas',
      ],
    },
  },
  {
    id: 'terrace',
    tag: {
      en: '02 · PRIVATE HORIZON',
      pt: '02 · HORIZONTE PRIVADO',
    },
    title: {
      en: 'Covered Oceanfront Balcony & Teak Deck',
      pt: 'Varanda Coberta Frente ao Mar e Deck em Teca',
    },
    description: {
      en: 'Sliding timber doors open onto a deep covered terrace above the palm canopy. Furnished with solid teak sofas, sun loungers, and glass balustrades, the balcony serves as a private outdoor living room overlooking the surf.',
      pt: 'Portas de correr em madeira abrem-se para um amplo terraço coberto sobre a copa das palmeiras. Equipado com sofás em teca, espreguiçadeiras e guarda-corpos em vidro sobre o mar.',
    },
    primaryImage: '/assets/images/10_luxury_hotel_balcony_overlooking_475cb9da_2k.jpg',
    secondaryImage: '/assets/images/06_hotel_balcony_overlooking_ocean_613446bd_2k.jpg',
    details: {
      en: [
        'Unobstructed panoramic sightlines across the beach and ocean',
        'Solid teak daybeds and outdoor lounge seating',
        'Deep architectural timber overhang providing shade throughout the day',
        'Continuous stone flooring extending from bedroom to balcony',
      ],
      pt: [
        'Vista panorâmica desimpedida sobre a praia e o oceano',
        'Espreguiçadeiras e sofás exteriores em madeira de teca maciça',
        'Beiral arquitetónico profundo que garante sombra natural todo o dia',
        'Pavimento contínuo em pedra natural do quarto até à varanda',
      ],
    },
  },
  {
    id: 'bathroom',
    tag: {
      en: '03 · BATHING RITUAL',
      pt: '03 · RITUAL DE BANHO',
    },
    title: {
      en: 'Travertine Spa Bath & Stone Soaking Tub',
      pt: 'Casa de Banho Spa em Travertino e Banheira em Pedra',
    },
    description: {
      en: 'Filled with natural daylight and framed by tropical foliage outside full-height windows, the bathroom centers on a freestanding sculpted stone soaking tub, walk-in rain shower, and double teak vanity.',
      pt: 'Banhada por luz natural e emoldurada pela vegetação tropical através de janelas amplas, a casa de banho destaca uma banheira esculpida em pedra, duche walk-in e bancada dupla em teca.',
    },
    primaryImage: '/assets/images/09_luxurious_beachfront_hotel_bathr_9a1fefc2_2k.jpg',
    secondaryImage: '/assets/images/06_hotel_balcony_overlooking_ocean_613446bd_2k.jpg',
    details: {
      en: [
        'Freestanding carved stone soaking tub with floor-mounted brass filler',
        'Walk-in rain shower lined in warm honed travertine',
        'Double timber vanity with backlit mirrors and organic bath linens',
        'Full-height glass looking onto private tropical greenery',
      ],
      pt: [
        'Banheira de imersão esculpida em pedra com misturadora de chão em latão',
        'Duche de chuva walk-in revestido em travertino natural',
        'Bancada dupla em madeira com espelhos retroiluminados e têxteis orgânicos',
        'Envidraçados de altura total com vista para os jardins tropicais',
      ],
    },
  },
];

export const AccommodationSection: React.FC<AccommodationSectionProps> = ({
  locale,
  onSelectPhoto,
}) => {
  const [activeZoneId, setActiveZoneId] = useState<string>('bedroom');
  const sectionRef = useRef<HTMLElement | null>(null);

  const activeZone = SUITE_ZONES.find((z) => z.id === activeZoneId) || SUITE_ZONES[0];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.acc-reveal',
        { y: 36, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 78%',
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="accommodation"
      ref={sectionRef}
      aria-labelledby="accommodation-heading"
      className="relative z-10 py-28 md:py-36 bg-canvas border-t border-b border-accent/15"
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Editorial Header */}
        <div className="acc-reveal flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-16 border-b border-accent/15">
          <div className="flex flex-col gap-4">
            <div className="inline-flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.24em] text-accent">
              <Compass className="w-4 h-4" />
              <span>
                {locale === 'en'
                  ? 'ARCHITECTURAL ACCOMMODATION STUDY'
                  : 'ESTUDO ARQUITETÓNICO DE ACOMODAÇÃO'}
              </span>
            </div>
            <h2
              id="accommodation-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight leading-[1.06]"
              style={{ maxWidth: '20ch' }}
            >
              {locale === 'en'
                ? 'Spaces composed for coastal stillness.'
                : 'Espaços compostos para a serenidade costeira.'}
            </h2>
          </div>

          <p
            className="font-sans font-light text-base md:text-lg text-travertine leading-relaxed"
            style={{ maxWidth: '48ch' }}
          >
            {locale === 'en'
              ? 'Every residence at LIVE HOTEL is built from tactile natural materials: chiseled limestone, warm tropical hardwood, and expansive glass that keeps the ocean present in every room.'
              : 'Cada acomodação no LIVE HOTEL é construída com materiais naturais táteis: pedra calcária esculpida, madeira tropical nobre e amplos envidraçados que mantêm o oceano presente em cada divisão.'}
          </p>
        </div>

        {/* Interactive Zone Selector Tabs */}
        <div
          role="tablist"
          aria-label={locale === 'en' ? 'Suite Perspectives' : 'Perspetivas da Suíte'}
          className="acc-reveal pt-12 pb-10 flex flex-wrap items-center gap-3"
        >
          {SUITE_ZONES.map((zone) => {
            const isSelected = zone.id === activeZoneId;
            return (
              <button
                key={zone.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => setActiveZoneId(zone.id)}
                className={`touch-target px-5 py-3 rounded-sm font-mono text-xs uppercase tracking-[0.18em] transition-all duration-300 border ${
                  isSelected
                    ? 'bg-accent text-canvas border-accent font-medium'
                    : 'bg-panel/80 text-travertine border-accent/20 hover:border-accent/60 hover:text-ivory'
                }`}
              >
                {zone.tag[locale]}
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Composition */}
        <div className="acc-reveal grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left 7 Columns: Primary & Secondary Authentic Photography */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="group relative overflow-hidden rounded-sm border border-accent/20 bg-panel aspect-[16/10]">
              <img
                src={activeZone.primaryImage}
                alt={activeZone.title[locale]}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-canvas/70 via-transparent to-transparent opacity-60" />

              {onSelectPhoto && (
                <button
                  type="button"
                  onClick={() =>
                    onSelectPhoto(
                      activeZone.primaryImage,
                      activeZone.title[locale],
                      activeZone.description[locale]
                    )
                  }
                  aria-label={locale === 'en' ? 'Inspect full screen photograph' : 'Ver fotografia em ecrã inteiro'}
                  className="touch-target absolute bottom-4 right-4 chip-scrim px-3.5 py-2 rounded-sm font-mono text-[11px] uppercase tracking-[0.16em] text-ivory hover:border-accent flex items-center gap-2 transition-all"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-accent" />
                  <span>{locale === 'en' ? 'FULL VIEW' : 'AMPLIAR'}</span>
                </button>
              )}
            </div>

            {/* Secondary Supporting Detail Frame */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
              <div className="sm:col-span-7 relative overflow-hidden rounded-sm border border-accent/15 aspect-[16/10]">
                <img
                  src={activeZone.secondaryImage}
                  alt={`${activeZone.title[locale]} detail`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="sm:col-span-5 p-5 rounded-sm bg-panel/70 border border-accent/15 flex flex-col gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {locale === 'en' ? 'VERIFIED SPECIFICATION' : 'ESPECIFICAÇÃO VERIFICADA'}
                </span>
                <p className="font-sans text-xs text-travertine leading-relaxed">
                  {locale === 'en'
                    ? 'All photography depicts actual LIVE HOTEL architectural spaces. Room category designations and seasonal rates are provided directly upon inquiry.'
                    : 'Todas as fotografias retratam espaços reais do LIVE HOTEL. Categorias específicas e tarifas sazonais são fornecidas diretamente mediante consulta.'}
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 Columns: Narrative & Verified Material Details */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-panel/80 border border-accent/20 p-8 md:p-10 rounded-sm">
            <div className="flex flex-col gap-6">
              <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
                {activeZone.tag[locale]}
              </span>

              <h3
                className="font-serif text-3xl md:text-4xl text-ivory font-normal leading-tight"
                style={{ maxWidth: '22ch' }}
              >
                {activeZone.title[locale]}
              </h3>

              <p
                className="font-sans font-light text-base text-travertine leading-relaxed"
                style={{ maxWidth: '50ch' }}
              >
                {activeZone.description[locale]}
              </p>

              <div className="pt-4 border-t border-accent/15 flex flex-col gap-3.5">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ivory/80">
                  {locale === 'en' ? 'ARCHITECTURAL & MATERIAL DETAILS' : 'DETALHES ARQUITETÓNICOS E MATERIAIS'}
                </span>
                <ul className="flex flex-col gap-3">
                  {activeZone.details[locale].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-baseline gap-3 font-sans text-sm text-travertine"
                    >
                      <span className="font-mono text-[10px] text-accent">0{idx + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Editable Accommodation Configuration Placeholder + Booking CTA */}
            <div className="mt-10 pt-6 border-t border-accent/15 flex flex-col gap-5">
              <div className="p-4 rounded-sm bg-surface/70 border border-accent/15 flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-accent">
                  {locale === 'en'
                    ? '[VERIFIED SUITE CONFIGURATION PLACEHOLDER]'
                    : '[CONFIGURAÇÃO DE SUÍTE VERIFICADA · EDITÁVEL]'}
                </span>
                <span className="font-sans text-xs text-travertine">
                  {locale === 'en'
                    ? 'Ocean-View Suite · Private Balcony · Travertine Spa Bathroom · [Insert Official Suite Tariff / Availability Link]'
                    : 'Suíte Vista Mar · Varanda Privativa · Casa de Banho Spa em Travertino · [Inserir Tarifa / Disponibilidade Oficial]'}
                </span>
              </div>

              <a
                href="#booking"
                className="btn w-full inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-canvas font-mono text-xs uppercase tracking-[0.2em] font-medium py-4 px-6 rounded-sm transition-all duration-300"
              >
                <span>{locale === 'en' ? 'INQUIRE ABOUT ACCOMMODATION' : 'CONSULTAR DISPONIBILIDADE'}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
