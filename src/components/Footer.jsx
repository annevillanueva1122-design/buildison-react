import Logo from './Logo.jsx'
import { contact } from '../data/site.js'

const configured = value => value && value !== '#' && !value.includes('[')

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div>
          <Logo label="Buildison Agency" />
          <p style={{ marginTop: 12, maxWidth: '34ch' }}>Marketing automation, funnels and websites for growing businesses.</p>
          <p style={{ maxWidth: '40ch' }}>Portfolio project by May Anne Guevarra. Product previews display sample data.</p>
        </div>
        <div>
          <h4>Contact & project</h4>
          <div className="links">
            {configured(contact.email) && <a href={'mailto:' + contact.email}>{contact.email}</a>}
            {configured(contact.phone) && <a href={'tel:' + contact.phone.replace(/[^+0-9]/g, '')}>{contact.phone}</a>}
            {configured(contact.address) && <p>{contact.address}</p>}
            <a href="https://yhampower.vercel.app/">Meet the developer</a>
            <a href="https://github.com/annevillanueva1122-design/buildison-react">View source on GitHub</a>
          </div>
        </div>
        <div>
          <h4>Explore</h4>
          <div className="links">
            <a href="#features">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#/admin">Admin login</a>
            {configured(contact.privacyUrl) && <a href={contact.privacyUrl}>Privacy policy</a>}
            {configured(contact.termsUrl) && <a href={contact.termsUrl}>Terms of service</a>}
          </div>
        </div>
        <p className="copyright">© {new Date().getFullYear()} Buildison Agency. Portfolio demonstration.</p>
      </div>
    </footer>
  )
}
