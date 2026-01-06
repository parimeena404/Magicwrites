'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, BookOpen, Heart, Sparkles, Pen, Plus, FileText } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

export default function Home() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newEntry, setNewEntry] = useState({ title: '', content: '', category: 'Reflection' })
  const [entries, setEntries] = useState<any[]>([])

  const handleCreateEntry = () => {
    if (newEntry.title && newEntry.content) {
      const entry = {
        id: Date.now(),
        ...newEntry,
        date: new Date(),
        time: format(new Date(), 'hh:mm a'),
        likes: 0,
      }
      setEntries([entry, ...entries])
      setNewEntry({ title: '', content: '', category: 'Reflection' })
      setShowCreateForm(false)
    }
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
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
            Welcome to my little corner of the internet where I share my thoughts, 
            stories, and whatever's on my mind. Feel free to browse around!
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

      {/* Journaling Features */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Create Entry Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mb-12"
          >
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="premium-button flex items-center space-x-2 mx-auto px-8 py-4 text-lg"
            >
              <Plus size={24} />
              <span>Create New Entry</span>
            </button>
          </motion.div>

          {/* Create Entry Form */}
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="premium-card p-8 mb-12"
            >
              <h3 className="text-2xl font-serif font-bold gold-text-gradient mb-6">Write Your Thoughts</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Title</label>
                  <input
                    type="text"
                    value={newEntry.title}
                    onChange={(e) => setNewEntry({ ...newEntry, title: e.target.value })}
                    placeholder="Give your entry a title..."
                    className="w-full bg-premium-darkGray/50 border border-premium-gold/30 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Category</label>
                  <select
                    value={newEntry.category}
                    onChange={(e) => setNewEntry({ ...newEntry, category: e.target.value })}
                    className="w-full bg-premium-darkGray/50 border border-premium-gold/30 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all"
                  >
                    <option>Reflection</option>
                    <option>Poetry</option>
                    <option>Inspiration</option>
                    <option>Story</option>
                    <option>Personal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-300 font-semibold mb-2">Content</label>
                  <textarea
                    value={newEntry.content}
                    onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
                    placeholder="Pour your heart out..."
                    rows={6}
                    className="w-full bg-premium-darkGray/50 border border-premium-gold/30 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all resize-none"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={handleCreateEntry}
                    className="premium-button flex-1"
                  >
                    Save Entry
                  </button>
                  <button
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-6 py-3 border-2 border-premium-gold/30 text-gray-300 font-semibold rounded-lg hover:bg-premium-gold/10 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Recent Entries Section */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="flex items-center justify-between mb-8"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text-gradient">
                {entries.length > 0 ? 'Your Entries' : 'Start Your Journey'}
              </h2>
              {entries.length > 0 && (
                <span className="text-gray-400">{entries.length} {entries.length === 1 ? 'entry' : 'entries'}</span>
              )}
            </motion.div>

            {entries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.6 }}
                className="premium-card p-12 text-center"
              >
                <FileText className="w-20 h-20 mx-auto text-premium-gold/30 mb-6" />
                <h3 className="text-2xl font-serif font-bold text-gray-300 mb-4">
                  No Entries Yet
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Start your journaling journey by creating your first entry
                </p>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="premium-button"
                >
                  Create First Entry
                </button>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {entries.map((entry, index) => (
                  <motion.article
                    key={entry.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="premium-card p-8 group hover:shadow-gold-glow-lg transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-center gap-4 mb-4">
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
                      </div>
                    </div>
                    <h2 className="text-2xl md:text-3xl font-serif font-bold mb-4 gold-text-gradient">
                      {entry.title}
                    </h2>
                    <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                      {entry.content}
                    </p>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Decorative Elements */}
      <div className="fixed top-1/2 left-0 w-px h-64 bg-gradient-to-b from-transparent via-premium-gold to-transparent opacity-20"></div>
      <div className="fixed top-1/2 right-0 w-px h-64 bg-gradient-to-b from-transparent via-premium-gold to-transparent opacity-20"></div>
    </div>
  )
}
