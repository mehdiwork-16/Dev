import Link from 'next/link'
import { FaInstagram, FaFacebook, FaTiktok } from 'react-icons/fa'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/menu', label: 'Menu' },
  { href: '/about', label: 'About' },
  { href: '/reservation', label: 'Reservation' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-ebony-dark border-t border-ebony-border">
      {/* Gold top line */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Brand */}
        <div>
          <div className="mb-4">
            <span className="font-display text-3xl font-black tracking-[0.15em] text-gold-gradient">
              EBONY
            </span>
            <p className="text-[0.55rem] tracking-[0.35em] text-gold/60 uppercase font-medium mt-0.5">LOUNGE</p>
          </div>
          <p className="text-ebony-muted text-sm leading-relaxed max-w-xs">
            Where luxury meets nightlife. An exclusive escape crafted for those who demand nothing but the finest.
          </p>
          <div className="flex gap-4 mt-6">
            <a href="#" aria-label="Instagram" className="w-10 h-10 border border-ebony-border rounded-full flex items-center justify-center text-ebony-muted hover:text-gold hover:border-gold transition-all duration-300">
              <FaInstagram size={16} />
            </a>
            <a href="#" aria-label="Facebook" className="w-10 h-10 border border-ebony-border rounded-full flex items-center justify-center text-ebony-muted hover:text-gold hover:border-gold transition-all duration-300">
              <FaFacebook size={16} />
            </a>
            <a href="#" aria-label="TikTok" className="w-10 h-10 border border-ebony-border rounded-full flex items-center justify-center text-ebony-muted hover:text-gold hover:border-gold transition-all duration-300">
              <FaTiktok size={16} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="section-label mb-6">Navigation</h4>
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-ebony-muted text-sm hover:text-gold transition-colors duration-300 tracking-wide"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Hours */}
        <div>
          <h4 className="section-label mb-6">Opening Hours</h4>
          <ul className="space-y-3 text-sm">
            {[
              { day: 'Monday — Wednesday', hours: 'Closed' },
              { day: 'Thursday', hours: '9 PM — 3 AM' },
              { day: 'Friday — Saturday', hours: '9 PM — 5 AM' },
              { day: 'Sunday', hours: '8 PM — 2 AM' },
            ].map(({ day, hours }) => (
              <li key={day} className="flex justify-between gap-4">
                <span className="text-ebony-muted">{day}</span>
                <span className={hours === 'Closed' ? 'text-red-500/60' : 'text-gold'}>{hours}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-ebony-border">
            <p className="text-ebony-muted text-xs leading-relaxed">
              Minimum age: 21+ · Dress code enforced
            </p>
          </div>
        </div>
      </div>

      <div className="gold-divider" />
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="text-ebony-muted text-xs tracking-wide">
          © {new Date().getFullYear()} EBONY Lounge. All rights reserved.
        </p>
        <p className="text-ebony-muted/50 text-xs">
          Crafted with excellence
        </p>
      </div>
    </footer>
  )
}
