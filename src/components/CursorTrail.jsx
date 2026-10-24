import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion, hasFinePointer } from '../lib/motion.js'

const LINES = 26, NODES = 42

// Springy strands chase the mouse; color drifts gold -> green -> blue. Mouse/trackpad only.
export default function CursorTrail() {
  const [enabled] = useState(() => !prefersReducedMotion() && hasFinePointer())
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!enabled) return
    const cv = canvasRef.current
    const ctx = cv.getContext('2d')
    let mx = -100, my = -100, lines = [], lastMove = 0, alpha = 0, raf

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      cv.width = innerWidth * dpr; cv.height = innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const makeLines = () => {
      lines = []
      for (let i = 0; i < LINES; i++) {
        const nodes = []
        for (let j = 0; j < NODES; j++) nodes.push({ x: mx, y: my, vx: 0, vy: 0 })
        lines.push({ spring: 0.45 + i / LINES * 0.025 + Math.random() * 0.1 - 0.05, friction: 0.5 + Math.random() * 0.01 - 0.005, nodes })
      }
    }

    const draw = t => {
      ctx.clearRect(0, 0, cv.width, cv.height)
      alpha += ((t - lastMove < 1400 ? 1 : 0) - alpha) * 0.06
      if (alpha < 0.01 || !lines.length) return
      const k = (Math.sin(t / 1600) + 1) / 2, hue = 46 + k * 161, sat = 70 + k * 30, lig = 55 + k * 7
      ctx.globalCompositeOperation = 'lighter'
      ctx.strokeStyle = `hsla(${hue},${sat}%,${lig}%,${0.42 * alpha})`
      ctx.lineWidth = 1
      lines.forEach(L => {
        let s = L.spring, a, b, i
        const n = L.nodes
        n[0].vx += (mx - n[0].x) * s; n[0].vy += (my - n[0].y) * s
        for (i = 0; i < n.length; i++) {
          a = n[i]
          if (i > 0) { b = n[i - 1]; a.vx += (b.x - a.x) * s + b.vx * 0.025; a.vy += (b.y - a.y) * s + b.vy * 0.025 }
          a.vx *= L.friction; a.vy *= L.friction; a.x += a.vx; a.y += a.vy; s *= 0.99
        }
        ctx.beginPath(); ctx.moveTo(n[0].x, n[0].y)
        for (i = 1; i < n.length - 2; i++) { a = n[i]; b = n[i + 1]; ctx.quadraticCurveTo(a.x, a.y, (a.x + b.x) / 2, (a.y + b.y) / 2) }
        a = n[n.length - 2]; b = n[n.length - 1]; ctx.quadraticCurveTo(a.x, a.y, b.x, b.y)
        ctx.stroke()
      })
      ctx.globalCompositeOperation = 'source-over'
    }

    const onMove = e => {
      mx = e.clientX; my = e.clientY; lastMove = performance.now()
      if (!lines.length) makeLines()
    }
    const loop = t => { draw(t || 0); raf = requestAnimationFrame(loop) }

    size()
    window.addEventListener('resize', size)
    document.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(loop)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', size)
      document.removeEventListener('mousemove', onMove)
    }
  }, [enabled])

  return enabled ? <canvas className="cur-trail" ref={canvasRef} /> : null
}
