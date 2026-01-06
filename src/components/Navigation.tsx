'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, PenLine, LogOut } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContext'
import AuthModal from './AuthModal'

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Community', href: '/community' },
  { name: 'Anthologies', href: '/anthologies' },
  { name: 'Novels', href: '/novels' },
  { name: 'Quotes', href: '/quotes' },
  { name: 'Contact', href: '/contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login')
  const pathname = usePathname()
  const { user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-premium-black/90 backdrop-blur-lg shadow-gold-glow' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-12 h-12">
              <Image
                src="/magicwrites_logo.jpg"
                alt="Magicwrites Logo"
                fill
                className="object-contain group-hover:scale-110 transition-transform duration-300"
                priority
              />
            </div>
            <span className="text-xl font-serif font-bold gold-text-gradient">
              Magicwrites
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-base font-medium transition-all duration-300 relative group ${
                  pathname === item.href
                    ? 'text-premium-gold'
                    : 'text-gray-300 hover:text-premium-gold'
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-gold transition-all duration-300 ${
                  pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link>
            ))}

            {user ? (
              <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-neutral-700">
                <Link
                  href="/write"
                  className="flex items-center space-x-2 px-4 py-2 bg-[#FFED4E] text-black font-semibold rounded hover:bg-[#FFE830] transition-colors"
                >
                  <PenLine size={18} />
                  <span>Write</span>
                </Link>
                <Link
                  href={`/writers/${user.username}`}
                  className="text-sm text-neutral-300 hover:text-[#FFED4E]"
                >
                  @{user.username}
                </Link>
                <button
                  onClick={logout}
                  className="p-2 text-neutral-400 hover:text-red-400 transition-colors"
                  title="Log out"
                >
                  <LogOut size={18} />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-neutral-700">
                <button
                  onClick={() => {
                    setAuthMode('login')
                    setShowAuthModal(true)
                  }}
                  className="text-sm text-neutral-300 hover:text-[#FFED4E] transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => {
                    setAuthMode('signup')
                    setShowAuthModal(true)
                  }}
                  className="px-4 py-2 bg-[#FFED4E] text-black font-semibold rounded hover:bg-[#FFE830] transition-colors text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-premium-gold hover:bg-premium-gold/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-premium-darkGray/95 backdrop-blur-lg border-t border-premium-gold/20"
          >
            <div className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-base font-medium transition-colors py-2 ${
                    pathname === item.href
                      ? 'text-premium-gold'
                      : 'text-gray-300 hover:text-premium-gold'
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              {user ? (
                <div className="pt-4 border-t border-neutral-700 space-y-3">
                  <Link
                    href="/write"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-[#FFED4E] text-black font-semibold rounded"
                  >
                    <PenLine size={18} />
                    <span>Write</span>
                  </Link>
                  <Link
                    href={`/writers/${user.username}`}
                    onClick={() => setIsOpen(false)}
                    className="block text-center text-neutral-300"
                  >
                    @{user.username}
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="w-full py-2 text-red-400 hover:text-red-300"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="pt-4 border-t border-neutral-700 space-y-3">
                  <button
                    onClick={() => {
                      setAuthMode('login')
                      setShowAuthModal(true)
                      setIsOpen(false)
                    }}
                    className="w-full py-2 text-neutral-300 hover:text-[#FFED4E] border border-neutral-700 rounded"
                  >
                    Log In
                  </button>
                  <button
                    onClick={() => {
                      setAuthMode('signup')
                      setShowAuthModal(true)
                      setIsOpen(false)
                    }}
                    className="w-full py-3 bg-[#FFED4E] text-black font-semibold rounded"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </nav>
  )
}
