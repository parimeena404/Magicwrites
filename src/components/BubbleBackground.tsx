'use client'

import { useEffect, useState } from 'react'

interface Bubble {
  id: number
  left: string
  size: number
  delay: number
  duration: number
}

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])

  useEffect(() => {
    const newBubbles: Bubble[] = []
    for (let i = 0; i < 20; i++) {
      newBubbles.push({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 150 + 30, // 30px to 180px
        delay: Math.random() * 5,
        duration: Math.random() * 8 + 8, // 8s to 16s
      })
    }
    setBubbles(newBubbles)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="gold-bubble absolute"
          style={{
            left: bubble.left,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            bottom: `-${bubble.size}px`,
            animation: `bubbleRise ${bubble.duration}s ease-in-out ${bubble.delay}s infinite`,
          }}
        />
      ))}
      {/* Additional static decorative bubbles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-premium-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-72 h-72 bg-premium-gold/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-premium-gold/5 rounded-full blur-3xl" />
    </div>
  )
}
