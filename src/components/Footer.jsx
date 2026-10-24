import Logo from './Logo.jsx'
import { contact } from '../data/site.js'

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <Logo label="Buildison Agency" />
          <p style={{ marginTop: 12, maxWidth: '34ch' }}>Marketing automation, funnels and websites for growing businesses.</p>
        </div>
        <div>
          <h4>Contact</h4>
          <div className="links">
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
            <p>{contact.address}</p>
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <div className="links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href={contact.privacyUrl}>Privacy policy</a>
            <a href={contact.termsUrl}>Terms of service</a>
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Buildison Agency. All rights reserved.</p>
      </div>
    </footer>
  )
}
