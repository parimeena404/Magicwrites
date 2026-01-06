import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'
import { z } from 'zod'

const reflectionSchema = z.object({
  content: z.string().min(1, 'Reflection cannot be empty').max(1000)
})

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('session')
    
    if (!sessionCookie?.value) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    const session = JSON.parse(sessionCookie.value)
    const body = await req.json()
    const validatedData = reflectionSchema.parse(body)
    
    const reflection = await prisma.reflection.create({
      data: {
        content: validatedData.content,
        writingId: id,
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
        }
      }
    })
    
    return NextResponse.json({ reflection }, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues[0].message },
        { status: 400 }
      )
    }
    
    console.error('Create reflection error:', error)
    return NextResponse.json(
      { error: 'Failed to create reflection.' },
      { status: 500 }
    )
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const reflections = await prisma.reflection.findMany({
      where: { writingId: id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            profileImage: true,
            isFounder: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })
    
    return NextResponse.json({ reflections })
  } catch (error) {
    console.error('Fetch reflections error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch reflections.' },
      { status: 500 }
    )
  }
}
