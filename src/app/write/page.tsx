'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { genres, moods } from '@/lib/constants'

export default function WritePage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    genre: '',
    mood: '',
    isPublished: true
  })

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/community')
    }
  }, [user, authLoading, router])

  if (authLoading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFED4E]"></div>
      </div>
    )
  }

  if (!user) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (formData.title.length < 3) {
        throw new Error('Title must be at least 3 characters')
      }
      if (formData.content.length < 10) {
        throw new Error('Content must be at least 10 characters')
      }

      const res = await fetch('/api/writings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create writing')
      }

      const data = await res.json()
      router.push(`/writings/${data.writing.slug}`)
    } catch (err: any) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#FFED4E] mb-4">
            Share Your Writing
          </h1>
          <p className="text-neutral-300 text-lg">
            Express yourself in this judgment-free space
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500 rounded text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Give your writing a title..."
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-[#FFED4E] focus:outline-none text-lg"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Content <span className="text-red-400">*</span>
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              required
              rows={16}
              placeholder="Write your heart out..."
              className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white placeholder-neutral-500 focus:border-[#FFED4E] focus:outline-none resize-none font-serif text-lg leading-relaxed"
            />
            <p className="mt-2 text-sm text-neutral-400">
              {formData.content.length} characters
            </p>
          </div>

          {/* Genre & Mood */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Genre
              </label>
              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-[#FFED4E] focus:outline-none"
              >
                <option value="">Select a genre (optional)</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Mood
              </label>
              <select
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-lg text-white focus:border-[#FFED4E] focus:outline-none"
              >
                <option value="">Select a mood (optional)</option>
                {moods.map(mood => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-neutral-800">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-3 text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-[#FFED4E] text-black font-semibold rounded-lg hover:bg-[#FFE830] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Publishing...' : 'Publish Writing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
