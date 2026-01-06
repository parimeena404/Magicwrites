import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create founder account (Pari Meena)
  const hashedPassword = await hashPassword('PariMeena2024!')
  
  const founder = await prisma.user.upsert({
    where: { email: 'pari@magicwrites.com' },
    update: {},
    create: {
      name: 'Pari Meena',
      email: 'pari@magicwrites.com',
      username: 'parimeena',
      password: hashedPassword,
      isFounder: true,
      bio: 'Founder of MagicWrites. Creating a safe space for writers to express themselves without judgment. Welcome to our sanctuary. 💛'
    }
  })

  console.log('✅ Created founder:', founder.username)

  // Create a welcome writing from founder
  const welcomeWriting = await prisma.writing.upsert({
    where: { slug: 'welcome-to-magicwrites' },
    update: {},
    create: {
      title: 'Welcome to MagicWrites',
      content: `Dear Writers,

Welcome to MagicWrites, a sanctuary for creative expression.

This platform was born from a simple belief: every writer deserves a space where their words can breathe freely, without the weight of judgment or comparison.

Here, you won't find follower counts, popularity metrics, or competitive rankings. What you will find is a community that celebrates the act of writing itself—the courage it takes to share your inner world, the vulnerability in every line, and the magic that happens when words meet the page.

Whether you're sharing poetry that flows from your heart, fiction that transports us to new worlds, or personal reflections that help us understand our own experiences—your voice matters here.

This is your canvas. Your sanctuary. Your space to create, explore, and connect.

Write freely. Write honestly. Write magically.

With love and light,
Pari Meena
Founder, MagicWrites`,
      excerpt: 'Welcome to MagicWrites, a sanctuary for creative expression free from judgment and comparison.',
      slug: 'welcome-to-magicwrites',
      genre: 'Essay',
      mood: 'Hopeful',
      isPublished: true,
      isFeatured: true,
      authorId: founder.id
    }
  })

  console.log('✅ Created welcome post:', welcomeWriting.title)

  // Create sample writings
  const sampleWritings = [
    {
      title: 'Midnight Thoughts',
      content: `The clock strikes twelve, and the world grows quiet.
In this silence, my thoughts become poetry—
Each word a star in the darkness,
Each line a bridge between heart and mind.

Sometimes the best writing comes at midnight,
When the world sleeps and creativity awakens,
When inhibitions fade and truth emerges,
When magic fills the space between thoughts.

This is my midnight confession:
I write not to be understood,
But to understand myself.`,
      genre: 'Poetry',
      mood: 'Reflective',
      slug: 'midnight-thoughts'
    },
    {
      title: 'The Writer\'s Journey',
      content: `Every writer begins somewhere—perhaps with a single sentence that refuses to be ignored, or a character who walks into their mind uninvited. The journey is never linear. It's filled with false starts and brilliant breakthroughs, with doubt and determination dancing an eternal tango.

What makes a writer isn't the number of books published or stories completed. It's the unwavering commitment to the craft, the willingness to sit with the blank page even when inspiration feels distant, the courage to write the truth even when it's uncomfortable.

We write because we must. Because stories live inside us and demand to be told. Because sometimes the only way to make sense of the world is to create new ones. Because words are our magic, and writing is our spell.

This journey is uniquely yours. Honor it. Embrace it. Trust it.`,
      genre: 'Essay',
      mood: 'Inspiring',
      slug: 'the-writers-journey'
    }
  ]

  for (const writing of sampleWritings) {
    await prisma.writing.upsert({
      where: { slug: writing.slug },
      update: {},
      create: {
        ...writing,
        excerpt: writing.content.substring(0, 150) + '...',
        isPublished: true,
        authorId: founder.id
      }
    })
    console.log('✅ Created writing:', writing.title)
  }

  console.log('🎉 Seeding completed successfully!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
