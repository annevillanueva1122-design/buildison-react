import { useState } from 'react'
import { pricingNotes } from '../data/site.js'
import { usePlans } from '../lib/usePlans.js'


const fmt = v => '$' + (v % 1 ? v.toFixed(2) : v)


function Plan({ plan, annual }) {
  const checkoutReady = /^https?:\/\//i.test(plan.href || '')
  const promoReady = plan.promoCode && !plan.promoCode.includes('[')
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
      <a className="btn" href={checkoutReady ? plan.href : 'https://yhampower.vercel.app/'}>{checkoutReady ? plan.cta : 'Discuss this build'}</a>
      {promoReady
        ? <p className="promo">Use promo code <code>{plan.promoCode}</code> at checkout</p>
        : <p className="trial">{checkoutReady ? '7-day free trial' : 'Portfolio demo · no payment collected'}</p>}
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
