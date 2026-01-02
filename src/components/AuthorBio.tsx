'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, Pen, Heart, Award } from 'lucide-react'

export default function AuthorBio() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto premium-card overflow-hidden"
      >
        <div className="flex flex-col md:flex-row gap-8 p-8">
          {/* Author Image */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 mx-auto md:mx-0">
              <div className="absolute inset-0 bg-gradient-gold rounded-full blur-lg opacity-30 animate-pulse"></div>
              <Image
                src="/magicwrites_logo.jpg"
                alt="Author"
                fill
                className="object-cover rounded-full border-4 border-premium-gold shadow-gold-glow-lg relative z-10"
              />
            </div>
          </div>

          {/* Author Details */}
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text-gradient mb-2">
                Pari Meena
              </h2>
              <p className="text-xl text-premium-gold font-semibold">Author & Poet</p>
            </div>

            <p className="text-gray-300 text-lg leading-relaxed">
              Hey there! I'm a poet and writer who loves playing with words and emotions. 
              Writing has always been my way of making sense of the world - every poem, every story 
              is a little piece of my heart. Through my anthologies and novel, I've tried to capture 
              the everyday magic we often miss. Thanks for stopping by and reading my work!
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
              <div className="text-center p-4 bg-premium-darkGray/30 rounded-lg">
                <BookOpen className="w-6 h-6 mx-auto text-premium-gold mb-2" />
                <div className="text-2xl font-bold gold-text-gradient">11</div>
                <div className="text-sm text-gray-400">Anthologies</div>
              </div>
              <div className="text-center p-4 bg-premium-darkGray/30 rounded-lg">
                <Pen className="w-6 h-6 mx-auto text-premium-gold mb-2" />
                <div className="text-2xl font-bold gold-text-gradient">1</div>
                <div className="text-sm text-gray-400">Novel</div>
              </div>
              <div className="text-center p-4 bg-premium-darkGray/30 rounded-lg">
                <Heart className="w-6 h-6 mx-auto text-premium-gold mb-2" />
                <div className="text-2xl font-bold gold-text-gradient">850+</div>
                <div className="text-sm text-gray-400">Poems</div>
              </div>
              <div className="text-center p-4 bg-premium-darkGray/30 rounded-lg">
                <Award className="w-6 h-6 mx-auto text-premium-gold mb-2" />
                <div className="text-2xl font-bold gold-text-gradient">10K+</div>
                <div className="text-sm text-gray-400">Readers</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
