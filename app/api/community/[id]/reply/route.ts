import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()

    const reply = {
      id: new ObjectId().toString(),
      ...body,
      createdAt: new Date(),
    }

    const result = await db
      .collection("community_posts")
      .updateOne({ _id: new ObjectId(params.id) }, { $push: { replies: reply } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, reply })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add reply" }, { status: 500 })
  }
}
