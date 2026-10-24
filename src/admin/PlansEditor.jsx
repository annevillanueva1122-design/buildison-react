import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'

// Database row -> form values (numbers and lists become editable text)
const toDraft = r => ({
  name: r.name ?? '',
  tagline: r.tagline ?? '',
  annual: String(r.annual),
  monthly: String(r.monthly),
  setup_fee: String(r.setup_fee),
  cta: r.cta ?? '',
  href: r.href ?? '',
  promo_code: r.promo_code ?? '',
  includes: r.includes ?? '',
  popular: !!r.popular,
  features: (r.features || []).join('\n'),
})

// Form values -> database row, or an error message
const toRow = d => {
  const raw = [d.annual, d.monthly, d.setup_fee]
  if (!d.name.trim()) return { error: 'Name is required.' }
  if (raw.some(v => String(v).trim() === '' || !Number.isFinite(Number(v)) || Number(v) < 0)) return { error: 'Prices must be numbers of 0 or more.' }
  const nums = { annual: Number(d.annual), monthly: Number(d.monthly), setup_fee: Number(d.setup_fee) }
  return {
    row: {
      name: d.name.trim(),
      tagline: d.tagline.trim() || null,
      ...nums,
      cta: d.cta.trim() || 'Try for free',
      href: d.href.trim() || '#',
      promo_code: d.promo_code.trim() || null,
      includes: d.includes.trim() || null,
      popular: d.popular,
      features: d.features.split('\n').map(f => f.trim()).filter(Boolean),
    },
  }
}

function Field({ label, children, wide }) {
  return <label className={'field' + (wide ? ' wide' : '')}><span>{label}</span>{children}</label>
}

function PlanForm({ plan }) {
  const [saved, setSaved] = useState(() => toDraft(plan))
  const [draft, setDraft] = useState(saved)
  const [status, setStatus] = useState(null) // { ok: boolean, text: string }
  const [busy, setBusy] = useState(false)

  const dirty = JSON.stringify(draft) !== JSON.stringify(saved)
  const set = key => e => {
    setDraft({ ...draft, [key]: e.target.type === 'checkbox' ? e.target.checked : e.target.value })
    setStatus(null)
  }

  const save = async e => {
    e.preventDefault()
    const { row, error } = toRow(draft)
    if (error) { setStatus({ ok: false, text: error }); return }
    setBusy(true)
    // .select() returns the updated row; an empty result means the security rules blocked the change
    const { data, error: dbError } = await supabase.from('plans').update(row).eq('id', plan.id).select()
    setBusy(false)
    if (dbError) setStatus({ ok: false, text: dbError.message })
    else if (!data.length) setStatus({ ok: false, text: 'Not saved: this account is not allowed to edit plans.' })
    else {
      const fresh = toDraft(data[0])
      setSaved(fresh); setDraft(fresh)
      setStatus({ ok: true, text: 'Saved. The website shows the new values on its next load.' })
    }
  }

  return (
    <form className="adm-card" onSubmit={save}>
      <div className="adm-plan-head">
        <h2>{saved.name}</h2>
        {saved.popular && <span className="tag">MOST POPULAR</span>}
      </div>
      <div className="adm-grid">
        <Field label="Name"><input value={draft.name} onChange={set('name')} required /></Field>
        <Field label="Tagline"><input value={draft.tagline} onChange={set('tagline')} /></Field>
        <Field label="Monthly price ($, month-to-month)"><input type="number" min="0" step="0.01" value={draft.monthly} onChange={set('monthly')} required /></Field>
        <Field label="Annual price ($/month, billed yearly)"><input type="number" min="0" step="0.01" value={draft.annual} onChange={set('annual')} required /></Field>
        <Field label="Setup fee ($)"><input type="number" min="0" step="0.01" value={draft.setup_fee} onChange={set('setup_fee')} required /></Field>
        <Field label="Button text"><input value={draft.cta} onChange={set('cta')} /></Field>
        <Field label="Button link (checkout URL)"><input value={draft.href} onChange={set('href')} /></Field>
        <Field label="Promo code (optional)"><input value={draft.promo_code} onChange={set('promo_code')} /></Field>
        <Field label='"Everything in ___, plus" (optional)'><input value={draft.includes} onChange={set('includes')} /></Field>
        <label className="check"><input type="checkbox" checked={draft.popular} onChange={set('popular')} /> Mark as “Most popular”</label>
        <Field label="Features (one per line)" wide>
          <textarea rows={Math.min(12, Math.max(5, draft.features.split('\n').length + 1))} value={draft.features} onChange={set('features')} />
        </Field>
      </div>
      <div className="adm-actions">
        <button className="btn sm" type="submit" disabled={!dirty || busy}>{busy ? 'Saving…' : 'Save changes'}</button>
        {dirty && !busy && <button className="btn ghost" type="button" onClick={() => { setDraft(saved); setStatus(null) }}>Undo</button>}
        {status && <p className={'adm-msg ' + (status.ok ? 'ok' : 'err')} role="status">{status.text}</p>}
      </div>
    </form>
  )
}

export default function PlansEditor() {
  const [plans, setPlans] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase
      .from('plans')
      .select('*')
      .order('sort_order')
      .then(({ data, error }) => { if (error) setError(error.message); else setPlans(data) })
  }, [])

  return (
    <>
      <p className="eyebrow">Admin</p>
      <h1>Pricing plans</h1>
      <p className="adm-muted" style={{ marginTop: 10 }}>Edit a plan and press Save. Changes go live on the website right away.</p>
      {error && <p className="adm-msg err">{error}</p>}
      {!plans && !error && <p className="adm-muted">Loading plans…</p>}
      <div className="adm-plans">
        {plans?.map(p => <PlanForm key={p.id} plan={p} />)}
      </div>
    </>
  )
}
