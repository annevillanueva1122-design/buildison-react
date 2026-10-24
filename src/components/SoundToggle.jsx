import { useEffect, useRef, useState } from 'react'

// PLACEHOLDER: put an MP3 in the public/ folder and set this to '/music.mp3'. Empty = no music.
const MUSIC_URL = ''
const MUSIC_VOLUME = 0.12 // 0 = silent, 1 = full volume

const readSaved = () => {
  try { return localStorage.getItem('bld-sound') !== 'off' } catch { return true }
}

// Synthesized tech click sounds (no audio files) + optional quiet background music
export default function SoundToggle() {
  const [soundOn, setSoundOn] = useState(readSaved)
  const soundRef = useRef(soundOn) // read by the page-wide click listener
  const actx = useRef(null)
  const music = useRef(null)

  const tone = (type, f1, f2, start, len, vol, filt) => {
    const a = actx.current
    const o = a.createOscillator(), g = a.createGain(), f = a.createBiquadFilter()
    o.type = type; f.type = 'lowpass'; f.frequency.value = filt || 4000
    o.frequency.setValueAtTime(f1, start); o.frequency.exponentialRampToValueAtTime(f2, start + len)
    g.gain.setValueAtTime(0.0001, start); g.gain.exponentialRampToValueAtTime(vol, start + 0.004); g.gain.exponentialRampToValueAtTime(0.0001, start + len)
    o.connect(f); f.connect(g); g.connect(a.destination); o.start(start); o.stop(start + len + 0.02)
  }

  const blip = onButton => {
    if (!soundRef.current) return
    try {
      actx.current = actx.current || new (window.AudioContext || window.webkitAudioContext)()
      if (actx.current.state === 'suspended') actx.current.resume()
      const t = actx.current.currentTime
      if (onButton) { // two-step digital "confirm" chirp
        tone('square', 1200, 2400, t, 0.06, 0.05, 3500)
        tone('square', 1800, 3200, t + 0.07, 0.07, 0.045, 3800)
        tone('sine', 180, 90, t, 0.08, 0.12)
      } else { // short interface tick
        tone('square', 2200, 700, t, 0.045, 0.04, 3000)
        tone('sine', 140, 70, t, 0.05, 0.09)
      }
    } catch { /* audio not available */ }
  }

  // Browsers only allow music to start after the visitor's first click or tap
  const startMusic = () => {
    const m = music.current
    if (m && soundRef.current && m.paused) m.play().catch(() => {})
  }

  useEffect(() => {
    if (MUSIC_URL) {
      music.current = new Audio(MUSIC_URL)
      music.current.loop = true
      music.current.volume = MUSIC_VOLUME
      music.current.preload = 'none'
    }
    const onPointer = e => {
      if (e.target.closest?.('.snd')) return
      startMusic()
      blip(!!e.target.closest?.('a,button,.toggle,.chip'))
    }
    const onVisibility = () => {
      const m = music.current
      if (!m) return
      if (document.hidden) m.pause()
      else if (m.currentTime > 0) startMusic()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('visibilitychange', onVisibility)
      music.current?.pause()
    }
  }, [])

  const toggle = () => {
    const next = !soundOn
    setSoundOn(next)
    soundRef.current = next
    try { localStorage.setItem('bld-sound', next ? 'on' : 'off') } catch { /* storage blocked */ }
    if (next) { blip(true); startMusic() } else music.current?.pause()
  }

  return (
    <button type="button" className="snd" aria-pressed={soundOn} onClick={toggle}>
      <span className="bars" aria-hidden="true"><i /><i /><i /></span>
      <span className="lbl">{soundOn ? 'Sound on' : 'Sound off'}</span>
    </button>
  )
}
