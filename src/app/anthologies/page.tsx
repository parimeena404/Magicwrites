'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, Heart, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'

// Anthologies data with actual images
const anthologies = [
  {
    id: 1,
    title: 'Anthology 36',
    description: 'A collection of profound poems exploring the depths of human emotion and the beauty of existence. Each verse is crafted to resonate with the eternal truths of the human heart.',
    publicationDate: 'December 2025',
    pages: 256,
    poems: 87,
    rating: 4.9,
    image: '/images/anthologies/anthology-36.jpeg',
    themes: ['Love', 'Life', 'Nature'],
  },
  {
    id: 2,
    title: 'Anthology 37',
    description: 'Timeless poetry that captures the essence of life\'s most precious moments and fleeting beauty. A celebration of the golden threads that weave through our existence.',
    publicationDate: 'October 2025',
    pages: 192,
    poems: 64,
    rating: 4.8,
    image: '/images/anthologies/anthology-37.jpeg',
    themes: ['Joy', 'Memories', 'Hope'],
  },
  {
    id: 3,
    title: 'Anthology 38',
    description: 'In the silence of the night, profound truths emerge. This anthology explores the depths of introspection and the beauty found in solitude.',
    publicationDate: 'August 2025',
    pages: 224,
    poems: 72,
    rating: 4.7,
    image: '/images/anthologies/anthology-38.jpeg',
    themes: ['Solitude', 'Dreams', 'Truth'],
  },
  {
    id: 4,
    title: 'Anthology 38_1',
    description: 'Like the turning of seasons, life brings constant transformation. These poems celebrate change, growth, and the beauty of becoming.',
    publicationDate: 'June 2025',
    pages: 208,
    poems: 68,
    rating: 4.8,
    image: '/images/anthologies/anthology-38_1.jpeg',
    themes: ['Growth', 'Change', 'Renewal'],
  },
  {
    id: 5,
    title: 'Anthology 38_2',
    description: 'Look to the stars and find your rhythm. A poetic journey through the cosmos of the heart, exploring universal connections and cosmic beauty.',
    publicationDate: 'April 2025',
    pages: 240,
    poems: 81,
    rating: 4.9,
    image: '/images/anthologies/anthology-38_2.jpeg',
    themes: ['Universe', 'Connection', 'Wonder'],
  },
  {
    id: 6,
    title: 'Anthology 39',
    description: 'Verses that dance between reality and dreams, exploring the magical spaces where imagination meets truth.',
    publicationDate: 'March 2025',
    pages: 216,
    poems: 75,
    rating: 4.8,
    image: '/images/anthologies/anthology-39.jpeg',
    themes: ['Dreams', 'Magic', 'Reality'],
  },
  {
    id: 7,
    title: 'Anthology 39_1',
    description: 'A collection celebrating the beauty of everyday moments and the extraordinary within the ordinary.',
    publicationDate: 'February 2025',
    pages: 198,
    poems: 66,
    rating: 4.7,
    image: '/images/anthologies/anthology-39_1.jpeg',
    themes: ['Life', 'Beauty', 'Moments'],
  },
  {
    id: 8,
    title: 'Anthology 39_2',
    description: 'Poems that capture the essence of time, memory, and the eternal dance of existence.',
    publicationDate: 'January 2025',
    pages: 234,
    poems: 79,
    rating: 4.9,
    image: '/images/anthologies/anthology-39_2.jpeg',
    themes: ['Time', 'Memory', 'Eternity'],
  },
  {
    id: 9,
    title: 'Anthology 40',
    description: 'A journey through words that heal, inspire, and transform the soul.',
    publicationDate: 'December 2024',
    pages: 220,
    poems: 73,
    rating: 4.8,
    image: '/images/anthologies/anthology-40.jpeg',
    themes: ['Healing', 'Inspiration', 'Soul'],
  },
  {
    id: 10,
    title: 'Anthology 40_1',
    description: 'The final collection celebrating the power of words to illuminate the human experience.',
    publicationDate: 'November 2024',
    pages: 245,
    poems: 82,
    rating: 4.9,
    image: '/images/anthologies/anthology-40_1.jpeg',
    themes: ['Power', 'Light', 'Experience'],
  },
]

export default function AnthologiesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-premium-gold/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 mx-auto text-premium-gold animate-pulse" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            <span className="gold-text-gradient">Poetry Anthologies</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Collections of verses that touch the soul and illuminate the human experience
          </motion.p>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Anthologies', value: '10', icon: BookOpen },
            { label: 'Total Poems', value: '750+', icon: Heart },
            { label: 'Pages', value: '2,200+', icon: Calendar },
            { label: 'Avg Rating', value: '4.8', icon: Star },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
              className="premium-card p-6 text-center hover:shadow-gold-glow-lg transition-all duration-300 hover:scale-105"
            >
              <stat.icon className="w-8 h-8 mx-auto text-premium-gold mb-2" />
              <div className="text-2xl font-bold gold-text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Anthologies Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-10">
          {anthologies.map((anthology, index) => (
            <motion.article
              key={anthology.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="premium-card overflow-hidden group hover:shadow-gold-glow-lg transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row gap-8 p-8">
                {/* Anthology Cover */}
                <div className="flex-shrink-0 lg:w-72">
                  <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl group-hover:scale-105 group-hover:rotate-2 transition-all duration-500">
                    <Image
                      src={anthology.image}
                      alt={anthology.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center justify-between text-white/80 text-sm mb-2">
                        <span>{anthology.poems} Poems</span>
                        <span>{anthology.pages} Pages</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Anthology Details */}
                <div className="flex-1 flex flex-col justify-center space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-1 bg-gradient-gold text-premium-black text-sm font-bold rounded-full shadow-lg">
                      Poetry Collection
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.floor(anthology.rating) ? 'text-premium-gold fill-premium-gold' : 'text-gray-600'}
                        />
                      ))}
                      <span className="ml-2 text-premium-gold font-semibold">{anthology.rating}</span>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text-gradient group-hover:scale-105 transition-transform origin-left">
                    {anthology.title}
                  </h2>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {anthology.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {anthology.themes.map((theme) => (
                      <span
                        key={theme}
                        className="px-3 py-1 bg-premium-darkGray border border-premium-gold/30 text-premium-gold text-sm rounded-full hover:bg-premium-gold/10 transition-colors"
                      >
                        {theme}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-2 text-gray-400 text-sm pt-2">
                    <Calendar size={16} className="text-premium-gold" />
                    <span>Published {anthology.publicationDate}</span>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="premium-button flex-1 sm:flex-none">
                      Read Collection
                    </button>
                    <button className="px-6 py-3 border-2 border-premium-gold text-premium-gold font-semibold rounded-lg hover:bg-premium-gold hover:text-premium-black transition-all duration-300 flex items-center space-x-2">
                      <Heart size={18} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto premium-card p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-premium-gold/5 to-transparent"></div>
          <div className="relative z-10">
            <Sparkles className="w-16 h-16 mx-auto text-premium-gold mb-6 animate-pulse" />
            <h2 className="text-3xl font-serif font-bold gold-text-gradient mb-4">
              Discover More Poetry
            </h2>
            <p className="text-gray-400 text-lg mb-8">
              Subscribe to receive new poetry collections and exclusive verses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 bg-premium-darkGray border border-premium-gold/30 rounded-lg text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold transition-colors"
              />
              <button className="premium-button whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
