'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Instagram } from 'lucide-react'
import Image from 'next/image'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})

  const validateForm = () => {
    const errors: { [key: string]: string } = {}
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required'
    } else if (formData.name.length < 2) {
      errors.name = 'Name must be at least 2 characters'
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email'
    }
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required'
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required'
    } else if (formData.message.length < 10) {
      errors.message = 'Message must be at least 10 characters'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setFormErrors({})
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      })
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
            <Mail className="w-16 h-16 mx-auto text-premium-gold animate-pulse" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl font-serif font-bold mb-6"
          >
            <span className="gold-text-gradient">Get In Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Let's connect and create something magical together
          </motion.p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="premium-card p-8 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/magicwrites_logo.jpg"
                  alt="Magicwrites Logo"
                  fill
                  className="object-contain rounded-lg shadow-gold-glow-lg"
                />
              </div>
              <h2 className="text-2xl font-serif font-bold gold-text-gradient mb-2">
                Magicwrites
              </h2>
              <p className="text-gray-400">Premium Writing Platform</p>
            </div>

            {/* Contact Details */}
            <div className="premium-card p-8 space-y-6">
              <h3 className="text-xl font-serif font-bold gold-text-gradient mb-6">
                Contact Information
              </h3>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-gold rounded-lg">
                  <Mail className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Email</p>
                  <a href="mailto:magicwritesofficial@gmail.com" className="text-base text-premium-gold hover:text-premium-lightGold transition-colors">
                    magicwritesofficial@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-gold rounded-lg">
                  <Phone className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Phone</p>
                  <a href="tel:+1234567890" className="text-base text-premium-gold hover:text-premium-lightGold transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gradient-gold rounded-lg">
                  <MapPin className="w-6 h-6 text-premium-black" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Location</p>
                  <p className="text-base text-gray-300">
                    Available Worldwide
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="premium-card p-8">
              <h3 className="text-xl font-serif font-bold gold-text-gradient mb-6">
                Connect With Me
              </h3>
              <div className="flex space-x-4">
                <a
                  href="https://www.instagram.com/magicwrites_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-premium-gold/10 rounded-xl hover:bg-gradient-gold hover:scale-110 transition-all group shadow-lg"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-premium-gold group-hover:text-premium-black transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/pari-meena-5b7814297"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-premium-gold/10 rounded-xl hover:bg-gradient-gold hover:scale-110 transition-all group shadow-lg"
                  aria-label="LinkedIn"
                >
                  <svg className="w-6 h-6 text-premium-gold group-hover:text-premium-black transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="premium-card p-8"
          >
            <h3 className="text-xl font-serif font-bold gold-text-gradient mb-6">
              Send a Message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-300 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-premium-darkGray/50 border ${formErrors.name ? 'border-red-500' : 'border-premium-gold/30'} rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all`}
                  placeholder="John Doe"
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-premium-darkGray/50 border ${formErrors.email ? 'border-red-500' : 'border-premium-gold/30'} rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all`}
                  placeholder="john@example.com"
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-300 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full bg-premium-darkGray/50 border ${formErrors.subject ? 'border-red-500' : 'border-premium-gold/30'} rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all`}
                  placeholder="What's this about?"
                />
                {formErrors.subject && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.subject}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-300 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full bg-premium-darkGray/50 border ${formErrors.message ? 'border-red-500' : 'border-premium-gold/30'} rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold focus:shadow-gold-glow transition-all resize-none`}
                  placeholder="Your message here..."
                />
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full premium-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed py-4 text-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-3 border-premium-black border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={20} />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-green-500/20 border border-green-500 rounded-lg"
                >
                  <p className="text-green-400 text-center font-semibold">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
