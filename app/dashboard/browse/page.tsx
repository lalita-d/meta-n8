"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InvestorInterestForm } from "@/components/forms/InvestorInterestForm"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { wsService } from "@/lib/websocket"
import { Search, Heart, Eye, Users, DollarSign, Phone, Mail } from "lucide-react"

export default function BrowsePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [loading, setLoading] = useState(true)
  const [showInterestForm, setShowInterestForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  useEffect(() => {
    fetchProducts()

    // Listen for real-time updates
    wsService.on("products-updated", handleProductsUpdate)

    return () => {
      wsService.off("products-updated", handleProductsUpdate)
    }
  }, [])

  const handleProductsUpdate = (data: any) => {
    fetchProducts()
  }

  const fetchProducts = () => {
    try {
      const allProducts = storage.getProducts()
      const approvedProducts = allProducts.filter((product) => product.status === "approved")
      setProducts(approvedProducts)
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
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(products.map((p) => p.category))]

  const handleExpressInterest = (product: any) => {
    // Check if user already expressed interest
    const interests = storage.getInterests()
    const existingInterest = interests.find(
      (interest) => interest.investorId === user?.id && interest.productId === product.id,
    )

    if (existingInterest) {
      toast({
        title: "Already Interested",
        description: "You have already expressed interest in this product",
        variant: "destructive",
      })
      return
    }

    setSelectedProduct(product)
    setShowInterestForm(true)
  }

  const handleContactRequest = (product: any, method: "whatsapp" | "email") => {
    const newRequest = {
      id: Date.now().toString(),
      fromUserId: user?.id || "",
      toUserId: product.founderId,
      productId: product.id,
      type: "contact" as const,
      message: `Contact request via ${method} for ${product.productName}`,
      contactMethod: method,
      status: "pending" as const,
      createdAt: new Date(),
    }

    const existingRequests = storage.getRequests()
    storage.setRequests([...existingRequests, newRequest])

    // Send real-time notification to admin
    wsService.send("new-contact-request", {
      request: newRequest,
      requester: {
        id: user?.id,
        uniqueId: user?.uniqueId,
        userType: user?.userType,
      },
      product: {
        id: product.id,
        name: product.productName,
        category: product.category,
      },
      timestamp: new Date(),
    })

    toast({
      title: "📞 Contact Request Sent",
      description: `Your ${method} contact request has been sent to admin for approval.`,
    })
  }

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
        <h1 className="text-3xl font-bold">Browse Products</h1>
        <p className="text-muted-foreground">Discover innovative products and connect with founders</p>
      </div>

      {/* Search and Filter */}
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
              <CardContent className="p-6">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={product.image || "/placeholder.svg?height=200&width=300"}
                      alt={product.productName}
                      className="w-48 h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold mb-2">{product.productName}</h3>
                        <p className="text-muted-foreground mb-3">{product.description}</p>
                        <div className="flex gap-2 mb-3">
                          <Badge variant="outline">{product.category}</Badge>
                          <Badge variant="outline">{product.currentStage}</Badge>
                          <Badge className="bg-green-600">Verified</Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600 mb-1">
                          £{(product.fundingRequired || 0).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground">Funding Required</p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex gap-6 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {product.views || 0} views
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {product.interests || 0} interests
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        {product.category}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleExpressInterest(product)}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <Heart className="w-4 h-4 mr-2" />
                        Express Interest
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleContactRequest(product, "whatsapp")}
                        className="border-green-500 text-green-600 hover:bg-green-50"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleContactRequest(product, "email")}
                        className="border-blue-500 text-blue-600 hover:bg-blue-50"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Interest Form Modal */}
      {showInterestForm && selectedProduct && (
        <InvestorInterestForm
          product={selectedProduct}
          onClose={() => {
            setShowInterestForm(false)
            setSelectedProduct(null)
          }}
        />
      )}
    </div>
  )
}
