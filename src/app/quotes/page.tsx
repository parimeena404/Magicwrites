'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Clock } from 'lucide-react'

interface Quote {
  id: number
  text: string
  author: string
  date: string
  likes: number
  comments: Comment[]
  isLiked: boolean
}

interface Comment {
  id: number
  author: string
  text: string
  date: string
}

// Sample quotes data
const initialQuotes: Quote[] = [
  {
    id: 1,
    text: 'In the silence between heartbeats, we find the rhythm of eternity.',
    author: 'Magicwrites',
    date: '2 hours ago',
    likes: 156,
    isLiked: false,
    comments: [
      { id: 1, author: 'Reader1', text: 'This is beautiful!', date: '1 hour ago' },
      { id: 2, author: 'Reader2', text: 'So profound ✨', date: '30 min ago' },
    ],
  },
  {
    id: 2,
    text: 'The moon whispers secrets that daylight dares not speak.',
    author: 'Magicwrites',
    date: '5 hours ago',
    likes: 234,
    isLiked: true,
    comments: [
      { id: 1, author: 'Reader3', text: 'Love this!', date: '3 hours ago' },
    ],
  },
  {
    id: 3,
    text: 'Words are the bridges we build between souls.',
    author: 'Magicwrites',
    date: '1 day ago',
    likes: 389,
    isLiked: false,
    comments: [],
  },
  {
    id: 4,
    text: 'In every ending lies the seed of a new beginning.',
    author: 'Magicwrites',
    date: '2 days ago',
    likes: 421,
    isLiked: false,
    comments: [
      { id: 1, author: 'Reader4', text: 'Needed this today', date: '1 day ago' },
      { id: 2, author: 'Reader5', text: '🙏', date: '1 day ago' },
    ],
  },
]

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes)
  const [expandedQuote, setExpandedQuote] = useState<number | null>(null)
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})

  const handleLike = (quoteId: number) => {
    setQuotes(quotes.map(quote => 
      quote.id === quoteId 
        ? { 
            ...quote, 
            isLiked: !quote.isLiked,
            likes: quote.isLiked ? quote.likes - 1 : quote.likes + 1
          }
        : quote
    ))
  }

  const handleShare = async (quote: Quote) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Magicwrites Quote',
          text: quote.text,
          url: window.location.href,
        })
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`"${quote.text}" - ${quote.author}`)
      alert('Quote copied to clipboard!')
    }
  }

  const handleAddComment = (quoteId: number) => {
    const commentText = newComment[quoteId]?.trim()
    if (!commentText) return

    setQuotes(quotes.map(quote => 
      quote.id === quoteId 
        ? {
            ...quote,
            comments: [
              ...quote.comments,
              {
                id: quote.comments.length + 1,
                author: 'You',
                text: commentText,
                date: 'Just now',
              }
            ]
          }
        : quote
    ))

    setNewComment({ ...newComment, [quoteId]: '' })
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-serif font-bold mb-6"
          >
            <span className="gold-text-gradient">Quotes & Wisdom</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto"
          >
            Short notes and profound thoughts to inspire your journey
          </motion.p>
        </div>
      </section>

      {/* Quotes Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {quotes.map((quote, index) => (
            <motion.div
              key={quote.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="premium-card p-8 group hover:shadow-gold-glow-lg transition-all duration-300"
            >
              {/* Quote Text */}
              <blockquote className="text-lg md:text-xl font-serif italic text-gray-200 mb-6 leading-relaxed">
                "{quote.text}"
              </blockquote>

              {/* Author & Date */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-premium-gold/20">
                <div>
                  <p className="text-premium-gold font-semibold">— {quote.author}</p>
                  <p className="text-gray-500 text-sm flex items-center mt-1">
                    <Clock size={14} className="mr-1" />
                    {quote.date}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-6">
                <button
                  onClick={() => handleLike(quote.id)}
                  className={`flex items-center space-x-2 transition-all ${
                    quote.isLiked 
                      ? 'text-red-500' 
                      : 'text-gray-400 hover:text-premium-gold'
                  }`}
                >
                  <Heart 
                    size={20} 
                    fill={quote.isLiked ? 'currentColor' : 'none'}
                    className="transition-transform hover:scale-110"
                  />
                  <span className="font-medium">{quote.likes}</span>
                </button>

                <button
                  onClick={() => setExpandedQuote(expandedQuote === quote.id ? null : quote.id)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-premium-gold transition-colors"
                >
                  <MessageCircle size={20} />
                  <span className="font-medium">{quote.comments.length}</span>
                </button>

                <button
                  onClick={() => handleShare(quote)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-premium-gold transition-colors"
                >
                  <Share2 size={20} />
                  <span className="font-medium">Share</span>
                </button>
              </div>

              {/* Comments Section */}
              <AnimatePresence>
                {expandedQuote === quote.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 pt-6 border-t border-premium-gold/20 space-y-4"
                  >
                    {/* Existing Comments */}
                    {quote.comments.map(comment => (
                      <div key={comment.id} className="bg-premium-darkGray/50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-premium-gold text-sm">
                            {comment.author}
                          </span>
                          <span className="text-gray-500 text-xs">{comment.date}</span>
                        </div>
                        <p className="text-gray-300">{comment.text}</p>
                      </div>
                    ))}

                    {/* Add Comment */}
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newComment[quote.id] || ''}
                        onChange={(e) => setNewComment({ ...newComment, [quote.id]: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(quote.id)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-premium-darkGray/50 border border-premium-gold/20 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold transition-colors"
                      />
                      <button
                        onClick={() => handleAddComment(quote.id)}
                        className="px-6 py-2 bg-gradient-gold text-premium-black font-semibold rounded-lg hover:shadow-gold-glow transition-all"
                      >
                        Post
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="premium-button">
            Load More Quotes
          </button>
        </div>
      </section>
    </div>
  )
}
