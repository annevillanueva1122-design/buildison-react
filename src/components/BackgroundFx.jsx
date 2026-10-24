import { useEffect, useRef } from 'react'
import { prefersReducedMotion } from '../lib/motion.js'

// Drifting gold/blue glows + a slow network of dots joined by faint lines, fixed behind every section
export default function BackgroundFx() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const c = canvasRef.current
    const x = c.getContext('2d')
    const reduce = prefersReducedMotion()
    let pts = [], W = 0, H = 0, raf

    const fit = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2)
      W = innerWidth; H = innerHeight
      c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0)
      const n = Math.round(Math.min(70, W * H / 22000))
      pts = []
      for (let i = 0; i < n; i++) {
        pts.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35, g: Math.random() < 0.6 })
      }
    }

    const frame = () => {
      x.clearRect(0, 0, W, H)
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > W) p.vx *= -1
        if (p.y < 0 || p.y > H) p.vy *= -1
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j], dx = p.x - q.x, dy = p.y - q.y, dist = dx * dx + dy * dy
          if (dist < 19600) {
            x.strokeStyle = (p.g ? 'rgba(212,175,55,' : 'rgba(63,169,255,') + (0.18 * (1 - dist / 19600)) + ')'
            x.lineWidth = 1
            x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke()
          }
        }
        x.fillStyle = p.g ? 'rgba(241,212,126,.55)' : 'rgba(63,169,255,.55)'
        x.beginPath(); x.arc(p.x, p.y, 1.6, 0, 6.283); x.fill()
      }
      if (!reduce) raf = requestAnimationFrame(frame)
    }

    fit(); frame()
    window.addEventListener('resize', fit)
    // Cleanup: stop the animation when the component is removed
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', fit) }
  }, [])

  return (
    <div className="bg-fx" aria-hidden="true">
      <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
      <canvas ref={canvasRef} />
    </div>
  )
}
