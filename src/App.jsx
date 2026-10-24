import BackgroundFx from './components/BackgroundFx.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import FeatureRow from './components/FeatureRow.jsx'
import { ActivityScreen, MessagesScreen, PipelineScreen, CalendarScreen, OfferScreen } from './components/Screens.jsx'
import Unlimited from './components/Unlimited.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import Pricing from './components/Pricing.jsx'
import Footer from './components/Footer.jsx'
import ChatBubble from './components/ChatBubble.jsx'
import CursorTrail from './components/CursorTrail.jsx'
import SoundToggle from './components/SoundToggle.jsx'
import Cta from './components/Cta.jsx'

export default function App() {
  return (
    <div className="bld">
      <BackgroundFx />
      <Header />
      <Hero />
      <Marquee />

      <section className="band" id="features">
        <div className="wrap">
          <div className="center">
            <p className="eyebrow">All-in-one CRM</p>
            <h2 style={{ marginTop: 14 }}>Automated <span className="green">Conversations</span></h2>
            <p>DMs and texts, email campaigns and webinars, calendars and pipelines. Buildison brings every part of your marketing into one CRM so follow-up happens on its own and you get your hours back.</p>
            <Cta sub="7-day free trial">Try Buildison free</Cta>
          </div>
        </div>
      </section>

      <FeatureRow
        alt
        eyebrow="No lead slips away"
        title="See every lead, on every channel"
        subtitle="Track activity across all your marketing channels for sharper engagement and clearer insight."
        screen={<ActivityScreen />}
      >
        <p>Every click, reply, booking and form fill lands on one contact record. You always know who is warm, what they looked at and what to say next, so nobody gets forgotten in an inbox.</p>
      </FeatureRow>

      <FeatureRow
        flip
        eyebrow="Effortless engagement"
        title="Follow-up that feels personal"
        subtitle="Messages and content tailored to what each contact actually wants."
        screen={<MessagesScreen />}
      >
        <p>Send the right message on the channel each customer prefers, at the moment they are most likely to answer. Buildison handles the timing and the personal details for you.</p>
      </FeatureRow>

      <FeatureRow
        alt
        eyebrow="Pipeline clarity"
        title={<>Always know what's <span className="green">coming in</span></>}
        subtitle="Watch every opportunity move from first touch to closed sale."
        screen={<PipelineScreen />}
      >
        <p>Drag-and-drop pipelines show the value sitting in each stage, so you can plan your month with real numbers instead of guesses.</p>
      </FeatureRow>

      <FeatureRow
        flip
        eyebrow="Market like a pro"
        title="Promote your offers and attract buyers"
        subtitle="Social planner, landing pages and multi-channel automation in one place."
        screen={<CalendarScreen />}
      >
        <p>Schedule posts across your social accounts, launch a page for every offer, and let automations carry new leads from the first click to a booked call. Getting your offers seen has never taken less effort.</p>
      </FeatureRow>

      <Unlimited />

      <FeatureRow
        eyebrow="Showcase your offers"
        title={<>Offer pages that <span className="green">sell for you</span></>}
        subtitle="Interactive pages that present your offer and keep visitors engaged. Leave the static PDFs behind."
        screen={<OfferScreen />}
      >
        <p>Each page shows what you sell with video, testimonials and booking built in. It tracks how visitors behave in real time and collects sign-ups and deposits on the spot.</p>
        <p style={{ color: 'var(--fg)', fontWeight: 600 }}>Modern tools built to help you close more business.</p>
      </FeatureRow>

      <HowItWorks />
      <Pricing />

      <section className="band final">
        <div className="blob a" /><div className="blob b" />
        <div className="wrap center">
          <p className="eyebrow">One platform</p>
          <h2 style={{ marginTop: 14 }}>Every tool. <span className="green">One login.</span></h2>
          <p>Buildison is your all-in-one platform for marketing and sales. Stop juggling a stack of apps: manage contacts, automate campaigns, track opportunities and measure results from a single dashboard.</p>
          <Cta sub="7-day free trial">Get started for free</Cta>
        </div>
      </section>

      <Footer />
      <ChatBubble />
      <SoundToggle />
      <CursorTrail />
    </div>
  )
}
