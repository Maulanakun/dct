"use client"

import { useState } from "react"
import { Upload, Heart, MessageCircle, Share2, Grid3X3, List, Search, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const screenshots = [
  {
    id: 1,
    title: "Epic Boss Fight Victory",
    imageUrl: "/gaming-screenshot-epic-moment.jpg",
    description: "Finally defeated the hardest boss in Genshin Impact after 20 attempts!",
    game: "Genshin Impact",
    tags: ["boss", "victory", "epic"],
    likes: 24,
    comments: 8,
    author: "GamerPro123",
    authorAvatar: "/gamer-avatar-1.png",
    uploadedAt: "2 hours ago",
  },
  {
    id: 2,
    title: "Perfect Team Composition",
    imageUrl: "/gaming-character-build.jpg",
    description: "My optimized Furina build with perfect artifacts",
    game: "Genshin Impact",
    tags: ["build", "character", "artifacts"],
    likes: 18,
    comments: 12,
    author: "AnimeGamer",
    authorAvatar: "/gamer-avatar-2.png",
    uploadedAt: "5 hours ago",
  },
  {
    id: 3,
    title: "Stunning Game Landscape",
    imageUrl: "/gaming-landscape-beautiful.jpg",
    description: "The most beautiful view in Teyvat during sunset",
    game: "Genshin Impact",
    tags: ["landscape", "beautiful", "sunset"],
    likes: 31,
    comments: 6,
    author: "NatureLover",
    authorAvatar: "/gamer-avatar-1.png",
    uploadedAt: "1 day ago",
  },
  {
    id: 4,
    title: "Ranked Victory Screenshot",
    imageUrl: "/gaming-victory-screenshot.jpg",
    description: "Finally reached Diamond rank in Honor of Kings!",
    game: "Honor of Kings",
    tags: ["victory", "ranked", "diamond"],
    likes: 15,
    comments: 4,
    author: "ProPlayer",
    authorAvatar: "/gamer-avatar-2.png",
    uploadedAt: "3 hours ago",
  },
  {
    id: 5,
    title: "Rare Character Pull",
    imageUrl: "/gaming-screenshot-epic-moment.jpg",
    description: "Got the limited character on my first pull!",
    game: "Genshin Impact",
    tags: ["gacha", "lucky", "character"],
    likes: 42,
    comments: 15,
    author: "LuckyGamer",
    authorAvatar: "/gamer-avatar-1.png",
    uploadedAt: "6 hours ago",
  },
  {
    id: 6,
    title: "Perfect Combo Execution",
    imageUrl: "/gaming-victory-screenshot.jpg",
    description: "Executed a perfect combo in Mobile Legends",
    game: "Mobile Legends",
    tags: ["combo", "skill", "perfect"],
    likes: 27,
    comments: 9,
    author: "ComboMaster",
    authorAvatar: "/gamer-avatar-2.png",
    uploadedAt: "8 hours ago",
  },
]

export default function GalleryPage() {
  const [isUploadOpen, setIsUploadOpen] = useState(false)
  const [selectedImage, setSelectedImage] = useState<(typeof screenshots)[0] | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState("all")

  const filteredScreenshots = screenshots.filter((screenshot) => {
    const matchesSearch =
      screenshot.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screenshot.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      screenshot.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesGame = selectedGame === "all" || screenshot.game === selectedGame
    return matchesSearch && matchesGame
  })

  const games = [...new Set(screenshots.map((s) => s.game))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-text">Screenshot Gallery</h1>
              <p className="text-muted-foreground">Share and discover epic gaming moments</p>
            </div>
            <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
              <DialogTrigger asChild>
                <Button className="glow-effect">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Screenshot
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Upload New Screenshot</DialogTitle>
                  <DialogDescription>Share your epic gaming moment with the community.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="image-upload">Screenshot</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground">Click to upload or drag and drop your screenshot</p>
                      <Input id="image-upload" type="file" accept="image/*" className="hidden" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" placeholder="Give your screenshot a catchy title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="game-select">Game</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the game" />
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
                    <Label htmlFor="description">Description</Label>
                    <Textarea id="description" placeholder="Tell us about this epic moment..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input id="tags" placeholder="victory, boss, epic, combo" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsUploadOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsUploadOpen(false)}>Upload Screenshot</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Filters and Search */}
      <section className="py-6 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search screenshots..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-64"
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
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredScreenshots.map((screenshot) => (
                <Card
                  key={screenshot.id}
                  className="game-card-hover border-primary/20 overflow-hidden group cursor-pointer"
                >
                  <div className="relative" onClick={() => setSelectedImage(screenshot)}>
                    <img
                      src={screenshot.imageUrl || "/placeholder.svg"}
                      alt={screenshot.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <Eye className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <Badge className="absolute top-2 left-2" variant="secondary">
                      {screenshot.game}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-1">{screenshot.title}</h3>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{screenshot.description}</p>

                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={screenshot.authorAvatar || "/placeholder.svg"} />
                        <AvatarFallback>{screenshot.author[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground">{screenshot.author}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{screenshot.uploadedAt}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex gap-3">
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <Heart className="h-4 w-4" />
                          {screenshot.likes}
                        </button>
                        <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          {screenshot.comments}
                        </button>
                      </div>
                      <button className="text-xs text-muted-foreground hover:text-primary transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex gap-1 mt-3 flex-wrap">
                      {screenshot.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredScreenshots.map((screenshot) => (
                <Card key={screenshot.id} className="game-card-hover border-primary/20 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex gap-4 p-4">
                      <img
                        src={screenshot.imageUrl || "/placeholder.svg"}
                        alt={screenshot.title}
                        className="w-32 h-24 object-cover rounded-lg cursor-pointer"
                        onClick={() => setSelectedImage(screenshot)}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-semibold text-lg">{screenshot.title}</h3>
                          <Badge variant="secondary">{screenshot.game}</Badge>
                        </div>
                        <p className="text-muted-foreground mb-3 line-clamp-2">{screenshot.description}</p>

                        <div className="flex items-center gap-2 mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={screenshot.authorAvatar || "/placeholder.svg"} />
                            <AvatarFallback>{screenshot.author[0]}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-muted-foreground">{screenshot.author}</span>
                          <span className="text-sm text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">{screenshot.uploadedAt}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-4">
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <Heart className="h-4 w-4" />
                              {screenshot.likes}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <MessageCircle className="h-4 w-4" />
                              {screenshot.comments}
                            </button>
                            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                              <Share2 className="h-4 w-4" />
                              Share
                            </button>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {screenshot.tags.slice(0, 3).map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredScreenshots.length === 0 && (
            <div className="text-center py-12">
              <Upload className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Screenshots Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedGame !== "all"
                  ? "Try adjusting your search or filters."
                  : "Start building your gallery by uploading your first screenshot."}
              </p>
              {!searchQuery && selectedGame === "all" && (
                <Button onClick={() => setIsUploadOpen(true)}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Your First Screenshot
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="sm:max-w-[800px] p-0">
            <div className="relative">
              <img
                src={selectedImage.imageUrl || "/placeholder.svg"}
                alt={selectedImage.title}
                className="w-full h-96 object-cover"
              />
              <Badge className="absolute top-4 left-4" variant="secondary">
                {selectedImage.game}
              </Badge>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{selectedImage.title}</h2>
                  <p className="text-muted-foreground">{selectedImage.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={selectedImage.authorAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedImage.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedImage.author}</p>
                  <p className="text-sm text-muted-foreground">{selectedImage.uploadedAt}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Heart className="h-5 w-5" />
                    {selectedImage.likes} Likes
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <MessageCircle className="h-5 w-5" />
                    {selectedImage.comments} Comments
                  </button>
                  <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                    <Share2 className="h-5 w-5" />
                    Share
                  </button>
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {selectedImage.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
