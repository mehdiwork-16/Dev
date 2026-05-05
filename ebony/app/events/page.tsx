'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'
import { FaCalendarAlt, FaClock, FaMapMarkerAlt } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'

const allEvents = [
  {
    id: 1,
    title: 'NOIR NIGHT',
    date: 'Saturday, May 10',
    time: '10 PM — 5 AM',
    tag: 'DJ SET',
    category: 'DJ',
    desc: 'An all-black dress code evening with the finest DJ sets and premium bottle service. Our resident DJ takes you on a sonic journey through the night.',
    img: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=800&q=80',
    price: '2,500 DZD',
    featured: true,
  },
  {
    id: 2,
    title: 'GOLDEN HOUR',
    date: 'Friday, May 16',
    time: '9 PM — 4 AM',
    tag: 'LIVE',
    category: 'Live',
    desc: 'Live performances, champagne towers, and a night draped in gold under neon lights. An experience curated for the extraordinary.',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80',
    price: '3,000 DZD',
    featured: true,
  },
  {
    id: 3,
    title: 'DEEP HOUSE SESSION',
    date: 'Saturday, May 17',
    time: '11 PM — 6 AM',
    tag: 'EXCLUSIVE',
    category: 'DJ',
    desc: 'Limited tickets. Deep house masters behind the decks — pure sonic luxury for the discerning music lover.',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    price: '3,500 DZD',
    featured: false,
  },
  {
    id: 4,
    title: 'VELVET SUNDAYS',
    date: 'Sunday, May 18',
    time: '8 PM — 2 AM',
    tag: 'WEEKLY',
    category: 'Special',
    desc: 'Wind down in luxury every Sunday. Soft beats, premium cocktails, and intimate table settings for those who know how to relax in style.',
    img: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=800&q=80',
    price: '1,800 DZD',
    featured: false,
  },
  {
    id: 5,
    title: 'MIDNIGHT JAZZ',
    date: 'Thursday, May 22',
    time: '9 PM — 2 AM',
    tag: 'LIVE',
    category: 'Live',
    desc: 'Jazz reinvented for the modern night owl. A quartet of world-class musicians in an intimate setting with our best cocktail menu.',
    img: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80',
    price: '2,000 DZD',
    featured: false,
  },
  {
    id: 6,
    title: 'ELECTRIC NOIR',
    date: 'Friday, May 23',
    time: '10 PM — 5 AM',
    tag: 'SPECIAL',
    category: 'Special',
    desc: 'EBONY transforms. Neon installations, a 3-hour open bar, and a guest DJ internationally acclaimed. One night. No repeat.',
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    price: '4,500 DZD',
    featured: true,
  },
]

const categories = ['All', 'DJ', 'Live', 'Special']

export default function EventsPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? allEvents : allEvents.filter(e => e.category === active)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1920&q=80"
          alt="Events"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ebony-black/75" />
        <div className="absolute inset-0 bg-gold-radial opacity-50" />

        <div className="relative z-10 text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="section-label mb-4"
          >
            ✦ What's On
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-6xl lg:text-8xl font-black text-white"
          >
            EVENTS
          </motion.h1>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-ebony-dark border-b border-ebony-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex items-center gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2 text-[0.7rem] tracking-[0.18em] uppercase font-semibold transition-all duration-300 whitespace-nowrap rounded-sm ${
                active === cat
                  ? 'bg-gold text-ebony-black'
                  : 'border border-ebony-border text-ebony-muted hover:border-gold hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Events grid */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((event, i) => (
            <SectionReveal key={event.id} delay={i * 0.08}>
              <div className="glass-card rounded-sm overflow-hidden group h-full flex flex-col">
                {/* Image */}
                <div className="relative h-56 overflow-hidden flex-shrink-0">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ebony-black/90 to-transparent" />

                  {event.featured && (
                    <span className="absolute top-4 right-4 text-[0.55rem] tracking-[0.2em] font-semibold text-ebony-black bg-gold-light px-3 py-1">
                      FEATURED
                    </span>
                  )}
                  <span className="absolute top-4 left-4 text-[0.6rem] tracking-[0.2em] font-semibold text-white border border-white/40 px-3 py-1 backdrop-blur-sm">
                    {event.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex flex-wrap gap-4 mb-4 text-[0.65rem] text-ebony-muted">
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt size={10} className="text-gold" /> {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock size={10} className="text-gold" /> {event.time}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaMapMarkerAlt size={10} className="text-gold" /> EBONY Lounge
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-ebony-muted text-sm leading-relaxed flex-1 mb-6">{event.desc}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-ebony-border">
                    <span className="font-display text-lg font-bold text-gold">{event.price}</span>
                    <Link
                      href="/reservation"
                      className="inline-flex items-center gap-2 text-xs text-gold tracking-[0.15em] uppercase font-semibold hover:gap-3 transition-all duration-300"
                    >
                      Reserve <HiArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </SectionReveal>
          ))}
        </motion.div>
      </section>
    </div>
  )
}
