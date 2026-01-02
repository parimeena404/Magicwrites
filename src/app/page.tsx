'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, Heart, Sparkles, TrendingUp, Pen } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'
import Image from 'next/image'

// Sample data - replace with your actual data source
const journalEntries = [
  {
    id: 1,
    title: 'The Beginning of a Journey',
    content: 'Today marks the start of something beautiful. Words flow like rivers, carrying emotions and stories untold. In every sentence, I find pieces of myself I never knew existed...',
    date: new Date('2026-01-02'),
    time: '10:30 AM',
    category: 'Reflection',
    readTime: '5 min read',
    likes: 234,
  },
  {
    id: 2,
    title: 'Midnight Thoughts',
    content: 'In the silence of the night, I find clarity. The moon whispers secrets that daylight cannot hear. Each star a story, each shadow a memory waiting to be remembered...',
    date: new Date('2026-01-01'),
    time: '11:45 PM',
    category: 'Poetry',
    readTime: '3 min read',
    likes: 189,
  },
  {
    id: 3,
    title: 'Morning Inspiration',
    content: 'As dawn breaks, so do new ideas. The golden rays illuminate paths I never knew existed. Today feels different, charged with possibilities and promise...',
    date: new Date('2025-12-31'),
    time: '06:15 AM',
    category: 'Inspiration',
    readTime: '4 min read',
    likes: 312,
  },
]

const featuredWorks = [
  {
    id: 1,
    title: 'Anthology 38_1',
    type: 'Anthology',
    image: '/images/anthologies/anthology-38_1.jpeg',
    link: '/anthologies',
  },
  {
    id: 2,
    title: 'The Spiral Between Us - Book1',
    type: 'Novel',
    image: '/images/anthologies/anthology-35.jpeg',
    link: '/novels',
  },
  {
    id: 3,
    title: 'Anthology 38_2',
    type: 'Anthology',
    image: '/images/anthologies/anthology-38_2.jpeg',
    link: '/anthologies',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-gold/10 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-premium-gold/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <Pen className="w-20 h-20 mx-auto text-premium-gold mb-6 animate-pulse" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-7xl font-serif font-bold mb-8 leading-tight"
          >
            <span className="gold-text-gradient">Where Words</span>
            <br />
            <span className="text-gray-300">Come to Life</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10"
          >
            A collection of thoughts, stories, poetry, and moments captured in time.
            <br />
            Discover the magic in every word.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/anthologies">
              <button className="premium-button flex items-center space-x-2">
                <BookOpen size={20} />
                <span>Explore Anthologies</span>
              </button>
            </Link>
            <Link href="/novels">
              <button className="px-8 py-3 border-2 border-premium-gold text-premium-gold font-semibold rounded-lg hover:bg-premium-gold hover:text-premium-black transition-all duration-300">
                Read Novels
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: 'Journal Entries', value: '150+', icon: Pen },
            { label: 'Poetry Collections', value: '10', icon: BookOpen },
            { label: 'Published Novels', value: '1', icon: Sparkles },
            { label: 'Total Readers', value: '10K+', icon: Heart },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              className="premium-card p-6 text-center hover:scale-105 transition-all duration-300 cursor-pointer group"
            >
              <stat.icon className="w-10 h-10 mx-auto text-premium-gold mb-3 group-hover:animate-bounce" />
              <div className="text-3xl font-bold gold-text-gradient mb-2">{stat.value}</div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Works */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text-gradient mb-4">
              Featured Works
            </h2>
            <p className="text-gray-400 text-lg">
              Discover our latest and most celebrated creations
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredWorks.map((work, index) => (
              <motion.div
                key={work.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.15 }}
              >
                <Link href={work.link}>
                  <div className="premium-card overflow-hidden group cursor-pointer hover:shadow-gold-glow-lg transition-all duration-500">
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={work.image}
                        alt={work.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="px-3 py-1 bg-gradient-gold text-premium-black text-xs font-bold rounded-full mb-3 inline-block">
                          {work.type}
                        </span>
                        <h3 className="text-xl font-serif font-bold text-white group-hover:text-premium-lightGold transition-colors">
                          {work.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journal Entries */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text-gradient mb-4">
              Recent Entries
            </h2>
            <p className="text-gray-400 text-lg">
              Latest thoughts and musings from my journal
            </p>
          </motion.div>
          <div className="space-y-8">
            {journalEntries.map((entry, index) => (
              <motion.article
                key={entry.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 2.0 + index * 0.15 }}
                className="premium-card p-8 group hover:shadow-gold-glow-lg transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-premium-gold/5 rounded-full blur-3xl group-hover:bg-premium-gold/10 transition-all duration-500"></div>
                
                {/* Header */}
                <div className="flex flex-wrap items-center gap-4 mb-6 relative z-10">
                  <span className="px-4 py-2 bg-gradient-gold text-premium-black text-sm font-bold rounded-full shadow-lg">
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
                    <div className="flex items-center space-x-2">
                      <TrendingUp size={16} className="text-premium-gold" />
                      <span>{entry.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 gold-text-gradient group-hover:scale-[1.02] transition-transform origin-left relative z-10">
                  {entry.title}
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6 relative z-10">
                  {entry.content}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-premium-gold/20 relative z-10">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Heart size={20} className="text-premium-gold" />
                    <span className="font-medium">{entry.likes} likes</span>
                  </div>
                  <button className="flex items-center space-x-2 px-6 py-2 bg-premium-gold/10 hover:bg-premium-gold/20 text-premium-gold rounded-lg transition-colors group/btn">
                    <BookOpen size={18} />
                    <span className="font-medium">Read Full Entry</span>
                    <span className="transform group-hover/btn:translate-x-2 transition-transform">→</span>
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Load More */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 2.6 }}
            className="text-center mt-12"
          >
            <button className="premium-button px-12">
              Load More Entries
            </button>
          </motion.div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-1/2 left-0 w-px h-64 bg-gradient-to-b from-transparent via-premium-gold to-transparent opacity-20"></div>
      <div className="fixed top-1/2 right-0 w-px h-64 bg-gradient-to-b from-transparent via-premium-gold to-transparent opacity-20"></div>
    </div>
  )
}
