import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { createSlug, generateUniqueSlug, truncate } from '@/lib/utils'
import { z } from 'zod'

const writingSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  genre: z.string().optional(),
  mood: z.string().optional(),
  isPublished: z.boolean().default(true)
})

export async function POST(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const session = JSON.parse(sessionCookie.value)
    const body = await req.json()
    const validatedData = writingSchema.parse(body)
    
    // Create slug
    const baseSlug = createSlug(validatedData.title)
    const existingSlugs = await prisma.writing.findMany({
      where: { slug: { startsWith: baseSlug } },
      select: { slug: true }
    })
    const slug = generateUniqueSlug(baseSlug, existingSlugs.map((w: { slug: string }) => w.slug))
    
    // Create writing
    const writing = await prisma.writing.create({
      data: {
        title: validatedData.title,
        content: validatedData.content,
        excerpt: truncate(validatedData.content, 200),
        slug,
        genre: validatedData.genre || null,
        mood: validatedData.mood || null,
        isPublished: validatedData.isPublished,
        authorId: session.id
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            isFounder: true
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
    
    return NextResponse.json({ writing }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    
    console.error('Create writing error:', error)
    return NextResponse.json(
      { error: 'Failed to create writing. Please try again.' },
      { status: 500 }
    )
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const genre = searchParams.get('genre')
    const mood = searchParams.get('mood')
    const authorId = searchParams.get('authorId')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    const where: any = { isPublished: true }
    
    if (genre) where.genre = genre
    if (mood) where.mood = mood
    if (authorId) where.authorId = authorId
    
    const writings = await prisma.writing.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            isFounder: true
          }
        },
        _count: {
          select: {
            likes: true,
            reflections: true,
            reposts: true
          }
        }
      },
      orderBy: [
        { author: { isFounder: 'desc' } }, // Founder posts first
        { createdAt: 'desc' }
      ],
      take: limit
    })
    
    return NextResponse.json({ writings })
  } catch (error) {
    console.error('Fetch writings error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch writings.' },
      { status: 500 }
    )
  }
}
