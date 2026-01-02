'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen } from 'lucide-react'
import { format } from 'date-fns'

// Sample data - replace with your actual data source
const journalEntries = [
  {
    id: 1,
    title: 'The Beginning of a Journey',
    content: 'Today marks the start of something beautiful. Words flow like rivers, carrying emotions and stories untold...',
    date: new Date('2026-01-02'),
    time: '10:30 AM',
    category: 'Reflection',
  },
  {
    id: 2,
    title: 'Midnight Thoughts',
    content: 'In the silence of the night, I find clarity. The moon whispers secrets that daylight cannot hear...',
    date: new Date('2026-01-01'),
    time: '11:45 PM',
    category: 'Poetry',
  },
  {
    id: 3,
    title: 'Morning Inspiration',
    content: 'As dawn breaks, so do new ideas. The golden rays illuminate paths I never knew existed...',
    date: new Date('2025-12-31'),
    time: '06:15 AM',
    category: 'Inspiration',
  },
]

export default function Home() {
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
            <span className="gold-text-gradient">My Journal</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto"
          >
            A collection of thoughts, stories, and moments captured in time
          </motion.p>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-5xl mx-auto space-y-8">
          {journalEntries.map((entry, index) => (
            <motion.article
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="premium-card p-8 group hover:shadow-gold-glow-lg transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="px-4 py-1 bg-gradient-gold text-premium-black text-sm font-semibold rounded-full">
                  {entry.category}
                </span>
                <div className="flex items-center text-gray-400 text-sm space-x-4">
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} className="text-premium-gold" />
                    <span>{format(entry.date, 'MMMM dd, yyyy')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock size={16} className="text-premium-gold" />
                    <span>{entry.time}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <h2 className="text-3xl font-serif font-bold mb-4 gold-text-gradient group-hover:scale-[1.02] transition-transform">
                {entry.title}
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {entry.content}
              </p>

              {/* Read More */}
              <button className="mt-6 flex items-center space-x-2 text-premium-gold hover:text-premium-lightGold transition-colors group">
                <BookOpen size={20} />
                <span className="font-medium">Read Full Entry</span>
                <span className="transform group-hover:translate-x-2 transition-transform">→</span>
              </button>
            </motion.article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="premium-button">
            Load More Entries
          </button>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-1/2 left-0 w-px h-64 bg-gradient-to-b from-transparent via-premium-gold to-transparent opacity-20"></div>
      <div className="fixed top-1/2 right-0 w-px h-64 bg-gradient-to-b from-transparent via-premium-gold to-transparent opacity-20"></div>
    </div>
  )
}
