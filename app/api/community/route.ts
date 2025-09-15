import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    const { db } = await connectToDatabase()

    const filter: any = {}
    if (category && category !== "all") filter.category = category

    const posts = await db.collection("community_posts").find(filter).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch community posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()

    const newPost = {
      ...body,
      createdAt: new Date(),
      likes: 0,
      replies: [],
    }

    const result = await db.collection("community_posts").insertOne(newPost)
    return NextResponse.json({ id: result.insertedId, ...newPost })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 })
  }
}
