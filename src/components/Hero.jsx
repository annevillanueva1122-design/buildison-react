import { useEffect, useRef } from 'react'
import Cta from './Cta.jsx'
import { stats } from '../data/site.js'
import { prefersReducedMotion } from '../lib/motion.js'

const reel = Array.from({ length: 30 }, (_, r) => <span key={r}>{r % 10}</span>)

// One stat whose digits spin like an odometer when it scrolls into view or the mouse moves over it
function RollingStat({ value, label }) {
  const numRef = useRef(null)
  const lastSpin = useRef(0)

  const spin = () => {
    if (prefersReducedMotion()) return
    lastSpin.current = Date.now()
    numRef.current.querySelectorAll('.roll-strip').forEach(s => {
      s.style.transition = 'none'
      s.style.transform = 'translateY(0)'
      s.offsetHeight // apply the start position before animating
      s.style.transition = ''
      s.style.transitionDelay = (+s.dataset.i * 0.15) + 's'
      s.style.transform = `translateY(-${20 + +s.dataset.d}em)`
    })
  }

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { spin(); io.disconnect() }
    }, { threshold: 0.5 })
    io.observe(numRef.current)
    return () => io.disconnect()
  }, [])

  // Ignore hovers while a roll is still running
  const onEnter = () => { if (Date.now() - lastSpin.current >= 1600) spin() }

  let digit = 0
  return (
    <div className="stat" onMouseEnter={onEnter}>
      <div className="num roll" ref={numRef} aria-label={value}>
        {value.split('').map((ch, i) =>
          /\d/.test(ch) ? (
            <span className="roll-col" aria-hidden="true" key={i}>
              <span
                className="roll-strip"
                data-d={ch}
                data-i={digit++}
                style={{ transform: `translateY(-${20 + +ch}em)` }}
              >
                {reel}
              </span>
            </span>
          ) : (
            <span aria-hidden="true" key={i}>{ch === ' ' ? ' ' : ch}</span>
          )
        )}
      </div>
      <div className="lbl">{label}</div>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="blob a" /><div className="blob b" /><div className="blob c" />
      <div className="gridlines" />
      <div className="wrap">
        <p className="eyebrow">Marketing automation by Buildison Agency</p>
        <h1 style={{ marginTop: 18 }}>Build smarter.<br /><span className="green">Grow faster.</span></h1>
        <p className="lede">
          Put your <b>content</b>, <b>conversations</b> and <b>customer follow-up</b> on autopilot, all from one platform.
        </p>
        <Cta sub="7-day free trial">Try Buildison free</Cta>
        <div className="stats">
          {stats.map(s => <RollingStat key={s.label} {...s} />)}
        </div>
      </div>
    </section>
  )
}
