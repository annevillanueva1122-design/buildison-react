import Cta from './Cta.jsx'

// One text + mock-screen row. Five sections reuse this instead of repeating the same HTML five times.
export default function FeatureRow({ eyebrow, title, subtitle, children, screen, flip = false, alt = false }) {
  return (
    <section className={'band' + (alt ? ' alt' : '')}>
      <div className={'wrap row' + (flip ? ' flip' : '')}>
        <div className="copy">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
          {children}
          <Cta>Start 7-day free trial</Cta>
        </div>
        {screen}
      </div>
    </section>
  )
}
