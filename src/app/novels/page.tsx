'use client'

import { motion } from 'framer-motion'
import { BookOpen, Star, Clock, Award } from 'lucide-react'
import Image from 'next/image'

// Sample novels data
const novels = [
  {
    id: 1,
    title: 'The Spiral Between Us - Book1',
    description: 'A captivating journey through love, connection, and the intricate spirals of human relationships. Discover how two souls intertwine in ways they never imagined.',
    genre: 'Romance/Fiction',
    pages: 350,
    rating: 4.9,
    publicationDate: 'December 2025',
    status: 'Published',
    image: '/images/anthologies/anthology-35.jpeg',
  },
]

export default function NovelsPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-premium-gold/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <BookOpen className="w-16 h-16 mx-auto text-premium-gold mb-4" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            <span className="gold-text-gradient">Novels Collection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Immersive stories that transport you to different worlds and touch your soul
          </motion.p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Published Novels', value: '1', icon: BookOpen },
            { label: 'Average Rating', value: '4.9', icon: Star },
            { label: 'Total Pages', value: '350+', icon: Clock },
            { label: 'Reviews', value: '150+', icon: Award },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="premium-card p-6 text-center hover:shadow-gold-glow-lg transition-all duration-300"
            >
              <stat.icon className="w-8 h-8 mx-auto text-premium-gold mb-2" />
              <div className="text-2xl font-bold gold-text-gradient mb-1">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Novels Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto space-y-12">
          {novels.map((novel, index) => (
            <motion.article
              key={novel.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className={`premium-card overflow-hidden group hover:shadow-gold-glow-lg transition-all duration-500 ${
                index % 2 === 0 ? 'hover:translate-x-2' : 'hover:-translate-x-2'
              }`}
            >
              <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 p-8`}>
                {/* Novel Cover */}
                <div className="flex-shrink-0 lg:w-80">
                  <div className="relative w-full h-96 rounded-xl overflow-hidden shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <Image
                      src={novel.image}
                      alt={novel.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 320px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    {novel.status === 'Upcoming' && (
                      <div className="absolute top-4 right-4 px-4 py-2 bg-premium-gold text-premium-black font-bold rounded-full text-sm shadow-lg">
                        Coming Soon
                      </div>
                    )}
                  </div>
                </div>

                {/* Novel Details */}
                <div className="flex-1 flex flex-col justify-center space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-1 bg-gradient-gold text-premium-black text-sm font-bold rounded-full shadow-lg">
                      {novel.genre}
                    </span>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className={i < Math.floor(novel.rating) ? 'text-premium-gold fill-premium-gold' : 'text-gray-600'}
                        />
                      ))}
                      <span className="ml-2 text-premium-gold font-semibold">{novel.rating}</span>
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text-gradient group-hover:scale-105 transition-transform origin-left">
                    {novel.title}
                  </h2>

                  <p className="text-gray-300 text-lg leading-relaxed">
                    {novel.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-6 text-gray-400 text-sm pt-4">
                    <div className="flex items-center space-x-2">
                      <BookOpen size={18} className="text-premium-gold" />
                      <span>{novel.pages} pages</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-premium-gold" />
                      <span>{novel.publicationDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Award size={18} className="text-premium-gold" />
                      <span>{novel.status}</span>
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button className="premium-button flex-1 sm:flex-none">
                      {novel.status === 'Upcoming' ? 'Pre-Order Now' : 'Read Now'}
                    </button>
                    <button className="px-6 py-3 border-2 border-premium-gold text-premium-gold font-semibold rounded-lg hover:bg-premium-gold hover:text-premium-black transition-all duration-300">
                      Preview
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
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto premium-card p-12 text-center"
        >
          <BookOpen className="w-16 h-16 mx-auto text-premium-gold mb-6" />
          <h2 className="text-3xl font-serif font-bold gold-text-gradient mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Subscribe to get notified about new releases and exclusive content
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
        </motion.div>
      </section>
    </div>
  )
}
