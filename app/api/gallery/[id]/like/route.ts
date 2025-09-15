import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { db } = await connectToDatabase()

    const result = await db
      .collection("screenshots")
      .updateOne({ _id: new ObjectId(params.id) }, { $inc: { likes: 1 } })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Screenshot not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to like screenshot" }, { status: 500 })
  }
}
