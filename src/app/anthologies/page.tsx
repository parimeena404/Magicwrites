'use client'

import { motion } from 'framer-motion'
import { BookOpen, Calendar, ExternalLink } from 'lucide-react'
import Image from 'next/image'

// Sample data - replace with your actual anthologies and novels
const books = [
  {
    id: 1,
    title: 'Whispers of the Soul',
    type: 'Anthology',
    description: 'A collection of profound poems exploring the depths of human emotion and the beauty of existence.',
    publicationDate: 'December 2025',
    pages: 256,
    coverColor: 'from-amber-900 to-yellow-600',
  },
  {
    id: 2,
    title: 'Echoes in Eternity',
    type: 'Novel',
    description: 'A captivating tale of love, loss, and redemption set against the backdrop of time itself.',
    publicationDate: 'November 2025',
    pages: 384,
    coverColor: 'from-purple-900 to-indigo-600',
  },
  {
    id: 3,
    title: 'Golden Verses',
    type: 'Anthology',
    description: 'Timeless poetry that captures the essence of life\'s most precious moments and fleeting beauty.',
    publicationDate: 'October 2025',
    pages: 192,
    coverColor: 'from-yellow-800 to-amber-500',
  },
  {
    id: 4,
    title: 'The Last Chapter',
    type: 'Novel',
    description: 'An epic journey through memories and dreams, where past and future collide in unexpected ways.',
    publicationDate: 'September 2025',
    pages: 456,
    coverColor: 'from-slate-800 to-slate-600',
  },
]

export default function AnthologiesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif font-bold mb-6"
          >
            <span className="gold-text-gradient">Anthologies & Novels</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            Explore a world of stories, poetry, and literary masterpieces
          </motion.p>
        </div>
      </section>

      {/* Books Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="premium-card overflow-hidden group hover:shadow-gold-glow-lg transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row gap-6 p-6">
                {/* Book Cover */}
                <div className="flex-shrink-0">
                  <div className={`w-full sm:w-48 h-64 bg-gradient-to-br ${book.coverColor} rounded-lg shadow-2xl relative overflow-hidden group-hover:scale-105 transition-transform duration-300`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white/30" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-serif font-bold text-lg">
                        {book.title}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Book Details */}
                <div className="flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-gradient-gold text-premium-black text-sm font-semibold rounded-full">
                      {book.type}
                    </span>
                    <div className="flex items-center text-gray-400 text-sm space-x-2">
                      <Calendar size={14} className="text-premium-gold" />
                      <span>{book.publicationDate}</span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif font-bold mb-3 gold-text-gradient">
                    {book.title}
                  </h3>

                  <p className="text-gray-300 text-base leading-relaxed mb-4 flex-1">
                    {book.description}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-premium-gold/20">
                    <span className="text-sm text-gray-400">
                      {book.pages} pages
                    </span>
                    <button className="flex items-center space-x-2 px-4 py-2 bg-premium-gold/10 hover:bg-premium-gold/20 text-premium-gold rounded-lg transition-colors group">
                      <span className="font-medium">Read More</span>
                      <ExternalLink size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="premium-card p-12 text-center"
          >
            <h2 className="text-3xl font-serif font-bold mb-4 gold-text-gradient">
              Stay Updated
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Get notified about new releases and exclusive content
            </p>
            <button className="premium-button">
              Subscribe to Newsletter
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
