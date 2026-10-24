import { useEffect, useState } from 'react'
import { supabase } from './supabase.js'
import { plans as localPlans } from '../data/site.js'

// Turns a database row (snake_case) into the shape the Plan component expects
const fromRow = r => ({
  name: r.name,
  tagline: r.tagline,
  annual: Number(r.annual),
  monthly: Number(r.monthly),
  setupFee: Number(r.setup_fee),
  cta: r.cta,
  href: r.href,
  promoCode: r.promo_code,
  includes: r.includes,
  popular: r.popular,
  features: r.features || [],
})

// Shows the local plans right away, then swaps in the plans from Supabase once they load.
// If Supabase isn't set up or fails, the local plans simply stay.
export function usePlans() {
  const [plans, setPlans] = useState(localPlans)
  const [source, setSource] = useState('local')

  useEffect(() => {
    if (!supabase) return
    let cancelled = false
    supabase
      .from('plans')
      .select('*')
      .order('sort_order')
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) { console.warn('Could not load plans from Supabase:', error.message); return }
        if (data.length) { setPlans(data.map(fromRow)); setSource('supabase') }
      })
    return () => { cancelled = true }
  }, [])

  return { plans, source }
}
