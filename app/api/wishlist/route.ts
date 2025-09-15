import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const game = searchParams.get("game")
    const priority = searchParams.get("priority")

    const { db } = await connectToDatabase()

    const filter: any = {}
    if (game && game !== "all") filter.game = game
    if (priority && priority !== "all") filter.priority = priority

    const wishlistItems = await db.collection("wishlist").find(filter).sort({ createdAt: -1 }).toArray()
    return NextResponse.json(wishlistItems)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { db } = await connectToDatabase()

    const newWishlistItem = {
      ...body,
      createdAt: new Date(),
      obtained: false,
    }

    const result = await db.collection("wishlist").insertOne(newWishlistItem)
    return NextResponse.json({ id: result.insertedId, ...newWishlistItem })
  } catch (error) {
    return NextResponse.json({ error: "Failed to add wishlist item" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body
    const { db } = await connectToDatabase()

    const result = await db.collection("wishlist").updateOne({ _id: new ObjectId(id) }, { $set: updateData })

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to update wishlist item" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Wishlist item ID required" }, { status: 400 })
    }

    const { db } = await connectToDatabase()
    const result = await db.collection("wishlist").deleteOne({ _id: new ObjectId(id) })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Wishlist item not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete wishlist item" }, { status: 500 })
  }
}
