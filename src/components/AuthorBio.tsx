'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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
              Pari Meena is a rising Indian author whose words shimmer with emotion, mystery, and quiet power. 
              Her writing drifts between lyrical stillness and inner storms, weaving heartfelt fiction that 
              lingers long after the last page is turned.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              Whether you're seeking a poetic escape into emotional depth, or a story that quietly unravels 
              the tangled threads of love, loss, and self-discovery, her words will take you there.
            </p>
            <p className="text-gray-300 text-lg leading-relaxed mt-4">
              Follow her journey as she brings soulful characters to life — one page, one feeling, and one 
              spiral at a time.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
