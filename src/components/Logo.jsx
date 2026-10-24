export default function Logo({ label }) {
  return (
    <a className="logo" href="#home" aria-label={label}>
      <span className="logo-mark" aria-hidden="true">B</span>
      <span>Buildison <em>Agency</em></span>
    </a>
  )
}
