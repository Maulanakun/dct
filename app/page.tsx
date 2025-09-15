import { Gamepad2, Trophy, Camera, BookOpen, Heart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Gamepad2 className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold neon-text">Gaming Hub</h1>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                Dashboard
              </Link>
              <Link href="/games" className="text-muted-foreground hover:text-primary transition-colors">
                Games
              </Link>
              <Link href="/guides" className="text-muted-foreground hover:text-primary transition-colors">
                Guides
              </Link>
              <Link href="/gallery" className="text-muted-foreground hover:text-primary transition-colors">
                Gallery
              </Link>
              <Link href="/wishlist" className="text-muted-foreground hover:text-primary transition-colors">
                Wishlist
              </Link>
              <Link href="/community" className="text-muted-foreground hover:text-primary transition-colors">
                Community
              </Link>
            </nav>
            <Button className="glow-effect">Join Community</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-6 neon-text">Level Up Your Gaming Experience</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Track your progress, share epic moments, discover new strategies, and connect with fellow gamers in
            Indonesia's premier gaming community.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/games">
              <Button size="lg" className="glow-effect">
                <Trophy className="mr-2 h-5 w-5" />
                Start Gaming
              </Button>
            </Link>
            <Link href="/community">
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-5 w-5" />
                Join Community
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="dashboard" className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">Gaming Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Game Profile Card */}
            <Link href="/games">
              <Card className="game-card-hover border-primary/20 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-6 w-6 text-primary" />
                    <CardTitle>Game Profiles</CardTitle>
                  </div>
                  <CardDescription>Track your progress across multiple games</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <img src="/genshin-impact-logo.png" alt="Genshin Impact" className="w-10 h-10 rounded" />
                      <div className="flex-1">
                        <p className="font-medium">Genshin Impact</p>
                        <Progress value={75} className="h-2" />
                        <p className="text-sm text-muted-foreground">Level 45 • AR 35</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src="/honor-of-kings-logo.jpg" alt="Honor of Kings" className="w-10 h-10 rounded" />
                      <div className="flex-1">
                        <p className="font-medium">Honor of Kings</p>
                        <Progress value={60} className="h-2" />
                        <p className="text-sm text-muted-foreground">Diamond III • 89% WR</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Guides & Notes Card */}
            <Link href="/guides">
              <Card className="game-card-hover border-primary/20 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <CardTitle>Guides & Notes</CardTitle>
                  </div>
                  <CardDescription>Share strategies and build guides</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-medium">Furina Build Guide</h4>
                      <p className="text-sm text-muted-foreground">Complete DPS build for Furina</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">Genshin</Badge>
                        <Badge variant="outline">DPS</Badge>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <h4 className="font-medium">HOK Meta Heroes</h4>
                      <p className="text-sm text-muted-foreground">Current season tier list</p>
                      <div className="flex gap-2 mt-2">
                        <Badge variant="secondary">HOK</Badge>
                        <Badge variant="outline">Meta</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Gallery Card */}
            <Link href="/gallery">
              <Card className="game-card-hover border-primary/20 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Camera className="h-6 w-6 text-primary" />
                    <CardTitle>Screenshot Gallery</CardTitle>
                  </div>
                  <CardDescription>Showcase your epic gaming moments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <img
                      src="/gaming-screenshot-epic-moment.jpg"
                      alt="Epic moment"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <img
                      src="/gaming-victory-screenshot.jpg"
                      alt="Victory"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <img
                      src="/gaming-character-build.jpg"
                      alt="Character build"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                    <img
                      src="/gaming-landscape-beautiful.jpg"
                      alt="Beautiful landscape"
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Wishlist Card */}
            <Link href="/wishlist">
              <Card className="game-card-hover border-primary/20 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <CardTitle>Wishlist & Goals</CardTitle>
                  </div>
                  <CardDescription>Track your gaming objectives</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Get Castorice (Next Pull)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Furina to Level 90</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span className="text-sm">Reach Mythic in HOK</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                      <span className="text-sm">Complete Spiral Abyss 36★</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Community Card */}
            <Link href="/community">
              <Card className="game-card-hover border-primary/20 cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Users className="h-6 w-6 text-primary" />
                    <CardTitle>Community</CardTitle>
                  </div>
                  <CardDescription>Connect with fellow gamers</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/gamer-avatar-1.png" />
                        <AvatarFallback>G1</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">GamerPro123</p>
                        <p className="text-xs text-muted-foreground">Just got Furina!</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/gamer-avatar-2.png" />
                        <AvatarFallback>A2</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">AnimeGamer</p>
                        <p className="text-xs text-muted-foreground">New HOK guide posted</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            {/* Stats Card */}
            <Card className="game-card-hover border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Gamepad2 className="h-6 w-6 text-primary" />
                  <CardTitle>Gaming Stats</CardTitle>
                </div>
                <CardDescription>Your gaming achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">127</p>
                    <p className="text-xs text-muted-foreground">Hours Played</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">23</p>
                    <p className="text-xs text-muted-foreground">Achievements</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary">8</p>
                    <p className="text-xs text-muted-foreground">Games Tracked</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-accent">156</p>
                    <p className="text-xs text-muted-foreground">Screenshots</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-8 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gamepad2 className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold">Gaming Hub</span>
          </div>
          <p className="text-muted-foreground">Built for Indonesian gaming community with ❤️</p>
        </div>
      </footer>
    </div>
  )
}
