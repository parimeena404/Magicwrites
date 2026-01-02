'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send, Instagram, Twitter, Facebook } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
      
      setTimeout(() => setSubmitStatus('idle'), 3000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
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
            <span className="gold-text-gradient">Get In Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-lg text-gray-400 max-w-3xl mx-auto"
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
            {/* Logo Placeholder */}
            <div className="premium-card p-8 text-center">
              <div className="w-32 h-32 mx-auto mb-4 bg-gradient-gold rounded-full flex items-center justify-center shadow-gold-glow-lg">
                <span className="text-4xl font-serif font-bold text-premium-black">MW</span>
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
                  <a href="mailto:contact@magicwrites.com" className="text-base text-premium-gold hover:text-premium-lightGold transition-colors">
                    contact@magicwrites.com
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
              <h3 className="text-xl font-serif font-bold gold-text-gradient mb-4">
                Connect With Me
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="p-3 bg-premium-gold/10 rounded-lg hover:bg-gradient-gold hover:scale-110 transition-all group"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6 text-premium-gold group-hover:text-premium-black" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-premium-gold/10 rounded-lg hover:bg-gradient-gold hover:scale-110 transition-all group"
                  aria-label="Twitter"
                >
                  <Twitter className="w-6 h-6 text-premium-gold group-hover:text-premium-black" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-premium-gold/10 rounded-lg hover:bg-gradient-gold hover:scale-110 transition-all group"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6 text-premium-gold group-hover:text-premium-black" />
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-premium-darkGray/50 border border-premium-gold/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold transition-colors"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-premium-darkGray/50 border border-premium-gold/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold transition-colors"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full bg-premium-darkGray/50 border border-premium-gold/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold transition-colors"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full bg-premium-darkGray/50 border border-premium-gold/20 rounded-lg px-4 py-3 text-gray-300 placeholder-gray-500 focus:outline-none focus:border-premium-gold transition-colors resize-none"
                  placeholder="Your message here..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full premium-button flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send size={18} />
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-green-500 text-center font-medium"
                >
                  Message sent successfully! I'll get back to you soon.
                </motion.p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
