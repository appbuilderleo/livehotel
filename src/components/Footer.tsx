import React from 'react';
import { CHAPTERS_DATA, HOTEL_CONFIG, Locale } from '../data/hotelData';
import { ArrowUp, Globe } from 'lucide-react';

interface FooterProps {
  locale: Locale;
  onToggleLocale: (next: Locale) => void;
}

export const Footer: React.FC<FooterProps> = ({ locale, onToggleLocale }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      role="contentinfo"
      className="relative z-10 bg-canvas pt-24 pb-14 border-t border-accent/20 text-travertine"
    >
      <div className="max-w-[92rem] mx-auto px-6 md:px-12 lg:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-accent/15">
          {/* Brand Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-3.5">
              <span className="flex items-center justify-center w-11 h-11 rounded-full border border-accent/45 bg-panel">
                <svg
                  viewBox="0 0 48 48"
                  className="w-6 h-6 text-accent"
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
              <div>
                <div className="font-serif text-2xl tracking-[0.22em] text-ivory">
                  {HOTEL_CONFIG.brandName}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.26em] text-accent">
                  {HOTEL_CONFIG.brandTagline[locale]}
                </div>
              </div>
            </div>

            <p
              className="font-sans font-light text-sm text-travertine leading-relaxed"
              style={{ maxWidth: '40ch' }}
            >
              {locale === 'en'
                ? 'An architectural coastal sanctuary where chiseled stone, warm tropical timber, and the open sea come together in quiet harmony.'
                : 'Um santuário costeiro arquitetónico onde a pedra esculpida, a madeira tropical e o mar aberto se unem em harmonia.'}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={() => onToggleLocale(locale === 'en' ? 'pt' : 'en')}
                className="touch-target inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-accent/30 bg-panel hover:border-accent font-mono text-xs uppercase tracking-[0.16em] text-ivory transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-accent" />
                <span>{locale === 'en' ? 'PORTUGUÊS (PT)' : 'ENGLISH (EN)'}</span>
              </button>
            </div>
          </div>

          {/* Narrative Chapters Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {locale === 'en' ? 'CINEMATIC CHAPTERS' : 'CAPÍTULOS DA JORNADA'}
            </span>
            <ul className="flex flex-col gap-2.5">
              {CHAPTERS_DATA.map((ch) => (
                <li key={ch.id}>
                  <a
                    href={`#${ch.id}`}
                    className="font-mono text-xs uppercase tracking-[0.16em] text-travertine hover:text-accent transition-colors flex items-center gap-2.5"
                  >
                    <span className="text-accent">{ch.chapterNumber}</span>
                    <span>{ch.chapterTitle[locale]}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation & Social Placeholders Column (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              {locale === 'en' ? 'EXPLORE & CONNECT' : 'EXPLORAR E CONTACTAR'}
            </span>
            <div className="grid grid-cols-2 gap-4">
              <ul className="flex flex-col gap-2.5 font-sans text-sm">
                <li>
                  <a href="#accommodation" className="hover:text-ivory transition-colors">
                    {locale === 'en' ? 'Accommodation' : 'Acomodações'}
                  </a>
                </li>
                <li>
                  <a href="#experiences" className="hover:text-ivory transition-colors">
                    {locale === 'en' ? 'Experiences' : 'Experiências'}
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="hover:text-ivory transition-colors">
                    {locale === 'en' ? 'Photo Archive (27)' : 'Galeria (27)'}
                  </a>
                </li>
                <li>
                  <a href="#booking" className="hover:text-ivory transition-colors">
                    {locale === 'en' ? 'Reservations' : 'Reservas'}
                  </a>
                </li>
              </ul>

              <ul className="flex flex-col gap-2.5 font-mono text-xs">
                {HOTEL_CONFIG.socialPlaceholders.map((soc) => (
                  <li key={soc.name}>
                    <a
                      href={soc.href}
                      className="text-travertine hover:text-accent transition-colors block"
                    >
                      <span className="text-ivory block">{soc.name}</span>
                      <span className="text-[10px] text-travertine/70">{soc.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs text-travertine/80">
          <div>
            © {new Date().getFullYear()} {HOTEL_CONFIG.brandName}.{' '}
            {locale === 'en'
              ? 'All visual assets are authentic property productions.'
              : 'Todos os ativos visuais são produções autênticas da propriedade.'}
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            aria-label={locale === 'en' ? 'Back to top' : 'Voltar ao topo'}
            className="touch-target inline-flex items-center gap-2 text-accent hover:text-ivory uppercase tracking-[0.2em] transition-colors"
          >
            <span>{locale === 'en' ? 'RETURN TO OPENING' : 'VOLTAR AO INÍCIO'}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
