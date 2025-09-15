"use client"

import { useState } from "react"
import { Plus, Heart, Target, CheckCircle, Clock, Trash2, Edit } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"

const wishlistItems = [
  {
    id: 1,
    itemName: "Castorice",
    gameName: "Genshin Impact",
    priority: "high" as const,
    status: "pending" as const,
    notes: "Save 180 pulls for guaranteed pity",
    progress: 75,
    targetDate: "2024-01-15",
    createdAt: "2 weeks ago",
  },
  {
    id: 2,
    itemName: "Furina C1",
    gameName: "Genshin Impact",
    priority: "medium" as const,
    status: "completed" as const,
    notes: "Got her constellation on the rerun banner!",
    progress: 100,
    targetDate: "2023-12-01",
    createdAt: "1 month ago",
  },
  {
    id: 3,
    itemName: "Reach Mythic Rank",
    gameName: "Honor of Kings",
    priority: "high" as const,
    status: "pending" as const,
    notes: "Currently Diamond III, need to improve macro gameplay",
    progress: 60,
    targetDate: "2024-02-01",
    createdAt: "1 week ago",
  },
  {
    id: 4,
    itemName: "Spiral Abyss 36 Stars",
    gameName: "Genshin Impact",
    priority: "medium" as const,
    status: "pending" as const,
    notes: "Need better artifacts for second team",
    progress: 85,
    targetDate: "2024-01-31",
    createdAt: "3 days ago",
  },
  {
    id: 5,
    itemName: "Mavuika Signature Weapon",
    gameName: "Genshin Impact",
    priority: "low" as const,
    status: "pending" as const,
    notes: "Will pull if I have extra primos after getting Castorice",
    progress: 20,
    targetDate: "2024-02-15",
    createdAt: "5 days ago",
  },
]

const goals = [
  {
    id: 1,
    title: "Master Furina Rotations",
    description: "Practice optimal skill rotations for maximum DPS",
    game: "Genshin Impact",
    progress: 80,
    deadline: "This week",
  },
  {
    id: 2,
    title: "Learn Advanced Combos",
    description: "Master Granger and Fanny combos in Mobile Legends",
    game: "Mobile Legends",
    progress: 45,
    deadline: "Next month",
  },
  {
    id: 3,
    title: "Complete Event Challenges",
    description: "Finish all limited-time event rewards",
    game: "Honor of Kings",
    progress: 90,
    deadline: "3 days left",
  },
]

export default function WishlistPage() {
  const [isAddItemOpen, setIsAddItemOpen] = useState(false)
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<"wishlist" | "goals">("wishlist")

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-500"
      case "medium":
        return "text-yellow-500"
      case "low":
        return "text-green-500"
      default:
        return "text-muted-foreground"
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      case "low":
        return "outline"
      default:
        return "outline"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-text">Wishlist & Goals</h1>
              <p className="text-muted-foreground">Track your gaming objectives and achievements</p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isAddItemOpen} onOpenChange={setIsAddItemOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Wishlist Item
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Wishlist Item</DialogTitle>
                    <DialogDescription>Add a character, item, or achievement you want to obtain.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="item-name">Item/Character Name</Label>
                      <Input id="item-name" placeholder="e.g., Castorice, Mythic Rank" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="item-game">Game</Label>
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
                      <Label htmlFor="priority">Priority</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="high">High Priority</SelectItem>
                          <SelectItem value="medium">Medium Priority</SelectItem>
                          <SelectItem value="low">Low Priority</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="target-date">Target Date (Optional)</Label>
                      <Input id="target-date" type="date" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="item-notes">Notes (Optional)</Label>
                      <Textarea id="item-notes" placeholder="Any additional notes or strategy..." />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddItemOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddItemOpen(false)}>Add Item</Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={isAddGoalOpen} onOpenChange={setIsAddGoalOpen}>
                <DialogTrigger asChild>
                  <Button className="glow-effect">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Goal
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Gaming Goal</DialogTitle>
                    <DialogDescription>Set a specific goal to improve your gaming skills.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="goal-title">Goal Title</Label>
                      <Input id="goal-title" placeholder="e.g., Master Furina Rotations" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-game">Game</Label>
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
                      <Label htmlFor="goal-description">Description</Label>
                      <Textarea id="goal-description" placeholder="Describe what you want to achieve..." />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="goal-deadline">Deadline (Optional)</Label>
                      <Input id="goal-deadline" type="date" />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddGoalOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddGoalOpen(false)}>Add Goal</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Tabs */}
      <section className="py-6 px-4 border-b border-border">
        <div className="container mx-auto">
          <div className="flex gap-4">
            <Button variant={activeTab === "wishlist" ? "default" : "outline"} onClick={() => setActiveTab("wishlist")}>
              <Heart className="mr-2 h-4 w-4" />
              Wishlist ({wishlistItems.length})
            </Button>
            <Button variant={activeTab === "goals" ? "default" : "outline"} onClick={() => setActiveTab("goals")}>
              <Target className="mr-2 h-4 w-4" />
              Goals ({goals.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {activeTab === "wishlist" ? (
            <div className="space-y-6">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-primary mb-2">{wishlistItems.length}</div>
                    <p className="text-sm text-muted-foreground">Total Items</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-green-500 mb-2">
                      {wishlistItems.filter((item) => item.status === "completed").length}
                    </div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-red-500 mb-2">
                      {wishlistItems.filter((item) => item.priority === "high").length}
                    </div>
                    <p className="text-sm text-muted-foreground">High Priority</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-2xl font-bold text-accent mb-2">
                      {Math.round(wishlistItems.reduce((sum, item) => sum + item.progress, 0) / wishlistItems.length)}%
                    </div>
                    <p className="text-sm text-muted-foreground">Avg Progress</p>
                  </CardContent>
                </Card>
              </div>

              {/* Wishlist Items */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {wishlistItems.map((item) => (
                  <Card key={item.id} className="game-card-hover border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="secondary">{item.gameName}</Badge>
                            <Badge variant={getPriorityBadge(item.priority)}>{item.priority} priority</Badge>
                            {item.status === "completed" && (
                              <Badge variant="outline" className="text-green-500 border-green-500">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Completed
                              </Badge>
                            )}
                          </div>
                          <CardTitle className="text-lg">{item.itemName}</CardTitle>
                          {item.notes && <CardDescription className="mt-2">{item.notes}</CardDescription>}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{item.progress}%</span>
                          </div>
                          <Progress value={item.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>Added {item.createdAt}</span>
                          </div>
                          {item.targetDate && (
                            <div className="flex items-center gap-1">
                              <Target className="h-4 w-4" />
                              <span>Target: {new Date(item.targetDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Goals List */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {goals.map((goal) => (
                  <Card key={goal.id} className="game-card-hover border-primary/20">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <Badge variant="secondary" className="mb-2">
                            {goal.game}
                          </Badge>
                          <CardTitle className="text-lg">{goal.title}</CardTitle>
                          <CardDescription className="mt-2">{goal.description}</CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress</span>
                            <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                          </div>
                          <Progress value={goal.progress} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-4 w-4" />
                            <span>{goal.deadline}</span>
                          </div>
                          <Button variant="outline" size="sm">
                            Update Progress
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Empty States */}
          {activeTab === "wishlist" && wishlistItems.length === 0 && (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Wishlist Items Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking characters, items, or achievements you want to obtain.
              </p>
              <Button onClick={() => setIsAddItemOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Item
              </Button>
            </div>
          )}

          {activeTab === "goals" && goals.length === 0 && (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Goals Set Yet</h3>
              <p className="text-muted-foreground mb-4">
                Set specific goals to improve your gaming skills and track your progress.
              </p>
              <Button onClick={() => setIsAddGoalOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Set Your First Goal
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
