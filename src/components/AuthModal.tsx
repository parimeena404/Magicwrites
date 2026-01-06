'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialMode?: 'login' | 'signup'
}

export default function AuthModal({ isOpen, onClose, initialMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const { login, signup } = useAuth()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  })

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (formData.password.length < 8) {
          throw new Error('Password must be at least 8 characters')
        }
        await signup({
          name: formData.name,
          email: formData.email,
          username: formData.username,
          password: formData.password
        })
      } else {
        await login(formData.email, formData.password)
      }
      onClose()
      setFormData({ name: '', email: '', username: '', password: '', confirmPassword: '' })
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 rounded-lg max-w-md w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-neutral-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-6 text-[#FFED4E]">
          {mode === 'login' ? 'Welcome Back' : 'Join MagicWrites'}
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white focus:border-[#FFED4E] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm text-neutral-300 mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  pattern="^[a-zA-Z0-9_]{3,20}$"
                  title="3-20 characters, letters, numbers, and underscores only"
                  className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white focus:border-[#FFED4E] focus:outline-none"
                />
              </div>
            </>
          )}

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white focus:border-[#FFED4E] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-neutral-300 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength={8}
              className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white focus:border-[#FFED4E] focus:outline-none"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-sm text-neutral-300 mb-1">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-neutral-800 border border-neutral-700 rounded text-white focus:border-[#FFED4E] focus:outline-none"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#FFED4E] text-black font-semibold rounded hover:bg-[#FFE830] transition-colors disabled:opacity-50"
          >
            {loading ? 'Please wait...' : mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setMode(mode === 'login' ? 'signup' : 'login')
              setError('')
            }}
            className="text-sm text-neutral-400 hover:text-[#FFED4E]"
          >
            {mode === 'login' 
              ? "Don't have an account? Sign up" 
              : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  )
}
