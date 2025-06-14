"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"
import { storage } from "@/lib/storage"
import { wsService } from "@/lib/websocket"
import { Lightbulb, Plus, Eye, Clock, CheckCircle, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function ProductsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [interests, setInterests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user?.userType === "founder") {
      fetchData()

      // Listen for real-time updates
      wsService.on("products-updated", handleDataUpdate)
      wsService.on("interests-updated", handleDataUpdate)

      return () => {
        wsService.off("products-updated", handleDataUpdate)
        wsService.off("interests-updated", handleDataUpdate)
      }
    }
  }, [user])

  const handleDataUpdate = () => {
    fetchData()
  }

  const fetchData = () => {
    try {
      const allProducts = storage.getProducts()
      const allInterests = storage.getInterests()

      // Filter products for current founder
      const myProducts = allProducts.filter((product) => product.founderId === user?.id) || []
      const myInterests =
        allInterests.filter((interest) => myProducts.some((product) => product.id === interest.productId)) || []

      setProducts(myProducts)
      setInterests(myInterests)
    } catch (error) {
      console.error("Failed to fetch products:", error)
      toast({
        title: "Error",
        description: "Failed to load products",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (user?.userType !== "founder") {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
        <p className="text-gray-600">Only founders can access this page.</p>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  const stats = [
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: Lightbulb,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Approved Products",
      value: products.filter((p) => p.status === "approved").length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Views",
      value: products.reduce((sum, p) => sum + (p.views || 0), 0).toString(),
      icon: Eye,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Investor Interests",
      value: interests.length.toString(),
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">My Products</h1>
          <p className="text-muted-foreground">Manage your product submissions and track investor interest</p>
        </div>
        <Link href="/dashboard/products/new">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Plus className="mr-2 h-4 w-4" />
            Add New Product
          </Button>
        </Link>
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

      {products.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
            <p className="text-muted-foreground mb-6">
              Start by submitting your first product to connect with investors and partners.
            </p>
            <Link href="/dashboard/products/new">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                <Plus className="mr-2 h-4 w-4" />
                Submit Your First Product
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {products.map((product) => {
            const productInterests = interests.filter((i) => i.productId === product.id)
            return (
              <Card key={product.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {product.productName}
                        <Badge
                          variant={
                            product.status === "approved"
                              ? "default"
                              : product.status === "pending"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {product.status === "approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                          {product.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                          {product.status === "rejected" && <AlertTriangle className="mr-1 h-3 w-3" />}
                          {product.status}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {product.category} • {product.currentStage} • £{(product.fundingRequired || 0).toLocaleString()}
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Investor Interest</p>
                      <div className="flex items-center space-x-2">
                        <Progress value={Math.min((productInterests.length / 10) * 100, 100)} className="flex-1" />
                        <span className="text-sm text-muted-foreground">{productInterests.length}/10</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Views</p>
                      <p className="text-2xl font-bold text-blue-600">{product.views || 0}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Submitted</p>
                      <p className="text-sm text-muted-foreground flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        {new Date(product.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
