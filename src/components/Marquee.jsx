import { channels } from '../data/site.js'

export default function Marquee() {
  // The list is rendered twice so the scroll animation loops seamlessly
  const items = [...channels, ...channels]
  return (
    <div className="marquee" aria-label="Channels and tools included">
      <div className="track">
        {items.map((c, i) => <span className="chip" key={i}>{c}</span>)}
      </div>
    </div>
  )
}
