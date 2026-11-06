export type Locale = 'en' | 'pt';

export interface NarrativeBeat {
  id: string;
  startProgress: number; // 0.0 to 1.0 within the chapter's GSAP ScrollTrigger timeline
  endProgress: number;   // 0.0 to 1.0
  position: 'bottom-left' | 'bottom-right' | 'center-left' | 'center-right' | 'center' | 'bottom-center';
  entrance: 'masked-rise' | 'halves-parting' | 'grid-snap' | 'drift-down' | 'blur-sharp' | 'approach-depth' | 'scatter' | 'word-settle';
  kicker: Record<Locale, string>;
  headline: Record<Locale, string>;
  body: Record<Locale, string>;
  architecturalNote: Record<Locale, string>;
  showCta?: boolean;
}

export interface ChapterConfig {
  id: string;
  chapterNumber: string;
  videoId: string;
  desktopVideoUrl: string;
  mobileVideoUrl: string;
  posterUrl: string;
  endFrameUrl: string;
  frameSequencePrefix: string;
  frameCount: number;
  durationSeconds: number;
  scrollHeightVh: number;
  navLabel: Record<Locale, string>;
  chapterTitle: Record<Locale, string>;
  subtitle: Record<Locale, string>;
  beats: NarrativeBeat[];
}

export interface GalleryPhoto {
  id: string;
  index: number;
  src: string;
  category: 'architecture' | 'pavilion' | 'accommodation' | 'experiences';
  aspect: 'wide' | 'tall' | 'feature' | 'standard';
  title: Record<Locale, string>;
  caption: Record<Locale, string>;
}

/**
 * Editable Hotel Configuration Placeholders (Section 12: Content Accuracy)
 * Never fabricates unverified addresses, phone numbers, room prices, or external URLs.
 * Replace these structured placeholders when official property channels are finalized.
 */
export const HOTEL_CONFIG = {
  brandName: 'LIVE HOTEL',
  brandTagline: {
    en: 'Coastal Sanctuary & Architectural Resort',
    pt: 'Santuário Costeiro e Resort Arquitetónico',
  },
  locationPlaceholder: {
    en: '[Hotel Location · Oceanfront Coastal Sanctuary]',
    pt: '[Localização do Hotel · Santuário Costeiro à Beira-Mar]',
  },
  coordinatesPlaceholder: {
    en: '[Coordinates · Coastal Horizon]',
    pt: '[Coordenadas · Horizonte Costeiro]',
  },
  bookingChannelPlaceholder: {
    label: {
      en: '[Official Booking Channel / Reservation Desk]',
      pt: '[Canal Oficial de Reservas / Receção]',
    },
    endpoint: '#booking-inquiry-panel',
  },
  contactPlaceholders: {
    email: '[reservations@livehotel-placeholder.example]',
    phone: '[+00 (000) 000-0000 · Concierge Desk Placeholder]',
    address: '[Oceanfront Avenue · Coastal Sanctuary Address Placeholder]',
    checkInOut: {
      en: '[Check-in / Check-out Schedule Placeholder]',
      pt: '[Horário de Check-in / Check-out Editável]',
    },
  },
  socialPlaceholders: [
    { name: 'Instagram', handle: '[@livehotel · Official Profile Placeholder]', href: '#contact' },
    { name: 'LinkedIn', handle: '[LIVE HOTEL Hospitality · Placeholder]', href: '#contact' },
    { name: 'Press Kit', handle: '[Editorial & Media Dossier · Placeholder]', href: '#contact' },
  ],
};

export const CHAPTERS_DATA: ChapterConfig[] = [
  {
    id: 'chapter-01',
    chapterNumber: '01',
    videoId: 'cena1.mp4',
    desktopVideoUrl: '/assets/videos/cena1-scrub.mp4',
    mobileVideoUrl: '/assets/videos/cena1-mobile.mp4',
    posterUrl: '/assets/posters/cena1-poster.jpg',
    endFrameUrl: '/assets/posters/cena1-end.jpg',
    frameSequencePrefix: '/assets/frames/cena1/frame_',
    frameCount: 20,
    durationSeconds: 9.96,
    scrollHeightVh: 450,
    navLabel: {
      en: '01 · First Impression',
      pt: '01 · Primeira Impressão',
    },
    chapterTitle: {
      en: 'THE FIRST IMPRESSION',
      pt: 'A PRIMEIRA IMPRESSÃO',
    },
    subtitle: {
      en: 'Approaching the oceanfront pavilion at twilight.',
      pt: 'A aproximação ao pavilhão costeiro ao entardecer.',
    },
    beats: [
      {
        id: 'c1-b1',
        startProgress: 0.0,
        endProgress: 0.25,
        position: 'bottom-left',
        entrance: 'word-settle',
        kicker: {
          en: 'CHAPTER 01 · THE FIRST IMPRESSION',
          pt: 'CAPÍTULO 01 · A PRIMEIRA IMPRESSÃO',
        },
        headline: {
          en: 'LIVE HOTEL',
          pt: 'LIVE HOTEL',
        },
        body: {
          en: 'Where chiseled limestone, warm tropical timber, and the open ocean meet in quiet architectural proportion.',
          pt: 'Onde a pedra calcária esculpida, a madeira tropical quente e o oceano aberto se encontram em proporção silenciosa.',
        },
        architecturalNote: {
          en: 'EXTERIOR FACADE · REFLECTING POOL THRESHOLD',
          pt: 'FACHADA EXTERIOR · ESPELHO DE ÁGUA PRINCIPAL',
        },
      },
      {
        id: 'c1-b2',
        startProgress: 0.27,
        endProgress: 0.52,
        position: 'center-right',
        entrance: 'masked-rise',
        kicker: {
          en: 'THE APPROACH',
          pt: 'A APROXIMAÇÃO',
        },
        headline: {
          en: 'Designed around the light of the water.',
          pt: 'Desenhado em torno da luz sobre a água.',
        },
        body: {
          en: 'Dusk settles across the dark reflecting basin while warm architectural lanterns guide your arrival beneath the timber canopy.',
          pt: 'O crepúsculo repousa sobre o espelho de água enquanto lanternas arquitetónicas guiam a chegada sob a cobertura de madeira.',
        },
        architecturalNote: {
          en: 'PORTE-COCHERE · TRAVERTINE COLONNADE',
          pt: 'PORTE-COCHÈRE · COLUNATA EM TRAVERTINO',
        },
      },
      {
        id: 'c1-b3',
        startProgress: 0.54,
        endProgress: 0.78,
        position: 'bottom-left',
        entrance: 'halves-parting',
        kicker: {
          en: 'CROSSING THE THRESHOLD',
          pt: 'CRUZANDO O LIMIAR',
        },
        headline: {
          en: 'The outside world falls quiet at the door.',
          pt: 'O mundo exterior silencia à entrada.',
        },
        body: {
          en: 'Double-height glass portals align the entrance steps directly with the distant ocean horizon through the center of the house.',
          pt: 'Portais de vidro de pé-direito duplo alinham a escadaria de entrada diretamente com o horizonte marítimo através do salão central.',
        },
        architecturalNote: {
          en: 'CENTRAL AXIS · DOUBLE-HEIGHT GLASS PORTAL',
          pt: 'EIXO CENTRAL · PORTAL DE VIDRO DUPLO',
        },
      },
      {
        id: 'c1-b4',
        startProgress: 0.80,
        endProgress: 1.0,
        position: 'bottom-right',
        entrance: 'word-settle',
        kicker: {
          en: 'INSIDE THE PAVILION',
          pt: 'NO INTERIOR DO PAVILHÃO',
        },
        headline: {
          en: 'Step inside a slower coastal rhythm.',
          pt: 'Entre num ritmo costeiro mais sereno.',
        },
        body: {
          en: 'Polished stone underfoot, coffered timber overhead, and open sightlines welcoming you into the heart of LIVE HOTEL.',
          pt: 'Pedra polida sob os pés, tetos em madeira trabalhada e vistas abertas que o recebem no coração do LIVE HOTEL.',
        },
        architecturalNote: {
          en: 'GRAND FOYER · RECEPTION HALL ARRIVAL',
          pt: 'FOYER PRINCIPAL · CHEGADA À RECEÇÃO',
        },
      },
    ],
  },
  {
    id: 'chapter-02',
    chapterNumber: '02',
    videoId: 'cena2.mp4',
    desktopVideoUrl: '/assets/videos/cena2-scrub.mp4',
    mobileVideoUrl: '/assets/videos/cena2-mobile.mp4',
    posterUrl: '/assets/posters/cena2-poster.jpg',
    endFrameUrl: '/assets/posters/cena2-end.jpg',
    frameSequencePrefix: '/assets/frames/cena2/frame_',
    frameCount: 20,
    durationSeconds: 9.96,
    scrollHeightVh: 420,
    navLabel: {
      en: '02 · The Arrival',
      pt: '02 · A Chegada',
    },
    chapterTitle: {
      en: 'THE ARRIVAL',
      pt: 'A CHEGADA',
    },
    subtitle: {
      en: 'Personal hospitality at the reception sanctuary.',
      pt: 'Hospitalidade pessoal no santuário da receção.',
    },
    beats: [
      {
        id: 'c2-b1',
        startProgress: 0.0,
        endProgress: 0.32,
        position: 'bottom-left',
        entrance: 'masked-rise',
        kicker: {
          en: 'CHAPTER 02 · THE ARRIVAL',
          pt: 'CAPÍTULO 02 · A CHEGADA',
        },
        headline: {
          en: 'Every great stay begins with a welcome.',
          pt: 'Cada grande estadia começa com um acolhimento.',
        },
        body: {
          en: 'Beneath our backlit golden palm crest, arrival is unhurried, personal, and attentive to every detail of your stay.',
          pt: 'Sob o nosso emblema dourado em pedra natural, a chegada é calma, pessoal e atenta a cada detalhe da sua estadia.',
        },
        architecturalNote: {
          en: 'RECEPTION SANCTUARY · CHISELED STONE DESK',
          pt: 'RECEPÇÃO · BALCÃO EM PEDRA ESCULPIDA',
        },
      },
      {
        id: 'c2-b2',
        startProgress: 0.35,
        endProgress: 0.66,
        position: 'center-right',
        entrance: 'grid-snap',
        kicker: {
          en: 'SPATIAL TRANSITION',
          pt: 'TRANSIÇÃO ESPACIAL',
        },
        headline: {
          en: 'Crafted in natural stone and warm timber.',
          pt: 'Esculpido em pedra natural e madeira nobre.',
        },
        body: {
          en: 'Vertical teak louvers and white orchids frame the passage from the reception counter into the open-air living hall.',
          pt: 'Ripados verticais de teca e orquídeas brancas emolduram a passagem da receção para o grande salão de estar.',
        },
        architecturalNote: {
          en: 'TEAK LOUVER SCREEN · ACOUSTIC THRESHOLD',
          pt: 'PAINEL DE TECA · TRANSIÇÃO ACÚSTICA',
        },
      },
      {
        id: 'c2-b3',
        startProgress: 0.69,
        endProgress: 1.0,
        position: 'bottom-left',
        entrance: 'word-settle',
        kicker: {
          en: 'THE GRAND LOUNGE',
          pt: 'O GRANDE SALÃO',
        },
        headline: {
          en: 'Space to breathe from the very first moment.',
          pt: 'Espaço para respirar desde o primeiro instante.',
        },
        body: {
          en: 'Cathedral timber rafters open above plush linen sofas and candlelit tables looking directly toward the palm terrace and sea.',
          pt: 'Vigas altas de madeira abrem-se sobre sofás de linho e mesas iluminadas por velas com vista direta para as palmeiras e o mar.',
        },
        architecturalNote: {
          en: 'CATHEDRAL PAVILION · OCEANFRONT SIGHTLINE',
          pt: 'PAVILHÃO CENTRAL · VISTA PARA O OCEANO',
        },
      },
    ],
  },
  {
    id: 'chapter-03',
    chapterNumber: '03',
    videoId: 'cena4.mp4',
    desktopVideoUrl: '/assets/videos/cena4-scrub.mp4',
    mobileVideoUrl: '/assets/videos/cena4-mobile.mp4',
    posterUrl: '/assets/posters/cena4-poster.jpg',
    endFrameUrl: '/assets/posters/cena4-end.jpg',
    frameSequencePrefix: '/assets/frames/cena4/frame_',
    frameCount: 16,
    durationSeconds: 7.93,
    scrollHeightVh: 420,
    navLabel: {
      en: '03 · Art of Staying',
      pt: '03 · Arte de Ficar',
    },
    chapterTitle: {
      en: 'THE ART OF STAYING',
      pt: 'A ARTE DE FICAR',
    },
    subtitle: {
      en: 'Private ocean-view quarters shaped for rest and stillness.',
      pt: 'Aposentos privados com vista para o mar desenhados para o repouso.',
    },
    beats: [
      {
        id: 'c3-b1',
        startProgress: 0.0,
        endProgress: 0.32,
        position: 'bottom-left',
        entrance: 'drift-down',
        kicker: {
          en: 'CHAPTER 03 · THE ART OF STAYING',
          pt: 'CAPÍTULO 03 · A ARTE DE FICAR',
        },
        headline: {
          en: 'Private quarters shaped for rest.',
          pt: 'Aposentos privados moldados para o descanso.',
        },
        body: {
          en: 'Hand-cut limestone walls, custom timber joinery, and crisp organic linens compose a serene private sanctuary.',
          pt: 'Paredes de pedra calcária talhada à mão, marcenaria sob medida e linhos orgânicos compõem um refúgio sereno.',
        },
        architecturalNote: {
          en: 'OCEANFRONT SUITE · LIMESTONE FEATURE WALL',
          pt: 'SUÍTE VISTA MAR · PAREDE EM PEDRA NATURAL',
        },
      },
      {
        id: 'c3-b2',
        startProgress: 0.35,
        endProgress: 0.66,
        position: 'center-left',
        entrance: 'blur-sharp',
        kicker: {
          en: 'LIGHT AND HORIZON',
          pt: 'LUZ E HORIZONTE',
        },
        headline: {
          en: 'Nothing stands between your room and the sea.',
          pt: 'Nada se interpõe entre o seu quarto e o mar.',
        },
        body: {
          en: 'Sheer linen drapery filters the coastal breeze while floor-to-ceiling timber frames open directly onto the water.',
          pt: 'Cortinas leves de linho filtram a brisa costeira enquanto caixilhos de madeira do chão ao teto se abrem sobre o mar.',
        },
        architecturalNote: {
          en: 'GLAZED THRESHOLD · NATURAL CROSS-VENTILATION',
          pt: 'VÃO ENVIDRAÇADO · LUZ E BRISA NATURAL',
        },
      },
      {
        id: 'c3-b3',
        startProgress: 0.69,
        endProgress: 1.0,
        position: 'bottom-right',
        entrance: 'word-settle',
        kicker: {
          en: 'PRIVATE BALCONY',
          pt: 'VARANDA PRIVATIVA',
        },
        headline: {
          en: 'Your own terrace above the tide.',
          pt: 'O seu próprio terraço sobre a maré.',
        },
        body: {
          en: 'Step outside to teak sun loungers, glass balustrades, and an unobstructed panorama of palms and turquoise water.',
          pt: 'Saia para espreguiçadeiras em teca, guarda-corpos de vidro e um panorama desimpedido de palmeiras e águas turquesa.',
        },
        architecturalNote: {
          en: 'OCEAN TERRACE · UNOBSTRUCTED SEA HORIZON',
          pt: 'TERRAÇO OCEÂNICO · HORIZONTE MARÍTIMO',
        },
      },
    ],
  },
  {
    id: 'chapter-04',
    chapterNumber: '04',
    videoId: 'cena2.1.mp4',
    desktopVideoUrl: '/assets/videos/cena2.1-scrub.mp4',
    mobileVideoUrl: '/assets/videos/cena2.1-mobile.mp4',
    posterUrl: '/assets/posters/cena2.1-poster.jpg',
    endFrameUrl: '/assets/posters/cena2.1-end.jpg',
    frameSequencePrefix: '/assets/frames/cena2.1/frame_',
    frameCount: 16,
    durationSeconds: 7.93,
    scrollHeightVh: 420,
    navLabel: {
      en: '04 · Experiences',
      pt: '04 · Experiências',
    },
    chapterTitle: {
      en: 'EXPERIENCES BEYOND THE ROOM',
      pt: 'EXPERIÊNCIAS ALÉM DO QUARTO',
    },
    subtitle: {
      en: 'From the indoor lounge bar to tropical gardens and the pool terrace.',
      pt: 'Do bar interior aos jardins tropicais e ao terraço da piscina.',
    },
    beats: [
      {
        id: 'c4-b1',
        startProgress: 0.0,
        endProgress: 0.32,
        position: 'bottom-left',
        entrance: 'masked-rise',
        kicker: {
          en: 'CHAPTER 04 · EXPERIENCES BEYOND THE ROOM',
          pt: 'CAPÍTULO 04 · EXPERIÊNCIAS ALÉM DO QUARTO',
        },
        headline: {
          en: 'Attentive hospitality that flows with your day.',
          pt: 'Hospitalidade atenta que acompanha o seu dia.',
        },
        body: {
          en: 'Whether arranging a morning table overlooking the waves or a quiet afternoon in the spa pavilion, every moment is thoughtfully prepared.',
          pt: 'Seja preparando uma mesa matinal de frente para as ondas ou uma tarde tranquila no spa, cada momento é cuidadosamente preparado.',
        },
        architecturalNote: {
          en: 'CONCIERGE DESK · PERSONALIZED HOSPITALITY',
          pt: 'BALCÃO CONCIERGE · SERVIÇO PERSONALIZADO',
        },
      },
      {
        id: 'c4-b2',
        startProgress: 0.35,
        endProgress: 0.66,
        position: 'center-right',
        entrance: 'approach-depth',
        kicker: {
          en: 'THE PAVILION LOUNGE & BAR',
          pt: 'LOUNGE E BAR DO PAVILHÃO',
        },
        headline: {
          en: 'Intimate spaces for gathering and quiet conversation.',
          pt: 'Espaços íntimos para convívio e conversa tranquila.',
        },
        body: {
          en: 'Warm stone pillars and custom timber seating create inviting corners between the indoor bar and the sunlit garden verandas.',
          pt: 'Pilares de pedra quente e mobiliário em madeira criam recantos acolhedores entre o bar interior e as varandas ensolaradas.',
        },
        architecturalNote: {
          en: 'INTERIOR LOUNGE BAR · SCULPTURAL TIMBER',
          pt: 'BAR E LOUNGE INTERIOR · MADEIRA ESCULPIDA',
        },
      },
      {
        id: 'c4-b3',
        startProgress: 0.69,
        endProgress: 1.0,
        position: 'bottom-left',
        entrance: 'word-settle',
        kicker: {
          en: 'GARDEN & POOL TERRACE',
          pt: 'JARDIM E TERRAÇO DA PISCINA',
        },
        headline: {
          en: 'Where indoor comfort opens to tropical greenery.',
          pt: 'Onde o conforto interior se abre para os jardins e a piscina.',
        },
        body: {
          en: 'Expansive glass walls connect the lounge directly to shaded garden umbrellas, lush coastal flora, and the poolside deck.',
          pt: 'Amplas paredes de vidro ligam o salão diretamente aos guarda-sóis do jardim, à flora costeira e ao deck da piscina.',
        },
        architecturalNote: {
          en: 'GARDEN COURTYARD · POOLSIDE THRESHOLD',
          pt: 'JARDIM TROPICAL · ACESSO À PISCINA',
        },
      },
    ],
  },
  {
    id: 'chapter-05',
    chapterNumber: '05',
    videoId: 'cena3.mp4',
    desktopVideoUrl: '/assets/videos/cena3-scrub.mp4',
    mobileVideoUrl: '/assets/videos/cena3-mobile.mp4',
    posterUrl: '/assets/posters/cena3-poster.jpg',
    endFrameUrl: '/assets/posters/cena3-end.jpg',
    frameSequencePrefix: '/assets/frames/cena3/frame_',
    frameCount: 16,
    durationSeconds: 7.93,
    scrollHeightVh: 430,
    navLabel: {
      en: '05 · The Experience',
      pt: '05 · A Experiência',
    },
    chapterTitle: {
      en: 'THE LIVE HOTEL EXPERIENCE',
      pt: 'A EXPERIÊNCIA LIVE HOTEL',
    },
    subtitle: {
      en: 'The emotional heart of coastal living.',
      pt: 'O clímax emocional da vida à beira-mar.',
    },
    beats: [
      {
        id: 'c5-b1',
        startProgress: 0.0,
        endProgress: 0.32,
        position: 'bottom-left',
        entrance: 'scatter',
        kicker: {
          en: 'CHAPTER 05 · THE LIVE HOTEL EXPERIENCE',
          pt: 'CAPÍTULO 05 · A EXPERIÊNCIA LIVE HOTEL',
        },
        headline: {
          en: 'Architecture in harmony with the coast.',
          pt: 'Arquitetura em harmonia com a costa.',
        },
        body: {
          en: 'Beneath soaring timber rafters and warm lantern light, every angle is composed to honor the natural beauty of the shore.',
          pt: 'Sob o teto elevado em madeira e a luz suave das lanternas, cada ângulo foi composto para honrar a beleza natural da praia.',
        },
        architecturalNote: {
          en: 'GRAND PAVILION · SYMMETRICAL TIMBER VAULT',
          pt: 'GRANDE PAVILHÃO · ABÓBADA EM MADEIRA',
        },
      },
      {
        id: 'c5-b2',
        startProgress: 0.35,
        endProgress: 0.66,
        position: 'center-right',
        entrance: 'masked-rise',
        kicker: {
          en: 'GOLDEN HOUR ATMOSPHERE',
          pt: 'ATMOSFERA DO ENTARDECER',
        },
        headline: {
          en: 'Stillness that stays with you long after departure.',
          pt: 'Uma serenidade que permanece consigo.',
        },
        body: {
          en: 'As sunset warms the chiseled stone columns and the ocean breeze drifts through the open terrace, time moves at the pace of the tide.',
          pt: 'Enquanto o pôr do sol aquece as colunas de pedra e a brisa do mar percorre o terraço aberto, o tempo segue o ritmo da maré.',
        },
        architecturalNote: {
          en: 'GOLDEN HOUR · CANDLELIT SANCTUARY',
          pt: 'HORA DOURADA · SANTUÁRIO ILUMINADO',
        },
      },
      {
        id: 'c5-b3',
        startProgress: 0.69,
        endProgress: 1.0,
        position: 'center',
        entrance: 'word-settle',
        kicker: {
          en: 'LIVE HOTEL · COASTAL SANCTUARY',
          pt: 'LIVE HOTEL · SANTUÁRIO COSTEIRO',
        },
        headline: {
          en: 'More than a stay. An experience to remember.',
          pt: 'Mais do que uma estadia. Uma experiência para recordar.',
        },
        body: {
          en: 'Your private table by the water, your terrace above the waves, and a warm welcome waiting at the door.',
          pt: 'A sua mesa junto à água, o seu terraço sobre as ondas e um acolhimento caloroso à sua espera.',
        },
        architecturalNote: {
          en: 'YOUR STAY BEGINS HERE · RESERVATIONS',
          pt: 'A SUA ESTADIA COMEÇA AQUI · RESERVAS',
        },
        showCta: true,
      },
    ],
  },
];

export const GALLERY_IMAGES: GalleryPhoto[] = [
  {
    id: 'gal-25',
    index: 25,
    src: '/assets/images/25_resort_on_tropical_beach_e3f0f8d2_2k.jpg',
    category: 'architecture',
    aspect: 'feature',
    title: { en: 'Coastal Sanctuary Aerial', pt: 'Vista Aérea do Santuário Costeiro' },
    caption: {
      en: 'Daylight aerial perspective showing the beachfront infinity pool, private pavilions, white sand shore, and turquoise reef.',
      pt: 'Perspetiva aérea diurna revelando a piscina infinita frente ao mar, pavilhões privados, areia branca e águas turquesa.',
    },
  },
  {
    id: 'gal-21',
    index: 21,
    src: '/assets/images/21_resort_building_near_ocean_b0bdceaf_2k.jpg',
    category: 'architecture',
    aspect: 'wide',
    title: { en: 'Golden Hour Over the Peninsula', pt: 'Pôr do Sol sobre a Península' },
    caption: {
      en: 'Sunset aerial view of the timber and limestone resort architecture nestled between tropical palms and the ocean.',
      pt: 'Vista aérea ao pôr do sol da arquitetura em madeira e pedra calcária entre palmeiras tropicais e o oceano.',
    },
  },
  {
    id: 'gal-04',
    index: 4,
    src: '/assets/images/04_generating_luxury_resort_exterio_3921211e_2k.jpg',
    category: 'architecture',
    aspect: 'wide',
    title: { en: 'The Twilight Reflecting Basin', pt: 'Espelho de Água ao Crepúsculo' },
    caption: {
      en: 'Symmetrical twilight elevation of the main pavilion, porte-cochere, and black reflecting pool.',
      pt: 'Fachada simétrica ao anoitecer do pavilhão principal, porte-cochère e espelho de água.',
    },
  },
  {
    id: 'gal-05',
    index: 5,
    src: '/assets/images/05_generating_luxury_resort_hotel_i_f624af59_2k.jpg',
    category: 'architecture',
    aspect: 'standard',
    title: { en: 'Porte-Cochere Arrival', pt: 'Chegada pela Porte-Cochère' },
    caption: {
      en: 'Warm architectural lighting beneath the timber canopy framing the central glass doorway to the sea.',
      pt: 'Iluminação arquitetónica acolhedora sob a cobertura de madeira emoldurando o portal central para o mar.',
    },
  },
  {
    id: 'gal-22',
    index: 22,
    src: '/assets/images/22_resort_entrance_with_tropical_la_9509a18e_2k.jpg',
    category: 'architecture',
    aspect: 'standard',
    title: { en: 'Morning Courtyard Arrival', pt: 'Pátio de Chegada Matinal' },
    caption: {
      en: 'Hospitality hosts welcoming guests beneath the limestone columns and traveler palms.',
      pt: 'Equipa de hospitalidade a receber hóspedes sob as colunas de pedra calcária e palmeiras-do-viajante.',
    },
  },
  {
    id: 'gal-18',
    index: 18,
    src: '/assets/images/18_resort_building_near_ocean_0ea34310_2k.jpg',
    category: 'architecture',
    aspect: 'wide',
    title: { en: 'Evening Lantern Walkways', pt: 'Caminhos Iluminados ao Anoitecer' },
    caption: {
      en: 'Two-story timber colonnades glowing warmly beside the coastal garden paths at dusk.',
      pt: 'Colunatas de madeira de dois pisos iluminadas junto aos caminhos do jardim costeiro ao anoitecer.',
    },
  },
  {
    id: 'gal-19',
    index: 19,
    src: '/assets/images/19_resort_building_near_ocean_3c4e7479_2k.jpg',
    category: 'architecture',
    aspect: 'standard',
    title: { en: 'Dusk Reflection & Ocean Horizon', pt: 'Reflexos do Crepúsculo e Horizonte' },
    caption: {
      en: 'Evening view across the water basin toward the illuminated ground-floor lounge and upper terraces.',
      pt: 'Vista noturna sobre o espelho de água em direção ao salão iluminado e aos terraços superiores.',
    },
  },
  {
    id: 'gal-20',
    index: 20,
    src: '/assets/images/20_resort_building_near_ocean_4756ba11_2k.jpg',
    category: 'architecture',
    aspect: 'standard',
    title: { en: 'Sunlit Limestone & Timber Facade', pt: 'Fachada em Pedra e Madeira ao Sol' },
    caption: {
      en: 'Daylight architectural study of the planted rooftop gardens, deep overhangs, and coastal walkways.',
      pt: 'Estudo arquitetónico diurno dos jardins suspensos, beirais profundos e passagens costeiras.',
    },
  },
  {
    id: 'gal-23',
    index: 23,
    src: '/assets/images/23_resort_garden_near_ocean_90b8d78f_2k.jpg',
    category: 'architecture',
    aspect: 'wide',
    title: { en: 'Flagstone Garden Path to the Sea', pt: 'Caminho de Pedra até ao Mar' },
    caption: {
      en: 'Manicured tropical gardens with white frangipani and stone pathways leading directly to the beach.',
      pt: 'Jardins tropicais cuidados com caminhos de pedra natural que conduzem diretamente à praia.',
    },
  },
  {
    id: 'gal-27',
    index: 27,
    src: '/assets/images/27_welcoming_resort_reception_desk_png_08c3215f.jpg',
    category: 'pavilion',
    aspect: 'standard',
    title: { en: 'The Golden Palm Reception Crest', pt: 'O Emblema Dourado da Receção' },
    caption: {
      en: 'Warm personal welcome at the chiseled limestone reception desk beneath the signature backlit crest.',
      pt: 'Acolhimento caloroso no balcão de pedra calcária sob o emblema iluminado do hotel.',
    },
  },
  {
    id: 'gal-17',
    index: 17,
    src: '/assets/images/17_recepcionist_smiling_at_hotel_co_8db5a4ea_2k.jpg',
    category: 'pavilion',
    aspect: 'standard',
    title: { en: 'Reception Sanctuary Perspective', pt: 'Perspetiva do Santuário da Receção' },
    caption: {
      en: 'Natural daylight streaming through the garden doors beside the stone and timber check-in counters.',
      pt: 'Luz natural a entrar pelas portas do jardim junto aos balcões de receção em pedra e madeira.',
    },
  },
  {
    id: 'gal-07',
    index: 7,
    src: '/assets/images/07_hotel_reception_interior_design_9b9f1797_2k.jpg',
    category: 'pavilion',
    aspect: 'feature',
    title: { en: 'The Grand Reception Hall', pt: 'O Grande Salão da Receção' },
    caption: {
      en: 'Double-height reception hall uniting the check-in sanctuary on the right with the oceanfront lounge on the left.',
      pt: 'Salão de pé-direito duplo que une a receção à direita com o lounge frente ao mar à esquerda.',
    },
  },
  {
    id: 'gal-03',
    index: 3,
    src: '/assets/images/03_designing_resort_reception_lobby_1e3f5568_2k.jpg',
    category: 'pavilion',
    aspect: 'wide',
    title: { en: 'Architectural Lobby & Colonnade', pt: 'Lobby Arquitetónico e Colunata' },
    caption: {
      en: 'Limestone columns and slatted timber ceilings framing the central reception island and ocean views.',
      pt: 'Colunas de pedra calcária e tetos ripados em madeira emoldurando a ilha de receção e a vista mar.',
    },
  },
  {
    id: 'gal-02',
    index: 2,
    src: '/assets/images/02_configuring_lighting_for_luxury_027316ff_2k.jpg',
    category: 'pavilion',
    aspect: 'wide',
    title: { en: 'Cathedral Pavilion at Dusk', pt: 'Pavilhão Central ao Entardecer' },
    caption: {
      en: 'Warm cove lighting, floor lanterns, and linen seating groups inside the main timber-vaulted pavilion.',
      pt: 'Iluminação indireta acolhedora, lanternas de chão e sofás de linho no pavilhão principal.',
    },
  },
  {
    id: 'gal-14',
    index: 14,
    src: '/assets/images/14_luxury_tropical_beachfront_hotel_96b314ec_2k.jpg',
    category: 'pavilion',
    aspect: 'wide',
    title: { en: 'Sunlit Oceanfront Living Hall', pt: 'Salão de Estar Iluminado pelo Sol' },
    caption: {
      en: 'Open-air timber rafters, woven pendant lamps, and sliding glass doors opening onto the beachfront deck.',
      pt: 'Vigas de madeira aparentes, luminárias tecidas e portas de vidro abertas para o deck à beira-mar.',
    },
  },
  {
    id: 'gal-13',
    index: 13,
    src: '/assets/images/13_luxury_resort_oceanfront_terrace_c6e0173f_2k.jpg',
    category: 'pavilion',
    aspect: 'standard',
    title: { en: 'Shaded Pergola & OceanVeranda', pt: 'Pérgola Sombreada e Varanda Marítima' },
    caption: {
      en: 'Outdoor teak seating beneath slatted timber pergolas overlooking the palms and turquoise shoreline.',
      pt: 'Área de estar exterior em teca sob pérgolas de madeira com vista sobre as palmeiras e o mar.',
    },
  },
  {
    id: 'gal-11',
    index: 11,
    src: '/assets/images/11_luxury_hotel_bedroom_ocean_view_05cea4e5_2k.jpg',
    category: 'accommodation',
    aspect: 'feature',
    title: { en: 'Ocean-View Corner Suite', pt: 'Suíte Panorâmica Vista Mar' },
    caption: {
      en: 'Vaulted timber ceiling, chiseled stone accent wall, linen sofa, and wrap-around glass doors facing the sea.',
      pt: 'Teto em madeira, parede em pedra natural, sofá de linho e portas de vidro panorâmicas de frente para o mar.',
    },
  },
  {
    id: 'gal-12',
    index: 12,
    src: '/assets/images/12_luxury_ocean_view_hotel_suite_91d4e8a9_2k.jpg',
    category: 'accommodation',
    aspect: 'wide',
    title: { en: 'Horizon King Bed & Private Deck', pt: 'Cama King Horizonte e Deck Privado' },
    caption: {
      en: 'Suite bedroom oriented directly toward the ocean horizon with private terrace seating.',
      pt: 'Quarto orientado diretamente para o horizonte marítimo com área de estar no terraço privado.',
    },
  },
  {
    id: 'gal-06',
    index: 6,
    src: '/assets/images/06_hotel_balcony_overlooking_ocean_613446bd_2k.jpg',
    category: 'accommodation',
    aspect: 'standard',
    title: { en: 'Private Suite Balcony at Sunset', pt: 'Varanda Privada da Suíte ao Pôr do Sol' },
    caption: {
      en: 'Deep covered balcony with teak armchair, daybed, and uninterrupted views of the evening tide.',
      pt: 'Varanda coberta com poltrona em teca, espreguiçadeira e vista contínua para a maré do entardecer.',
    },
  },
  {
    id: 'gal-10',
    index: 10,
    src: '/assets/images/10_luxury_hotel_balcony_overlooking_475cb9da_2k.jpg',
    category: 'accommodation',
    aspect: 'standard',
    title: { en: 'Oceanfront Terrace Lounge', pt: 'Terraço Lounge Frente ao Mar' },
    caption: {
      en: 'Spacious suite terrace featuring twin teak sofas, sun loungers, and golden afternoon light.',
      pt: 'Amplo terraço da suíte com sofás em teca, espreguiçadeiras e luz dourada de fim de tarde.',
    },
  },
  {
    id: 'gal-09',
    index: 9,
    src: '/assets/images/09_luxurious_beachfront_hotel_bathr_9a1fefc2_2k.jpg',
    category: 'accommodation',
    aspect: 'wide',
    title: { en: 'Freestanding Stone Soaking Tub & Spa Bath', pt: 'Banheira de Imersão em Pedra e Casa de Banho Spa' },
    caption: {
      en: 'Travertine walk-in rain shower, sculpted stone soaking tub, brushed brass fixtures, and double teak vanity.',
      pt: 'Duche de chuva walk-in em travertino, banheira esculpida em pedra, metais escovados e bancada dupla em teca.',
    },
  },
  {
    id: 'gal-08',
    index: 8,
    src: '/assets/images/08_infinity_pool_at_beachfront_resort_67665cf0_2k.jpg',
    category: 'experiences',
    aspect: 'feature',
    title: { en: 'The Oceanfront Infinity Pool', pt: 'A Piscina Infinita Frente ao Mar' },
    caption: {
      en: 'Crystal infinity pool stretching alongside the limestone deck and turquoise ocean waves.',
      pt: 'Piscina de borda infinita que se estende ao longo do deck de pedra calcária e das ondas turquesa.',
    },
  },
  {
    id: 'gal-24',
    index: 24,
    src: '/assets/images/24_resort_infinity_pool_at_sunset_56c8964f_2k.jpg',
    category: 'experiences',
    aspect: 'wide',
    title: { en: 'Infinity Pool at Sunset', pt: 'Piscina Infinita ao Pôr do Sol' },
    caption: {
      en: 'Pastel sky reflections across the still water of the infinity pool as evening lanterns ignite.',
      pt: 'Reflexos do céu pastel sobre a água serena da piscina infinita enquanto as lanternas se acendem.',
    },
  },
  {
    id: 'gal-01',
    index: 1,
    src: '/assets/images/01_breakfast_experience_on_oceanfro_9d29d097_2k.jpg',
    category: 'experiences',
    aspect: 'wide',
    title: { en: 'Morning Breakfast on the Ocean Terrace', pt: 'Pequeno-Almoço no Terraço sobre o Mar' },
    caption: {
      en: 'Artisanal pastries, tropical fruit, fresh juices, and French-press coffee served above the morning surf.',
      pt: 'Pastelaria artesanal, frutas tropicais, sumos naturais e café acabado de preparar sobre o mar matinal.',
    },
  },
  {
    id: 'gal-26',
    index: 26,
    src: '/assets/images/26_romantic_dinner_on_beach_c81cb4ad_2k.jpg',
    category: 'experiences',
    aspect: 'feature',
    title: { en: 'Candlelit Dining on the Shore', pt: 'Jantar à Luz das Velas na Praia' },
    caption: {
      en: 'Private bamboo canopy draped in linen on the sand, surrounded by warm hurricane lanterns at twilight.',
      pt: 'Pérgola privada de bambu e linho sobre a areia, rodeada por lanternas acesas ao entardecer.',
    },
  },
  {
    id: 'gal-15',
    index: 15,
    src: '/assets/images/15_luxury_wellness_spa_interior_pho_513e40dd_2k.jpg',
    category: 'experiences',
    aspect: 'standard',
    title: { en: 'Wellness & Spa Treatment Sanctuary', pt: 'Santuário de Bem-Estar e Spa' },
    caption: {
      en: 'Twin teak treatment tables, botanical oils, candlelit stone niches, and open views to the garden and sea.',
      pt: 'Marquesas duplas em teca, óleos botânicos, nichos iluminados por velas e vista aberta para o jardim e o mar.',
    },
  },
  {
    id: 'gal-16',
    index: 16,
    src: '/assets/images/16_luxury_wellness_spa_interior_pho_8701d7be_2k.jpg',
    category: 'experiences',
    aspect: 'standard',
    title: { en: 'Tranquility Pool & Spa Pavilion', pt: 'Espelho de Água e Pavilhão do Spa' },
    caption: {
      en: 'Floating floral basin set in river stones right outside the open-air spa suite.',
      pt: 'Bacia de pedra com flores flutuantes e seixos naturais junto à suíte de spa.',
    },
  },
];
