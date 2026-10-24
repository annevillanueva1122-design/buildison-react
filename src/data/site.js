// All the site's content lives here, separate from the layout.
// Edit this file to change text, prices or features — no need to touch the components.
// Later you can load these same arrays from Supabase instead of hard-coding them.

export const stats = [
  { value: '50+', label: 'ready-made automations' },
  { value: '24/7', label: 'live chat support' },
  { value: '2 min', label: 'to create your account' },
  { value: '$0', label: 'for your first 7 days' },
]

export const channels = [
  '2-way SMS', 'Email marketing', 'Facebook DMs', 'Instagram DMs', 'Google Business chat',
  'Calendars', 'Pipelines', 'Funnels', 'Websites', 'Surveys & forms', 'Social planner',
  'AI chat bot', 'Webinars', 'Mobile app',
]

export const activity = {
  contact: 'Jordan R.',
  events: [
    { text: 'Opened “Spring promo” email', time: 'Today · 9:14 AM' },
    { text: 'Visited pricing page twice', time: 'Today · 9:20 AM' },
    { text: 'Replied to Instagram DM', time: 'Today · 10:02 AM' },
    { text: 'Booked a discovery call', time: 'Today · 10:05 AM' },
  ],
  score: '92 / 100 · Hot',
}

export const messages = [
  { initials: 'AL', color: 'var(--mint)', name: 'Alex L.', channel: 'SMS', text: "Hi Alex, your spot for Thursday's workshop is saved. Want a reminder an hour before?" },
  { initials: 'MS', color: 'var(--amber)', name: 'Maria S.', channel: 'EMAIL', text: "Maria, here's the checklist you asked about, plus a 10-minute walkthrough video." },
  { initials: 'TK', color: 'var(--gold)', name: 'Tom K.', channel: 'FB DM', text: 'Thanks for reaching out, Tom! Grab a time that works for you right here.' },
]

export const pipeline = [
  { stage: 'New lead', deals: [{ name: 'Bright Dental', value: 1200 }, { name: 'Oak Fitness', value: 850 }] },
  { stage: 'Call booked', deals: [{ name: 'Lumen Spa', value: 2400 }, { name: 'Cruz Realty', value: 1900 }] },
  { stage: 'Won', deals: [{ name: 'Peak Roofing', value: 3600 }] },
]

// Calendar days 1–21: 'on' = post scheduled, 'am' = email campaign
export const calendar = {
  month: 'November',
  marks: { 2: 'on', 4: 'am', 6: 'on', 9: 'on', 12: 'am', 13: 'on', 17: 'on', 19: 'on', 21: 'am' },
}

export const features = [
  { icon: 'lines', title: 'Unlimited pipelines', text: 'Build a pipeline for every service, offer or team.' },
  { icon: 'funnel', title: 'Unlimited funnels', text: 'Launch as many lead-capture funnels as you need.' },
  { icon: 'form', title: 'Dynamic surveys', text: 'Ask the right questions and branch on every answer.' },
  { icon: 'clock', title: 'Unlimited automations', text: 'Follow-ups, reminders and nurture sequences that run around the clock.' },
  { icon: 'users', title: 'Unlimited users', text: 'Bring your whole team in at no extra cost per seat.' },
  { icon: 'star', title: 'Lead scoring', text: 'See at a glance which contacts are ready to talk.' },
]

export const offer = {
  name: 'Summer Glow Package',
  details: '3 sessions · free consultation · limited spots',
  views: 1284,
  signups: 96,
  conversion: 7,
}

export const steps = [
  { title: 'Create your account', text: 'It takes less than two minutes.', cta: 'Sign up for free' },
  { title: 'We set it up for you', text: "With our done-for-you setup, the Buildison team configures your automations, email addresses and phone numbers. You don't have to touch a thing." },
  { title: 'We stay to help', text: "Once you're live, we're still here. Reach us any time by email, live chat or chat bot, 24/7.", cta: 'Get started free' },
]

// PLACEHOLDER: prices, setup fees and checkout links.
// annual = monthly price when billed annually, monthly = month-to-month price.
export const plans = [
  {
    name: 'Basic',
    tagline: 'Everything you need to capture and answer leads.',
    annual: 82.5,
    monthly: 99,
    setupFee: 197,
    cta: 'Try for free',
    href: '#',
    features: [
      '2-way text & email conversations', 'Facebook & Instagram DM integration', 'Unlimited calendars',
      'Email marketing', 'Forms', 'Unlimited automations', 'Google Business Profile messaging',
      'Newsletter landing page', 'Mobile app', 'Email support', 'Help center',
    ],
  },
  {
    name: 'Pro',
    popular: true,
    tagline: 'AI-powered automation and full marketing tools.',
    annual: 247.5,
    monthly: 297,
    setupFee: 497,
    cta: 'Get $200 off month 1*',
    href: '#',
    promoCode: '[YOURCODE]',
    includes: 'Basic',
    features: [
      '50+ AI-powered marketing automations', 'AI chat bot', 'Lead management pipelines',
      'Client portal integration**', 'Unlimited pipelines', 'Lead scoring', 'Unlimited funnels',
      'Lead magnet funnel & automations', 'Trackable links', 'Social media planner',
      'Online community builder', 'Ads reporting', 'Unlimited email addresses', 'Dynamic surveys',
      'Website hosting***', '24/7 live chat support', 'Weekly support office hours',
    ],
  },
  {
    name: 'Premium',
    tagline: 'Done-for-you growth with a dedicated team.',
    annual: 414.17,
    monthly: 497,
    setupFee: 997,
    cta: 'Book a call',
    href: '#',
    includes: 'Pro',
    features: [
      'Done-for-you account setup', '1 custom landing page built by Buildison',
      'Custom automations built for your business', 'Dedicated account manager',
      'Monthly strategy call', 'Priority support', 'Quarterly funnel & campaign review',
    ],
  },
]

export const pricingNotes = [
  '*$200 first-month discount applies to Pro plans on monthly billing.',
  '**Your portal must support an API or Zapier integration.',
  '***WordPress hosting available for an extra $20/month.',
]

// PLACEHOLDER: contact details and links
export const contact = {
  email: '[your@email.com]',
  phone: '[+1 (000) 000-0000]',
  address: '[Business address]',
  loginUrl: '#',
  privacyUrl: '#',
  termsUrl: '#',
}
