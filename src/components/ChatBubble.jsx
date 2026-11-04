import { useState } from 'react'
import { contact } from '../data/site.js'


export default function ChatBubble() {
  // Start closed on phones so the card doesn't cover the page
  const [open, setOpen] = useState(false)
  const hasPhone = contact.phone && !contact.phone.includes('[')


  return (
    <div className="chat">
      {open && (
        <div className="chat-card" id="project-help" role="region" aria-label="Project information">
          <button type="button" aria-label="Close message" onClick={() => setOpen(false)}>×</button>
          <b>Hi there, have a question?</b>
          {hasPhone ? <a href={'tel:' + contact.phone.replace(/[^+0-9]/g, '')}>Call {contact.phone}</a> : <><p>This is a portfolio demo, not a live support chat.</p><a href="https://yhampower.vercel.app/">Contact the developer</a></>}
        </div>
      )}
      <button className="chat-btn" type="button" aria-label={open ? 'Close project information' : 'Show project information'} aria-expanded={open} aria-controls="project-help" onClick={() => setOpen(o => !o)}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
        </svg>
      </button>
    </div>
  )
}

