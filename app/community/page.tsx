"use client"

import { useState } from "react"
import { Users, MessageCircle, Heart, Share2, Plus, Search, Crown, Trophy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const communityPosts = [
  {
    id: 1,
    author: "GamerPro123",
    authorAvatar: "/gamer-avatar-1.png",
    authorBadge: "Pro Player",
    content: "Just got Castorice on my first 10-pull! My luck is insane this banner 🎉",
    game: "Genshin Impact",
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: "2 hours ago",
    image: "/gaming-screenshot-epic-moment.jpg",
  },
  {
    id: 2,
    author: "AnimeGamer",
    authorAvatar: "/gamer-avatar-2.png",
    authorBadge: "Guide Master",
    content:
      "New Furina build guide is up! Check out my latest post for optimal DPS rotations and artifact recommendations.",
    game: "Genshin Impact",
    likes: 45,
    comments: 12,
    shares: 8,
    timestamp: "4 hours ago",
  },
  {
    id: 3,
    author: "ProPlayer",
    authorAvatar: "/gamer-avatar-1.png",
    authorBadge: "Mythic Rank",
    content:
      "Finally reached Mythic in Honor of Kings! The grind was real but totally worth it. AMA about climbing strategies!",
    game: "Honor of Kings",
    likes: 67,
    comments: 23,
    shares: 15,
    timestamp: "6 hours ago",
    image: "/gaming-victory-screenshot.jpg",
  },
  {
    id: 4,
    author: "ComboMaster",
    authorAvatar: "/gamer-avatar-2.png",
    authorBadge: "Combo Expert",
    content:
      "Practicing new Fanny combos in Mobile Legends. The cable management is getting smoother! Who else mains Fanny?",
    game: "Mobile Legends",
    likes: 31,
    comments: 18,
    shares: 5,
    timestamp: "8 hours ago",
  },
  {
    id: 5,
    author: "NatureLover",
    authorAvatar: "/gamer-avatar-1.png",
    authorBadge: "Explorer",
    content:
      "Found this amazing hidden spot in Teyvat during my exploration. The sunset view is absolutely breathtaking!",
    game: "Genshin Impact",
    likes: 89,
    comments: 15,
    shares: 22,
    timestamp: "1 day ago",
    image: "/gaming-landscape-beautiful.jpg",
  },
]

const topMembers = [
  {
    id: 1,
    name: "GuideMaster",
    avatar: "/gamer-avatar-1.png",
    badge: "Legend",
    contributions: 156,
    followers: 1240,
    speciality: "Build Guides",
  },
  {
    id: 2,
    name: "ProPlayer",
    avatar: "/gamer-avatar-2.png",
    badge: "Mythic",
    contributions: 89,
    followers: 890,
    speciality: "Ranked Strategies",
  },
  {
    id: 3,
    name: "ComboMaster",
    avatar: "/gamer-avatar-1.png",
    badge: "Expert",
    contributions: 67,
    followers: 567,
    speciality: "Combo Tutorials",
  },
]

export default function CommunityPage() {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState("all")

  const filteredPosts = communityPosts.filter((post) => {
    const matchesSearch =
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGame = selectedGame === "all" || post.game === selectedGame
    return matchesSearch && matchesGame
  })

  const games = [...new Set(communityPosts.map((p) => p.game))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-text">Community</h1>
              <p className="text-muted-foreground">Connect with fellow gamers and share your experiences</p>
            </div>
            <Dialog open={isCreatePostOpen} onOpenChange={setIsCreatePostOpen}>
              <DialogTrigger asChild>
                <Button className="glow-effect">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>Share your gaming experience with the community.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="post-game">Game</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select game" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="genshin">Genshin Impact</SelectItem>
                        <SelectItem value="hok">Honor of Kings</SelectItem>
                        <SelectItem value="ml">Mobile Legends</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="post-content">What's on your mind?</Label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your gaming experience, achievement, or ask for help..."
                      className="min-h-[120px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="post-image">Image (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                      <p className="text-sm text-muted-foreground">Click to upload an image or drag and drop</p>
                      <Input id="post-image" type="file" accept="image/*" className="hidden" />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreatePostOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreatePostOpen(false)}>Post</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="flex gap-4 items-center w-full sm:w-auto">
                <div className="relative flex-1 sm:flex-none">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>
                <Select value={selectedGame} onValueChange={setSelectedGame}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Games</SelectItem>
                    {games.map((game) => (
                      <SelectItem key={game} value={game}>
                        {game}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Posts Feed */}
            <div className="space-y-6">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="game-card-hover border-primary/20">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={post.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{post.author}</h3>
                          <Badge variant="outline" className="text-xs">
                            {post.authorBadge}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {post.game}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-foreground mb-4 leading-relaxed">{post.content}</p>

                    {post.image && (
                      <img
                        src={post.image || "/placeholder.svg"}
                        alt="Post image"
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}

                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex gap-6">
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <Heart className="h-5 w-5" />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="h-5 w-5" />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || selectedGame !== "all"
                    ? "Try adjusting your search or filters."
                    : "Be the first to share something with the community!"}
                </p>
                {!searchQuery && selectedGame === "all" && (
                  <Button onClick={() => setIsCreatePostOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    Create First Post
                  </Button>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total Members</span>
                  <span className="font-semibold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Active Today</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Posts This Week</span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guides Shared</span>
                  <span className="font-semibold">234</span>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {topMembers.map((member, index) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-muted-foreground">#{index + 1}</span>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">{member.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {member.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{member.speciality}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{member.contributions}</p>
                      <p className="text-xs text-muted-foreground">posts</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Popular Games */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Popular Games
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Genshin Impact</span>
                  <Badge variant="secondary">1,234 posts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Honor of Kings</span>
                  <Badge variant="secondary">890 posts</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Mobile Legends</span>
                  <Badge variant="secondary">567 posts</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
