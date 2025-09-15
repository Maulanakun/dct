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

    const guides = await db.collection("guides").find(filter).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(guides)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guides" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()

    const newGuide = {
      ...body,
      createdAt: new Date(),
      updatedAt: new Date(),
      likes: 0,
      views: 0,
    }

    const result = await db.collection("guides").insertOne(newGuide)
    return NextResponse.json({ id: result.insertedId, ...newGuide })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create guide" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const { db } = await connectToDatabase()

    const result = await db.collection("guides").updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...updateData,
          updatedAt: new Date(),
        },
      },
    )

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update guide" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Guide ID required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const result = await db.collection("guides").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Guide not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete guide" }, { status: 500 })
  }
}
