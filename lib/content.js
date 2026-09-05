/**
 * All page content lives here so it can be replaced without touching layout.
 *
 * EVERYTHING IN THIS FILE IS PLACEHOLDER CONTENT taken from the TechBridge
 * homepage design reference. No statistic, name, event, quote or partner below
 * has been verified as real IEEE data. Replace before publishing.
 *
 * Where a real destination is unknown the href is `null` on purpose — the UI
 * renders those as plain text instead of inventing a URL.
 */

export const site = {
  wordmark: { lead: 'Tech', accent: 'Bridge' },
  description:
    'An IEEE Computer Society global program funding and delivering technical workshops wherever they are requested.',
  contactEmail: 'techbridge@computer.org',
  copyright: '© 2026 IEEE Computer Society. All rights reserved.',
  societyLogo: {
    src: '/assets/IEEE-CS_LogoTM-orange.png',
    alt: 'IEEE Computer Society',
    href: 'https://www.computer.org/',
  },
  social: [
    { label: 'LinkedIn', href: null },
    { label: 'X', href: null },
    { label: 'YouTube', href: null },
    { label: 'Instagram', href: null },
  ],
  legal: [
    { label: 'Privacy', href: null },
    { label: 'Terms', href: null },
    { label: 'Accessibility', href: null },
  ],
};

export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Impact', href: '#impact' },
  { label: 'Events', href: '#events' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Team', href: '#team' },
];

export const hero = {
  eyebrow: 'An IEEE Computer Society global program',
  title: { lead: 'TECH', accent: 'BRIDGE' },
  subtitle: ['Bridging technical expertise and', 'the communities that need it.'],
  body:
    'An umbrella program of the IEEE Computer Society: sessions on emerging technologies, soft skills, leadership and industry engagement, delivered with local student branches, chapters and universities in every IEEE region.',
  primaryCta: { label: 'Explore the program', href: '#about' },
  secondaryCta: { label: 'See upcoming events', href: '#events' },
  image: {
    src: '/assets/techbridge-workshop-hero.png',
    alt: 'A speaker presenting technical material to a seated audience at a workshop',
  },
  // Second caption line is a slot for the real host institution. It is left as a
  // generic label because the image above is a stand-in, and captioning a
  // stand-in photo with a real venue name would be false attribution.
  caption: ['Workshop · session in progress', 'Host institution'],
};

export const stats = [
  { value: '14,200+', label: 'People attended' },
  { value: '42', label: 'Programs delivered' },
  { value: '26', label: 'Countries reached' },
  { value: '$480K', label: 'Funding disbursed' },
];

export const vision = {
  eyebrow: 'Our vision',
  body:
    'A world where any student, in any city, can reach the frontier of computing without leaving their community.',
};

export const mission = {
  eyebrow: 'Our mission',
  body:
    'To carry the technical depth of the IEEE Computer Society into local communities: matching volunteer speakers and curriculum to what each region asks for, funding delivery, and leaving behind skills, certification and an active chapter.',
};

export const whatIs = {
  headingLead: 'What is',
  headingAccent: 'TechBridge?',
  body:
    'TechBridge is an umbrella program of the IEEE Computer Society that combines sessions on emerging technologies, soft skills, leadership and industry engagement into a single offering. Local student branches, chapters and universities tell us what their community needs; we fund and staff it.',
  steps: [
    {
      number: '01',
      title: 'Requested locally',
      body:
        'Any IEEE member, student branch or university can submit a request. No prior chapter activity required.',
    },
    {
      number: '02',
      title: 'Funded centrally',
      body:
        'Approved programs receive a grant for venue, materials and speaker travel, plus IEEE CS certification.',
    },
    {
      number: '03',
      title: 'Delivered together',
      body:
        'We match your topic with volunteer speakers from industry and academia and help run the day.',
    },
  ],
  panel: {
    heading: 'What a program includes',
    items: ['Funding', 'Speakers', 'Curriculum', 'Hardware kits', 'Certificates', 'Promotion'],
    cta: { label: 'Apply for program', href: '#request' },
  },
};

/**
 * Map dots, positioned by real longitude/latitude and projected by
 * lib/world-projection.js onto the same equirectangular frame as
 * public/world.svg.
 *
 * `status` is 'held' or 'scheduled'. Both the colour AND the marker shape
 * differ so the state is never communicated by colour alone.
 *
 * PLACEHOLDER WARNING: only the five cities marked `label: true` appear in the
 * design reference. The other nineteen are illustrative fillers chosen to match
 * the reference's dot scatter — they are NOT real TechBridge locations. Now that
 * the map shows a name and status on hover, replace or delete them before
 * publishing rather than leaving invented programs on a public page.
 */
export const footprint = {
  eyebrow: 'Global footprint',
  heading: '42 cities · 10 IEEE regions',
  cities: [
    // Berlin's dot sits where a right-hand label would run, so this one flips.
    { name: 'Delft', region: 'Region 8 · EMEA', lng: 4.36, lat: 52.01, status: 'held', label: true, labelSide: 'left' },
    { name: 'Lima', region: 'Region 9 · LATAM', lng: -77.04, lat: -12.05, status: 'held', label: true },
    { name: 'Nairobi', region: 'Region 8 · EMEA', lng: 36.82, lat: -1.29, status: 'held', label: true },
    { name: 'Mumbai', region: 'Region 10 · Asia-Pac', lng: 72.88, lat: 19.08, status: 'held', label: true },
    { name: 'Tokyo', region: 'Region 10 · Asia-Pac', lng: 139.69, lat: 35.69, status: 'scheduled', label: true },
    { name: 'Vancouver', region: 'Region 7 · Canada', lng: -123.12, lat: 49.28, status: 'scheduled' },
    { name: 'San Francisco', region: 'Regions 1-6 · US', lng: -122.42, lat: 37.77, status: 'scheduled' },
    { name: 'Toronto', region: 'Region 7 · Canada', lng: -79.38, lat: 43.65, status: 'scheduled' },
    { name: 'Austin', region: 'Regions 1-6 · US', lng: -97.74, lat: 30.27, status: 'scheduled' },
    { name: 'Bogota', region: 'Region 9 · LATAM', lng: -74.07, lat: 4.71, status: 'scheduled' },
    { name: 'Sao Paulo', region: 'Region 9 · LATAM', lng: -46.63, lat: -23.55, status: 'scheduled' },
    { name: 'Dublin', region: 'Region 8 · EMEA', lng: -6.26, lat: 53.35, status: 'scheduled' },
    { name: 'Lisbon', region: 'Region 8 · EMEA', lng: -9.14, lat: 38.72, status: 'scheduled' },
    { name: 'Casablanca', region: 'Region 8 · EMEA', lng: -7.59, lat: 33.57, status: 'scheduled' },
    { name: 'Berlin', region: 'Region 8 · EMEA', lng: 13.4, lat: 52.52, status: 'scheduled' },
    { name: 'Warsaw', region: 'Region 8 · EMEA', lng: 21.01, lat: 52.23, status: 'scheduled' },
    { name: 'Istanbul', region: 'Region 8 · EMEA', lng: 28.98, lat: 41.01, status: 'scheduled' },
    { name: 'Dubai', region: 'Region 8 · EMEA', lng: 55.27, lat: 25.2, status: 'scheduled' },
    { name: 'Lahore', region: 'Region 10 · Asia-Pac', lng: 74.34, lat: 31.55, status: 'scheduled' },
    { name: 'Singapore', region: 'Region 10 · Asia-Pac', lng: 103.82, lat: 1.35, status: 'scheduled' },
    { name: 'Manila', region: 'Region 10 · Asia-Pac', lng: 120.98, lat: 14.6, status: 'scheduled' },
    { name: 'Seoul', region: 'Region 10 · Asia-Pac', lng: 126.98, lat: 37.57, status: 'scheduled' },
    { name: 'Perth', region: 'Region 10 · Asia-Pac', lng: 115.86, lat: -31.95, status: 'scheduled' },
    { name: 'Auckland', region: 'Region 10 · Asia-Pac', lng: 174.76, lat: -36.85, status: 'scheduled' },
  ],
  regions: [
    { count: '9', label: 'Regions 1-6 · US' },
    { count: '3', label: 'Region 7 · Canada' },
    { count: '11', label: 'Region 8 · EMEA' },
    { count: '7', label: 'Region 9 · LATAM' },
    { count: '12', label: 'Region 10 · Asia-Pac' },
  ],
};

/**
 * One events collection drives both the event cards and the schedule timeline.
 * `state` is 'upcoming' or 'past'. The reference design supplies four upcoming
 * programs and no past ones, so the Past filter renders an empty state rather
 * than inventing history.
 */
export const events = [
  {
    id: 'nairobi-2026',
    city: 'Nairobi',
    date: '14 Sep 2026',
    isoDate: '2026-09-14',
    status: 'Registration open',
    title: 'Embedded AI Bootcamp',
    host: 'IEEE CS Student Branch, University of Nairobi',
    attendees: '180 attendees',
    state: 'upcoming',
    image: null,
    href: null,
  },
  {
    id: 'delft-2026',
    city: 'Delft',
    date: '02 Oct 2026',
    isoDate: '2026-10-02',
    status: 'Registration open',
    title: 'Cloud Native Fundamentals',
    host: 'IEEE CS Chapter, TU Delft',
    attendees: '120 attendees',
    state: 'upcoming',
    image: null,
    href: null,
  },
  {
    id: 'lima-2026',
    city: 'Lima',
    date: '08 Nov 2026',
    isoDate: '2026-11-08',
    status: 'Registration open',
    title: 'Secure Coding Workshop',
    host: 'IEEE CS Chapter, PUCP',
    attendees: '90 attendees',
    state: 'upcoming',
    image: null,
    href: null,
  },
  {
    id: 'mumbai-2026',
    city: 'Mumbai',
    date: '05 Dec 2026',
    isoDate: '2026-12-05',
    status: 'Registration open',
    title: 'Women in Computing Sprint',
    host: 'IEEE CS Student Branch, VJTI',
    attendees: '240 attendees',
    state: 'upcoming',
    image: null,
    href: null,
  },
];

export const eventFilters = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
  { value: 'all', label: 'All' },
];

/** `feature: true` gives the tile the large two-row slot. */
export const gallery = [
  { id: 'g1', caption: 'Opening keynote — Nairobi', src: null, alt: null, feature: true },
  { id: 'g2', caption: 'Hands-on lab', src: null, alt: null },
  { id: 'g3', caption: 'Student team demo', src: null, alt: null },
  { id: 'g4', caption: 'Mentor session', src: null, alt: null },
  { id: 'g5', caption: 'Certificate ceremony', src: null, alt: null },
  { id: 'g6', caption: 'Panel — industry & academia', src: null, alt: null },
  { id: 'g7', caption: 'Hardware kit unboxing', src: null, alt: null },
  { id: 'g8', caption: 'Group photo — Mumbai', src: null, alt: null },
];

export const stories = [
  {
    id: 's1',
    metric: '40 → 6 leads',
    body:
      'Forty of our students had never touched an FPGA. Six now maintain the university’s hardware lab.',
    name: 'Dr. Amara Okonkwo',
    role: 'Faculty advisor, University of Lagos',
    portrait: null,
  },
  {
    id: 's2',
    metric: '12 → 200 members',
    body:
      'The grant covered the venue and kits. Our branch went from twelve members to over two hundred in a year.',
    name: 'Rafael Duarte',
    role: 'Chair, IEEE CS Student Branch UFRJ',
    portrait: null,
  },
  {
    id: 's3',
    metric: '2 mentors, 1 release',
    body:
      'Two of the speakers became mentors for our capstone teams, and one team’s project shipped as open source.',
    name: 'Mei Lin Tan',
    role: 'Volunteer coordinator, UTM',
    portrait: null,
  },
];

export const partnerGroups = [
  {
    id: 'societies',
    heading: 'IEEE societies',
    items: [
      { slot: 'society-1', name: 'IEEE Computer Society', logo: null, href: null },
      { slot: 'society-2', name: 'IEEE Region 8', logo: null, href: null },
      { slot: 'society-3', name: 'IEEE Young Professionals', logo: null, href: null },
      { slot: 'society-4', name: 'IEEE WIE', logo: null, href: null },
      { slot: 'society-5', name: 'IEEE Education Society', logo: null, href: null },
      { slot: 'society-6', name: 'IEEE SIGHT', logo: null, href: null },
    ],
  },
  {
    id: 'industry',
    heading: 'Industry engagement',
    items: [1, 2, 3, 4, 5, 6].map((n) => ({
      slot: 'industry-' + n,
      name: 'Sponsor logo',
      logo: null,
      href: null,
    })),
  },
  {
    id: 'universities',
    heading: 'Host universities',
    items: [1, 2, 3, 4, 5, 6].map((n) => ({
      slot: 'university-' + n,
      name: 'University logo',
      logo: null,
      href: null,
    })),
  },
];

export const team = [
  { id: 't1', name: 'Dr. Priya Raghavan', role: 'Program chair', portrait: null, linkedin: null },
  { id: 't2', name: 'Marcus Feldt', role: 'Vice chair, operations', portrait: null, linkedin: null },
  { id: 't3', name: 'Aisha Bello', role: 'Region 8 lead', portrait: null, linkedin: null },
  { id: 't4', name: 'Hiro Tanaka', role: 'Region 10 lead', portrait: null, linkedin: null },
  { id: 't5', name: 'Sofia Marino', role: 'Region 9 lead', portrait: null, linkedin: null },
  { id: 't6', name: 'Daniel Osei', role: 'Speaker network', portrait: null, linkedin: null },
  { id: 't7', name: 'Lena Kovacs', role: 'Partnerships', portrait: null, linkedin: null },
  { id: 't8', name: 'Grace Wu', role: 'Communications', portrait: null, linkedin: null },
];

export const getInvolved = [
  {
    number: '01',
    title: 'Become a volunteer',
    body: 'Help run programs in your region, from logistics to mentoring.',
    cta: { label: 'Volunteer', href: '#request' },
  },
  {
    number: '02',
    title: 'Become a speaker',
    body: 'Deliver a session in your specialism, in person or remotely.',
    cta: { label: 'Apply to speak', href: '#request' },
  },
  {
    number: '03',
    title: 'Host a workshop',
    body: 'Bring TechBridge to your campus or chapter with our funding.',
    cta: { label: 'Submit a request', href: '#request' },
  },
  {
    number: '04',
    title: 'Partner with TechBridge',
    body: 'Co-deliver programs as a society, university or nonprofit.',
    cta: { label: 'Partner with us', href: '#request' },
  },
  {
    number: '05',
    title: 'Sponsor the program',
    body: 'Fund cohorts, kits or travel and reach engineers worldwide.',
    cta: { label: 'Sponsorship deck', href: '#request' },
  },
];

export const requestProgram = {
  eyebrow: 'Request a program',
  heading: ['Tell us what your', 'community needs'],
  // Review cadence and funding ceiling are placeholder policy from the design.
  body:
    'Requests are reviewed twice a month by the TechBridge committee. Funding of up to $1,500 is available for eligible proposals.',
  supportOptions: ['Funding', 'Speakers', 'Curriculum', 'Hardware kits', 'Certificates', 'Promotion'],
  submitLabel: 'Submit request',
};

export const footerColumns = [
  {
    heading: 'TechBridge',
    links: [
      { label: 'About the program', href: '#about' },
      { label: 'How requests are reviewed', href: '#request' },
      { label: 'Events', href: '#events' },
      { label: 'Gallery', href: '#gallery' },
      { label: 'Success stories', href: '#stories' },
    ],
  },
  {
    heading: 'Get involved',
    links: [
      { label: 'Volunteer', href: '#involved' },
      { label: 'Speak', href: '#involved' },
      { label: 'Host a workshop', href: '#request' },
      { label: 'Partner', href: '#involved' },
      { label: 'Sponsor', href: '#involved' },
    ],
  },
  {
    heading: 'IEEE Computer Society',
    links: [
      { label: 'computer.org', href: 'https://www.computer.org/' },
      { label: 'Membership', href: 'https://www.computer.org/membership' },
      { label: 'Student activities', href: 'https://www.computer.org/communities/students' },
      { label: 'Regions & chapters', href: 'https://www.computer.org/communities/chapters' },
      { label: 'Contact', href: 'https://www.computer.org/about/contact' },
    ],
  },
];
