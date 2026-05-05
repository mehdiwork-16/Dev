'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import SectionReveal from '@/components/SectionReveal'
import { FaPlay, FaCalendarAlt, FaCocktail, FaStar } from 'react-icons/fa'
import { HiArrowRight } from 'react-icons/hi'

const events = [
  {
    id: 1,
    title: 'NOIR NIGHT',
    date: 'SAT, MAY 10',
    time: '10 PM',
    tag: 'DJ SET',
    desc: 'An all-black dress code evening with the finest DJ sets and premium bottle service.',
    img: 'https://images.unsplash.com/photo-1571266028243-e4733b0f0bb0?w=600&q=80',
  },
  {
    id: 2,
    title: 'GOLDEN HOUR',
    date: 'FRI, MAY 16',
    time: '9 PM',
    tag: 'LIVE',
    desc: 'Live performances, champagne towers, and a night draped in gold under neon lights.',
    img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80',
  },
  {
    id: 3,
    title: 'DEEP HOUSE SESSION',
    date: 'SAT, MAY 17',
    time: '11 PM',
    tag: 'EXCLUSIVE',
    desc: 'Limited tickets. Deep house masters behind the decks — pure sonic luxury.',
    img: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80',
  },
]

const featuredDrinks = [
  { name: 'Ebony Noir', category: 'Signature Cocktail', price: '1,800 DZD', desc: 'Dark rum, espresso, black cardamom, gold dust rim' },
  { name: 'Golden Elixir', category: 'Premium Cocktail', price: '2,200 DZD', desc: 'Aged cognac, honey liqueur, 24k gold flakes, bitters' },
  { name: 'Velvet Smoke', category: 'Craft Cocktail', price: '1,600 DZD', desc: 'Mezcal, smoky syrup, activated charcoal, black salt' },
  { name: 'Rose Crystal', category: 'Champagne Blend', price: '2,800 DZD', desc: 'Rosé champagne, elderflower, raspberry essence, crystal rim' },
]

const stats = [
  { value: '500+', label: 'Nights Hosted' },
  { value: '50K+', label: 'Happy Guests' },
  { value: '120+', label: 'Premium Spirits' },
  { value: '3', label: 'VIP Floors' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div>
      {/* ── HERO ── */}
      <section ref={heroRef} className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1545128485-c400e7702796?w=1920&q=90"
            alt="EBONY Nightclub"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ebony-black/60 via-ebony-black/40 to-ebony-black" />
          <div className="absolute inset-0 bg-gold-radial" />
        </motion.div>

        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-gold/40"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                delay: i * 0.7,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 text-center px-6 max-w-5xl mx-auto"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-label mb-6"
          >
            ✦ The Finest Nightclub Experience
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-display text-6xl sm:text-8xl lg:text-[9rem] font-black tracking-[0.08em] leading-none mb-6"
          >
            <span className="text-white">WELCOME</span>
            <br />
            <span className="text-shimmer">TO EBONY</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[#C0B8A8] text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          >
            Where darkness meets gold. An exclusive sanctuary for those who live after midnight.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/reservation" className="btn-gold px-10 py-4 text-sm tracking-[0.2em] z-10 relative inline-block">
              Reserve a Table
            </Link>
            <Link href="/events" className="btn-outline-gold px-10 py-4 text-sm tracking-[0.2em] inline-flex items-center gap-3">
              <FaPlay size={10} className="text-gold" />
              View Events
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-gold/60 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-ebony-dark border-y border-ebony-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <SectionReveal key={stat.label} delay={i * 0.1} className="text-center">
              <p className="font-display text-4xl font-bold text-gold-gradient mb-1">{stat.value}</p>
              <p className="text-ebony-muted text-xs tracking-[0.2em] uppercase">{stat.label}</p>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <p className="section-label mb-4">✦ What's On</p>
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-white">
            Upcoming <span className="text-gold-gradient">Events</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map((event, i) => (
            <SectionReveal key={event.id} delay={i * 0.12}>
              <div className="glass-card rounded-sm overflow-hidden group cursor-pointer h-full">
                {/* Image */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={event.img}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ebony-black/80 to-transparent" />
                  <span className="absolute top-4 left-4 text-[0.6rem] tracking-[0.2em] font-semibold text-ebony-black bg-gold px-3 py-1">
                    {event.tag}
                  </span>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <FaCalendarAlt size={11} className="text-gold" />
                    <span className="text-[0.65rem] text-gold tracking-[0.15em] font-semibold">
                      {event.date} · {event.time}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                    {event.title}
                  </h3>
                  <p className="text-ebony-muted text-sm leading-relaxed mb-5">{event.desc}</p>
                  <Link
                    href="/reservation"
                    className="inline-flex items-center gap-2 text-gold text-xs tracking-[0.15em] uppercase font-semibold hover:gap-3 transition-all duration-300"
                  >
                    Reserve Your Spot <HiArrowRight />
                  </Link>
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="text-center mt-12">
          <Link href="/events" className="btn-outline-gold px-10 py-3.5 text-xs tracking-[0.2em] inline-block">
            View All Events
          </Link>
        </SectionReveal>
      </section>

      {/* ── ABOUT PREVIEW ── */}
      <section className="py-28 bg-ebony-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images */}
          <SectionReveal direction="left">
            <div className="relative">
              <div className="relative h-[480px] rounded-sm overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=800&q=80"
                  alt="EBONY Interior"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-40 h-40 rounded-sm overflow-hidden border-4 border-ebony-dark">
                <Image
                  src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=400&q=80"
                  alt="EBONY Bar"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Gold accent */}
              <div className="absolute -top-4 -left-4 w-20 h-20 border border-gold/30 rounded-sm" />
            </div>
          </SectionReveal>

          {/* Text */}
          <SectionReveal direction="right" delay={0.2}>
            <p className="section-label mb-6">✦ Our Story</p>
            <h2 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
              A World Apart<br />
              <span className="text-gold-gradient">From the Ordinary</span>
            </h2>
            <p className="text-ebony-muted leading-relaxed mb-5">
              EBONY Lounge was born from a vision — to create a space where every night becomes a memory. We curate experiences that blend world-class music, artisan cocktails, and an atmosphere unlike anything else.
            </p>
            <p className="text-ebony-muted leading-relaxed mb-8">
              From our hand-crafted cocktail menu to our meticulously designed interiors, every detail at EBONY speaks of exclusivity and passion.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              {[
                { icon: FaStar, text: 'Premium VIP Service' },
                { icon: FaCocktail, text: '120+ Signature Drinks' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3 text-sm text-[#C0B8A8]">
                  <span className="w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center">
                    <Icon size={12} className="text-gold" />
                  </span>
                  {text}
                </div>
              ))}
            </div>
            <Link href="/about" className="btn-gold px-8 py-3.5 text-xs tracking-[0.2em] inline-block z-10 relative">
              Discover Our Story
            </Link>
          </SectionReveal>
        </div>
      </section>

      {/* ── FEATURED DRINKS ── */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <p className="section-label mb-4">✦ Crafted for You</p>
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-white">
            Signature <span className="text-gold-gradient">Cocktails</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ebony-border">
          {featuredDrinks.map((drink, i) => (
            <SectionReveal key={drink.name} delay={i * 0.1}>
              <div className="bg-ebony-black p-8 group hover:bg-ebony-card transition-colors duration-300 h-full">
                <div className="w-10 h-px bg-gold mb-6 group-hover:w-16 transition-all duration-500" />
                <span className="text-[0.6rem] text-gold/60 tracking-[0.2em] uppercase font-semibold">
                  {drink.category}
                </span>
                <h3 className="font-display text-xl font-bold text-white mt-2 mb-3 group-hover:text-gold transition-colors duration-300">
                  {drink.name}
                </h3>
                <p className="text-ebony-muted text-sm leading-relaxed mb-6">{drink.desc}</p>
                <p className="font-display text-lg font-bold text-gold">{drink.price}</p>
              </div>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal className="text-center mt-12">
          <Link href="/menu" className="btn-outline-gold px-10 py-3.5 text-xs tracking-[0.2em] inline-block">
            Explore Full Menu
          </Link>
        </SectionReveal>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-32 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1561489396-888724a1543d?w=1920&q=80"
          alt="Reserve at EBONY"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ebony-black/80" />
        <div className="absolute inset-0 bg-gold-radial" />

        <SectionReveal className="relative z-10 text-center px-6">
          <p className="section-label mb-6">✦ Limited Tables Available</p>
          <h2 className="font-display text-5xl lg:text-7xl font-black text-white mb-6">
            Secure Your<br />
            <span className="text-shimmer">Night at EBONY</span>
          </h2>
          <p className="text-[#C0B8A8] max-w-lg mx-auto mb-10 leading-relaxed">
            VIP tables fill fast. Reserve yours now and step into an evening you won't forget.
          </p>
          <Link href="/reservation" className="btn-gold px-14 py-5 text-sm tracking-[0.25em] z-10 relative inline-block">
            Reserve Now
          </Link>
        </SectionReveal>
      </section>
    </div>
  )
}
