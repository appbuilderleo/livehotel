import React, { useState } from 'react';
import { HOTEL_CONFIG, Locale } from '../data/hotelData';
import {
  Calendar,
  Users,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  MessageSquare,
  HelpCircle,
} from 'lucide-react';

interface BookingSectionProps {
  locale: Locale;
}

const GUEST_FAQS = [
  {
    q: {
      en: 'How are reservations and suite preferences confirmed?',
      pt: 'Como são confirmadas as reservas e as preferências de suíte?',
    },
    a: {
      en: 'Submit your preferred dates and party size below. Our reception desk responds directly with verified suite availability, current seasonal tariffs, and tailored arrival arrangements.',
      pt: 'Indique as datas pretendidas e o número de hóspedes abaixo. A nossa equipa de receção responde diretamente com a disponibilidade verificada, tarifas sazonais e detalhes de chegada.',
    },
  },
  {
    q: {
      en: 'Can dining and wellness rituals be arranged before arrival?',
      pt: 'As experiências gastronómicas e de spa podem ser reservadas antes da chegada?',
    },
    a: {
      en: 'Yes. Private candlelit beach dining, oceanfront terrace breakfast tables, and couples spa sessions can be noted in your reservation request so our hosts prepare your schedule in advance.',
      pt: 'Sim. Jantares privados na praia à luz das velas, pequeno-almoço no terraço frente ao mar e sessões de spa podem ser incluídos no seu pedido de reserva.',
    },
  },
  {
    q: {
      en: 'What is included in the ocean-view suite configuration?',
      pt: 'O que está incluído na configuração da suíte com vista para o mar?',
    },
    a: {
      en: 'Each documented ocean-view suite features a king bed facing the sea, a private covered teak balcony with loungers, and a travertine bathroom with a freestanding stone soaking tub and walk-in rain shower.',
      pt: 'Cada suíte documentada inclui cama King de frente para o mar, varanda privativa coberta em teca com espreguiçadeiras e casa de banho em travertino com banheira esculpida em pedra.',
    },
  },
];

export const BookingSection: React.FC<BookingSectionProps> = ({ locale }) => {
  const [checkIn, setCheckIn] = useState<string>('2026-12-12');
  const [checkOut, setCheckOut] = useState<string>('2026-12-16');
  const [guests, setGuests] = useState<number>(2);
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [activeMode, setActiveMode] = useState<'book' | 'contact'>('book');

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const diff = Math.round((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const nights = calculateNights();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="booking"
      aria-labelledby="booking-heading"
      className="relative z-10 py-28 md:py-36 bg-panel/80 border-b border-accent/20"
    >
      <div className="max-w-[90rem] mx-auto px-6 md:px-12 lg:px-20">
        {/* Section Header + Primary / Secondary CTA Mode Switch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end pb-16 border-b border-accent/15">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-accent">
              {locale === 'en'
                ? 'FINAL CHAPTER · YOUR STAY BEGINS HERE'
                : 'CAPÍTULO FINAL · A SUA ESTADIA COMEÇA AQUI'}
            </span>
            <h2
              id="booking-heading"
              className="font-serif text-4xl sm:text-5xl md:text-6xl font-normal text-ivory tracking-tight leading-[1.05]"
              style={{ maxWidth: '18ch' }}
            >
              {locale === 'en'
                ? 'Your stay begins here.'
                : 'A sua estadia começa aqui.'}
            </h2>
            <p
              className="font-sans font-light text-base md:text-lg text-travertine leading-relaxed"
              style={{ maxWidth: '52ch' }}
            >
              {locale === 'en'
                ? 'Reserve your ocean-view suite or speak directly with our reception desk to tailor your arrival, dining, and wellness itinerary.'
                : 'Reserve a sua suíte com vista para o mar ou fale diretamente com a nossa receção para personalizar a sua chegada, gastronomia e bem-estar.'}
            </p>
          </div>

          {/* Primary CTA: BOOK YOUR STAY & Secondary CTA: CONTACT THE HOTEL */}
          <div className="lg:col-span-5 flex flex-wrap items-center lg:justify-end gap-4">
            <button
              type="button"
              id="primary-book-cta"
              onClick={() => {
                setActiveMode('book');
                setSubmitted(false);
                document
                  .getElementById('booking-inquiry-panel')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`btn inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-sm font-mono text-xs uppercase tracking-[0.2em] font-medium transition-all duration-300 ${
                activeMode === 'book'
                  ? 'bg-accent text-canvas shadow-lg'
                  : 'bg-canvas border border-accent/40 text-ivory hover:border-accent'
              }`}
            >
              <span>{locale === 'en' ? 'BOOK YOUR STAY' : 'BOOK YOUR STAY'}</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              id="secondary-contact-cta"
              onClick={() => {
                setActiveMode('contact');
                setSubmitted(false);
                document
                  .getElementById('booking-inquiry-panel')
                  ?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              className={`btn inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-sm font-mono text-xs uppercase tracking-[0.2em] transition-all duration-300 border ${
                activeMode === 'contact'
                  ? 'bg-accent text-canvas border-accent font-medium'
                  : 'bg-canvas/80 text-ivory border-accent/35 hover:border-accent'
              }`}
            >
              <MessageSquare className="w-4 h-4 text-accent" />
              <span>{locale === 'en' ? 'CONTACT THE HOTEL' : 'CONTACT THE HOTEL'}</span>
            </button>
          </div>
        </div>

        {/* Main Split Grid: Reservation Form (Left 7 Cols) + Verified Contact & Property Info (Right 5 Cols) */}
        <div
          id="booking-inquiry-panel"
          className="pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
        >
          {/* Left 7 Columns: Interactive Reservation / Contact Form */}
          <div className="lg:col-span-7 bg-canvas border border-accent/25 rounded-sm p-8 sm:p-10 md:p-12 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-7">
                <div className="flex items-center justify-between border-b border-accent/15 pb-5">
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
                      {activeMode === 'book'
                        ? locale === 'en'
                          ? 'DIRECT RESERVATION REQUEST'
                          : 'PEDIDO DIRETO DE RESERVA'
                        : locale === 'en'
                        ? 'DIRECT CONCIERGE INQUIRY'
                        : 'CONTACTO DIRETO COM A RECEÇÃO'}
                    </span>
                    <h3 className="font-serif text-3xl text-ivory mt-1">
                      {activeMode === 'book'
                        ? locale === 'en'
                          ? 'Select Your Dates & Preferences'
                          : 'Selecione as Datas e Preferências'
                        : locale === 'en'
                        ? 'Message the Reception Sanctuary'
                        : 'Envie uma Mensagem à Receção'}
                    </h3>
                  </div>
                  <span className="chip-scrim px-3 py-1 rounded-full font-mono text-xs text-accent">
                    {nights} {nights === 1 ? (locale === 'en' ? 'Night' : 'Noite') : locale === 'en' ? 'Nights' : 'Noites'}
                  </span>
                </div>

                {/* Date & Guest Pickers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="checkin-date"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-travertine flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {locale === 'en' ? 'Check-In' : 'Check-In'}
                    </label>
                    <input
                      id="checkin-date"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      required
                      className="w-full bg-panel border border-accent/25 rounded-sm px-4 py-3 font-mono text-xs text-ivory focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="checkout-date"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-travertine flex items-center gap-1.5"
                    >
                      <Calendar className="w-3.5 h-3.5 text-accent" />
                      {locale === 'en' ? 'Check-Out' : 'Check-Out'}
                    </label>
                    <input
                      id="checkout-date"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      required
                      className="w-full bg-panel border border-accent/25 rounded-sm px-4 py-3 font-mono text-xs text-ivory focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="guests-count"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-travertine flex items-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-accent" />
                      {locale === 'en' ? 'Guests' : 'Hóspedes'}
                    </label>
                    <select
                      id="guests-count"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-panel border border-accent/25 rounded-sm px-4 py-3 font-mono text-xs text-ivory focus:border-accent"
                    >
                      {[1, 2, 3, 4].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? (locale === 'en' ? 'Guest' : 'Hóspede') : locale === 'en' ? 'Guests' : 'Hóspedes'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Guest Identity Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="guest-name"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-travertine"
                    >
                      {locale === 'en' ? 'Full Name' : 'Nome Completo'}
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      required
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder={locale === 'en' ? 'Your full name' : 'O seu nome completo'}
                      className="w-full bg-panel border border-accent/25 rounded-sm px-4 py-3 font-sans text-sm text-ivory placeholder:text-travertine/40 focus:border-accent"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="guest-email"
                      className="font-mono text-[11px] uppercase tracking-[0.18em] text-travertine"
                    >
                      {locale === 'en' ? 'Email Address' : 'Endereço de Email'}
                    </label>
                    <input
                      id="guest-email"
                      type="email"
                      required
                      value={guestEmail}
                      onChange={(e) => setGuestEmail(e.target.value)}
                      placeholder={locale === 'en' ? 'name@domain.com' : 'nome@dominio.com'}
                      className="w-full bg-panel border border-accent/25 rounded-sm px-4 py-3 font-sans text-sm text-ivory placeholder:text-travertine/40 focus:border-accent"
                    />
                  </div>
                </div>

                {/* Special Requests / Bespoke Notes */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="guest-notes"
                    className="font-mono text-[11px] uppercase tracking-[0.18em] text-travertine"
                  >
                    {locale === 'en'
                      ? 'Arrival & Experience Preferences (Optional)'
                      : 'Preferências de Chegada e Experiências (Opcional)'}
                  </label>
                  <textarea
                    id="guest-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder={
                      locale === 'en'
                        ? 'Ocean-view suite preference, private beach dinner, spa treatment, or airport transfer...'
                        : 'Preferência de suíte vista mar, jantar privado na praia, ritual de spa ou transporte...'
                    }
                    className="w-full bg-panel border border-accent/25 rounded-sm px-4 py-3 font-sans text-sm text-ivory placeholder:text-travertine/40 focus:border-accent"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    type="submit"
                    id="submit-reservation-btn"
                    className="btn inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-canvas font-mono text-xs uppercase tracking-[0.22em] font-medium px-8 py-4 rounded-sm transition-all duration-300"
                  >
                    <span>
                      {activeMode === 'book'
                        ? locale === 'en'
                          ? 'BOOK YOUR STAY'
                          : 'BOOK YOUR STAY'
                        : locale === 'en'
                        ? 'CONTACT THE HOTEL'
                        : 'CONTACT THE HOTEL'}
                    </span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>

                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-travertine/80">
                    {HOTEL_CONFIG.bookingChannelPlaceholder.label[locale]}
                  </span>
                </div>
              </form>
            ) : (
              /* Confirmation State */
              <div
                id="booking-confirmation-state"
                role="status"
                aria-live="polite"
                className="py-8 flex flex-col items-start gap-6"
              >
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/15 border border-accent/40 text-accent font-mono text-xs uppercase tracking-[0.2em]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {locale === 'en'
                      ? 'RESERVATION INQUIRY PREPARED'
                      : 'PEDIDO DE RESERVA PREPARADO'}
                  </span>
                </div>

                <h3 className="font-serif text-3xl md:text-4xl text-ivory font-normal">
                  {locale === 'en'
                    ? `Thank you, ${guestName || 'Guest'}. Your request is ready.`
                    : `Obrigado, ${guestName || 'Hóspede'}. O seu pedido está pronto.`}
                </h3>

                <p className="font-sans text-sm md:text-base text-travertine leading-relaxed max-w-xl">
                  {locale === 'en'
                    ? `We have recorded your inquiry for ${nights} night(s) (${checkIn} to ${checkOut}) for ${guests} guest(s). Because this static preview uses editable channel placeholders until your live booking engine URL is connected, your inquiry summary is displayed below.`
                    : `Registámos o seu pedido para ${nights} noite(s) (${checkIn} a ${checkOut}) para ${guests} hóspede(s). Como esta versão utiliza marcadores editáveis até à ligação do motor de reservas oficial, o resumo encontra-se abaixo.`}
                </p>

                <div className="w-full p-5 rounded-sm bg-panel border border-accent/20 font-mono text-xs text-ivory/90 flex flex-col gap-2">
                  <div>
                    <span className="text-accent">GUEST:</span> {guestName} ({guestEmail})
                  </div>
                  <div>
                    <span className="text-accent">DATES:</span> {checkIn} → {checkOut} ({nights}{' '}
                    {locale === 'en' ? 'nights' : 'noites'})
                  </div>
                  <div>
                    <span className="text-accent">PARTY:</span> {guests}{' '}
                    {locale === 'en' ? 'guest(s)' : 'hóspede(s)'}
                  </div>
                  {notes && (
                    <div>
                      <span className="text-accent">NOTES:</span> {notes}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="btn px-6 py-3 rounded-sm border border-accent/40 hover:border-accent font-mono text-xs uppercase tracking-[0.18em] text-ivory"
                >
                  {locale === 'en' ? 'MODIFY DATES OR DETAILS' : 'ALTERAR DATAS OU DETALHES'}
                </button>
              </div>
            )}
          </div>

          {/* Right 5 Columns: Editable Contact Placeholders & Guest FAQ */}
          <div id="contact" className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-canvas border border-accent/20 rounded-sm p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-1.5 border-b border-accent/15 pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
                  {locale === 'en'
                    ? 'VERIFIED PROPERTY CHANNELS · EDITABLE PLACEHOLDERS'
                    : 'CANAIS OFICIAIS DO HOTEL · MARCADORES EDITÁVEIS'}
                </span>
                <h3 className="font-serif text-2xl text-ivory">
                  {locale === 'en'
                    ? 'Location & Direct Contact'
                    : 'Localização e Contacto Direto'}
                </h3>
              </div>

              <div className="flex flex-col gap-4 font-sans text-sm text-travertine">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ivory">
                      {locale === 'en' ? 'Property Location' : 'Localização'}
                    </div>
                    <div className="mt-0.5">{HOTEL_CONFIG.locationPlaceholder[locale]}</div>
                    <div className="text-xs text-travertine/75 mt-0.5">
                      {HOTEL_CONFIG.contactPlaceholders.address}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ivory">
                      {locale === 'en' ? 'Reservations Desk' : 'Balcão de Reservas'}
                    </div>
                    <div className="mt-0.5 font-mono text-xs text-accent">
                      {HOTEL_CONFIG.contactPlaceholders.email}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <div>
                    <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-ivory">
                      {locale === 'en' ? 'Telephone & Concierge' : 'Telefone e Concierge'}
                    </div>
                    <div className="mt-0.5 font-mono text-xs">
                      {HOTEL_CONFIG.contactPlaceholders.phone}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guest FAQ Block */}
            <div className="bg-canvas border border-accent/20 rounded-sm p-8 flex flex-col gap-5">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
                <HelpCircle className="w-4 h-4" />
                <span>
                  {locale === 'en' ? 'ESSENTIAL GUEST INFORMATION' : 'INFORMAÇÕES ESSENCIAIS'}
                </span>
              </div>

              <div className="flex flex-col divide-y divide-accent/15">
                {GUEST_FAQS.map((item, idx) => (
                  <div key={idx} className="py-4 first:pt-1 last:pb-0 flex flex-col gap-1.5">
                    <h4 className="font-serif text-lg text-ivory font-normal">
                      {item.q[locale]}
                    </h4>
                    <p className="font-sans text-xs text-travertine leading-relaxed">
                      {item.a[locale]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
