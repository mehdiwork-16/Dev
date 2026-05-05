'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import SectionReveal from '@/components/SectionReveal'

const categories = ['All', 'Signature Cocktails', 'Premium Spirits', 'Champagne', 'Non-Alcoholic', 'Shots']

const menuItems = [
  // Signature Cocktails
  { id: 1, name: 'Ebony Noir', category: 'Signature Cocktails', price: '1,800 DZD', desc: 'Dark rum, espresso, black cardamom, activated charcoal, gold dust rim', img: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=500&q=80', tags: ['Staff Pick', 'Strong'] },
  { id: 2, name: 'Golden Elixir', category: 'Signature Cocktails', price: '2,200 DZD', desc: 'Aged cognac, honey liqueur, 24k gold flakes, aromatic bitters', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80', tags: ['Exclusive'] },
  { id: 3, name: 'Velvet Smoke', category: 'Signature Cocktails', price: '1,600 DZD', desc: 'Mezcal, smoky syrup, activated charcoal, black Himalayan salt rim', img: 'https://images.unsplash.com/photo-1562599838-8cc871c241a5?w=500&q=80', tags: ['Smoky'] },
  { id: 4, name: 'Rose Crystal', category: 'Signature Cocktails', price: '2,800 DZD', desc: 'Rosé champagne, elderflower, raspberry essence, edible crystal rim', img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=80', tags: ['Premium'] },
  { id: 5, name: 'Midnight Bloom', category: 'Signature Cocktails', price: '1,900 DZD', desc: 'Gin, butterfly pea flower, lemon, lavender syrup — color changing', img: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=500&q=80', tags: ['Color Changing'] },
  { id: 6, name: 'Devil\'s Kiss', category: 'Signature Cocktails', price: '2,000 DZD', desc: 'Tequila, jalapeño-infused agave, blood orange, smoked salt', img: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=500&q=80', tags: ['Spicy'] },

  // Premium Spirits
  { id: 7, name: 'Hennessy XO', category: 'Premium Spirits', price: '6,500 DZD', desc: 'Cognac with notes of chocolate, spice and flowers. Served with artisan ice', img: 'https://images.unsplash.com/photo-1474722883778-792e7990302f?w=500&q=80', tags: ['Cognac'] },
  { id: 8, name: 'Johnnie Walker Blue', category: 'Premium Spirits', price: '5,800 DZD', desc: 'Blended Scotch whisky, exceptionally rare and smooth', img: 'https://images.unsplash.com/photo-1527281400683-1aae777175f8?w=500&q=80', tags: ['Whisky'] },
  { id: 9, name: 'Patron Platinum', category: 'Premium Spirits', price: '4,500 DZD', desc: 'Ultra-premium tequila, triple distilled for ultimate smoothness', img: 'https://images.unsplash.com/photo-1582633989271-b4c1cf57f4e3?w=500&q=80', tags: ['Tequila'] },
  { id: 10, name: 'Grey Goose', category: 'Premium Spirits', price: '3,800 DZD', desc: 'French vodka of exceptional purity, served ultra-chilled', img: 'https://images.unsplash.com/photo-1547595628-c61a29f496f0?w=500&q=80', tags: ['Vodka'] },

  // Champagne
  { id: 11, name: 'Moët & Chandon Brut', category: 'Champagne', price: '18,000 DZD', desc: 'The iconic Champagne with vibrant intensity, seductive freshness', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80', tags: ['Bottle'] },
  { id: 12, name: 'Dom Pérignon 2013', category: 'Champagne', price: '65,000 DZD', desc: 'Prestige vintage champagne, the pinnacle of Champagne excellence', img: 'https://images.unsplash.com/photo-1515362778563-6a8d0e44bc0b?w=500&q=80', tags: ['Vintage', 'Bottle'] },
  { id: 13, name: 'Veuve Clicquot Rosé', category: 'Champagne', price: '22,000 DZD', desc: 'Bold, structured, and sensual rosé with red fruit notes', img: 'https://images.unsplash.com/photo-1567696911980-2eed69a46042?w=500&q=80', tags: ['Rosé', 'Bottle'] },

  // Non-Alcoholic
  { id: 14, name: 'Midnight Mocktail', category: 'Non-Alcoholic', price: '900 DZD', desc: 'Sparkling elderflower, cucumber, mint, activated charcoal — stunning to look at', img: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80', tags: ['Zero Alcohol'] },
  { id: 15, name: 'Golden Sunrise', category: 'Non-Alcoholic', price: '850 DZD', desc: 'Fresh mango, passion fruit, ginger, turmeric, gold shimmer', img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=500&q=80', tags: ['Zero Alcohol'] },

  // Shots
  { id: 16, name: 'Gold Rush', category: 'Shots', price: '800 DZD', desc: 'Goldschläger cinnamon schnapps with gold flakes — liquid gold', img: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=500&q=80', tags: ['Party'] },
  { id: 17, name: 'Black Velvet', category: 'Shots', price: '700 DZD', desc: 'Sambuca, blackcurrant — served flaming', img: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=500&q=80', tags: ['Flaming'] },
]

export default function MenuPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? menuItems : menuItems.filter(item => item.category === active)

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-28 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1920&q=80"
          alt="Menu"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ebony-black/80" />
        <div className="absolute inset-0 bg-gold-radial opacity-50" />

        <div className="relative z-10 text-center px-6">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="section-label mb-4">
            ✦ Crafted with Excellence
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display text-6xl lg:text-8xl font-black text-white"
          >
            THE MENU
          </motion.h1>
        </div>
      </section>

      {/* Filter tabs */}
      <section className="bg-ebony-dark border-b border-ebony-border sticky top-20 z-30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex gap-2 overflow-x-auto">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 text-[0.65rem] tracking-[0.15em] uppercase font-semibold transition-all duration-300 whitespace-nowrap rounded-sm flex-shrink-0 ${
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

      {/* Menu Grid */}
      <section className="py-20 px-6 lg:px-12 max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {filtered.map((item, i) => (
              <SectionReveal key={item.id} delay={i * 0.06}>
                <div className="glass-card rounded-sm overflow-hidden group h-full flex flex-col">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden flex-shrink-0">
                    <Image
                      src={item.img}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:brightness-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ebony-black/80 to-transparent" />
                    <div className="absolute inset-0 bg-gold/0 group-hover:bg-gold/5 transition-colors duration-500" />
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {item.tags.map(tag => (
                        <span key={tag} className="text-[0.55rem] tracking-[0.1em] text-gold/70 border border-gold/20 px-2 py-0.5 font-semibold uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display text-lg font-bold text-white mb-2 group-hover:text-gold transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-ebony-muted text-xs leading-relaxed flex-1 mb-4">{item.desc}</p>

                    <div className="flex items-center justify-between pt-3 border-t border-ebony-border">
                      <span className="font-display text-base font-bold text-gold">{item.price}</span>
                      <span className="text-[0.6rem] tracking-[0.1em] text-ebony-muted uppercase">{item.category}</span>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Legend note */}
        <SectionReveal className="mt-16 pt-8 border-t border-ebony-border text-center">
          <p className="text-ebony-muted text-xs leading-relaxed max-w-xl mx-auto">
            All prices are per serving unless otherwise noted. Bottle service includes mixers and ice.
            Prices subject to change. Minimum age 21+.
          </p>
        </SectionReveal>
      </section>
    </div>
  )
}
