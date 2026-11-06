import React, { useState, useEffect } from 'react';
import { CHAPTERS_DATA, Locale } from '../data/hotelData';
import { Menu, X, Globe, ArrowUpRight } from 'lucide-react';

interface HotelNavigationProps {
  locale: Locale;
  onToggleLocale: (next: Locale) => void;
  activeChapterId: string;
  globalScrollProgress: number;
}

export const HotelNavigation: React.FC<HotelNavigationProps> = ({
  locale,
  onToggleLocale,
  activeChapterId,
  globalScrollProgress,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 64;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const activeChapter =
    CHAPTERS_DATA.find((c) => c.id === activeChapterId) || CHAPTERS_DATA[0];

  const navLinks = [
    {
      href: '#chapter-01',
      label: locale === 'en' ? 'Story' : 'Jornada',
    },
    {
      href: '#accommodation',
      label: locale === 'en' ? 'Accommodation' : 'Acomodações',
    },
    {
      href: '#experiences',
      label: locale === 'en' ? 'Experiences' : 'Experiências',
    },
    {
      href: '#gallery',
      label: locale === 'en' ? 'Gallery' : 'Galeria',
    },
    {
      href: '#contact',
      label: locale === 'en' ? 'Contact' : 'Contacto',
    },
  ];

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-canvas/85 backdrop-blur-md border-b border-accent/20 py-3.5 shadow-2xl'
            : 'bg-transparent py-5'
        }`}
      >
        {/* Top Global Scroll Progress Hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] bg-ivory/5 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="h-full bg-accent origin-left transition-transform duration-150"
            style={{ transform: `scaleX(${Math.max(0, Math.min(1, globalScrollProgress)).toFixed(3)})` }}
          />
        </div>

        <div className="max-w-[92rem] mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-3 sm:gap-4">
          {/* Brand Logo: Hand-drawn SVG Golden Fan-Palm Crest + LIVE HOTEL Wordmark */}
          <a
            href="#chapter-01"
            className="group flex items-center gap-3 sm:gap-3.5 text-ivory focus:outline-none shrink-0"
            aria-label="LIVE HOTEL Home"
          >
            <span className="relative flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-accent/40 bg-panel/70 group-hover:border-accent transition-colors duration-300 shrink-0">
              <svg
                viewBox="0 0 48 48"
                className="w-5 h-5 sm:w-6 sm:h-6 text-accent transition-transform duration-500 group-hover:scale-105"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M24 38V10M24 38L16 12.5M24 38L32 12.5M24 38L10 18.5M24 38L38 18.5M24 38L7 26.5M24 38L41 26.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="38" r="2.4" fill="currentColor" />
              </svg>
            </span>
            <div className="flex flex-col whitespace-nowrap">
              <span className="font-serif text-lg sm:text-xl md:text-2xl tracking-[0.22em] font-normal leading-none text-ivory">
                LIVE HOTEL
              </span>
              <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.26em] text-accent mt-1">
                {locale === 'en' ? 'Coastal Sanctuary' : 'Santuário Costeiro'}
              </span>
            </div>
          </a>

          {/* Active Chapter Readout Pill (Desktop Center-Left) */}
          <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-accent/20 bg-panel/60 font-mono text-[10px] uppercase tracking-[0.18em] text-travertine">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span>{activeChapter.navLabel[locale]}</span>
          </div>

          {/* Primary Navigation Links */}
          <nav
            role="navigation"
            aria-label={locale === 'en' ? 'Main Navigation' : 'Navegação Principal'}
            className="hidden lg:flex items-center gap-8"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-mono text-xs uppercase tracking-[0.18em] text-ivory/85 hover:text-accent transition-colors duration-300 py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-accent after:origin-right after:scale-x-0 hover:after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Actions: Language Switcher + Booking CTA + Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onToggleLocale(locale === 'en' ? 'pt' : 'en')}
              aria-label={
                locale === 'en'
                  ? 'Switch language to Portuguese'
                  : 'Mudar idioma para Inglês'
              }
              className="touch-target inline-flex items-center gap-1.5 px-3 py-2 rounded-sm border border-accent/25 bg-panel/60 hover:border-accent text-ivory font-mono text-[11px] uppercase tracking-[0.16em] transition-colors duration-300"
            >
              <Globe className="w-3.5 h-3.5 text-accent" />
              <span>{locale.toUpperCase()}</span>
            </button>

            <a
              href="#booking"
              className="btn hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-canvas font-mono text-[11px] uppercase tracking-[0.2em] font-medium px-5 py-2.5 rounded-sm transition-all duration-300"
            >
              <span>{locale === 'en' ? 'BOOK YOUR STAY' : 'RESERVAR'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label={
                mobileMenuOpen
                  ? locale === 'en'
                    ? 'Close navigation menu'
                    : 'Fechar menu'
                  : locale === 'en'
                  ? 'Open navigation menu'
                  : 'Abrir menu'
              }
              className="touch-target lg:hidden inline-flex items-center justify-center p-2.5 rounded-sm border border-accent/30 bg-panel/80 text-ivory hover:border-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={locale === 'en' ? 'Mobile Navigation' : 'Menu Móvel'}
          className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-xl flex flex-col justify-between px-6 pt-28 pb-10 lg:hidden"
        >
          <div className="flex flex-col gap-6">
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-accent border-b border-accent/20 pb-3">
              {locale === 'en' ? 'NARRATIVE CHAPTERS & SECTIONS' : 'CAPÍTULOS E SECÇÕES'}
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-serif text-3xl text-ivory hover:text-accent transition-colors py-1"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 border-t border-accent/15 flex flex-col gap-2.5">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-travertine">
                {locale === 'en' ? 'DIRECT CHAPTER ACCESS' : 'ACESSO DIRETO AOS CAPÍTULOS'}
              </span>
              <div className="grid grid-cols-1 gap-2">
                {CHAPTERS_DATA.map((ch) => (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`font-mono text-xs uppercase tracking-[0.16em] px-3 py-2 rounded-sm border ${
                      ch.id === activeChapterId
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-accent/15 text-travertine hover:text-ivory'
                    }`}
                  >
                    {ch.navLabel[locale]}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#booking"
              onClick={() => setMobileMenuOpen(false)}
              className="btn w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-canvas font-mono text-xs uppercase tracking-[0.22em] font-medium py-4 rounded-sm"
            >
              <span>{locale === 'en' ? 'BOOK YOUR STAY' : 'RESERVE A SUA ESTADIA'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
