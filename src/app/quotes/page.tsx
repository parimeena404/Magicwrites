'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Share2, Clock, Plus, Edit2, Trash2, Sparkles } from 'lucide-react'

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

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [isAuthor] = useState(true) // Set to true for author access
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [newQuote, setNewQuote] = useState({ text: '', author: 'Magicwrites' })
  const [editingQuote, setEditingQuote] = useState<number | null>(null)
  const [expandedQuote, setExpandedQuote] = useState<number | null>(null)
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({})

  const handleCreateQuote = () => {
    if (newQuote.text.trim()) {
      const quote: Quote = {
        id: Date.now(),
        ...newQuote,
        date: 'Just now',
        likes: 0,
        comments: [],
        isLiked: false,
      }
      setQuotes([quote, ...quotes])
      setNewQuote({ text: '', author: 'Magicwrites' })
      setShowCreateForm(false)
    }
  }

  const handleEditQuote = (id: number) => {
    const quote = quotes.find(q => q.id === id)
    if (quote) {
      setNewQuote({ text: quote.text, author: quote.author })
      setEditingQuote(id)
      setShowCreateForm(true)
    }
  }

  const handleUpdateQuote = () => {
    if (editingQuote && newQuote.text.trim()) {
      setQuotes(quotes.map(quote =>
        quote.id === editingQuote
          ? { ...quote, text: newQuote.text, author: newQuote.author }
          : quote
      ))
      setNewQuote({ text: '', author: 'Magicwrites' })
      setEditingQuote(null)
      setShowCreateForm(false)
    }
  }

  const handleDeleteQuote = (id: number) => {
    if (confirm('Are you sure you want to delete this quote?')) {
      setQuotes(quotes.filter(quote => quote.id !== id))
    }
  }

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
      navigator.clipboard.writeText(quote.text)
      alert('Quote copied to clipboard!')
    }
  }

  const handleAddComment = (quoteId: number) => {
    const commentText = newComment[quoteId]?.trim()
    if (commentText) {
      setQuotes(quotes.map(quote =>
        quote.id === quoteId
          ? {
            ...quote,
            comments: [
              ...quote.comments,
              {
                id: Date.now(),
                author: isAuthor ? 'Magicwrites' : 'Reader',
                text: commentText,
                date: 'Just now'
              }
            ]
          }
          : quote
      ))
      setNewComment({ ...newComment, [quoteId]: '' })
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
            <span className="gold-text-gradient">Inspiring Quotes</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            {isAuthor ? 'Share your wisdom with the world' : 'Words that inspire and transform'}
          </motion.p>
        </div>
      </section>

      {/* Author Controls */}
      {isAuthor && (
        <section className="px-4 sm:px-6 lg:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => {
                setShowCreateForm(!showCreateForm)
                setEditingQuote(null)
                setNewQuote({ text: '', author: 'Magicwrites' })
              }}
              className="premium-button w-full sm:w-auto flex items-center space-x-2 mx-auto"
            >
              <Plus size={20} />
              <span>Add New Quote</span>
            </motion.button>

            {/* Create/Edit Form */}
            <AnimatePresence>
              {showCreateForm && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="premium-card p-6 mt-6"
                >
                  <h3 className="text-xl font-serif font-bold gold-text-gradient mb-4">
                    {editingQuote ? 'Edit Quote' : 'Create New Quote'}
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Quote Text</label>
                      <textarea
                        value={newQuote.text}
                        onChange={(e) => setNewQuote({ ...newQuote, text: e.target.value })}
                        placeholder="Enter your inspiring quote..."
                        rows={4}
                        className="w-full bg-premium-darkGray/50 border border-premium-gold/30 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all resize-none"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-300 font-semibold mb-2">Author</label>
                      <input
                        type="text"
                        value={newQuote.author}
                        onChange={(e) => setNewQuote({ ...newQuote, author: e.target.value })}
                        className="w-full bg-premium-darkGray/50 border border-premium-gold/30 rounded-lg px-4 py-3 text-gray-300 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={editingQuote ? handleUpdateQuote : handleCreateQuote}
                        className="premium-button flex-1"
                      >
                        {editingQuote ? 'Update Quote' : 'Publish Quote'}
                      </button>
                      <button
                        onClick={() => {
                          setShowCreateForm(false)
                          setEditingQuote(null)
                          setNewQuote({ text: '', author: 'Magicwrites' })
                        }}
                        className="flex-1 px-6 py-3 border-2 border-premium-gold/30 text-gray-300 font-semibold rounded-lg hover:bg-premium-gold/10 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Quotes List */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {quotes.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="premium-card p-12 text-center"
            >
              <Sparkles className="w-20 h-20 mx-auto text-premium-gold/30 mb-6" />
              <h3 className="text-2xl font-serif font-bold text-gray-300 mb-4">
                No Quotes Yet
              </h3>
              <p className="text-gray-400 text-lg mb-6">
                {isAuthor
                  ? 'Start sharing your inspiring quotes with the world'
                  : 'Check back soon for inspiring quotes'}
              </p>
              {isAuthor && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="premium-button"
                >
                  Add First Quote
                </button>
              )}
            </motion.div>
          ) : (
            quotes.map((quote, index) => (
              <motion.article
                key={quote.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="premium-card p-8 hover:shadow-gold-glow-lg transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center">
                      <span className="text-premium-black font-bold text-lg">
                        {quote.author.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-200">{quote.author}</p>
                      <p className="text-sm text-gray-400 flex items-center space-x-1">
                        <Clock size={14} />
                        <span>{quote.date}</span>
                      </p>
                    </div>
                  </div>
                  {isAuthor && (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEditQuote(quote.id)}
                        className="p-2 text-premium-gold hover:bg-premium-gold/10 rounded-lg transition-colors"
                        aria-label="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteQuote(quote.id)}
                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        aria-label="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  )}
                </div>

                <blockquote className="text-xl md:text-2xl font-serif text-gray-200 mb-6 leading-relaxed italic">
                  "{quote.text}"
                </blockquote>

                <div className="flex items-center justify-between pt-4 border-t border-premium-gold/20">
                  <div className="flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(quote.id)}
                      className={`flex items-center space-x-2 transition-colors ${quote.isLiked ? 'text-premium-gold' : 'text-gray-400 hover:text-premium-gold'
                        }`}
                    >
                      <Heart size={20} className={quote.isLiked ? 'fill-current' : ''} />
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
                </div>

                {/* Comments Section */}
                <AnimatePresence>
                  {expandedQuote === quote.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 pt-6 border-t border-premium-gold/20"
                    >
                      <h4 className="font-semibold text-gray-300 mb-4">Comments</h4>
                      <div className="space-y-4 mb-4">
                        {quote.comments.map((comment) => (
                          <div key={comment.id} className="bg-premium-darkGray/30 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-semibold text-gray-300">{comment.author}</span>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                            </div>
                            <p className="text-gray-400">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={newComment[quote.id] || ''}
                          onChange={(e) => setNewComment({ ...newComment, [quote.id]: e.target.value })}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddComment(quote.id)}
                          placeholder="Add a comment..."
                          className="flex-1 bg-premium-darkGray/50 border border-premium-gold/30 rounded-lg px-4 py-2 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold transition-all"
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
              </motion.article>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
