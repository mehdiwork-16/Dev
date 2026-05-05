'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram, FaFacebook, FaTiktok, FaCheck } from 'react-icons/fa'

const hours = [
  { day: 'Monday — Wednesday', hours: 'Closed' },
  { day: 'Thursday', hours: '9 PM — 3 AM' },
  { day: 'Friday', hours: '9 PM — 5 AM' },
  { day: 'Saturday', hours: '9 PM — 5 AM' },
  { day: 'Sunday', hours: '8 PM — 2 AM' },
]

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const update = (f: string, v: string) => {
    setForm(p => ({ ...p, [f]: v }))
    setErrors(p => ({ ...p, [f]: '' }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const e2: Record<string, string> = {}
    if (!form.name.trim()) e2.name = 'Required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e2.email = 'Valid email required'
    if (!form.message.trim()) e2.message = 'Required'
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    setSent(true)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=1920&q=80"
          alt="Contact"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ebony-black/80" />
        <div className="absolute inset-0 bg-gold-radial opacity-40" />

        <div className="relative z-10 text-center px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-4">
            ✦ Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-6xl lg:text-8xl font-black text-white"
          >
            CONTACT
          </motion.h1>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <SectionReveal direction="left">
              <div>
                <p className="section-label mb-4">✦ Find Us</p>
                <h2 className="font-display text-4xl font-bold text-white mb-8">
                  We&apos;re here for <span className="text-gold-gradient">You</span>
                </h2>
              </div>
            </SectionReveal>

            {[
              { icon: FaMapMarkerAlt, label: 'Address', value: '14 Rue des Palmiers, Alger Centre, Algeria' },
              { icon: FaPhone, label: 'Phone', value: '+213 21 XX XX XX' },
              { icon: FaEnvelope, label: 'Email', value: 'hello@ebonylounge.dz' },
            ].map(({ icon: Icon, label, value }, i) => (
              <SectionReveal key={label} direction="left" delay={0.1 * (i + 1)}>
                <div className="flex items-start gap-5">
                  <div className="w-11 h-11 rounded-full border border-gold/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon size={14} className="text-gold" />
                  </div>
                  <div>
                    <p className="text-[0.6rem] tracking-[0.2em] text-gold uppercase font-semibold mb-1">{label}</p>
                    <p className="text-[#C0B8A8] text-sm">{value}</p>
                  </div>
                </div>
              </SectionReveal>
            ))}

            <SectionReveal direction="left" delay={0.4}>
              <div>
                <p className="section-label mb-4">✦ Opening Hours</p>
                <ul className="space-y-3">
                  {hours.map(({ day, hours: h }) => (
                    <li key={day} className="flex justify-between text-sm border-b border-ebony-border pb-3">
                      <span className="text-ebony-muted">{day}</span>
                      <span className={h === 'Closed' ? 'text-red-500/60' : 'text-gold font-medium'}>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionReveal>

            <SectionReveal direction="left" delay={0.5}>
              <div>
                <p className="section-label mb-4">✦ Follow Us</p>
                <div className="flex gap-3">
                  {[
                    { icon: FaInstagram, href: '#', label: 'Instagram' },
                    { icon: FaFacebook, href: '#', label: 'Facebook' },
                    { icon: FaTiktok, href: '#', label: 'TikTok' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-11 h-11 border border-ebony-border rounded-full flex items-center justify-center text-ebony-muted hover:text-gold hover:border-gold transition-all duration-300"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <SectionReveal direction="right">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card p-12 rounded-sm text-center h-full flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold flex items-center justify-center mb-6">
                    <FaCheck size={24} className="text-gold" />
                  </div>
                  <h3 className="font-display text-3xl font-bold text-white mb-3">Message Sent!</h3>
                  <p className="text-ebony-muted max-w-sm leading-relaxed">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="glass-card p-8 rounded-sm space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={form.name}
                        onChange={e => update('name', e.target.value)}
                        className={`input-dark w-full px-4 py-3.5 text-sm ${errors.name ? 'border-red-500/50' : ''}`}
                      />
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Email</label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={e => update('email', e.target.value)}
                        className={`input-dark w-full px-4 py-3.5 text-sm ${errors.email ? 'border-red-500/50' : ''}`}
                      />
                      {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => update('subject', e.target.value)}
                      className="input-dark w-full px-4 py-3.5 text-sm appearance-none"
                    >
                      <option value="">Select a subject</option>
                      <option>Table Reservation</option>
                      <option>Event Enquiry</option>
                      <option>VIP Package</option>
                      <option>Private Event / Hire</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Message</label>
                    <textarea
                      placeholder="How can we help you?"
                      value={form.message}
                      onChange={e => update('message', e.target.value)}
                      rows={5}
                      className={`input-dark w-full px-4 py-3.5 text-sm resize-none ${errors.message ? 'border-red-500/50' : ''}`}
                    />
                    {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" className="btn-gold w-full py-4 text-xs tracking-[0.2em] z-10 relative">
                    Send Message
                  </button>
                </form>
              )}
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <section className="h-80 relative overflow-hidden">
        <div className="absolute inset-0 bg-ebony-dark flex items-center justify-center border-t border-ebony-border">
          <div className="text-center">
            <FaMapMarkerAlt size={32} className="text-gold mx-auto mb-3" />
            <p className="text-ebony-muted text-sm tracking-wide">14 Rue des Palmiers, Alger Centre</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold text-xs tracking-[0.15em] uppercase font-semibold hover:underline mt-2 block"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
