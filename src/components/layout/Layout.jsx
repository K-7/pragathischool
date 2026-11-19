import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import WhatsAppFab from '../contact/WhatsAppFab.jsx'

/** Client-side navigation should land at the top of the new page. */
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <ScrollToTop />
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
    </div>
  )
}
