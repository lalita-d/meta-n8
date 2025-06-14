"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRealTimeData } from "@/hooks/useRealTimeData"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import {
  Rocket,
  Package,
  Eye,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Calendar,
  MessageSquare,
  BarChart3,
} from "lucide-react"

export function FounderDashboard() {
  const { user } = useAuth()
  const { products, interests, analytics, lastUpdate } = useRealTimeData()
  const { toast } = useToast()
  const router = useRouter()

  // Filter data for current founder
  const myProducts = products.filter((product) => product.founderId === user?.id)
  const myInterests = interests.filter((interest) => myProducts.some((product) => product.id === interest.productId))

  const stats = [
    {
      title: "My Products",
      value: myProducts.length,
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Total Views",
      value: myProducts.reduce((sum, p) => sum + p.views, 0),
      icon: Eye,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Investor Interests",
      value: myInterests.length,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Funding Requested",
      value: `$${(myProducts.reduce((sum, p) => sum + p.fundingRequired, 0) / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  const handleNewProduct = () => {
    router.push("/dashboard/products/new")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Rocket className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Founder Dashboard</h2>
              <p className="opacity-90">
                Welcome back, {user?.name}! Manage your products and track investor interest.
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-75">Last Updated</p>
            <p className="text-sm font-medium">{lastUpdate.toLocaleTimeString()}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">🏠 Overview</TabsTrigger>
          <TabsTrigger value="products">📦 My Products</TabsTrigger>
          <TabsTrigger value="interests">💰 Interests</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={handleNewProduct} className="w-full" size="lg">
                  <Plus className="mr-2 h-5 w-5" />
                  Submit New Product
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Investor Meeting
                </Button>
                <Button variant="outline" className="w-full" size="lg">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  View Messages
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myInterests.slice(0, 3).map((interest) => {
                    const product = myProducts.find((p) => p.id === interest.productId)
                    return (
                      <div key={interest.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">New investor interest</p>
                          <p className="text-sm text-muted-foreground">{product?.productName}</p>
                        </div>
                        <Badge variant="secondary">{new Date(interest.createdAt).toLocaleDateString()}</Badge>
                      </div>
                    )
                  })}
                  {myInterests.length === 0 && (
                    <p className="text-muted-foreground text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">📦 My Products</h3>
            <Button onClick={handleNewProduct}>
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Button>
          </div>

          {myProducts.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No products yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start by submitting your first product to attract investors
                </p>
                <Button onClick={handleNewProduct}>
                  <Plus className="mr-2 h-4 w-4" />
                  Submit Your First Product
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg">{product.productName}</h4>
                        <p className="text-sm text-muted-foreground mb-3">{product.description}</p>
                        <div className="flex gap-2 mb-3">
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge variant="outline">{product.currentStage}</Badge>
                          <Badge
                            variant={
                              product.status === "approved"
                                ? "default"
                                : product.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {product.status}
                          </Badge>
                        </div>
                        <div className="flex gap-6 text-sm">
                          <span className="flex items-center gap-1 text-blue-600">
                            <Eye className="w-4 h-4" />
                            {product.views} views
                          </span>
                          <span className="flex items-center gap-1 text-purple-600">
                            <Users className="w-4 h-4" />
                            {product.interests} interests
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${product.fundingRequired.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground">Funding requested</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="interests" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">💰 Investor Interests</h3>
            <Badge variant="outline">{myInterests.length} Total Interests</Badge>
          </div>

          {myInterests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No investor interests yet</h3>
                <p className="text-muted-foreground">Keep promoting your products to attract investor attention</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {myInterests.map((interest) => {
                const product = myProducts.find((p) => p.id === interest.productId)
                return (
                  <Card key={interest.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">Interest in {product?.productName}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{interest.message}</p>
                          <Badge
                            variant={
                              interest.status === "accepted"
                                ? "default"
                                : interest.status === "pending"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {interest.status}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{new Date(interest.createdAt).toLocaleDateString()}</p>
                          <div className="flex gap-2 mt-2">
                            <Button size="sm">Accept</Button>
                            <Button size="sm" variant="outline">
                              Message
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Product Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myProducts.map((product) => (
                    <div key={product.id} className="flex justify-between items-center">
                      <span className="font-medium">{product.productName}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${Math.min((product.views / 100) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold">{product.views}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Interest Conversion</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Views</span>
                    <span className="font-bold">{myProducts.reduce((sum, p) => sum + p.views, 0)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Total Interests</span>
                    <span className="font-bold">{myInterests.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Conversion Rate</span>
                    <span className="font-bold text-green-600">
                      {myProducts.reduce((sum, p) => sum + p.views, 0) > 0
                        ? ((myInterests.length / myProducts.reduce((sum, p) => sum + p.views, 0)) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
