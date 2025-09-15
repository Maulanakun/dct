"use client"

import { useState } from "react"
import { Plus, BookOpen, Heart, MessageCircle, Share2, Search, Eye, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Switch } from "@/components/ui/switch"

const guides = [
  {
    id: 1,
    title: "Complete Furina Build Guide - DPS & Support",
    excerpt:
      "Master the Hydro Archon with this comprehensive build guide covering artifacts, weapons, and team compositions.",
    content: `# Furina Build Guide

## Overview
Furina is a versatile Hydro character who can excel in both DPS and support roles...

## Artifacts
- **Main DPS**: Golden Troupe (4pc)
- **Support**: Noblesse Oblige (4pc)

## Weapons
1. Splendor of Tranquil Waters (Signature)
2. Primordial Jade Cutter
3. Harbinger of Dawn (F2P)

## Team Compositions
### DPS Furina
- Furina / Bennett / Kazuha / Xiangling

### Support Furina  
- Neuvillette / Furina / Kazuha / Bennett`,
    game: "Genshin Impact",
    tags: ["furina", "build", "dps", "support", "hydro"],
    author: "GuideMaster",
    authorAvatar: "/gamer-avatar-1.png",
    likes: 156,
    comments: 23,
    views: 1240,
    isPublic: true,
    createdAt: "2 days ago",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "Honor of Kings Meta Heroes Tier List S15",
    excerpt: "Updated tier list for Season 15 with the strongest heroes for each role in ranked matches.",
    content: `# Season 15 Meta Tier List

## S-Tier Heroes
### Marksman
- **Huang Zhong** - Incredible late game damage
- **Marco Polo** - High mobility and burst

### Assassin  
- **Lan** - Best jungle clear and ganks
- **Aamon** - High burst potential

## A-Tier Heroes
...`,
    game: "Honor of Kings",
    tags: ["meta", "tier-list", "heroes", "ranked", "season15"],
    author: "ProPlayer",
    authorAvatar: "/gamer-avatar-2.png",
    likes: 89,
    comments: 34,
    views: 2100,
    isPublic: true,
    createdAt: "1 day ago",
    readTime: "12 min read",
  },
  {
    id: 3,
    title: "Mobile Legends Advanced Combo Guide",
    excerpt: "Learn advanced combos for popular ML heroes to dominate your matches.",
    content: `# Advanced Combo Guide

## Granger Combos
### Basic Combo
1. Skill 1 → Basic Attack → Skill 2
2. Ultimate for finishing

### Advanced Combo
1. Skill 2 → Flash → Skill 1 → Basic Attack → Ultimate

## Fanny Combos
### Wall Combo
1. Skill 1 (hook wall) → Skill 2 → Basic Attack
2. Repeat for continuous damage`,
    game: "Mobile Legends",
    tags: ["combo", "advanced", "granger", "fanny", "mechanics"],
    author: "ComboMaster",
    authorAvatar: "/gamer-avatar-1.png",
    likes: 67,
    comments: 18,
    views: 890,
    isPublic: true,
    createdAt: "3 days ago",
    readTime: "15 min read",
  },
  {
    id: 4,
    title: "Genshin Impact Spiral Abyss 4.3 Guide",
    excerpt: "Complete walkthrough for Floor 12 with recommended teams and strategies.",
    content: `# Spiral Abyss 4.3 Guide

## Floor 12 Overview
This rotation features Hydro and Pyro enemies with high HP pools.

## Recommended Teams
### First Half
- **Neuvillette Team**: Neuvillette, Furina, Kazuha, Bennett
- **Rational Team**: Raiden, Xiangling, Bennett, Xingqiu

### Second Half  
- **Freeze Team**: Ayaka, Shenhe, Kazuha, Kokomi
- **Hyperbloom**: Nahida, Kokomi, Raiden, Dendro MC`,
    game: "Genshin Impact",
    tags: ["spiral-abyss", "floor12", "teams", "strategy", "4.3"],
    author: "AbyssClearer",
    authorAvatar: "/gamer-avatar-2.png",
    likes: 203,
    comments: 45,
    views: 3200,
    isPublic: true,
    createdAt: "5 hours ago",
    readTime: "10 min read",
  },
  {
    id: 5,
    title: "My Personal Gaming Notes",
    excerpt: "Private notes about character builds and strategies I'm working on.",
    content: `# Personal Notes

## Characters to Build
- [ ] Castorice (when released)
- [ ] Mavuika artifacts
- [ ] Citlali support build

## Team Ideas
- Castorice / Mavuika / Bennett / Kazuha
- Citlali freeze team potential`,
    game: "Genshin Impact",
    tags: ["personal", "notes", "planning", "future"],
    author: "You",
    authorAvatar: "/gamer-avatar-1.png",
    likes: 0,
    comments: 0,
    views: 12,
    isPublic: false,
    createdAt: "1 hour ago",
    readTime: "3 min read",
  },
]

export default function GuidesPage() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [selectedGuide, setSelectedGuide] = useState<(typeof guides)[0] | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGame, setSelectedGame] = useState("all")
  const [showPublicOnly, setShowPublicOnly] = useState(false)

  const filteredGuides = guides.filter((guide) => {
    const matchesSearch =
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesGame = selectedGame === "all" || guide.game === selectedGame
    const matchesVisibility = !showPublicOnly || guide.isPublic
    return matchesSearch && matchesGame && matchesVisibility
  })

  const games = [...new Set(guides.map((g) => g.game))]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-text">Guides & Notes</h1>
              <p className="text-muted-foreground">Share strategies and build your knowledge base</p>
            </div>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button className="glow-effect">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Guide
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Guide</DialogTitle>
                  <DialogDescription>
                    Share your gaming knowledge with the community or keep it private for yourself.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="guide-title">Title</Label>
                    <Input id="guide-title" placeholder="Enter guide title" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="guide-game">Game</Label>
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
                    <Label htmlFor="guide-excerpt">Short Description</Label>
                    <Textarea id="guide-excerpt" placeholder="Brief description of your guide..." />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="guide-content">Content</Label>
                    <Textarea
                      id="guide-content"
                      placeholder="Write your guide content here... You can use Markdown formatting."
                      className="min-h-[200px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="guide-tags">Tags (comma separated)</Label>
                    <Input id="guide-tags" placeholder="build, strategy, meta, tips" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="public-guide" />
                    <Label htmlFor="public-guide">Make this guide public</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsCreateOpen(false)}>Create Guide</Button>
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
                  placeholder="Search guides..."
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
            <div className="flex items-center space-x-2">
              <Switch id="public-only" checked={showPublicOnly} onCheckedChange={setShowPublicOnly} />
              <Label htmlFor="public-only">Public guides only</Label>
            </div>
          </div>
        </div>
      </section>

      {/* Guides List */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredGuides.map((guide) => (
              <Card key={guide.id} className="game-card-hover border-primary/20 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">{guide.game}</Badge>
                        {!guide.isPublic && <Badge variant="outline">Private</Badge>}
                      </div>
                      <CardTitle className="text-xl mb-2 line-clamp-2">{guide.title}</CardTitle>
                      <CardDescription className="line-clamp-3">{guide.excerpt}</CardDescription>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={guide.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{guide.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{guide.author}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{guide.createdAt}</span>
                        <span>•</span>
                        <span>{guide.readTime}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex gap-1 mb-4 flex-wrap">
                    {guide.tags.slice(0, 4).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                    {guide.tags.length > 4 && (
                      <Badge variant="outline" className="text-xs">
                        +{guide.tags.length - 4} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        {guide.likes}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MessageCircle className="h-4 w-4" />
                        {guide.comments}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        {guide.views}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSelectedGuide(guide)}>
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Guides Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || selectedGame !== "all"
                  ? "Try adjusting your search or filters."
                  : "Start sharing your gaming knowledge by creating your first guide."}
              </p>
              {!searchQuery && selectedGame === "all" && (
                <Button onClick={() => setIsCreateOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Guide
                </Button>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Guide Reader Modal */}
      {selectedGuide && (
        <Dialog open={!!selectedGuide} onOpenChange={() => setSelectedGuide(null)}>
          <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
            <div className="space-y-6">
              {/* Header */}
              <div className="border-b border-border pb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{selectedGuide.game}</Badge>
                  {!selectedGuide.isPublic && <Badge variant="outline">Private</Badge>}
                </div>
                <h1 className="text-3xl font-bold mb-4">{selectedGuide.title}</h1>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedGuide.authorAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{selectedGuide.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedGuide.author}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{selectedGuide.createdAt}</span>
                        <span>•</span>
                        <span>{selectedGuide.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Heart className="h-5 w-5" />
                      {selectedGuide.likes}
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <MessageCircle className="h-5 w-5" />
                      {selectedGuide.comments}
                    </button>
                    <button className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                      <Share2 className="h-5 w-5" />
                      Share
                    </button>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="prose prose-invert max-w-none">
                <div className="whitespace-pre-wrap text-foreground leading-relaxed">{selectedGuide.content}</div>
              </div>

              {/* Tags */}
              <div className="border-t border-border pt-6">
                <div className="flex gap-2 flex-wrap">
                  {selectedGuide.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
