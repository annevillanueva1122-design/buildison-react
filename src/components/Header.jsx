import { useEffect, useRef, useState } from 'react'
import Logo from './Logo.jsx'
import { contact } from '../data/site.js'

export default function Header() {
  const [open, setOpen] = useState(false)
  const menuButton = useRef(null)
  const loginUrl = contact.loginUrl && contact.loginUrl !== '#' ? contact.loginUrl : '#/admin'

  useEffect(() => {
    if (!open) return
    const closeOnEscape = event => {
      if (event.key === 'Escape') {
        setOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <header className="top">
      <div className="wrap">
        <Logo label="Buildison Agency home" />
        <button ref={menuButton} type="button" className="menu-btn"
          aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}
          aria-controls="primary-navigation" onClick={() => setOpen(value => !value)}>
          <span aria-hidden="true">☰</span>
        </button>
        <nav id="primary-navigation" aria-label="Main navigation"
          className={'nav' + (open ? ' open' : '')}
          onClick={event => { if (event.target.closest('a')) setOpen(false) }}>
          <a className="link" href="#features">Features</a>
          <a className="link" href="#how">How it works</a>
          <a className="link" href="#pricing">Pricing</a>
          <a className="btn ghost" href={loginUrl}>{loginUrl === '#/admin' ? 'Admin login' : 'Log in'}</a>
        </nav>
      </div>
    </header>
  )
}
