"use client"

import { useState } from "react"
import { Plus, Trophy, Clock, Target, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

const gameProfiles = [
  {
    id: 1,
    name: "Genshin Impact",
    icon: "/genshin-impact-logo.png",
    level: 45,
    progress: 75,
    stats: {
      "Adventure Rank": "35",
      Characters: "12",
      "Spiral Abyss": "10-3",
      Playtime: "127h",
    },
    achievements: 89,
    lastPlayed: "2 hours ago",
  },
  {
    id: 2,
    name: "Honor of Kings",
    icon: "/honor-of-kings-logo.jpg",
    level: 28,
    progress: 60,
    stats: {
      Rank: "Diamond III",
      "Win Rate": "89%",
      "Main Role": "Marksman",
      Matches: "234",
    },
    achievements: 45,
    lastPlayed: "1 day ago",
  },
  {
    id: 3,
    name: "Mobile Legends",
    icon: "/mobile-legends-logo.png",
    level: 35,
    progress: 85,
    stats: {
      Rank: "Mythic V",
      "Win Rate": "76%",
      "Main Hero": "Granger",
      MVP: "67",
    },
    achievements: 78,
    lastPlayed: "3 hours ago",
  },
]

export default function GamesPage() {
  const [isAddGameOpen, setIsAddGameOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold neon-text">Game Profiles</h1>
              <p className="text-muted-foreground">Track your progress across all your favorite games</p>
            </div>
            <Dialog open={isAddGameOpen} onOpenChange={setIsAddGameOpen}>
              <DialogTrigger asChild>
                <Button className="glow-effect">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Game
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Game Profile</DialogTitle>
                  <DialogDescription>Create a new profile to track your progress in a game.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="game-name">Game Name</Label>
                    <Input id="game-name" placeholder="Enter game name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="game-category">Category</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="moba">MOBA</SelectItem>
                        <SelectItem value="rpg">RPG</SelectItem>
                        <SelectItem value="fps">FPS</SelectItem>
                        <SelectItem value="strategy">Strategy</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="current-level">Current Level</Label>
                    <Input id="current-level" type="number" placeholder="Enter your current level" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Textarea id="notes" placeholder="Any additional notes about your progress" />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAddGameOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => setIsAddGameOpen(false)}>Add Game</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Game Profiles Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {gameProfiles.map((game) => (
              <Card key={game.id} className="game-card-hover border-primary/20 overflow-hidden">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={game.icon || "/placeholder.svg"}
                      alt={game.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <CardTitle className="text-xl">{game.name}</CardTitle>
                      <CardDescription>Level {game.level}</CardDescription>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{game.lastPlayed}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Overall Progress</span>
                      <span className="text-sm text-muted-foreground">{game.progress}%</span>
                    </div>
                    <Progress value={game.progress} className="h-3" />
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(game.stats).map(([key, value]) => (
                      <div key={key} className="bg-muted/50 p-3 rounded-lg">
                        <p className="text-xs text-muted-foreground">{key}</p>
                        <p className="font-semibold text-sm">{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Achievements */}
                  <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="h-5 w-5 text-primary" />
                      <span className="font-medium">Achievements</span>
                    </div>
                    <Badge variant="secondary">{game.achievements}</Badge>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      View Stats
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                      <Target className="mr-2 h-4 w-4" />
                      Set Goals
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {gameProfiles.length === 0 && (
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No Games Added Yet</h3>
              <p className="text-muted-foreground mb-4">
                Start tracking your gaming progress by adding your first game profile.
              </p>
              <Button onClick={() => setIsAddGameOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Game
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Quick Stats Overview */}
      <section className="py-8 px-4 border-t border-border">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-6">Gaming Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">{gameProfiles.length}</div>
                <p className="text-sm text-muted-foreground">Games Tracked</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  {gameProfiles.reduce((sum, game) => sum + game.achievements, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Total Achievements</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-primary mb-2">
                  {Math.round(gameProfiles.reduce((sum, game) => sum + game.progress, 0) / gameProfiles.length) || 0}%
                </div>
                <p className="text-sm text-muted-foreground">Average Progress</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-accent mb-2">
                  {gameProfiles.reduce((sum, game) => sum + game.level, 0)}
                </div>
                <p className="text-sm text-muted-foreground">Combined Levels</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
