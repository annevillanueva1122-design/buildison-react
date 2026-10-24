import { useState } from 'react'
import { pricingNotes } from '../data/site.js'
import { usePlans } from '../lib/usePlans.js'

const fmt = v => '$' + (v % 1 ? v.toFixed(2) : v)

function Plan({ plan, annual }) {
  return (
    <div className={'plan' + (plan.popular ? ' pop' : '')}>
      {plan.popular && <span className="ribbon">Most popular</span>}
      <h3>{plan.name}</h3>
      <p className="for">{plan.tagline}</p>
      <div className="price">
        <span className="amt">{fmt(annual ? plan.annual : plan.monthly)}</span>
        <span className="per">/ month</span>
      </div>
      <p className="billed">
        {annual ? `billed annually · ${fmt(plan.monthly)} billed monthly` : 'billed monthly · no contract'}
      </p>
      <p className="setup"><span>+ one-time setup fee</span><b>{fmt(plan.setupFee)}</b></p>
      <a className="btn" href={plan.href}>{plan.cta}</a>
      {plan.promoCode
        ? <p className="promo">Use promo code <code>{plan.promoCode}</code> at checkout</p>
        : <p className="trial">7-day free trial</p>}
      <ul>
        {plan.includes && <li className="head">Everything in {plan.includes}, plus:</li>}
        {plan.features.map(f => <li key={f}>{f}</li>)}
      </ul>
    </div>
  )
}

export default function Pricing() {
  // One piece of state drives every price on the page
  const [annual, setAnnual] = useState(true)
  const { plans, source } = usePlans()

  return (
    <section className="band" id="pricing" data-plans-source={source}>
      <div className="wrap">
        <div className="center">
          <p className="eyebrow">7-day free trial</p>
          <h2 style={{ marginTop: 14 }}>Buildison <span className="green">Pricing</span></h2>
          <div className="perks"><span>No contracts</span><span>Cancel anytime</span><span>Unlimited users</span></div>
          <div className="toggle" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>
              Annual<span className="save">SAVE ~17%</span>
            </button>
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
          </div>
        </div>
        <div className="plans">
          {plans.map(p => <Plan key={p.name} plan={p} annual={annual} />)}
        </div>
        <div className="notes">
          {pricingNotes.map(n => <p key={n}>{n}</p>)}
        </div>
      </div>
    </section>
  )
}
