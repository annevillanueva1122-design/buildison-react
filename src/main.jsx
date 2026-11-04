import React, { lazy, Suspense, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'


// Keep admin UI and its styles out of the initial public-page download.
const AdminApp = lazy(() => Promise.all([import('./admin/AdminApp.jsx'), import('./admin/admin.css')]).then(([module]) => module))


function Root() {
  const [hash, setHash] = useState(window.location.hash)
  const isAdmin = hash === '#/admin' || hash.startsWith('#/admin/')
  useEffect(() => {
    const onChange = () => setHash(window.location.hash)
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])
  useEffect(() => {
    document.title = isAdmin ? 'Admin | Buildison Agency' : 'Buildison Agency | Marketing Automation & CRM'
  }, [isAdmin])
  return (
    <Suspense fallback={<main className="bld"><p className="wrap" role="status">Loading admin…</p></main>}>
      {isAdmin ? <AdminApp /> : <App />}
    </Suspense>
  )
}


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
)

