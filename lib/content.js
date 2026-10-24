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
    'An umbrella program of the IEEE Computer Society: sessions on emerging technologies, hackathons, soft skills, leadership and industry engagement, delivered for industry professionals with local Computer Society chapters and partner organizations in every IEEE region.',
  primaryCta: { label: 'Explore the program', href: '#about' },
  secondaryCta: { label: 'See upcoming events', href: '#events' },
  image: {
    src: '/assets/techbridge-workshop-hero.png',
    alt: 'A speaker presenting technical material to a seated audience at a workshop',
  },
  // The image above is a stand-in, so the caption stays generic: naming a real
  // venue under a stand-in photo would be false attribution.
  caption: ['Workshop · session in progress'],
};

export const stats = [
  { value: '14,200+', label: 'People attended' },
  { value: '42', label: 'Programs delivered' },
  { value: '26', label: 'Countries reached' },
  { value: '$480K', label: 'Funding disbursed' },
];

/** The three audience cards under the stats band. */
export const audiences = {
  eyebrow: 'Find your way in',
  items: [
    {
      id: 'member',
      who: 'I’m an IEEE member',
      title: 'Join an event',
      body:
        'Browse upcoming workshops, hackathons and sessions near you, see what each one covers and register.',
      cta: { label: 'Browse events', href: '#events' },
    },
    {
      id: 'chapter',
      who: 'I represent a chapter or section',
      title: 'Request a program',
      body:
        'Bring TechBridge to your Computer Society chapter or section. Tell us the topic; we fund and staff it.',
      cta: { label: 'Request a program', href: '#request' },
    },
    {
      id: 'organization',
      who: 'I represent an organization',
      title: 'Tie up with us',
      body:
        'Co-host programs, sponsor hackathons, send speakers or open your teams to TechBridge sessions.',
      cta: { label: 'See how to partner', href: '#partners' },
    },
  ],
};

export const vision = {
  eyebrow: 'Our vision',
  body:
    'Every computing professional, in every region, working hands-on with the technologies shaping their industry, connected to the peers and experts who move it forward.',
};

export const mission = {
  eyebrow: 'Our mission',
  body:
    'To help industry professionals stay ahead: bringing hands-on sessions and hackathons on emerging technologies, alongside soft skills and leadership, to them through local IEEE Computer Society chapters and partner organizations, and building lasting professional networks along the way.',
};

export const whatIs = {
  headingLead: 'What is',
  headingAccent: 'TechBridge?',
  body:
    'TechBridge is an umbrella program of the IEEE Computer Society that combines sessions on emerging technologies, hackathons, soft skills, leadership and industry engagement into a single offering. It gives industry professionals hands-on exposure to new and upcoming technologies, practical skills they can take back to their teams, and a chance to network with peers, expert speakers and partner organizations. Local Computer Society chapters and partner organizations tell us what their professionals need; we fund and staff it. Any organization or corporate can tie up with us.',
  steps: [
    {
      number: '01',
      title: 'Requested locally',
      body:
        'Any IEEE CS chapter, company or industry organization can submit a request. No prior chapter activity required.',
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
 * differ so the state is never communicated by colour alone. For a city that
 * hosts an event in `events` below, the status written here is overridden by
 * that event's date (see getCities() in lib/events.js).
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
    { name: 'Columbia', region: 'Regions 1-6 · US', lng: -81.03, lat: 34.0, status: 'scheduled', label: true },
    // Berlin's dot sits where a right-hand label would run, so this one flips.
    { name: 'Delft', region: 'Region 8 · EMEA', lng: 4.36, lat: 52.01, status: 'held', label: true, labelSide: 'left' },
    { name: 'Lima', region: 'Region 9 · LATAM', lng: -77.04, lat: -12.05, status: 'held', label: true },
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
 * One events collection drives the event cards, the schedule timeline and the
 * event pages. Whether an event is upcoming or past, and whether registration
 * is open, is NOT stored here: lib/events.js derives both from `isoDate`, so
 * read events through getEvents() rather than importing this array directly
 * wherever that state matters.
 *
 * `id` is also the URL slug of the event's detail page (/events/<id>). The
 * detail fields — `format`, `cost`, `about`, `highlights`, `venueImage` — are
 * optional: the page leaves out whatever is null or empty. Only the Columbia
 * event has them in the design reference; the other three are left blank
 * rather than filled with invented descriptions.
 */
export const events = [
  {
    id: 'columbia-2026',
    city: 'Columbia',
    location: 'Columbia, South Carolina, USA',
    date: '14 Sep 2026',
    isoDate: '2026-09-14',
    title: 'Embedded AI Bootcamp',
    host: 'IEEE CS Charlotte / Columbia Chapter',
    attendees: '180 attendees',
    capacity: '180 people',
    cost: 'Free',
    format: '2-day bootcamp',
    about:
      'Deploy compact models on microcontrollers and edge boards, from quantization to on-device inference, with engineers who ship embedded AI in production.',
    highlights: [
      'Model compression and quantization labs',
      'On-device inference on dev kits provided on the day',
      'Networking with speakers and local engineering teams',
    ],
    image: null,
    venueImage: null,
  },
  {
    id: 'delft-2026',
    city: 'Delft',
    location: 'Delft, Netherlands',
    date: '02 Oct 2026',
    isoDate: '2026-10-02',
    title: 'Cloud Native Fundamentals',
    host: 'IEEE CS Benelux Chapter',
    attendees: '120 attendees',
    capacity: '120 people',
    cost: null,
    format: null,
    about: null,
    highlights: [],
    image: null,
    venueImage: null,
  },
  {
    id: 'lima-2026',
    city: 'Lima',
    location: 'Lima, Peru',
    date: '08 Nov 2026',
    isoDate: '2026-11-08',
    title: 'Secure Coding Workshop',
    host: 'IEEE CS Peru Chapter',
    attendees: '90 attendees',
    capacity: '90 people',
    cost: null,
    format: null,
    about: null,
    highlights: [],
    image: null,
    venueImage: null,
  },
  {
    id: 'mumbai-2026',
    city: 'Mumbai',
    location: 'Mumbai, India',
    date: '05 Dec 2026',
    isoDate: '2026-12-05',
    title: 'Women in Computing Sprint',
    host: 'IEEE CS Bombay Chapter',
    attendees: '240 attendees',
    capacity: '240 people',
    cost: null,
    format: null,
    about: null,
    highlights: [],
    image: null,
    venueImage: null,
  },
];

export const registration = {
  heading: 'Register',
  intro: 'Open to IEEE members and non-members.',
  consent: 'I agree to IEEE’s privacy policy and to receive event updates by email.',
  submitLabel: 'Register',
  closed: 'Registration for this event is closed.',
  note: { lead: 'Not an IEEE member?', body: 'You can still register. Leave the member number blank.' },
};

export const eventFilters = [
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'past', label: 'Past' },
  { value: 'all', label: 'All' },
];

/** `feature: true` gives the tile the large two-row slot. */
export const gallery = [
  { id: 'g1', caption: 'Opening keynote — Nairobi', src: null, alt: null, feature: true },
  { id: 'g2', caption: 'Hands-on lab', src: null, alt: null },
  { id: 'g3', caption: 'Practitioner demo', src: null, alt: null },
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
      'Forty of our engineers had never touched an FPGA. Six now lead our hardware prototyping team.',
    name: 'Dr. Amara Okonkwo',
    role: 'Engineering director, Lagos',
    portrait: null,
  },
  {
    id: 's2',
    metric: '12 → 200 members',
    body:
      'The grant covered the venue and kits. Our chapter went from twelve active members to over two hundred in a year.',
    name: 'Rafael Duarte',
    role: 'Chair, IEEE CS Rio de Janeiro Chapter',
    portrait: null,
  },
  {
    id: 's3',
    metric: '2 mentors, 1 release',
    body:
      'Two of the speakers now mentor our platform teams, and a tool we built at the workshop shipped as open source.',
    name: 'Mei Lin Tan',
    role: 'L&D lead, Johor Bahru',
    portrait: null,
  },
];

export const partners = {
  eyebrow: 'Partners',
  heading: 'Societies, chapters, industry',
  body:
    'Any organization or corporate can tie up with TechBridge: co-host a program, sponsor a hackathon, send speakers or open your teams to our sessions.',
  cta: { label: 'Contact partnerships', href: `mailto:${site.contactEmail}` },
};

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
    id: 'corporate',
    heading: 'Corporate partners',
    items: [1, 2, 3, 4, 5, 6].map((n) => ({
      slot: 'corporate-' + n,
      name: 'Partner logo',
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
    body: 'Bring TechBridge to your chapter or company with our funding.',
    cta: { label: 'Submit a request', href: '#request' },
  },
  {
    number: '04',
    title: 'Partner with TechBridge',
    body: 'Tie up with us as a corporate, society or industry organization.',
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
  eyebrow: 'Request a program · For CS chapters',
  heading: ['Tell us what your', 'chapter needs'],
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
      // No verified computer.org URL for this yet, so it renders as plain text.
      { label: 'Professional activities', href: null },
      { label: 'Regions & chapters', href: 'https://www.computer.org/communities/chapters' },
      { label: 'Contact', href: 'https://www.computer.org/about/contact' },
    ],
  },
];
