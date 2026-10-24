import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '../lib/motion.js'

// Shows the final number right away, then counts up from 0 once it scrolls into view
export default function CountUp({ value, prefix = '', suffix = '' }) {
  const [shown, setShown] = useState(value)
  const ref = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || value === 0 || !('IntersectionObserver' in window)) return
    let raf
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      let start = null
      const step = ts => {
        if (!start) start = ts
        const p = Math.min((ts - start) / 1600, 1)
        setShown(value * (1 - Math.pow(1 - p, 3)))
        if (p < 1) raf = requestAnimationFrame(step)
      }
      raf = requestAnimationFrame(step)
    }, { threshold: 0.4 })
    io.observe(ref.current)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [value])

  return <b ref={ref}>{prefix}{Math.round(shown).toLocaleString('en-US')}{suffix}</b>
}
