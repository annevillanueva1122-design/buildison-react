import { useState } from 'react'
import { pricingNotes } from '../data/site.js'
import { usePlans } from '../lib/usePlans.js'

const fmt = value => '$' + Number(value).toLocaleString('en-US', { maximumFractionDigits: 2, minimumFractionDigits: Number(value) % 1 ? 2 : 0 })

function Plan({ plan, annual }) {
  const checkoutReady = /^https?:/i.test(plan.href || '') && !plan.href.includes('[')
  const promoReady = plan.promoCode && !plan.promoCode.includes('[')
  return (
    <div className={'plan' + (plan.popular ? ' pop' : '')}>
      {plan.popular && <span className="ribbon">Most popular</span>}
      <h3>{plan.name}</h3>
      <p className="for">{plan.tagline}</p>
      <div className="price"><span className="amt">{fmt(annual ? plan.annual : plan.monthly)}</span><span className="per">/ month</span></div>
      <p className="billed">{annual ? 'billed annually · ' + fmt(plan.monthly) + ' billed monthly' : 'billed monthly · no contract'}</p>
      <p className="setup"><span>+ one-time setup fee</span><b>{fmt(plan.setupFee)}</b></p>
      <a className="btn" href={checkoutReady ? plan.href : 'https://yhampower.vercel.app/'}>{checkoutReady ? plan.cta : 'Discuss this build'}</a>
      {promoReady ? <p className="promo">Use promo code <code>{plan.promoCode}</code> at checkout</p> : <p className="trial">{checkoutReady ? '7-day free trial' : 'Portfolio demo · no payment collected'}</p>}
      <ul>
        {plan.includes && <li className="head">Everything in {plan.includes}, plus:</li>}
        {plan.features.map(feature => <li key={feature}>{feature}</li>)}
      </ul>
    </div>
  )
}

export default function Pricing() {
  const [annual, setAnnual] = useState(true)
  const { plans, source } = usePlans()
  return (
    <section className="band" id="pricing" data-plans-source={source}>
      <div className="wrap">
        <div className="center">
          <p className="eyebrow">Explore the plans</p>
          <h2 style={{ marginTop: 14 }}>Buildison <span className="green">Pricing</span></h2>
          <div className="perks"><span>No contracts</span><span>Cancel anytime</span><span>Unlimited users</span></div>
          <div className="toggle" role="group" aria-label="Billing period">
            <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>Annual<span className="save">SAVE ~17%</span></button>
            <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
          </div>
        </div>
        <div className="plans">{plans.map(plan => <Plan key={plan.name} plan={plan} annual={annual} />)}</div>
        <div className="notes">
          <p>Portfolio demonstration: product previews use sample data. Unconfigured checkout links open the developer portfolio.</p>
          {pricingNotes.map(note => <p key={note}>{note}</p>)}
        </div>
      </div>
    </section>
  )
}
