// Dummy content for the ICJIA Community Engagement Hub landing page.
// Text is copied verbatim from the design demo (docs/C - Editorial
// Infographic.html). This is placeholder data — a future increment will
// source it from the CMS. Single source of truth for the page + the
// Alpine news filter (serialized into a JSON <script> tag).

export interface NavItem {
  label: string;
  href: string;
}

export interface QuickLink {
  no: string;
  title: string;
  body: string;
  href: string;
  stat: string;
}

export interface Update {
  id: string;
  date: string;
  kicker: string;
  tag: string;
  title: string;
  body: string;
  cta: string;
  status: string;
}

export interface Pillar {
  no: string;
  title: string;
  body: string;
}

export interface EventItem {
  id: string;
  when: string;
  series: string;
  title: string;
  where: string;
  seats: string;
  desc: string;
}

export interface FooterLink {
  h: string;
  body: string;
  mono?: boolean;
}

export const SITE = {
  org: 'ICJIA',
  orgLong: 'Illinois Criminal Justice Information Authority',
  product: 'Community Engagement Hub',
  tagline:
    'Connecting communities, partners, and public safety resources across Illinois',
  blurb:
    'A central space for news, engagement opportunities, public safety updates, grantee conversations, and community-centered resources from ICJIA.',
  email: 'CJA.COMMUNITYENGAGEMENT@ILLINOIS.GOV',
};

export const NAV: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Get Involved', href: '#involved' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
];

export const QUICK_LINKS: QuickLink[] = [
  {
    no: '01',
    title: 'Upcoming Events',
    body: 'Find community meetings, listening sessions, fireside chats, and summits.',
    href: '#events',
    stat: '12 upcoming',
  },
  {
    no: '02',
    title: 'Get Involved',
    body: 'Share feedback, attend sessions, join surveys, and help shape public safety priorities.',
    href: '#involved',
    stat: '4 active surveys',
  },
  {
    no: '03',
    title: 'Resources',
    body: 'Access grant guidance, event materials, reports, FAQs, and community tools.',
    href: '#resources',
    stat: '38 docs',
  },
];

export const UPDATES: Update[] = [
  {
    id: 'u1',
    date: 'August 2026',
    kicker: 'Quarterly Summit',
    tag: 'Summit',
    title: 'Application to Implementation: Strengthening Proposals for Impact',
    body: 'Join ICJIA and community partners for the first quarterly engagement event focused on public safety priorities, community voices, and resource alignment.',
    cta: 'Read more',
    status: 'Registration open',
  },
  {
    id: 'u2',
    date: 'September 2026',
    kicker: 'Quarterly Summit',
    tag: 'Summit',
    title: 'ICJIA Quarterly Summit · R3 / ARI',
    body: 'Programmatic focus on R3 and ARI portfolios — implementation patterns, evaluation, and partner readiness across the state.',
    cta: 'Details soon',
    status: 'Coming soon',
  },
  {
    id: 'u3',
    date: 'Rolling · 2026',
    kicker: 'Roundtables',
    tag: 'Grantee',
    title: 'Grantee Roundtables',
    body: 'ICJIA will host targeted roundtables to hear directly from grantees about funding experiences, implementation challenges, and opportunities for stronger support.',
    cta: 'Read more',
    status: 'Scheduling',
  },
  {
    id: 'u4',
    date: 'Fall 2026',
    kicker: 'Council',
    tag: 'Council',
    title: 'Community Engagement Council convenes',
    body: 'Inaugural sitting of the cross-program council, advising ICJIA leadership on engagement priorities through 2027.',
    cta: 'Read more',
    status: 'Forming',
  },
  {
    id: 'u5',
    date: 'July 2026',
    kicker: 'Brief',
    tag: 'Research',
    title: 'Public Safety Trends — mid-year data brief',
    body: 'A short read on the indicators ICJIA is tracking across violence prevention, recidivism, and grant-funded programming.',
    cta: 'Read brief',
    status: 'Published',
  },
];

export const UPDATE_TABS = ['All', 'Summits', 'Grantee', 'Research', 'Council'] as const;

// Maps a tab label to the Update.tag it filters by ("All" matches everything).
export const TAB_TAG: Record<string, string | null> = {
  All: null,
  Summits: 'Summit',
  Grantee: 'Grantee',
  Research: 'Research',
  Council: 'Council',
};

export function countForTab(tab: string): number {
  const tag = TAB_TAG[tab];
  return tag === null ? UPDATES.length : UPDATES.filter((u) => u.tag === tag).length;
}

// Focus areas — rendered from the demo's FUNDING_PILLARS (no / title / body).
export const PILLARS: Pillar[] = [
  {
    no: '01',
    title: 'Community Safety & Violence Prevention',
    body: 'Investing in the people, programs, and partnerships that keep neighborhoods safer.',
  },
  {
    no: '02',
    title: 'Grant Access & Technical Assistance',
    body: 'Lowering the floor for new applicants and strengthening implementation.',
  },
  {
    no: '03',
    title: 'Data, Research & Public Safety Trends',
    body: 'Translating administrative data, evaluations, and field intelligence.',
  },
  {
    no: '04',
    title: 'Partnerships across Illinois Communities',
    body: 'Connecting state agencies, local governments, providers, and residents.',
  },
];

export const FOCUS_LEDE =
  'The Community Engagement Hub centers the voices of residents, grantees, service providers, public safety partners, and local leaders to support stronger, safer communities.';

export const EVENTS: EventItem[] = [
  {
    id: 'e1',
    when: 'Aug 14, 2026 · 10:00 CT',
    series: 'ICJIA Quarterly Summit',
    title: 'Application to Implementation',
    where: 'Location TBA · Chicago',
    seats: 'In-person + virtual',
    desc: 'Application guidance, proposal development, and implementation support.',
  },
  {
    id: 'e2',
    when: 'Sep 18, 2026 · 10:00 CT',
    series: 'ICJIA Quarterly Summit',
    title: 'R3 / ARI Convening',
    where: 'Location TBA',
    seats: 'In-person + virtual',
    desc: 'Cross-portfolio learning across R3 and ARI funded partners.',
  },
  {
    id: 'e3',
    when: '2026–2027 · Rolling',
    series: 'Grantee Roundtables',
    title: 'Listening sessions with funded partners',
    where: 'Statewide · regional hosts',
    seats: 'Invitation',
    desc: 'Conversations across program areas with funded partners.',
  },
];

export const FOOTER_LINKS: FooterLink[] = [
  { h: 'About', body: "Learn about ICJIA's community engagement work." },
  { h: 'Events', body: 'View upcoming meetings, chats, and roundtables.' },
  { h: 'Resources', body: 'Find reports, forms, FAQs, and guidance materials.' },
  { h: 'Contact', body: SITE.email, mono: true },
];
