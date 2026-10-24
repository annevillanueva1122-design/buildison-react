import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase.js'
import Logo from '../components/Logo.jsx'
import PlansEditor from './PlansEditor.jsx'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setBusy(true); setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    setBusy(false)
  }

  return (
    <form className="adm-card adm-login" onSubmit={submit}>
      <p className="eyebrow">Admin</p>
      <h1>Log in</h1>
      <label className="field">
        <span>Email</span>
        <input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label className="field">
        <span>Password</span>
        <input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      {error && <p className="adm-msg err" role="alert">{error}</p>}
      <button className="btn sm" type="submit" disabled={busy}>{busy ? 'Logging in…' : 'Log in'}</button>
    </form>
  )
}

// Logged in is not enough: the user must also be in the admins table
function AdminGate({ session }) {
  const [isAdmin, setIsAdmin] = useState(undefined)

  useEffect(() => {
    supabase
      .from('admins')
      .select('user_id')
      .eq('user_id', session.user.id)
      .maybeSingle()
      .then(({ data, error }) => setIsAdmin(!error && !!data))
  }, [session.user.id])

  if (isAdmin === undefined) return <p className="adm-muted">Checking access…</p>
  if (!isAdmin) {
    return (
      <div className="adm-card adm-login">
        <h1>No access</h1>
        <p className="adm-muted">
          You're logged in as <b>{session.user.email}</b>, but this account isn't an admin yet.
          Add it to the <code>admins</code> table in Supabase (see supabase/admin.sql).
        </p>
      </div>
    )
  }
  return <PlansEditor />
}

export default function AdminApp() {
  const [session, setSession] = useState(undefined) // undefined = still loading

  useEffect(() => {
    if (!supabase) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  let body
  if (!supabase) body = <p className="adm-msg err">Supabase isn't set up. Add your keys to the .env file and restart.</p>
  else if (session === undefined) body = <p className="adm-muted">Loading…</p>
  else if (!session) body = <LoginForm />
  else body = <AdminGate session={session} />

  return (
    <div className="bld adm">
      <header className="top">
        <div className="wrap">
          <Logo label="Back to Buildison Agency website" />
          <div className="adm-nav">
            <a className="link" href="#home">View site</a>
            {session && <button className="btn ghost" type="button" onClick={() => supabase.auth.signOut()}>Log out</button>}
          </div>
        </div>
      </header>
      <main className="wrap adm-main">{body}</main>
    </div>
  )
}
