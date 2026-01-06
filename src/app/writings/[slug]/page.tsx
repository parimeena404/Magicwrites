import { notFound } from 'next/navigation'
import prisma from '@/lib/prisma'
import WritingDetail from '@/app/writings/[slug]/WritingDetail'

interface PageProps {
  params: {
    slug: string
  }
}

async function getWriting(slug: string) {
  const writing = await prisma.writing.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          isFounder: true,
          bio: true
        }
      },
      _count: {
        select: {
          likes: true,
          reflections: true,
          reposts: true
        }
      }
    }
  })

  if (!writing || !writing.isPublished) {
    return null
  }

  return writing
}

export default async function WritingPage({ params }: PageProps) {
  const writing = await getWriting(params.slug)

  if (!writing) {
    notFound()
  }

  return <WritingDetail writing={writing} />
}
