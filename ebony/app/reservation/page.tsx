'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import { FaCheck, FaUser, FaCalendarAlt, FaClock, FaChair } from 'react-icons/fa'

const timeSlots = ['9:00 PM', '9:30 PM', '10:00 PM', '10:30 PM', '11:00 PM', '11:30 PM', '12:00 AM']

const tableTypes = [
  {
    id: 'standard',
    name: 'Standard Table',
    capacity: 'Up to 4 guests',
    price: 'No minimum',
    perks: ['Prime floor access', 'Cocktail service', 'Reserved seating'],
  },
  {
    id: 'premium',
    name: 'Premium Table',
    capacity: 'Up to 6 guests',
    price: '15,000 DZD min.',
    perks: ['Elevated section', 'Dedicated server', 'Welcome drinks', 'Priority entry'],
  },
  {
    id: 'vip',
    name: 'VIP Suite',
    capacity: 'Up to 10 guests',
    price: '35,000 DZD min.',
    perks: ['Private booth', 'Personal host', 'Champagne arrival', 'Priority entry', 'Exclusive menu'],
    highlighted: true,
  },
]

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  time: string
  guests: string
  tableType: string
  notes: string
}

export default function ReservationPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '',
    tableType: '',
    notes: '',
  })
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const update = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setErrors(prev => ({ ...prev, [field]: '' }))
  }

  const validateStep1 = () => {
    const e: Partial<FormData> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim()) e.lastName = 'Required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.phone.trim()) e.phone = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e: Partial<FormData> = {}
    if (!form.date) e.date = 'Required'
    if (!form.time) e.time = 'Required'
    if (!form.guests) e.guests = 'Required'
    if (!form.tableType) e.tableType = 'Required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const nextStep = () => {
    if (step === 1 && validateStep1()) setStep(2)
    else if (step === 2 && validateStep2()) setStep(3)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-24 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80"
          alt="Reserve"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ebony-black/80" />
        <div className="absolute inset-0 bg-gold-radial opacity-40" />

        <div className="relative z-10 text-center px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-4">
            ✦ Reserve Your Experience
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-6xl lg:text-8xl font-black text-white"
          >
            RESERVATION
          </motion.h1>
        </div>
      </section>

      <section className="py-20 px-6 lg:px-12 max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring' }}
                className="w-20 h-20 rounded-full bg-gold/10 border border-gold flex items-center justify-center mx-auto mb-8"
              >
                <FaCheck size={32} className="text-gold" />
              </motion.div>
              <h2 className="font-display text-4xl font-bold text-white mb-4">Reservation Confirmed!</h2>
              <p className="text-ebony-muted max-w-md mx-auto leading-relaxed mb-2">
                Thank you, <span className="text-gold">{form.firstName}</span>. Your reservation at EBONY Lounge has been received.
              </p>
              <p className="text-ebony-muted text-sm mb-10">A confirmation will be sent to <span className="text-gold">{form.email}</span></p>
              <div className="glass-card p-8 max-w-md mx-auto text-left rounded-sm">
                <h3 className="section-label mb-4">Your Booking Summary</h3>
                <ul className="space-y-3 text-sm">
                  {[
                    { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                    { label: 'Date', value: form.date },
                    { label: 'Time', value: form.time },
                    { label: 'Guests', value: form.guests },
                    { label: 'Table', value: tableTypes.find(t => t.id === form.tableType)?.name || '' },
                  ].map(({ label, value }) => (
                    <li key={label} className="flex justify-between">
                      <span className="text-ebony-muted">{label}</span>
                      <span className="text-white font-medium">{value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {/* Step indicator */}
              <div className="flex items-center justify-center gap-3 mb-14">
                {[1, 2, 3].map(s => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold transition-all duration-500 ${
                        step >= s
                          ? 'bg-gold border-gold text-ebony-black'
                          : 'border-ebony-border text-ebony-muted'
                      }`}
                    >
                      {step > s ? <FaCheck size={12} /> : s}
                    </div>
                    <span className={`text-[0.65rem] tracking-[0.15em] uppercase font-semibold hidden sm:block ${step >= s ? 'text-gold' : 'text-ebony-muted'}`}>
                      {['Your Info', 'Details', 'Review'][s - 1]}
                    </span>
                    {s < 3 && <div className={`w-16 h-px mx-1 transition-colors duration-500 ${step > s ? 'bg-gold' : 'bg-ebony-border'}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                <AnimatePresence mode="wait">
                  {/* STEP 1 — Personal Info */}
                  {step === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      <SectionReveal className="text-center mb-10">
                        <p className="section-label mb-2">Step 1 of 3</p>
                        <h2 className="font-display text-3xl font-bold text-white">Your Information</h2>
                      </SectionReveal>

                      <div className="glass-card p-8 rounded-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          {[
                            { field: 'firstName' as keyof FormData, label: 'First Name', placeholder: 'John', icon: FaUser },
                            { field: 'lastName' as keyof FormData, label: 'Last Name', placeholder: 'Doe', icon: FaUser },
                          ].map(({ field, label, placeholder, icon: Icon }) => (
                            <div key={field}>
                              <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">
                                {label}
                              </label>
                              <div className="relative">
                                <Icon size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" />
                                <input
                                  type="text"
                                  placeholder={placeholder}
                                  value={form[field]}
                                  onChange={e => update(field, e.target.value)}
                                  className={`input-dark w-full pl-10 pr-4 py-3.5 text-sm ${errors[field] ? 'border-red-500/50' : ''}`}
                                />
                              </div>
                              {errors[field] && <p className="text-red-400 text-xs mt-1">{errors[field]}</p>}
                            </div>
                          ))}

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

                          <div>
                            <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Phone</label>
                            <input
                              type="tel"
                              placeholder="+213 XX XX XX XX"
                              value={form.phone}
                              onChange={e => update('phone', e.target.value)}
                              className={`input-dark w-full px-4 py-3.5 text-sm ${errors.phone ? 'border-red-500/50' : ''}`}
                            />
                            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end mt-6">
                        <button type="button" onClick={nextStep} className="btn-gold px-10 py-4 text-xs tracking-[0.2em] z-10 relative">
                          Continue
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 2 — Booking Details */}
                  {step === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      <SectionReveal className="text-center mb-10">
                        <p className="section-label mb-2">Step 2 of 3</p>
                        <h2 className="font-display text-3xl font-bold text-white">Booking Details</h2>
                      </SectionReveal>

                      <div className="glass-card p-8 rounded-sm space-y-6">
                        {/* Date & Guests */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Date</label>
                            <div className="relative">
                              <FaCalendarAlt size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" />
                              <input
                                type="date"
                                value={form.date}
                                onChange={e => update('date', e.target.value)}
                                min={new Date().toISOString().split('T')[0]}
                                className={`input-dark w-full pl-10 pr-4 py-3.5 text-sm ${errors.date ? 'border-red-500/50' : ''}`}
                              />
                            </div>
                            {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
                          </div>

                          <div>
                            <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Guests</label>
                            <div className="relative">
                              <FaUser size={12} className="absolute left-4 top-1/2 -translate-y-1/2 text-gold/50" />
                              <select
                                value={form.guests}
                                onChange={e => update('guests', e.target.value)}
                                className={`input-dark w-full pl-10 pr-4 py-3.5 text-sm appearance-none ${errors.guests ? 'border-red-500/50' : ''}`}
                              >
                                <option value="">Select guests</option>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                                  <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                                ))}
                              </select>
                            </div>
                            {errors.guests && <p className="text-red-400 text-xs mt-1">{errors.guests}</p>}
                          </div>
                        </div>

                        {/* Time */}
                        <div>
                          <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-3 font-semibold">
                            <FaClock size={10} className="inline mr-2 text-gold" />Arrival Time
                          </label>
                          <div className="grid grid-cols-3 sm:grid-cols-7 gap-2">
                            {timeSlots.map(slot => (
                              <button
                                key={slot}
                                type="button"
                                onClick={() => update('time', slot)}
                                className={`py-2.5 text-[0.6rem] tracking-[0.08em] font-semibold transition-all duration-300 rounded-sm ${
                                  form.time === slot
                                    ? 'bg-gold text-ebony-black'
                                    : 'border border-ebony-border text-ebony-muted hover:border-gold hover:text-gold'
                                }`}
                              >
                                {slot}
                              </button>
                            ))}
                          </div>
                          {errors.time && <p className="text-red-400 text-xs mt-2">{errors.time}</p>}
                        </div>

                        {/* Table Type */}
                        <div>
                          <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-3 font-semibold">
                            <FaChair size={10} className="inline mr-2 text-gold" />Table Type
                          </label>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {tableTypes.map(table => (
                              <button
                                key={table.id}
                                type="button"
                                onClick={() => update('tableType', table.id)}
                                className={`p-5 text-left transition-all duration-300 rounded-sm relative ${
                                  form.tableType === table.id
                                    ? 'border-2 border-gold bg-gold/5 shadow-gold'
                                    : 'border border-ebony-border hover:border-gold/40'
                                } ${table.highlighted ? 'ring-1 ring-gold/20' : ''}`}
                              >
                                {table.highlighted && (
                                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[0.55rem] tracking-[0.15em] bg-gold text-ebony-black px-3 py-0.5 font-bold whitespace-nowrap">
                                    MOST POPULAR
                                  </span>
                                )}
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-display text-base font-bold text-white">{table.name}</h4>
                                  {form.tableType === table.id && (
                                    <FaCheck size={10} className="text-gold" />
                                  )}
                                </div>
                                <p className="text-gold text-xs font-semibold mb-1">{table.price}</p>
                                <p className="text-ebony-muted text-xs mb-3">{table.capacity}</p>
                                <ul className="space-y-1">
                                  {table.perks.map(perk => (
                                    <li key={perk} className="text-[0.65rem] text-ebony-muted flex items-center gap-1.5">
                                      <span className="w-1 h-1 rounded-full bg-gold/50 flex-shrink-0" />
                                      {perk}
                                    </li>
                                  ))}
                                </ul>
                              </button>
                            ))}
                          </div>
                          {errors.tableType && <p className="text-red-400 text-xs mt-2">{errors.tableType}</p>}
                        </div>

                        {/* Notes */}
                        <div>
                          <label className="block text-[0.65rem] tracking-[0.2em] uppercase text-ebony-muted mb-2 font-semibold">Special Requests (optional)</label>
                          <textarea
                            placeholder="Allergies, special occasions, bottle preferences..."
                            value={form.notes}
                            onChange={e => update('notes', e.target.value)}
                            rows={3}
                            className="input-dark w-full px-4 py-3.5 text-sm resize-none"
                          />
                        </div>
                      </div>

                      <div className="flex justify-between mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="btn-outline-gold px-8 py-3.5 text-xs tracking-[0.15em]"
                        >
                          Back
                        </button>
                        <button type="button" onClick={nextStep} className="btn-gold px-10 py-4 text-xs tracking-[0.2em] z-10 relative">
                          Review Booking
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3 — Review */}
                  {step === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30 }}
                      transition={{ duration: 0.35 }}
                    >
                      <SectionReveal className="text-center mb-10">
                        <p className="section-label mb-2">Step 3 of 3</p>
                        <h2 className="font-display text-3xl font-bold text-white">Review & Confirm</h2>
                      </SectionReveal>

                      <div className="glass-card p-8 rounded-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div>
                            <h3 className="section-label mb-4">Personal Details</h3>
                            <ul className="space-y-3 text-sm">
                              {[
                                { label: 'Name', value: `${form.firstName} ${form.lastName}` },
                                { label: 'Email', value: form.email },
                                { label: 'Phone', value: form.phone },
                              ].map(({ label, value }) => (
                                <li key={label} className="flex justify-between border-b border-ebony-border pb-3">
                                  <span className="text-ebony-muted">{label}</span>
                                  <span className="text-white">{value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h3 className="section-label mb-4">Booking Details</h3>
                            <ul className="space-y-3 text-sm">
                              {[
                                { label: 'Date', value: form.date },
                                { label: 'Time', value: form.time },
                                { label: 'Guests', value: `${form.guests} guests` },
                                { label: 'Table', value: tableTypes.find(t => t.id === form.tableType)?.name || '' },
                                ...(form.notes ? [{ label: 'Requests', value: form.notes }] : []),
                              ].map(({ label, value }) => (
                                <li key={label} className="flex justify-between border-b border-ebony-border pb-3">
                                  <span className="text-ebony-muted">{label}</span>
                                  <span className="text-white text-right max-w-[180px]">{value}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <p className="text-ebony-muted text-xs mt-6 pt-6 border-t border-ebony-border">
                          By confirming, you agree to our reservation policy. A 48-hour cancellation notice is required to avoid charges.
                        </p>
                      </div>

                      <div className="flex justify-between mt-6">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="btn-outline-gold px-8 py-3.5 text-xs tracking-[0.15em]"
                        >
                          Back
                        </button>
                        <button type="submit" className="btn-gold px-10 py-4 text-xs tracking-[0.2em] z-10 relative">
                          Confirm Reservation
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  )
}
