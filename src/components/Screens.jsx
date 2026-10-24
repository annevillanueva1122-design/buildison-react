import CountUp from './CountUp.jsx'
import { activity, messages, pipeline, calendar, offer } from '../data/site.js'

// Shared "app window" frame with the three traffic-light dots
function Screen({ children }) {
  return (
    <div className="screen" aria-hidden="true">
      <div className="bar"><i /><i /><i /></div>
      {children}
    </div>
  )
}

const money = n => '$' + n.toLocaleString('en-US')

export function ActivityScreen() {
  return (
    <Screen>
      <p style={{ fontWeight: 700, marginBottom: 14 }}>Contact activity · {activity.contact}</p>
      <ul className="timeline">
        {activity.events.map(e => <li key={e.text}>{e.text}<time>{e.time}</time></li>)}
      </ul>
      <div className="score"><span>Lead score</span><b>{activity.score}</b></div>
    </Screen>
  )
}

export function MessagesScreen() {
  return (
    <Screen>
      {messages.map(m => (
        <div className="msg" key={m.name}>
          <span className="av" style={{ background: m.color }}>{m.initials}</span>
          <div>
            <span className="who">{m.name}</span><span className="src">{m.channel}</span>
            <p>{m.text}</p>
          </div>
        </div>
      ))}
    </Screen>
  )
}

export function PipelineScreen() {
  // The total is calculated from the deals, so it stays correct when the data changes
  const total = pipeline.reduce((sum, col) => sum + col.deals.reduce((s, d) => s + d.value, 0), 0)
  return (
    <Screen>
      <div className="pipe">
        {pipeline.map(col => (
          <div className="col" key={col.stage}>
            <h4>{col.stage}</h4>
            {col.deals.map(d => <div className="card-s" key={d.name}>{d.name}<b>{money(d.value)}</b></div>)}
          </div>
        ))}
      </div>
      <div className="total">
        <span style={{ color: 'var(--muted)', fontSize: 14 }}>Pipeline value</span>
        <CountUp value={total} prefix="$" />
      </div>
    </Screen>
  )
}

export function CalendarScreen() {
  const days = Array.from({ length: 21 }, (_, i) => i + 1)
  return (
    <Screen>
      <p style={{ fontWeight: 700, marginBottom: 12 }}>Social planner · {calendar.month}</p>
      <div className="cal">
        {days.map(d => <span key={d} className={calendar.marks[d]}>{d}</span>)}
      </div>
      <div className="legend">
        <span><i style={{ background: 'var(--mint)' }} />Post scheduled</span>
        <span><i style={{ background: 'var(--amber)' }} />Email campaign</span>
      </div>
    </Screen>
  )
}

export function OfferScreen() {
  return (
    <Screen>
      <div className="lp-hero"><b>{offer.name}</b><small>{offer.details}</small></div>
      <div className="lp-row">
        <div><CountUp value={offer.views} />page views</div>
        <div><CountUp value={offer.signups} />sign-ups</div>
        <div><CountUp value={offer.conversion} suffix="%" />conversion</div>
      </div>
    </Screen>
  )
}
