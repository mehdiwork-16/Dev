'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionReveal from '@/components/SectionReveal'
import { FaCocktail, FaMusic, FaStar, FaUsers } from 'react-icons/fa'

const team = [
  { name: 'Karim Benali', role: 'Founder & Director', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Sofia Marrachi', role: 'Head Mixologist', img: 'https://images.unsplash.com/photo-1494790108755-2616b332b67a?w=400&q=80' },
  { name: 'Yacine Aït', role: 'Resident DJ', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
  { name: 'Lina Brahimi', role: 'Events Director', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80' },
]

const values = [
  { icon: FaStar, title: 'Excellence', desc: 'Every detail is curated to the highest standard — from the music to the garnish on your glass.' },
  { icon: FaCocktail, title: 'Craft', desc: 'Our mixologists are artists. Each cocktail is a composition of flavour, texture, and visual drama.' },
  { icon: FaMusic, title: 'Sound', desc: 'Music is our heartbeat. We partner with the finest DJs to deliver a sonic experience unmatched in the city.' },
  { icon: FaUsers, title: 'Community', desc: 'EBONY is more than a club — it\'s a community of people who share a passion for the exceptional.' },
]

export default function AboutPage() {
  const parallaxRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: parallaxRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1566417713940-fe7c737a9ef2?w=1920&q=80"
          alt="About EBONY"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ebony-black/75" />
        <div className="absolute inset-0 bg-gold-radial opacity-50" />

        <div className="relative z-10 text-center px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-4">
            ✦ Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-6xl lg:text-8xl font-black text-white"
          >
            ABOUT US
          </motion.h1>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-28 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <SectionReveal direction="left">
            <p className="section-label mb-6">✦ The Beginning</p>
            <h2 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
              Born from a<br />
              <span className="text-gold-gradient">Vision of Luxury</span>
            </h2>
            <div className="space-y-4 text-ebony-muted leading-relaxed">
              <p>
                EBONY Lounge was conceived in 2019 by founder Karim Benali — a vision to create the definitive premium nightlife experience in Algeria. A space where international sophistication meets local passion.
              </p>
              <p>
                The name EBONY speaks of our essence: deep, rich, and timeless. Like the precious wood, we stand for quality that endures, beauty that commands attention, and an experience that leaves a lasting impression.
              </p>
              <p>
                From our hand-selected spirits to our bespoke cocktail program crafted by internationally trained mixologists, every element of EBONY is designed to exceed expectation.
              </p>
            </div>
          </SectionReveal>

          <SectionReveal direction="right" delay={0.15}>
            <div ref={parallaxRef} className="relative h-[500px] overflow-hidden rounded-sm">
              <motion.div style={{ y: imgY }} className="absolute inset-[-10%] top-[-10%] bottom-[-10%]">
                <Image
                  src="https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=800&q=80"
                  alt="EBONY Bar"
                  fill
                  className="object-cover"
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-ebony-black/40 to-transparent" />
              <div className="absolute inset-0 border border-gold/10 rounded-sm" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-ebony-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionReveal className="text-center mb-16">
            <p className="section-label mb-4">✦ What Drives Us</p>
            <h2 className="font-display text-5xl font-bold text-white">
              Our <span className="text-gold-gradient">Values</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <SectionReveal key={value.title} delay={i * 0.1}>
                <div className="glass-card p-8 rounded-sm text-center h-full group">
                  <div className="w-14 h-14 rounded-full border border-gold/30 flex items-center justify-center mx-auto mb-5 group-hover:bg-gold/10 group-hover:border-gold/60 transition-all duration-300">
                    <value.icon size={20} className="text-gold" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-white mb-3 group-hover:text-gold transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-ebony-muted text-sm leading-relaxed">{value.desc}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <SectionReveal className="text-center mb-14">
          <p className="section-label mb-4">✦ Inside EBONY</p>
          <h2 className="font-display text-5xl font-bold text-white">
            The <span className="text-gold-gradient">Atmosphere</span>
          </h2>
        </SectionReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[
            { src: 'https://images.unsplash.com/photo-1545128485-c400e7702796?w=600&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?w=600&q=80', tall: false },
            { src: 'https://images.unsplash.com/photo-1561489396-888724a1543d?w=600&q=80', tall: false },
            { src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1471565661762-b9dfae862dbe?w=600&q=80', tall: false },
            { src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&q=80', tall: false },
            { src: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&q=80', tall: true },
            { src: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80', tall: false },
          ].map((img, i) => (
            <SectionReveal key={i} delay={i * 0.07} className={img.tall ? 'row-span-2' : ''}>
              <div className={`relative overflow-hidden rounded-sm group ${img.tall ? 'h-[340px]' : 'h-[160px]'}`}>
                <Image
                  src={img.src}
                  alt={`EBONY gallery ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-ebony-black/0 group-hover:bg-gold/10 transition-colors duration-500" />
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="py-24 bg-ebony-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <SectionReveal className="text-center mb-16">
            <p className="section-label mb-4">✦ The People Behind EBONY</p>
            <h2 className="font-display text-5xl font-bold text-white">
              Meet the <span className="text-gold-gradient">Team</span>
            </h2>
          </SectionReveal>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <SectionReveal key={member.name} delay={i * 0.1}>
                <div className="group text-center">
                  <div className="relative h-56 mb-4 overflow-hidden rounded-sm">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ebony-black/80 to-transparent" />
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-gold/30 transition-colors duration-500 rounded-sm" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-white group-hover:text-gold transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-ebony-muted text-xs tracking-[0.12em] uppercase mt-1">{member.role}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <SectionReveal>
          <p className="section-label mb-6">✦ Ready for Your Night?</p>
          <h2 className="font-display text-5xl lg:text-6xl font-bold text-white mb-8">
            Experience <span className="text-gold-gradient">EBONY</span>
          </h2>
          <Link href="/reservation" className="btn-gold px-12 py-4 text-sm tracking-[0.2em] z-10 relative inline-block">
            Reserve Your Table
          </Link>
        </SectionReveal>
      </section>
    </div>
  )
}
