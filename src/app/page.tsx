'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, MessageCircle, Bookmark, Send, MoreHorizontal, X, ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/contexts/AuthContext'
import { formatDate } from '@/lib/utils'

interface Story {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    isFounder: boolean
  }
  image: string
  timestamp: string
  viewed: boolean
}

interface Post {
  id: string
  author: {
    name: string
    username: string
    avatar: string
    isFounder: boolean
  }
  image?: string
  caption: string
  likes: number
  comments: number
  timestamp: string
  saved: boolean
  liked: boolean
}

export default function HomePage() {
  const { user } = useAuth()
  const [selectedStory, setSelectedStory] = useState<Story | null>(null)
  const [storyIndex, setStoryIndex] = useState(0)
  const [posts, setPosts] = useState<Post[]>([])
  const [stories, setStories] = useState<Story[]>([])

  // Sample stories data
  const sampleStories: Story[] = [
    {
      id: '1',
      author: {
        name: 'Pari Meena',
        username: 'parimeena',
        avatar: '/api/placeholder/100/100',
        isFounder: true
      },
      image: '/images/anthologies/Drums of Dawn.jpeg',
      timestamp: '2h ago',
      viewed: false
    },
    {
      id: '2',
      author: {
        name: 'Sarah Writer',
        username: 'sarahwrites',
        avatar: '/api/placeholder/100/100',
        isFounder: false
      },
      image: '/images/anthologies/Petals 6th edition.jpeg',
      timestamp: '5h ago',
      viewed: false
    },
    {
      id: '3',
      author: {
        name: 'Alex Poet',
        username: 'alexpoet',
        avatar: '/api/placeholder/100/100',
        isFounder: false
      },
      image: '/images/anthologies/Where darkness meets dawn.jpeg',
      timestamp: '8h ago',
      viewed: false
    }
  ]

  // Sample posts data
  const samplePosts: Post[] = [
    {
      id: '1',
      author: {
        name: 'Pari Meena',
        username: 'parimeena',
        avatar: '/api/placeholder/100/100',
        isFounder: true
      },
      image: '/images/anthologies/Drums of Dawn.jpeg',
      caption: 'Just published my latest anthology "Drums of Dawn" 🌅 A rhythmic collection of verses that awaken the soul. What do you think about writing at dawn? #Poetry #WritingCommunity',
      likes: 234,
      comments: 45,
      timestamp: new Date().toISOString(),
      saved: false,
      liked: false
    },
    {
      id: '2',
      author: {
        name: 'Emma Stories',
        username: 'emmastories',
        avatar: '/api/placeholder/100/100',
        isFounder: false
      },
      caption: 'Working on my novel tonight. Sometimes the words flow like magic, sometimes they hide. But the journey is always worth it. ✨ Who else is writing tonight? #AmWriting #WritersLife',
      likes: 156,
      comments: 23,
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      saved: false,
      liked: false
    },
    {
      id: '3',
      author: {
        name: 'Pari Meena',
        username: 'parimeena',
        avatar: '/api/placeholder/100/100',
        isFounder: true
      },
      image: '/images/novels/the-spiral-between-us.png',
      caption: 'Excited to announce "The Spiral Between Us" is now available! 📖 A journey through love and connection. Link in bio! #NewNovel #BookRelease',
      likes: 389,
      comments: 67,
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      saved: false,
      liked: false
    }
  ]

  useEffect(() => {
    setStories(sampleStories)
    setPosts(samplePosts)
  }, [])

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const handleSave = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, saved: !post.saved }
        : post
    ))
  }

  const viewStory = (story: Story, index: number) => {
    setSelectedStory(story)
    setStoryIndex(index)
    setStories(stories.map(s => s.id === story.id ? { ...s, viewed: true } : s))
  }

  const nextStory = () => {
    if (storyIndex < stories.length - 1) {
      setStoryIndex(storyIndex + 1)
      setSelectedStory(stories[storyIndex + 1])
      setStories(stories.map((s, i) => i === storyIndex + 1 ? { ...s, viewed: true } : s))
    } else {
      setSelectedStory(null)
    }
  }

  const previousStory = () => {
    if (storyIndex > 0) {
      setStoryIndex(storyIndex - 1)
      setSelectedStory(stories[storyIndex - 1])
    }
  }

  return (
    <div className="min-h-screen pt-20 pb-10 bg-neutral-950">
      <div className="max-w-2xl mx-auto px-4">
        {/* Stories Section */}
        <div className="mb-8 overflow-x-auto scrollbar-hide">
          <div className="flex space-x-4 py-4">
            {/* Your Story */}
            {user && (
              <div className="flex flex-col items-center space-y-1 flex-shrink-0">
                <div className="relative cursor-pointer group">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-neutral-900 p-1">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFED4E] to-yellow-600 flex items-center justify-center text-black font-bold text-xl">
                        {user.name[0].toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-6 h-6 bg-blue-500 rounded-full border-2 border-neutral-900 flex items-center justify-center text-white text-xs font-bold">
                    +
                  </div>
                </div>
                <span className="text-xs text-neutral-400 max-w-[80px] truncate">Your Story</span>
              </div>
            )}

            {/* Other Stories */}
            {stories.map((story, index) => (
              <div key={story.id} className="flex flex-col items-center space-y-1 flex-shrink-0">
                <button
                  onClick={() => viewStory(story, index)}
                  className="relative cursor-pointer group"
                >
                  <div className={`w-20 h-20 rounded-full p-0.5 ${
                    story.viewed 
                      ? 'bg-neutral-700' 
                      : 'bg-gradient-to-tr from-purple-600 via-pink-600 to-orange-500'
                  }`}>
                    <div className="w-full h-full rounded-full bg-neutral-900 p-1">
                      <div className="w-full h-full rounded-full bg-gradient-to-br from-[#FFED4E] to-yellow-600 flex items-center justify-center text-black font-bold text-xl overflow-hidden">
                        {story.author.name[0].toUpperCase()}
                      </div>
                    </div>
                  </div>
                  {story.author.isFounder && (
                    <div className="absolute bottom-0 right-0 w-5 h-5 bg-[#FFED4E] rounded-full border-2 border-neutral-900 flex items-center justify-center text-black text-xs font-bold">
                      ★
                    </div>
                  )}
                </button>
                <span className="text-xs text-neutral-400 max-w-[80px] truncate">
                  {story.author.username}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-neutral-900 rounded-lg border border-neutral-800 overflow-hidden"
            >
              {/* Post Header */}
              <div className="flex items-center justify-between p-4">
                <Link href={`/writers/${post.author.username}`} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFED4E] to-yellow-600 flex items-center justify-center text-black font-bold">
                    {post.author.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white hover:text-neutral-300">
                        {post.author.username}
                      </span>
                      {post.author.isFounder && (
                        <span className="px-2 py-0.5 bg-[#FFED4E] text-black text-xs font-bold rounded">
                          FOUNDER
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-400">{formatDate(post.timestamp)}</span>
                  </div>
                </Link>
                <button className="text-neutral-400 hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              {/* Post Image */}
              {post.image && (
                <div className="relative w-full aspect-square bg-neutral-800">
                  <Image
                    src={post.image}
                    alt="Post"
                    fill
                    className="object-cover"
                  />
                </div>
              )}

              {/* Post Actions */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="hover:scale-110 transition-transform"
                    >
                      <Heart
                        size={24}
                        className={post.liked ? 'fill-red-500 text-red-500' : 'text-white'}
                      />
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <MessageCircle size={24} className="text-white" />
                    </button>
                    <button className="hover:scale-110 transition-transform">
                      <Send size={24} className="text-white" />
                    </button>
                  </div>
                  <button
                    onClick={() => handleSave(post.id)}
                    className="hover:scale-110 transition-transform"
                  >
                    <Bookmark
                      size={24}
                      className={post.saved ? 'fill-[#FFED4E] text-[#FFED4E]' : 'text-white'}
                    />
                  </button>
                </div>

                {/* Likes */}
                <div className="font-semibold text-white">
                  {post.likes.toLocaleString()} likes
                </div>

                {/* Caption */}
                <div className="text-white">
                  <Link href={`/writers/${post.author.username}`} className="font-semibold hover:text-neutral-300">
                    {post.author.username}
                  </Link>
                  {' '}
                  <span className="text-neutral-300">{post.caption}</span>
                </div>

                {/* Comments */}
                {post.comments > 0 && (
                  <button className="text-neutral-400 hover:text-neutral-300 text-sm">
                    View all {post.comments} comments
                  </button>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        {/* Empty State */}
        {posts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg mb-4">No posts yet</p>
            <Link
              href="/write"
              className="inline-block px-6 py-3 bg-[#FFED4E] text-black font-semibold rounded-lg hover:bg-[#FFE830] transition-colors"
            >
              Create Your First Post
            </Link>
          </div>
        )}
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {selectedStory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
          >
            {/* Story Progress Bars */}
            <div className="absolute top-4 left-0 right-0 px-4 z-10">
              <div className="flex space-x-1 max-w-2xl mx-auto">
                {stories.map((_, index) => (
                  <div key={index} className="flex-1 h-0.5 bg-neutral-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-white transition-all duration-300 ${
                        index < storyIndex ? 'w-full' : index === storyIndex ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Story Header */}
            <div className="absolute top-8 left-0 right-0 px-4 z-10">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFED4E] to-yellow-600 flex items-center justify-center text-black font-bold">
                    {selectedStory.author.name[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-white">{selectedStory.author.username}</span>
                      {selectedStory.author.isFounder && (
                        <span className="px-2 py-0.5 bg-[#FFED4E] text-black text-xs font-bold rounded">
                          FOUNDER
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-neutral-300">{selectedStory.timestamp}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedStory(null)}
                  className="text-white hover:text-neutral-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>

            {/* Story Image */}
            <div className="relative w-full max-w-2xl h-full">
              <Image
                src={selectedStory.image}
                alt="Story"
                fill
                className="object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            {storyIndex > 0 && (
              <button
                onClick={previousStory}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-full flex items-center justify-center text-white"
              >
                <ChevronLeft size={24} />
              </button>
            )}
            {storyIndex < stories.length - 1 && (
              <button
                onClick={nextStory}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-neutral-800/50 hover:bg-neutral-700/50 rounded-full flex items-center justify-center text-white"
              >
                <ChevronRight size={24} />
              </button>
            )}

            {/* Click Areas */}
            <div className="absolute inset-0 flex">
              <div className="flex-1 cursor-pointer" onClick={previousStory} />
              <div className="flex-1 cursor-pointer" onClick={nextStory} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
