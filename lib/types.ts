export interface GameProfile {
  _id?: string
  userId: string
  gameName: string
  gameIcon: string
  level: number
  progress: number
  stats: {
    [key: string]: string | number
  }
  createdAt: Date
  updatedAt: Date
}

export interface Guide {
  _id?: string
  userId: string
  title: string
  content: string
  gameName: string
  tags: string[]
  isPublic: boolean
  likes: number
  createdAt: Date
  updatedAt: Date
}

export interface Screenshot {
  _id?: string
  userId: string
  imageUrl: string
  title: string
  description?: string
  gameName: string
  tags: string[]
  likes: number
  createdAt: Date
}

export interface WishlistItem {
  _id?: string
  userId: string
  itemName: string
  gameName: string
  priority: "low" | "medium" | "high"
  status: "pending" | "completed"
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  _id?: string
  username: string
  email: string
  avatar?: string
  bio?: string
  favoriteGames: string[]
  createdAt: Date
  updatedAt: Date
}
