import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES, GalleryPhoto, Locale } from '../data/hotelData';
import { ChevronLeft, ChevronRight, X, Maximize2, Camera } from 'lucide-react';

interface HotelGalleryProps {
  locale: Locale;
  externalSelectedPhoto?: { src: string; title: string; caption: string } | null;
  onClearExternalPhoto?: () => void;
}

type CategoryFilter = 'all' | GalleryPhoto['category'];

export const HotelGallery: React.FC<HotelGalleryProps> = ({
  locale,
  externalSelectedPhoto,
  onClearExternalPhoto,
}) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const filteredPhotos =
    activeCategory === 'all'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  // Open lightbox if an external section requested full-screen photo viewing
  useEffect(() => {
    if (!externalSelectedPhoto) return;
    const matchIdx = GALLERY_IMAGES.findIndex((p) => p.src === externalSelectedPhoto.src);
    if (matchIdx !== -1) {
      setActiveCategory('all');
      setLightboxIndex(matchIdx);
    }
  }, [externalSelectedPhoto]);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    onClearExternalPhoto?.();
  }, [onClearExternalPhoto]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? null : (prev + 1) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null
        ? null
        : (prev - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  }, [filteredPhotos.length]);

  // Keyboard accessibility for Lightbox (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        showNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        showPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, closeLightbox, showNext, showPrev]);

  const categories: { id: CategoryFilter; label: Record<Locale, string>; count: number }[] = [
    {
      id: 'all',
      label: { en: 'Complete Collection', pt: 'Coleção Completa' },
      count: GALLERY_IMAGES.length,
    },
    {
      id: 'architecture',
      label: { en: 'Architecture & Grounds', pt: 'Arquitetura e Exterior' },
      count: GALLERY_IMAGES.filter((i) => i.category === 'architecture').length,
    },
    {
      id: 'pavilion',
      label: { en: 'Reception & Pavilion', pt: 'Receção e Pavilhão' },
      count: GALLERY_IMAGES.filter((i) => i.category === 'pavilion').length,
    },
    {
      id: 'accommodation',
      label: { en: 'Suites & Terraces', pt: 'Suítes e Terraços' },
      count: GALLERY_IMAGES.filter((i) => i.category === 'accommodation').length,
    },
    {
      id: 'experiences',
      label: { en: 'Pool, Spa & Dining', pt: 'Piscina, Spa e Gastronomia' },
      count: GALLERY_IMAGES.filter((i) => i.category === 'experiences').length,
    },
  ];

  const activePhoto =
    lightboxIndex !== null && filteredPhotos[lightboxIndex]
      ? filteredPhotos[lightboxIndex]
      : null;

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="relative z-10 py-28 md:py-36 bg-canvas border-b border-accent/15"
    >
      <div className="max-w-[92rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Gallery Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-accent/15">
          <div className="flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent flex items-center gap-2">
              <Camera className="w-4 h-4" />
              {locale === 'en'
                ? 'AUTHENTIC VISUAL ARCHIVE · 27 PHOTOGRAPHS'
                : 'ARQUIVO VISUAL AUTÊNTICO · 27 FOTOGRAFIAS'}
            </span>
            <h2
              id="gallery-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight leading-[1.06]"
              style={{ maxWidth: '20ch' }}
            >
              {locale === 'en'
                ? 'An editorial study of light, stone, and water.'
                : 'Um estudo editorial de luz, pedra e água.'}
            </h2>
          </div>

          <p
            className="font-sans font-light text-base text-travertine leading-relaxed"
            style={{ maxWidth: '46ch' }}
          >
            {locale === 'en'
              ? 'Explore the complete photographic collection of LIVE HOTEL. Select any frame to inspect in full screen with keyboard or touch navigation.'
              : 'Explore a coleção fotográfica completa do LIVE HOTEL. Selecione qualquer imagem para ver em ecrã inteiro com navegação por teclado ou toque.'}
          </p>
        </div>

        {/* Category Filter Bar */}
        <div
          role="tablist"
          aria-label={locale === 'en' ? 'Gallery Categories' : 'Categorias da Galeria'}
          className="pt-10 pb-12 flex flex-wrap items-center gap-2.5"
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                type="button"
                aria-selected={isSelected}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setLightboxIndex(null);
                }}
                className={`touch-target px-4 py-2.5 rounded-sm font-mono text-xs uppercase tracking-[0.16em] transition-all duration-300 border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-accent text-canvas border-accent font-medium'
                    : 'bg-panel/70 text-travertine border-accent/20 hover:border-accent/60 hover:text-ivory'
                }`}
              >
                <span>{cat.label[locale]}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-canvas/20 text-canvas' : 'bg-surface text-accent'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Asymmetric Editorial Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8">
          {filteredPhotos.map((photo, idx) => {
            // Asymmetric 12-column editorial span pattern
            let colSpanClass = 'md:col-span-4';
            let aspectClass = 'aspect-[4/3]';

            if (photo.aspect === 'feature') {
              colSpanClass = 'md:col-span-8';
              aspectClass = 'aspect-[16/10]';
            } else if (photo.aspect === 'wide') {
              colSpanClass = 'md:col-span-6';
              aspectClass = 'aspect-[16/10]';
            } else {
              colSpanClass = 'md:col-span-4';
              aspectClass = 'aspect-[4/3]';
            }

            return (
              <figure
                key={photo.id}
                className={`${colSpanClass} group relative overflow-hidden rounded-sm border border-accent/15 bg-panel flex flex-col justify-between`}
              >
                <button
                  type="button"
                  onClick={() => setLightboxIndex(idx)}
                  aria-label={`${locale === 'en' ? 'Open photograph' : 'Abrir fotografia'}: ${
                    photo.title[locale]
                  }`}
                  className={`relative w-full ${aspectClass} overflow-hidden text-left focus:outline-none block`}
                >
                  <img
                    src={photo.src}
                    alt={photo.caption[locale]}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas/85 via-canvas/15 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Top Index Chip */}
                  <div className="absolute top-3.5 left-3.5 chip-scrim px-2.5 py-1 rounded-full font-mono text-[10px] uppercase tracking-[0.18em] text-accent">
                    ARCHIVE #{String(photo.index).padStart(2, '0')}
                  </div>

                  {/* Expand Icon */}
                  <div className="absolute top-3.5 right-3.5 chip-scrim p-2 rounded-full text-ivory opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Maximize2 className="w-3.5 h-3.5 text-accent" />
                  </div>

                  {/* Bottom Editorial Caption Overlay */}
                  <figcaption className="absolute bottom-0 left-0 right-0 p-5 flex flex-col gap-1">
                    <span className="font-serif text-xl md:text-2xl text-ivory font-normal">
                      {photo.title[locale]}
                    </span>
                    <span className="font-sans text-xs text-travertine line-clamp-2">
                      {photo.caption[locale]}
                    </span>
                  </figcaption>
                </button>
              </figure>
            );
          })}
        </div>
      </div>

      {/* Full-Screen Accessible Lightbox Modal */}
      {activePhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title[locale]}
          onTouchStart={(e) => setTouchStartX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStartX === null) return;
            const deltaX = e.changedTouches[0].clientX - touchStartX;
            if (deltaX > 50) showPrev();
            else if (deltaX < -50) showNext();
            setTouchStartX(null);
          }}
          className="fixed inset-0 z-50 bg-canvas/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Lightbox Top Bar */}
          <div className="flex items-center justify-between gap-4 border-b border-accent/20 pb-4">
            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-accent">
              <span>
                {String(lightboxIndex + 1).padStart(2, '0')} /{' '}
                {String(filteredPhotos.length).padStart(2, '0')}
              </span>
              <span className="text-ivory/30">·</span>
              <span className="text-ivory">{activePhoto.title[locale]}</span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label={locale === 'en' ? 'Close full screen viewer' : 'Fechar visualização'}
              className="touch-target chip-scrim px-4 py-2 rounded-sm font-mono text-xs uppercase tracking-[0.18em] text-ivory hover:border-accent flex items-center gap-2"
            >
              <span>ESC</span>
              <X className="w-4 h-4 text-accent" />
            </button>
          </div>

          {/* Center Image Stage + Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={showPrev}
              aria-label={locale === 'en' ? 'Previous photograph' : 'Fotografia anterior'}
              className="touch-target absolute left-2 sm:left-4 z-20 chip-scrim p-3.5 rounded-full text-ivory hover:border-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-accent" />
            </button>

            <img
              src={activePhoto.src}
              alt={activePhoto.caption[locale]}
              className="max-h-[74vh] max-w-[88vw] object-contain rounded-sm border border-accent/25 shadow-2xl"
            />

            <button
              type="button"
              onClick={showNext}
              aria-label={locale === 'en' ? 'Next photograph' : 'Próxima fotografia'}
              className="touch-target absolute right-2 sm:right-4 z-20 chip-scrim p-3.5 rounded-full text-ivory hover:border-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-accent" />
            </button>
          </div>

          {/* Lightbox Caption Footer */}
          <div className="border-t border-accent/20 pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-sans text-sm text-travertine max-w-3xl">
              {activePhoto.caption[locale]}
            </p>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {locale === 'en'
                ? 'USE ARROW KEYS OR SWIPE TO NAVIGATE'
                : 'USE AS SETAS DO TECLADO OU DESLIZE PARA NAVEGAR'}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
