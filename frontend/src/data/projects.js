// Fake portfolio projects — placeholders until real ones are uploaded.
// Each project drives: rail pill, hero title, copy, services, background
// scene, preview card art, and its row on the All Work page.

export const projects = [
  {
    id: 'lumen',
    name: 'Lumen',
    wordmark: 'wm-sans-bold',
    tagline:
      'Crafting a new visual foundation and interaction paradigm for a fast-growing investing platform.',
    services: ['Product Design'],
    filters: ['Fintech', 'Startup'],
    scene: 'lumen',
    caseStudy: true,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(160deg, #2b2e24, #15160f)',
      screenBg: '#0d120c',
      accent: '#9dff5a',
      heading: 'Managed investing',
      sub: '$4,514',
      chart: true,
    },
  },
  {
    id: 'aster',
    name: 'Aster',
    wordmark: 'wm-serif',
    tagline:
      'Designing the original interface for a leading prompt-to-image AI service.',
    services: ['Product Design', 'Product Strategy'],
    filters: ['AI', 'Startup'],
    scene: 'aster',
    caseStudy: true,
    card: {
      kind: 'monitor',
      backdrop: 'linear-gradient(165deg, #1c1c22, #0b0b0e)',
      screenBg: '#131318',
      accent: '#ff7a45',
      grid: true,
    },
  },
  {
    id: 'route',
    name: 'Route',
    wordmark: 'wm-sans',
    tagline:
      'A long term partnership spanning across virtually every product experience.',
    services: ['Product Design', 'Engineering'],
    filters: ['Startup', 'Leader'],
    scene: 'route',
    caseStudy: false,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(150deg, #37464e, #141a1e)',
      screenBg: '#f5f5f4',
      accent: '#111111',
      heading: 'Arriving in',
      sub: '12:45',
      map: true,
    },
  },
  {
    id: 'echo',
    name: 'Echo',
    wordmark: 'wm-mono',
    tagline:
      'Shaping the listening experience for an AI music service used by millions.',
    services: ['Product Design', 'Brand'],
    filters: ['AI', 'Media'],
    scene: 'echo',
    caseStudy: false,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(160deg, #2a1b2e, #120a14)',
      screenBg: '#170f1a',
      accent: '#d98cff',
      heading: 'Now playing',
      sub: 'Midnight Loop',
      wave: true,
    },
  },
  {
    id: 'vital',
    name: 'Vital',
    wordmark: 'wm-serif-lite',
    tagline:
      'Building a goals-based healthcare offering that feels deeply personal.',
    services: ['Product Design', 'Engineering', 'Brand'],
    filters: ['Health & Wellness', 'Startup'],
    scene: 'vital',
    caseStudy: true,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(150deg, #efe9e2, #cfc4b6)',
      screenBg: '#ffffff',
      accent: '#4f7bf7',
      heading: 'Your healthcare,',
      sub: 'simplified.',
      light: true,
    },
  },
  {
    id: 'streak',
    name: 'Streak',
    wordmark: 'wm-sans-bold',
    tagline: 'Creating the official app for building habits that stick.',
    services: ['Product Strategy', 'Product Design', 'Brand', 'Website'],
    filters: ['Productivity', 'Startup'],
    scene: 'streak',
    caseStudy: false,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(160deg, #10265c, #050b1d)',
      screenBg: '#0a1230',
      accent: '#ffb547',
      heading: 'Daily streak',
      sub: '42 days',
      rings: true,
    },
  },
  {
    id: 'folio',
    name: 'The Ledger',
    wordmark: 'wm-serif-italic',
    tagline:
      'Building a safe and responsible framework for a storied publication to explore AI for years to come.',
    services: ['Product Strategy', 'Design', 'Engineering'],
    filters: ['Media', 'Leader'],
    scene: 'folio',
    caseStudy: false,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(160deg, #262626, #0e0e0e)',
      screenBg: '#f4f1ea',
      accent: '#1a1a1a',
      heading: 'The Ledger',
      sub: 'Morning briefing',
      light: true,
      article: true,
    },
  },
  {
    id: 'moda',
    name: 'MODA',
    wordmark: 'wm-fashion',
    tagline:
      'Reimagining digital retail for an iconic fashion house entering a new era.',
    services: ['Web Design', 'Ecommerce'],
    filters: ['Ecommerce', 'Leader'],
    scene: 'moda',
    caseStudy: false,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(160deg, #3a3a3a, #101010)',
      screenBg: '#e9e6e1',
      accent: '#111111',
      heading: 'MODA',
      sub: 'Fall Collection',
      light: true,
    },
  },
  {
    id: 'drift',
    name: 'Drift',
    wordmark: 'wm-round',
    tagline: 'Moving beyond meditation with a product mindset.',
    services: ['Web Design'],
    filters: ['Health & Wellness', 'Leader'],
    scene: 'drift',
    caseStudy: true,
    card: {
      kind: 'phone',
      backdrop: 'linear-gradient(160deg, #27435c, #101d2b)',
      screenBg: '#ffd54d',
      accent: '#f2762e',
      heading: 'Meditation',
      sub: 'made simple',
      sunny: true,
    },
  },
]

// Extra fake brands to fill out the All Work list and logo wall.
export const extraWork = [
  {
    name: 'Quanta',
    wordmark: 'wm-sans-bold',
    tagline:
      'Product strategy and design for a photo platform that shipped on day one to millions of subscribers.',
    services: ['Product Design', 'Product Strategy'],
    filters: ['SaaS', 'Leader'],
    caseStudy: false,
  },
  {
    name: 'Playhouse',
    wordmark: 'wm-round',
    tagline:
      'Foundational product design of a video player experience still in use today.',
    services: ['UI Design'],
    filters: ['Media', 'Leader'],
    caseStudy: false,
  },
  {
    name: 'Fieldnote',
    wordmark: 'wm-serif',
    tagline:
      'Redesigning in-depth reporting and breaking sports news to serve every fan.',
    services: ['UX Research', 'Vision & Strategy', 'Product Design'],
    filters: ['Media', 'Startup'],
    caseStudy: true,
  },
  {
    name: 'bardo',
    wordmark: 'wm-lower',
    tagline:
      'As a leading AI-based automation startup, bardo approached us in the early days to help conceive and design a category-defining MVP.',
    services: ['Brand', 'Web App'],
    filters: ['AI', 'Startup'],
    caseStudy: false,
  },
  {
    name: 'Crusade',
    wordmark: 'wm-sans',
    tagline:
      'Close collaboration inclusive of a rebrand, new website and UX/UI services for a hyper-growth cloud computing startup.',
    services: ['Brand', 'Website'],
    filters: ['SaaS', 'Startup'],
    caseStudy: false,
  },
  {
    name: 'Windmark',
    wordmark: 'wm-sans-bold',
    tagline:
      'A comprehensive rebrand for a leading AI code assistant trusted by millions of developers worldwide.',
    services: ['Brand', 'Website'],
    filters: ['AI', 'SaaS'],
    caseStudy: false,
  },
  {
    name: 'relay',
    wordmark: 'wm-lower',
    tagline:
      'Relay came to us in their very early days with a working prototype and a vision to become the new standard for team communication.',
    services: ['iOS App', 'Android App', 'Web App'],
    filters: ['SaaS', 'Productivity'],
    caseStudy: true,
  },
  {
    name: 'Somnia',
    wordmark: 'wm-round',
    tagline:
      'A bold new brand identity and optimized mobile app experience for a sleep wearable launching its V2 headband.',
    services: ['Product Design', 'Brand', 'Website', 'Mobile App'],
    filters: ['Health & Wellness', 'Startup'],
    caseStudy: false,
  },
  {
    name: 'Meridian',
    wordmark: 'wm-sans',
    tagline:
      'Trusted partner of a global platform in product design, research, engineering, and R&D.',
    services: ['iOS App', 'Android App', 'Web App', 'Product Vision'],
    filters: ['Leader', 'SaaS'],
    caseStudy: false,
  },
  {
    name: 'WAKEFUL',
    wordmark: 'wm-caps',
    tagline:
      'We partnered closely to design, build, and ship Wakeful. The product was an instant classic and quickly became a top meditation app with thousands of 5-star reviews.',
    services: ['iOS App', 'Android App', 'Brand', 'Engineering'],
    filters: ['Health & Wellness', 'Startup'],
    caseStudy: true,
  },
  {
    name: 'Fanfare',
    wordmark: 'wm-sans-bold',
    tagline:
      'Close collaboration with an in-house team to bring delightful moments to life with crafted motion and interaction design.',
    services: ['Motion Design'],
    filters: ['Ecommerce', 'Leader'],
    caseStudy: false,
  },
  {
    name: 'atoms.',
    wordmark: 'wm-serif',
    tagline: 'Creating the official companion app for a habits classic.',
    services: ['Product Strategy', 'Product Design', 'Brand', 'Website'],
    filters: ['Productivity', 'Startup'],
    caseStudy: false,
  },
]

export const logoWall = [
  'Quanta', 'Playhouse', 'Fieldnote', 'bardo', 'Crusade', 'Windmark',
  'relay', 'Somnia', 'Meridian', 'WAKEFUL', 'Fanfare', 'atoms.',
  'Lumen', 'Aster', 'Route', 'Echo', 'Vital', 'Streak',
  'The Ledger', 'MODA', 'Drift', 'Northglen', 'Cobble', 'Halcyon',
  'Fern & Co', 'Parcel', 'Bluenote', 'Marrow', 'Solstice', 'Juniper',
  'Cinder', 'Vantage', 'Prism Labs', 'Willow', 'Cascade', 'Onset',
]

export const filterOptions = [
  'Startup', 'Leader', 'AI', 'Ecommerce', 'Fintech',
  'Health & Wellness', 'Productivity', 'SaaS', 'Media',
]
