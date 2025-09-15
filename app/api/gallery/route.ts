import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get("game")
    const category = searchParams.get("category")

    const { db } = await connectToDatabase()

    const filter: any = {}
    if (game && game !== "all") filter.game = game
    if (category && category !== "all") filter.category = category

    const screenshots = await db.collection("screenshots").find(filter).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(screenshots)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch screenshots" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()

    const newScreenshot = {
      ...body,
      createdAt: new Date(),
      likes: 0,
      views: 0,
    }

    const result = await db.collection("screenshots").insertOne(newScreenshot)
    return NextResponse.json({ id: result.insertedId, ...newScreenshot })
  } catch (error) {
    return NextResponse.json({ error: "Failed to upload screenshot" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Screenshot ID required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const result = await db.collection("screenshots").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Screenshot not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete screenshot" }, { status: 500 })
  }
}
