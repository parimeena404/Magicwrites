'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Calendar, Heart, Sparkles, Star, Bookmark, ExternalLink } from 'lucide-react'
import Image from 'next/image'

// Anthologies data with actual images
const anthologies = [
  {
    id: 1,
    title: 'Drums of Dawn',
    description: 'A rhythmic collection of verses that awaken the soul with each beat. Experience the power of words that resonate like drums at the break of day.',
    publicationDate: 'December 2025',
    poems: 87,
    image: '/images/anthologies/Drums of Dawn.jpeg',
    themes: ['Awakening', 'Rhythm', 'Hope'],
  },
  {
    id: 2,
    title: 'Network is Networth',
    description: 'Exploring the connections that bind us and the value of relationships. Poetry that celebrates the networks we build in life.',
    publicationDate: 'November 2025',
    poems: 64,
    image: '/images/anthologies/Network is Networth.jpeg',
    themes: ['Connection', 'Relationships', 'Value'],
  },
  {
    id: 3,
    title: 'Petals 6th Edition',
    description: 'Delicate verses that unfold like petals, revealing beauty in every layer. The beloved sixth edition of this timeless collection.',
    publicationDate: 'October 2025',
    poems: 72,
    image: '/images/anthologies/Petals 6th edition.jpeg',
    themes: ['Beauty', 'Nature', 'Delicacy'],
  },
  {
    id: 4,
    title: 'Quills of Fifty',
    description: 'Fifty brilliant minds, fifty unique voices. A collaborative anthology celebrating diverse perspectives and powerful narratives.',
    publicationDate: 'September 2025',
    poems: 95,
    image: '/images/anthologies/Quills of Fifty.jpeg',
    themes: ['Collaboration', 'Diversity', 'Voices'],
  },
  {
    id: 5,
    title: 'Soulprints of Friendship',
    description: 'The indelible marks friends leave on our hearts. Poetry that honors the bonds that shape who we become.',
    publicationDate: 'August 2025',
    poems: 68,
    image: '/images/anthologies/Soulprints of Friendship.jpeg',
    themes: ['Friendship', 'Connection', 'Love'],
  },
  {
    id: 6,
    title: "The Earth's Unwritten Story",
    description: 'Tales of our planet waiting to be told. Environmental poetry that speaks for those without a voice.',
    publicationDate: 'July 2025',
    poems: 81,
    image: '/images/anthologies/The Earth\'s unwritten story.jpeg',
    themes: ['Environment', 'Nature', 'Awareness'],
  },
  {
    id: 7,
    title: 'The Ink of Her Legacy',
    description: 'Celebrating the powerful voices of women writers. A tribute to those who paved the way with their words.',
    publicationDate: 'June 2025',
    poems: 89,
    image: '/images/anthologies/The Ink of her Legacy.jpeg',
    themes: ['Women', 'Legacy', 'Empowerment'],
  },
  {
    id: 8,
    title: 'The Sindoor Diaries',
    description: 'Stories woven in tradition and emotion. Poetry that explores cultural identity and personal journeys.',
    publicationDate: 'May 2025',
    poems: 76,
    image: '/images/anthologies/The Sindoor Diaries.jpeg',
    themes: ['Culture', 'Identity', 'Journey'],
  },
  {
    id: 9,
    title: 'Where Darkness Meets Dawn',
    description: 'Poetry born in the twilight hours. Verses that bridge the gap between night and day, despair and hope.',
    publicationDate: 'April 2025',
    poems: 73,
    image: '/images/anthologies/Where darkness meets dawn.jpeg',
    themes: ['Hope', 'Transformation', 'Balance'],
  },
  {
    id: 10,
    title: 'Whispers Beneath the Night Sky',
    description: 'Secrets shared under starlight. A collection of intimate verses that capture the magic of night.',
    publicationDate: 'March 2025',
    poems: 66,
    image: '/images/anthologies/Whispers beneath the night sky.jpeg',
    themes: ['Night', 'Mystery', 'Magic'],
  },
  {
    id: 11,
    title: 'Write for India',
    description: 'A patriotic anthology celebrating the spirit of India through powerful poetry and prose.',
    publicationDate: 'February 2025',
    poems: 94,
    image: '/images/anthologies/Write for India.jpeg',
    themes: ['Patriotism', 'Culture', 'Unity'],
  },
]

export default function AnthologiesPage() {
  const [savedAnthologies, setSavedAnthologies] = useState<number[]>([])

  const handleSave = (id: number) => {
    if (savedAnthologies.includes(id)) {
      setSavedAnthologies(savedAnthologies.filter(anthId => anthId !== id))
    } else {
      setSavedAnthologies([...savedAnthologies, id])
    }
  }

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
            Here are my poetry collections - each one tells a different story
          </motion.p>
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
                  </div>
                </div>

                {/* Anthology Details */}
                <div className="flex-1 flex flex-col justify-center space-y-5">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-1 bg-gradient-gold text-premium-black text-sm font-bold rounded-full shadow-lg">
                      Poetry Collection
                    </span>
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
                    <a 
                      href={`https://amazon.in/dp/anthology${anthology.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="premium-button flex-1 sm:flex-none flex items-center justify-center space-x-2"
                    >
                      <ExternalLink size={18} />
                      <span>View on Amazon</span>
                    </a>
                    <button 
                      onClick={() => handleSave(anthology.id)}
                      className={`px-6 py-3 border-2 font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2 ${
                        savedAnthologies.includes(anthology.id)
                          ? 'bg-[#FFED4E] border-[#FFED4E] text-black'
                          : 'border-premium-gold text-premium-gold hover:bg-premium-gold hover:text-premium-black'
                      }`}
                    >
                      <Bookmark size={18} fill={savedAnthologies.includes(anthology.id) ? 'currentColor' : 'none'} />
                      <span>{savedAnthologies.includes(anthology.id) ? 'Saved' : 'Save'}</span>
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
