'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Repeat2, Calendar } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { formatDate } from '@/lib/utils'

interface Reflection {
  id: string
  content: string
  createdAt: string
  author: {
    id: string
    name: string
    username: string
    isFounder: boolean
  }
}

interface WritingDetailProps {
  writing: {
    id: string
    title: string
    content: string
    slug: string
    genre: string | null
    mood: string | null
    createdAt: string
    author: {
      id: string
      name: string
      username: string
      isFounder: boolean
      bio: string | null
    }
    _count: {
      likes: number
      reflections: number
      reposts: number
    }
  }
}

export default function WritingDetail({ writing }: WritingDetailProps) {
  const { user } = useAuth()
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(writing._count.likes)
  const [reflections, setReflections] = useState<Reflection[]>([])
  const [newReflection, setNewReflection] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchReflections()
    if (user) {
      checkLikeStatus()
    }
  }, [user])

  const checkLikeStatus = async () => {
    try {
      const res = await fetch(`/api/writings/${writing.id}/like`)
      const data = await res.json()
      setLiked(data.liked)
    } catch (error) {
      console.error('Failed to check like status:', error)
    }
  }

  const fetchReflections = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/writings/${writing.id}/reflections`)
      const data = await res.json()
      setReflections(data.reflections)
    } catch (error) {
      console.error('Failed to fetch reflections:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLike = async () => {
    if (!user) return

    try {
      const res = await fetch(`/api/writings/${writing.id}/like`, {
        method: 'POST'
      })
      const data = await res.json()
      setLiked(data.liked)
      setLikeCount(prev => data.liked ? prev + 1 : prev - 1)
    } catch (error) {
      console.error('Failed to like:', error)
    }
  }

  const handleSubmitReflection = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newReflection.trim() || submitting) return

    setSubmitting(true)
    try {
      const res = await fetch(`/api/writings/${writing.id}/reflections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newReflection })
      })

      if (!res.ok) throw new Error('Failed to submit reflection')

      const data = await res.json()
      setReflections([data.reflection, ...reflections])
      setNewReflection('')
    } catch (error) {
      console.error('Failed to submit reflection:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Author header */}
        <div className="mb-8">
          <Link
            href={`/writers/${writing.author.username}`}
            className="inline-flex items-center space-x-3 group mb-6"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#FFED4E] to-yellow-600 rounded-full flex items-center justify-center text-black font-bold text-lg">
              {writing.author.name[0].toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <p className="font-semibold text-white group-hover:text-[#FFED4E] transition-colors">
                  {writing.author.name}
                </p>
                {writing.author.isFounder && (
                  <span className="px-2 py-0.5 bg-[#FFED4E] text-black text-xs font-bold rounded">
                    FOUNDER
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-400">@{writing.author.username}</p>
            </div>
          </Link>
        </div>

        {/* Writing content */}
        <article className="mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFED4E] mb-6">
            {writing.title}
          </h1>

          <div className="flex items-center space-x-4 text-sm text-neutral-400 mb-8">
            <span className="flex items-center space-x-1">
              <Calendar size={16} />
              <span>{new Date(writing.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </span>
            {writing.genre && (
              <span className="px-3 py-1 bg-neutral-800 rounded-full">{writing.genre}</span>
            )}
            {writing.mood && (
              <span className="px-3 py-1 bg-neutral-800 rounded-full">{writing.mood}</span>
            )}
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <div className="text-neutral-200 font-serif text-lg leading-relaxed whitespace-pre-wrap">
              {writing.content}
            </div>
          </div>
        </article>

        {/* Actions */}
        <div className="flex items-center space-x-6 py-6 border-y border-neutral-800 mb-12">
          <button
            onClick={handleLike}
            disabled={!user}
            className={`flex items-center space-x-2 transition-colors ${
              liked ? 'text-red-500' : 'text-neutral-400 hover:text-red-500'
            } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <Heart size={24} fill={liked ? 'currentColor' : 'none'} />
            <span>{likeCount}</span>
          </button>

          <div className="flex items-center space-x-2 text-neutral-400">
            <MessageCircle size={24} />
            <span>{reflections.length}</span>
          </div>

          <button
            disabled={!user}
            className={`flex items-center space-x-2 text-neutral-400 hover:text-green-500 transition-colors ${
              !user ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <Repeat2 size={24} />
            <span>{writing._count.reposts}</span>
          </button>
        </div>

        {/* Reflections section */}
        <div id="reflections" className="space-y-8">
          <h2 className="text-2xl font-serif font-bold text-[#FFED4E]">
            Reflections ({reflections.length})
          </h2>

          {/* Add reflection form */}
          {user ? (
            <form onSubmit={handleSubmitReflection} className="bg-neutral-900 rounded-lg p-6">
              <textarea
                value={newReflection}
                onChange={(e) => setNewReflection(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
                maxLength={1000}
                className="w-full px-4 py-3 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-[#FFED4E] focus:outline-none resize-none mb-3"
              />
              <div className="flex items-center justify-between">
                <span className="text-sm text-neutral-400">
                  {newReflection.length}/1000
                </span>
                <button
                  type="submit"
                  disabled={!newReflection.trim() || submitting}
                  className="px-6 py-2 bg-[#FFED4E] text-black font-semibold rounded hover:bg-[#FFE830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Posting...' : 'Post Reflection'}
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-neutral-900 rounded-lg p-6 text-center">
              <p className="text-neutral-400 mb-4">Please log in to share your reflections</p>
            </div>
          )}

          {/* Reflections list */}
          {loading ? (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FFED4E]"></div>
            </div>
          ) : reflections.length === 0 ? (
            <div className="text-center py-12 text-neutral-400">
              No reflections yet. Be the first to share your thoughts!
            </div>
          ) : (
            <div className="space-y-6">
              {reflections.map(reflection => (
                <div key={reflection.id} className="bg-neutral-900 rounded-lg p-6">
                  <div className="flex items-start space-x-3 mb-3">
                    <Link
                      href={`/writers/${reflection.author.username}`}
                      className="flex items-start space-x-3 group"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-[#FFED4E] to-yellow-600 rounded-full flex items-center justify-center text-black font-bold flex-shrink-0">
                        {reflection.author.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-white group-hover:text-[#FFED4E] transition-colors">
                            {reflection.author.name}
                          </p>
                          {reflection.author.isFounder && (
                            <span className="px-2 py-0.5 bg-[#FFED4E] text-black text-xs font-bold rounded">
                              FOUNDER
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-neutral-400">
                          {formatDate(reflection.createdAt)}
                        </p>
                      </div>
                    </Link>
                  </div>
                  <p className="text-neutral-200 ml-13">{reflection.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
