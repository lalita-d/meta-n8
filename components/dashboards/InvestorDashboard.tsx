"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRealTimeData } from "@/hooks/useRealTimeData"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { TrendingUp, Search, Eye, Heart, DollarSign, Package, Users, Calendar, MessageSquare } from "lucide-react"

export function InvestorDashboard() {
  const { user } = useAuth()
  const { products, interests, lastUpdate } = useRealTimeData()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showInterestForm, setShowInterestForm] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [interestForm, setInterestForm] = useState({
    primaryIntent: "",
    areasOfInterest: [] as string[],
    specificQuestions: "",
  })

  // Filter approved products
  const approvedProducts = products.filter((product) => product.status === "approved")
  const myInterests = interests.filter((interest) => interest.investorId === user?.id)

  // Filter products based on search and category
  const filteredProducts = approvedProducts.filter((product) => {
    const matchesSearch =
      product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const categories = [...new Set(approvedProducts.map((p) => p.category))]

  const stats = [
    {
      title: "Available Products",
      value: approvedProducts.length.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "My Interests",
      value: myInterests.length.toString(),
      icon: Heart,
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Total Funding",
      value: `$${(approvedProducts.reduce((sum, p) => sum + p.fundingRequired, 0) / 1000000).toFixed(1)}M`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Active Founders",
      value: new Set(approvedProducts.map((p) => p.founderId)).size.toString(),
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const handleExpressInterest = (product: any) => {
    const existingInterest = myInterests.find((interest) => interest.productId === product.id)
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

  const handleSubmitInterest = () => {
    if (!interestForm.primaryIntent || interestForm.areasOfInterest.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newInterest = {
      id: Date.now().toString(),
      investorId: user?.id || "",
      productId: selectedProduct.id,
      primaryIntent: interestForm.primaryIntent,
      areasOfInterest: interestForm.areasOfInterest,
      specificQuestions: interestForm.specificQuestions,
      message: `Primary Intent: ${interestForm.primaryIntent}. Areas of Interest: ${interestForm.areasOfInterest.join(", ")}`,
      createdAt: new Date(),
      status: "pending" as const,
    }

    const updatedInterests = [...interests, newInterest]
    storage.setInterests(updatedInterests)

    // Update product interest count
    const updatedProducts = products.map((product) =>
      product.id === selectedProduct.id ? { ...product, interests: product.interests + 1 } : product,
    )
    storage.setProducts(updatedProducts)

    toast({
      title: "✅ Interest Submitted",
      description: "Your detailed interest has been sent to the founder for review",
    })

    setShowInterestForm(false)
    setSelectedProduct(null)
    setInterestForm({
      primaryIntent: "",
      areasOfInterest: [],
      specificQuestions: "",
    })
  }

  const handleAreaOfInterestChange = (area: string, checked: boolean) => {
    if (checked) {
      setInterestForm({
        ...interestForm,
        areasOfInterest: [...interestForm.areasOfInterest, area],
      })
    } else {
      setInterestForm({
        ...interestForm,
        areasOfInterest: interestForm.areasOfInterest.filter((a) => a !== area),
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <TrendingUp className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.name?.split(" ")[0]}! 💼</h2>
              <p className="opacity-90">Browse approved products and make informed investment decisions</p>
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
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 border rounded-md"
        >
          <option value="all">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Interest Form Modal */}
      {showInterestForm && selectedProduct && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle>Submit Detailed Queries & Investment Intent for {selectedProduct.productName}</CardTitle>
            <CardDescription>
              Current Product: {selectedProduct.productName} ({selectedProduct.category})
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Section 1: Primary Intent */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Section 1: Your Primary Intent</h3>
              <p className="text-sm text-muted-foreground">
                Please choose one option that best describes your interest in this product:
              </p>
              <RadioGroup
                value={interestForm.primaryIntent}
                onValueChange={(value) => setInterestForm({ ...interestForm, primaryIntent: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="equity-investment" id="equity" />
                  <Label htmlFor="equity">Equity Investment</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="debt-funding" id="debt" />
                  <Label htmlFor="debt">Debt Funding</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="strategic-partnership" id="strategic" />
                  <Label htmlFor="strategic">Strategic Partnership</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clinical-trials" id="clinical" />
                  <Label htmlFor="clinical">Clinical Trials</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="technology-licensing" id="tech" />
                  <Label htmlFor="tech">Technology Licensing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="acquisition-interest" id="acquisition" />
                  <Label htmlFor="acquisition">Acquisition Interest</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mentorship-advisory" id="mentorship" />
                  <Label htmlFor="mentorship">Mentorship/Advisory</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Section 2: Key Areas of Interest */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Section 2: Key Areas of Interest / Questions</h3>
              <p className="text-sm text-muted-foreground">Select all that apply:</p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Financials & Valuation",
                  "Market Opportunity & Size",
                  "Team & Experience",
                  "Technology & IP",
                  "Product Roadmap",
                  "Customer Acquisition",
                  "Regulatory & Legal",
                  "Exit Strategy",
                  "Sustainability & ESG",
                  "Partnerships & Channels",
                  "Competitor Analysis",
                ].map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={area}
                      checked={interestForm.areasOfInterest.includes(area)}
                      onCheckedChange={(checked) => handleAreaOfInterestChange(area, checked as boolean)}
                    />
                    <Label htmlFor={area} className="text-sm">
                      {area}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 3: Specific Questions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Section 3: Specific Questions / Requirements</h3>
              <Textarea
                placeholder="e.g., What are your financial projections for the next 3 years?"
                value={interestForm.specificQuestions}
                onChange={(e) => setInterestForm({ ...interestForm, specificQuestions: e.target.value })}
                rows={4}
              />
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">
                  ⚠️ WARNING: Do not share personal contact info here. It will be filtered.
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSubmitInterest} className="flex-1">
                Submit Queries
              </Button>
              <Button variant="outline" onClick={() => setShowInterestForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Verified Products</CardTitle>
          <CardDescription>
            Browse {filteredProducts.length} approved products and express your interest
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search criteria</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredProducts.map((product) => {
                const hasInterest = myInterests.some((interest) => interest.productId === product.id)
                return (
                  <Card key={product.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold text-xl">{product.productName}</h4>
                            {hasInterest && <Heart className="w-5 h-5 text-red-500 fill-current" />}
                          </div>
                          <p className="text-muted-foreground mb-4">{product.description}</p>
                          <div className="flex gap-2 mb-4">
                            <Badge variant="outline">{product.category}</Badge>
                            <Badge variant="outline">{product.currentStage}</Badge>
                            <Badge className="bg-green-600">Approved</Badge>
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
                          <p className="text-2xl font-bold text-green-600 mb-2">
                            ${product.fundingRequired.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mb-4">Funding requested</p>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleExpressInterest(product)}
                              disabled={hasInterest}
                              className={hasInterest ? "bg-gray-400" : ""}
                            >
                              {hasInterest ? (
                                <>
                                  <Heart className="w-4 h-4 mr-1 fill-current" />
                                  Interested
                                </>
                              ) : (
                                <>
                                  <Heart className="w-4 h-4 mr-1" />
                                  Express Interest
                                </>
                              )}
                            </Button>
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4 mr-1" />
                              View Details
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
        </CardContent>
      </Card>

      {/* My Interests */}
      {myInterests.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>💝 My Investment Interests</CardTitle>
            <CardDescription>Products you've expressed interest in</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {myInterests.map((interest) => {
                const product = products.find((p) => p.id === interest.productId)
                return (
                  <Card key={interest.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg">{product?.productName}</h4>
                          <p className="text-sm text-muted-foreground mb-3">{product?.description}</p>
                          <div className="space-y-2 text-sm">
                            <p>
                              <strong>Primary Intent:</strong> {interest.primaryIntent}
                            </p>
                            <p>
                              <strong>Areas of Interest:</strong> {interest.areasOfInterest.join(", ")}
                            </p>
                            {interest.specificQuestions && (
                              <p>
                                <strong>Questions:</strong> {interest.specificQuestions}
                              </p>
                            )}
                          </div>
                          <div className="flex gap-2 mt-3">
                            <Badge variant="outline">{product?.category}</Badge>
                            <Badge
                              variant={
                                interest.status === "approved"
                                  ? "default"
                                  : interest.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {interest.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            ${product?.fundingRequired.toLocaleString()}
                          </p>
                          <p className="text-xs text-muted-foreground mb-2">
                            {new Date(interest.createdAt).toLocaleDateString()}
                          </p>
                          <div className="flex gap-2">
                            <Button size="sm">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              Message
                            </Button>
                            <Button size="sm" variant="outline">
                              <Calendar className="w-4 h-4 mr-1" />
                              Schedule
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
