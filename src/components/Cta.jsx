// The gold call-to-action button used all over the page.
export default function Cta({ href = '#pricing', sub, children }) {
  return (
    <a className="btn" href={href}>
      {children}
      {sub && <small>{sub}</small>}
    </a>
  )
}
