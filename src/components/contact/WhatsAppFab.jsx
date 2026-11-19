import { whatsappHref } from '../../lib/enquiry.js'
import { BRAND } from '../../data/site.js'
import Icon from '../ui/Icon.jsx'

/**
 * Fixed quick-contact button, mobile only. Renders nothing until a real phone
 * number is configured, rather than shipping a dead wa.me link.
 */
export default function WhatsAppFab() {
  const href = whatsappHref(
    `Hello ${BRAND}, I would like to enquire about admission.`,
  )
  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-[0_8px_28px_rgba(18,40,74,0.32)] transition-transform duration-300 hover:scale-105 lg:hidden"
    >
      <Icon name="whatsapp" className="text-2xl" />
    </a>
  )
}
