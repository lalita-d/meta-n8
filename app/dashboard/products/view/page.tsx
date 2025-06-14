"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { wsService } from "@/lib/websocket"
import { Search, Eye, Users, Calendar, TrendingUp, Heart } from "lucide-react"

export default function ViewProductsPage() {
  const { user } = useAuth()
  const [products, setProducts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus]
  useState("all")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()

    // Listen for real-time updates
    wsService.on("products-updated", handleProductsUpdate)

    return () => {
      wsService.off("products-updated", handleProductsUpdate)
    }
  }, [user])

  const handleProductsUpdate = () => {
    fetchProducts()
  }

  const fetchProducts = () => {
    try {
      const allProducts = storage.getProducts()

      // Filter based on user type
      let filteredProducts = []
      if (user?.userType === "founder") {
        filteredProducts = allProducts.filter((product) => product.founderId === user.id)
      } else {
        filteredProducts = allProducts
      }

      setProducts(filteredProducts)
    } catch (error) {
      console.error("Failed to fetch products:", error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || product.status === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const categories = [...new Set(products.map((p) => p.category))]
  const statuses = ["pending", "approved", "rejected"]

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">View Products</h1>
        <p className="text-muted-foreground">
          {user?.userType === "founder"
            ? "View all your submitted products and their status"
            : "Browse all products in the platform"}
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            {statuses.map((status) => (
              <SelectItem key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Products Grid */}
      <div className="grid gap-6">
        {filteredProducts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </CardContent>
          </Card>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
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
                        {product.status}
                      </Badge>
                    </CardTitle>
                    <CardDescription>
                      {product.category} • {product.currentStage}
                    </CardDescription>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-green-600">
                      £{(product.fundingRequired || 0).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">Funding Required</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{product.description}</p>

                {/* Product Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Eye className="w-4 h-4 text-blue-600" />
                    <span>{product.views || 0} views</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span>{product.interests || 0} interests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span>{product.currentStage}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span>{new Date(product.submittedAt).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Benefits */}
                {product.benefits && product.benefits.length > 0 && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Key Benefits:</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.benefits.map((benefit: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {benefit}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                  {user?.userType === "founder" && product.founderId === user.id && (
                    <Button variant="outline" size="sm">
                      Edit Product
                    </Button>
                  )}
                  {product.status === "approved" && user?.userType !== "founder" && (
                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
                      <Heart className="w-4 h-4 mr-2" />
                      Express Interest
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
