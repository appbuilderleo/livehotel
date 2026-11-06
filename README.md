# LIVE HOTEL · Coastal Sanctuary & Cinematic Digital Experience

An art-directed, scroll-driven hospitality experience built for **LIVE HOTEL**. Designed around five choreographed video chapters, synchronized GSAP ScrollTrigger timelines, masked editorial typography, a 27-photograph visual archive, and an interactive Golden Hour atmosphere ritual.

---

## 1. Narrative Architecture & Five Video Chapters

Each chapter is powered by an isolated **GSAP 3 + ScrollTrigger** pinned timeline (`ScrollStorySection.tsx`) synchronized with scrub-encoded HTML5 video (`-g 8 -keyint_min 8`), a deadlock-safe seek gate (`ScrollVideo.tsx`), a pre-extracted frame-sequence `<canvas>` fallback, and a four-layer legibility scrim system:

1. **Chapter 01 · The First Impression (`cena1.mp4`, 9.96s)**
   - *Visual Journey*: Twilight approach across the black reflecting pool, under the timber-and-limestone porte-cochere, through the double-height glass portal into the luminous reception foyer.
2. **Chapter 02 · The Arrival (`cena2.mp4`, 9.96s)**
   - *Visual Journey*: Personal welcome at the chiseled stone reception counter beneath the backlit golden palm crest (*"Every great stay begins with a welcome."*), transitioning past vertical teak louvers into the grand cathedral-vaulted lounge.
3. **Chapter 03 · The Art of Staying (`cena4.mp4`, 7.93s)**
   - *Visual Journey*: Inside the Ocean-View Suite bedroom with hand-cut limestone walls and organic linens, gliding through sheer curtains onto the private oceanfront teak terrace.
   - *Followed by*: **Architectural Accommodation Study (`AccommodationSection.tsx`)** detailing the Bedroom Pavilion, Private Oceanfront Balcony, and Travertine Spa Bathroom.
4. **Chapter 04 · Experiences Beyond the Room (`cena2.1.mp4`, 7.93s)**
   - *Visual Journey*: From attentive concierge hospitality past warm interior lounge seating and sculpted timber pillars into the sunlit garden and poolside pavilion.
   - *Followed by*: **Experiences & Interactive Golden Hour Ritual (`ExperienceSection.tsx`)** featuring the Oceanfront Infinity Pool, Holistic Wellness & Spa Sanctuary, Ocean Terrace Breakfast, and Candlelit Shore Dining, plus a press-and-hold interaction that transitions the sanctuary from noon to twilight.
5. **Chapter 05 · The Live Hotel Experience (`cena3.mp4`, 7.93s)**
   - *Visual Journey*: Sweeping architectural climax across the timber-vaulted oceanfront pavilion at golden hour (*"More than a stay. An experience to remember."*).
6. **Final Section · Your Stay Begins Here (`HotelGallery.tsx` & `BookingSection.tsx`)**
   - Asymmetric 27-photograph editorial archive with category filters, full-screen lightbox, keyboard (`Esc`, `←`, `→`) and touch swipe controls, followed by the reservation request experience (`BOOK YOUR STAY` & `CONTACT THE HOTEL`).

---

## 2. Technology Stack & Component Architecture

- **Frontend**: React 18, TypeScript, Vite 6, Tailwind CSS 3
- **Animation & Scroll Choreography**: GSAP 3, GSAP ScrollTrigger, Lenis Smooth Scroll
- **Icons**: Lucide React
- **Localization**: Default English (`EN`) with live switchable Portuguese (`PT`) architecture

### Modular Components (`src/components/`)
- [`CinematicHero.tsx`](./src/components/CinematicHero.tsx) — Chapter 01 opening sequence
- [`ScrollStorySection.tsx`](./src/components/ScrollStorySection.tsx) — Reusable pinned GSAP ScrollTrigger chapter controller
- [`ScrollVideo.tsx`](./src/components/ScrollVideo.tsx) — Streamed Blob video loader, deadlock-safe seek gate, and `<canvas>` frame-sequence fallback
- [`NarrativeText.tsx`](./src/components/NarrativeText.tsx) — Masked headline choreography and 4-layer legibility scrims
- [`ChapterIndicator.tsx`](./src/components/ChapterIndicator.tsx) — Right-edge chapter progress rail
- [`HotelNavigation.tsx`](./src/components/HotelNavigation.tsx) — Adaptive header, chapter badge, EN/PT switcher, and mobile drawer
- [`AccommodationSection.tsx`](./src/components/AccommodationSection.tsx) — Interactive 3-zone suite study
- [`ExperienceSection.tsx`](./src/components/ExperienceSection.tsx) — Verified amenities & press-and-hold Golden Hour transition
- [`HotelGallery.tsx`](./src/components/HotelGallery.tsx) — 27-photo editorial collection & accessible lightbox
- [`BookingSection.tsx`](./src/components/BookingSection.tsx) — Reservation inquiry builder, guest FAQ, and editable property channel placeholders
- [`Footer.tsx`](./src/components/Footer.tsx) — Brand emblem, chapter jump links, and colophon

---

## 3. Local Development & Production Build

```bash
# Install dependencies
npm install

# Start development server at http://localhost:3000
npm run dev

# Build production bundle into dist/
npm run build

# Preview production build locally
npm run preview
```
