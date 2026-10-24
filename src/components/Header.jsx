import { useState } from 'react'
import Logo from './Logo.jsx'
import { contact } from '../data/site.js'

export default function Header() {
  // React state replaces the old classList.toggle('open') code
  const [open, setOpen] = useState(false)

  return (
    <header className="top">
      <div className="wrap">
        <Logo label="Buildison Agency home" />
        <button
          className="menu-btn"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
        >
          ☰
        </button>
        <nav
          className={'nav' + (open ? ' open' : '')}
          onClick={e => { if (e.target.tagName === 'A') setOpen(false) }}
        >
          <a className="link" href="#features">Features</a>
          <a className="link" href="#how">How it works</a>
          <a className="link" href="#pricing">Pricing</a>
          <a className="btn ghost" href={contact.loginUrl}>Log in</a>
        </nav>
      </div>
    </header>
  )
}
