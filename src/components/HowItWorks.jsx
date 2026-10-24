import Cta from './Cta.jsx'
import { steps } from '../data/site.js'

export default function HowItWorks() {
  return (
    <section className="band alt" id="how">
      <div className="wrap">
        <div className="center">
          <p className="eyebrow">How it works</p>
          <h2 style={{ marginTop: 14 }}>Start reaching your customers <span className="green">today</span></h2>
        </div>
        <div className="steps">
          {steps.map((s, i) => (
            <div className="step" key={s.title}>
              <span className="n">STEP {i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              {s.cta && <Cta>{s.cta}</Cta>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
