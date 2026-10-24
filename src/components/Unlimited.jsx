import { features } from '../data/site.js'

const icons = {
  lines: <path d="M3 6h18M6 12h12M9 18h6" />,
  funnel: <path d="M4 4h16l-6 8v6l-4 2v-8z" />,
  form: <><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></>,
  users: <><path d="M17 20v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" /><circle cx="10" cy="7" r="4" /><path d="M21 20v-2a4 4 0 0 0-3-3.9" /></>,
  star: <path d="M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z" />,
}

export default function Unlimited() {
  return (
    <section className="band alt">
      <div className="wrap">
        <div className="center uwrap">
          <p className="eyebrow">Everything you need</p>
          <div className="big-word">Unlimited</div>
          <h2 style={{ marginTop: 18, fontSize: 'clamp(26px,3.6vw,40px)' }}>Automate the hardest part of growing your business</h2>
          <p>Unlimited pipelines, funnels and surveys mean you never have to guess who is ready to buy. Measure interest, adjust your offer and get the most out of every campaign.</p>
        </div>
        <div className="feat-grid">
          {features.map(f => (
            <div className="feat" key={f.title}>
              <div className="ic">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  {icons[f.icon]}
                </svg>
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
