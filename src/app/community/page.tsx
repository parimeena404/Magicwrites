'use client'

import { useEffect, useState } from 'react'
import WritingCard from '@/components/WritingCard'
import { useAuth } from '@/contexts/AuthContext'

interface Writing {
  id: string
  title: string
  excerpt: string
  slug: string
  genre: string | null
  mood: string | null
  createdAt: string
  author: {
    id: string
    name: string
    username: string
    isFounder: boolean
  }
  _count: {
    likes: number
    reflections: number
    reposts: number
  }
}

export default function CommunityPage() {
  const [writings, setWritings] = useState<Writing[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>('all')
  const { user } = useAuth()

  useEffect(() => {
    fetchWritings()
  }, [filter])

  const fetchWritings = async () => {
    setLoading(true)
    try {
      let url = '/api/writings?limit=50'
      if (filter !== 'all') {
        url += `&genre=${filter}`
      }
      const res = await fetch(url)
      const data = await res.json()
      setWritings(data.writings)
    } catch (error) {
      console.error('Failed to fetch writings:', error)
    } finally {
      setLoading(false)
    }
  }

  const genres = [
    'all',
    'Poetry',
    'Fiction',
    'Non-Fiction',
    'Romance',
    'Fantasy',
    'Mystery',
    'Sci-Fi',
    'Thriller',
    'Horror',
    'Essay',
    'Memoir',
    'Short Story',
    'Prose'
  ]

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFED4E] mb-4">
            Community Feed
          </h1>
          <p className="text-neutral-300 text-lg">
            A sanctuary for writers to share their work, free from judgment
          </p>
        </div>

        {/* Genre filter */}
        <div className="mb-8 overflow-x-auto">
          <div className="flex space-x-2 pb-2">
            {genres.map(genre => (
              <button
                key={genre}
                onClick={() => setFilter(genre)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === genre
                    ? 'bg-[#FFED4E] text-black'
                    : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                }`}
              >
                {genre.charAt(0).toUpperCase() + genre.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFED4E]"></div>
          </div>
        )}

        {/* Empty state */}
        {!loading && writings.length === 0 && (
          <div className="text-center py-16 bg-neutral-900 rounded-lg">
            <p className="text-neutral-400 text-lg mb-4">No writings yet in this category</p>
            {user && (
              <a
                href="/write"
                className="inline-block px-6 py-3 bg-[#FFED4E] text-black font-semibold rounded hover:bg-[#FFE830] transition-colors"
              >
                Be the first to write
              </a>
            )}
          </div>
        )}

        {/* Writings list */}
        {!loading && writings.length > 0 && (
          <div className="space-y-6">
            {writings.map(writing => (
              <WritingCard key={writing.id} writing={writing} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
