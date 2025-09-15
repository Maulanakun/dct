import { MongoClient } from "mongodb"

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gaming-hub"

async function seedDatabase() {
  const client = new MongoClient(MONGODB_URI)

  try {
    await client.connect()
    const db = client.db()

    // Seed games collection
    const games = [
      {
        name: "Genshin Impact",
        platform: "PC/Mobile",
        level: 58,
        progress: 85,
        playtime: "450 hours",
        achievements: 245,
        characters: ["Zhongli", "Raiden Shogun", "Kazuha", "Bennett"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Honor of Kings",
        platform: "Mobile",
        level: 42,
        progress: 70,
        playtime: "280 hours",
        achievements: 156,
        characters: ["Arthur", "Mulan", "Li Bai", "Angela"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Mobile Legends",
        platform: "Mobile",
        level: 35,
        progress: 60,
        playtime: "200 hours",
        achievements: 98,
        characters: ["Fanny", "Gusion", "Kagura", "Johnson"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("games").deleteMany({})
    await db.collection("games").insertMany(games)
    console.log("✅ Games seeded successfully")

    // Seed screenshots collection
    const screenshots = [
      {
        title: "Epic Boss Fight Victory",
        game: "Genshin Impact",
        category: "Boss Fights",
        imageUrl: "/gaming-screenshot-epic-moment.jpg",
        description: "Finally defeated the Raiden Shogun weekly boss!",
        likes: 24,
        views: 156,
        createdAt: new Date(),
      },
      {
        title: "Perfect Team Combo",
        game: "Honor of Kings",
        category: "Gameplay",
        imageUrl: "/gaming-screenshot-epic-moment.jpg",
        description: "Amazing 5-man ultimate combo in ranked match",
        likes: 18,
        views: 89,
        createdAt: new Date(),
      },
    ]

    await db.collection("screenshots").deleteMany({})
    await db.collection("screenshots").insertMany(screenshots)
    console.log("✅ Screenshots seeded successfully")

    // Seed guides collection
    const guides = [
      {
        title: "Zhongli Build Guide 2024",
        game: "Genshin Impact",
        category: "Character Builds",
        content: "Complete guide for building Zhongli as main DPS and support...",
        tags: ["Zhongli", "Build", "Artifacts", "Weapons"],
        isPublic: true,
        likes: 45,
        views: 234,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Fanny Advanced Combos",
        game: "Mobile Legends",
        category: "Hero Guides",
        content: "Master Fanny's cable mechanics with these advanced combos...",
        tags: ["Fanny", "Combos", "Advanced", "Mechanics"],
        isPublic: true,
        likes: 32,
        views: 178,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]

    await db.collection("guides").deleteMany({})
    await db.collection("guides").insertMany(guides)
    console.log("✅ Guides seeded successfully")

    // Seed wishlist collection
    const wishlistItems = [
      {
        name: "Raiden Shogun C1",
        game: "Genshin Impact",
        type: "Character Constellation",
        priority: "High",
        estimatedCost: "180 wishes",
        notes: "Need for better energy recharge",
        obtained: false,
        createdAt: new Date(),
      },
      {
        name: "Legendary Fanny Skin",
        game: "Mobile Legends",
        type: "Skin",
        priority: "Medium",
        estimatedCost: "2000 diamonds",
        notes: "Looks amazing with new effects",
        obtained: false,
        createdAt: new Date(),
      },
    ]

    await db.collection("wishlist").deleteMany({})
    await db.collection("wishlist").insertMany(wishlistItems)
    console.log("✅ Wishlist seeded successfully")

    // Seed community posts collection
    const communityPosts = [
      {
        title: "Best team comp for Spiral Abyss 12-3?",
        content: "Struggling with the current abyss rotation, any suggestions for team compositions?",
        author: "GamerPro123",
        category: "Discussion",
        likes: 12,
        replies: [
          {
            id: "1",
            author: "HelperGamer",
            content: "Try Raiden National team on first half!",
            createdAt: new Date(),
          },
        ],
        createdAt: new Date(),
      },
      {
        title: "New Genshin update is amazing!",
        content: "The new region looks incredible, loving the exploration so far.",
        author: "AdventureSeeker",
        category: "General",
        likes: 28,
        replies: [],
        createdAt: new Date(),
      },
    ]

    await db.collection("community_posts").deleteMany({})
    await db.collection("community_posts").insertMany(communityPosts)
    console.log("✅ Community posts seeded successfully")

    console.log("🎉 Database seeded successfully!")
  } catch (error) {
    console.error("❌ Error seeding database:", error)
  } finally {
    await client.close()
  }
}

seedDatabase()
