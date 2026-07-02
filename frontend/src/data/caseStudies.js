export const tagLabel = { build: 'Built', manage: 'Managed' }

// The only two real cases: Standix (their product) and this site itself.
// metric/url stay null until real numbers are supplied — every consumer must
// render them conditionally so nothing fabricated ever ships.
export const caseStudies = [
  {
    slug: 'standix',
    title: 'Standix',
    tags: ['build', 'manage'],
    status: { label: 'Live', tone: 'live' },
    kind: 'grid',
    tone: 'both',
    teaserBlurb: 'Built it, shipped it, and still run it today.',
    featuredBlurb:
      'A mobile app we designed, built, and now run day to day — live and public right now.',
    metric: null,
    url: null,
  },
  {
    slug: 'this-site',
    title: 'This very website',
    tags: ['build', 'manage'],
    status: { label: 'Live', tone: 'live' },
    kind: 'dashboard',
    tone: 'both',
    teaserBlurb: 'You’re on it right now — we built it and we run it.',
    featuredBlurb:
      'We designed it, built it from scratch, and run it day to day — the whole lifecycle in a single case. It’s the clearest proof we can give: you’re standing inside the demo.',
    metric: null,
    url: '/',
  },
]
