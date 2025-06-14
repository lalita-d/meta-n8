"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { wsService } from "@/lib/websocket"
import { Heart, MessageSquare, Calendar, Clock, XCircle } from "lucide-react"

export default function InterestsPage() {
  const { user } = useAuth()
  const [interests, setInterests] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()

    // Listen for real-time updates
    wsService.on("interests-updated", handleDataUpdate)
    wsService.on("products-updated", handleDataUpdate)

    return () => {
      wsService.off("interests-updated", handleDataUpdate)
      wsService.off("products-updated", handleDataUpdate)
    }
  }, [user])

  const handleDataUpdate = () => {
    fetchData()
  }

  const fetchData = () => {
    try {
      const allInterests = storage.getInterests()
      const allProducts = storage.getProducts()
      const allUsers = storage.getUsers()

      // Filter interests based on user type
      let filteredInterests = []
      if (user?.userType === "investor") {
        filteredInterests = allInterests.filter((interest) => interest.investorId === user.id)
      } else if (user?.userType === "founder") {
        const myProducts = allProducts.filter((product) => product.founderId === user.id)
        filteredInterests = allInterests.filter((interest) =>
          myProducts.some((product) => product.id === interest.productId),
        )
      } else {
        filteredInterests = allInterests
      }

      setInterests(filteredInterests)
      setProducts(allProducts)
      setUsers(allUsers)
    } catch (error) {
      console.error("Failed to fetch interests:", error)
    } finally {
      setLoading(false)
    }
  }

  const getProduct = (productId: string) => products.find((p) => p.id === productId)
  const getUser = (userId: string) => users.find((u) => u.id === userId)

  const pendingInterests = interests.filter((i) => i.status === "pending")
  const approvedInterests = interests.filter((i) => i.status === "approved")
  const rejectedInterests = interests.filter((i) => i.status === "rejected")

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
        <h1 className="text-3xl font-bold">{user?.userType === "investor" ? "My Interests" : "Investor Interests"}</h1>
        <p className="text-muted-foreground">
          {user?.userType === "investor"
            ? "Track your investment interests and their status"
            : "View investor interests in your products"}
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({pendingInterests.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedInterests.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedInterests.length})</TabsTrigger>
          <TabsTrigger value="all">All ({interests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingInterests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pending Interests</h3>
                <p className="text-muted-foreground">All interests have been processed</p>
              </CardContent>
            </Card>
          ) : (
            pendingInterests.map((interest) => {
              const product = getProduct(interest.productId)
              const investor = getUser(interest.investorId)

              return (
                <Card key={interest.id} className="border-orange-200">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-orange-100 rounded-full">
                        <Heart className="h-6 w-6 text-orange-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Investment Interest - Pending Review</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Product:</strong> {product?.productName} ({product?.category})
                          </p>
                          <p>
                            <strong>Investor:</strong>{" "}
                            {user?.userType === "founder" ? `${investor?.uniqueId} (Anonymous)` : investor?.name}
                          </p>
                          <p>
                            <strong>Primary Intent:</strong> {interest.primaryIntent}
                          </p>
                          <p>
                            <strong>Areas of Interest:</strong> {interest.areasOfInterest?.join(", ")}
                          </p>
                          {interest.specificQuestions && (
                            <p>
                              <strong>Questions:</strong> {interest.specificQuestions}
                            </p>
                          )}
                          <p>
                            <strong>Submitted:</strong> {new Date(interest.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="secondary" className="mt-2">
                          Pending Admin Review
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedInterests.map((interest) => {
            const product = getProduct(interest.productId)
            const investor = getUser(interest.investorId)

            return (
              <Card key={interest.id} className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-green-100 rounded-full">
                        <Heart className="h-6 w-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-2">Investment Interest - Approved</h4>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <p>
                            <strong>Product:</strong> {product?.productName} ({product?.category})
                          </p>
                          <p>
                            <strong>Investor:</strong>{" "}
                            {user?.userType === "founder" ? `${investor?.uniqueId} (Anonymous)` : investor?.name}
                          </p>
                          <p>
                            <strong>Primary Intent:</strong> {interest.primaryIntent}
                          </p>
                          <p>
                            <strong>Areas of Interest:</strong> {interest.areasOfInterest?.join(", ")}
                          </p>
                          <p>
                            <strong>Funding Required:</strong> £{(product?.fundingRequired || 0).toLocaleString()}
                          </p>
                        </div>
                        <Badge className="bg-green-600 mt-2">Approved</Badge>
                      </div>
                    </div>
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
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedInterests.map((interest) => {
            const product = getProduct(interest.productId)
            const investor = getUser(interest.investorId)

            return (
              <Card key={interest.id} className="border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <XCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Investment Interest - Rejected</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>Product:</strong> {product?.productName}
                        </p>
                        <p>
                          <strong>Investor:</strong>{" "}
                          {user?.userType === "founder" ? `${investor?.uniqueId} (Anonymous)` : investor?.name}
                        </p>
                        <p>
                          <strong>Reason:</strong> Did not meet investment criteria
                        </p>
                      </div>
                      <Badge variant="destructive" className="mt-2">
                        Rejected
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {interests.map((interest) => {
            const product = getProduct(interest.productId)
            const investor = getUser(interest.investorId)

            return (
              <Card key={interest.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <Heart className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">Investment Interest</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>Product:</strong> {product?.productName} ({product?.category})
                        </p>
                        <p>
                          <strong>Investor:</strong>{" "}
                          {user?.userType === "founder" ? `${investor?.uniqueId} (Anonymous)` : investor?.name}
                        </p>
                        <p>
                          <strong>Primary Intent:</strong> {interest.primaryIntent}
                        </p>
                        <p>
                          <strong>Submitted:</strong> {new Date(interest.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          interest.status === "approved"
                            ? "default"
                            : interest.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-2"
                      >
                        {interest.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>
      </Tabs>
    </div>
  )
}
