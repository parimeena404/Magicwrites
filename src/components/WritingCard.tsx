'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Repeat2 } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { formatDate } from '@/lib/utils'

interface WritingCardProps {
  writing: {
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
  initialLiked?: boolean
}

export default function WritingCard({ writing, initialLiked = false }: WritingCardProps) {
  const { user } = useAuth()
  const [liked, setLiked] = useState(initialLiked)
  const [likeCount, setLikeCount] = useState(writing._count.likes)
  const [loading, setLoading] = useState(false)

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)
    try {
      const res = await fetch(`/api/writings/${writing.id}/like`, {
        method: 'POST'
      })
      const data = await res.json()
      setLiked(data.liked)
      setLikeCount(prev => data.liked ? prev + 1 : prev - 1)
    } catch (error) {
      console.error('Failed to like:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <article className="bg-neutral-900 rounded-lg p-6 hover:bg-neutral-800/50 transition-colors border border-neutral-800">
      {/* Author info */}
      <div className="flex items-center space-x-3 mb-4">
        <Link
          href={`/writers/${writing.author.username}`}
          className="flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-[#FFED4E] to-yellow-600 rounded-full flex items-center justify-center text-black font-bold">
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
            <p className="text-sm text-neutral-400">
              @{writing.author.username} · {formatDate(writing.createdAt)}
            </p>
          </div>
        </Link>
      </div>

      {/* Writing content */}
      <Link href={`/writings/${writing.slug}`}>
        <h2 className="text-2xl font-serif font-bold text-[#FFED4E] mb-3 hover:text-[#FFE830] transition-colors">
          {writing.title}
        </h2>
        <p className="text-neutral-300 mb-4 line-clamp-3">{writing.excerpt}</p>

        {/* Tags */}
        {(writing.genre || writing.mood) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {writing.genre && (
              <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full border border-neutral-700">
                {writing.genre}
              </span>
            )}
            {writing.mood && (
              <span className="px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full border border-neutral-700">
                {writing.mood}
              </span>
            )}
          </div>
        )}
      </Link>

      {/* Actions */}
      <div className="flex items-center space-x-6 pt-4 border-t border-neutral-800">
        <button
          onClick={handleLike}
          disabled={!user || loading}
          className={`flex items-center space-x-2 transition-colors ${
            liked
              ? 'text-red-500'
              : 'text-neutral-400 hover:text-red-500'
          } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          <Heart size={20} fill={liked ? 'currentColor' : 'none'} />
          <span className="text-sm">{likeCount}</span>
        </button>

        <Link
          href={`/writings/${writing.slug}#reflections`}
          className="flex items-center space-x-2 text-neutral-400 hover:text-[#FFED4E] transition-colors"
        >
          <MessageCircle size={20} />
          <span className="text-sm">{writing._count.reflections}</span>
        </Link>

        <button
          disabled={!user}
          className={`flex items-center space-x-2 text-neutral-400 hover:text-green-500 transition-colors ${
            !user ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          <Repeat2 size={20} />
          <span className="text-sm">{writing._count.reposts}</span>
        </button>
      </div>
    </article>
  )
}
