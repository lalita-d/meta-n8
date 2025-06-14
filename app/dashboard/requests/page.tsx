"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { MessageSquare, Clock, CheckCircle, XCircle, Phone, Mail, Video, Users } from "lucide-react"

export default function RequestsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [requests, setRequests] = useState<any[]>([])
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [user])

  const fetchData = () => {
    try {
      const allRequests = storage.getRequests()
      const allUsers = storage.getUsers()
      const allProducts = storage.getProducts()

      // Filter requests based on user type
      let filteredRequests = []
      if (user?.userType === "superadmin" || user?.userType === "admin") {
        filteredRequests = allRequests // Admin sees all requests
      } else {
        filteredRequests = allRequests.filter(
          (request) => request.fromUserId === user?.id || request.toUserId === user?.id,
        )
      }

      setRequests(filteredRequests)
      setUsers(allUsers)
      setProducts(allProducts)
    } catch (error) {
      console.error("Failed to fetch requests:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveRequest = (requestId: string) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId ? { ...request, status: "approved" } : request,
    )
    storage.setRequests(updatedRequests)
    setRequests(updatedRequests)

    toast({
      title: "✅ Request Approved",
      description: "The request has been approved and parties will be notified.",
    })
  }

  const handleRejectRequest = (requestId: string) => {
    const updatedRequests = requests.map((request) =>
      request.id === requestId ? { ...request, status: "rejected" } : request,
    )
    storage.setRequests(updatedRequests)
    setRequests(updatedRequests)

    toast({
      title: "❌ Request Rejected",
      description: "The request has been rejected.",
      variant: "destructive",
    })
  }

  const getUser = (userId: string) => users.find((u) => u.id === userId)
  const getProduct = (productId: string) => products.find((p) => p.id === productId)

  const getRequestIcon = (type: string) => {
    switch (type) {
      case "contact":
        return MessageSquare
      case "meeting":
        return Video
      case "investment":
        return Users
      default:
        return MessageSquare
    }
  }

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case "whatsapp":
        return Phone
      case "email":
        return Mail
      case "zoom":
        return Video
      default:
        return MessageSquare
    }
  }

  const pendingRequests = requests.filter((r) => r.status === "pending")
  const approvedRequests = requests.filter((r) => r.status === "approved")
  const rejectedRequests = requests.filter((r) => r.status === "rejected")

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
        <h1 className="text-3xl font-bold">
          {user?.userType === "superadmin" || user?.userType === "admin" ? "All Requests" : "My Requests"}
        </h1>
        <p className="text-muted-foreground">
          {user?.userType === "superadmin" || user?.userType === "admin"
            ? "Manage all platform communication requests"
            : "Track your communication requests and their approval status"}
        </p>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">Pending ({pendingRequests.length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({approvedRequests.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedRequests.length})</TabsTrigger>
          <TabsTrigger value="all">All ({requests.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingRequests.length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Pending Requests</h3>
                <p className="text-muted-foreground">All requests have been processed</p>
              </CardContent>
            </Card>
          ) : (
            pendingRequests.map((request) => {
              const fromUser = getUser(request.fromUserId)
              const toUser = getUser(request.toUserId)
              const product = request.productId ? getProduct(request.productId) : null
              const RequestIcon = getRequestIcon(request.type)
              const ContactIcon = getContactMethodIcon(request.contactMethod)

              return (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                          <RequestIcon className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">
                            {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request
                          </h4>
                          <div className="space-y-2 text-sm text-muted-foreground">
                            <p>
                              <strong>From:</strong> {fromUser?.name} ({fromUser?.uniqueId}) - {fromUser?.userType}
                            </p>
                            <p>
                              <strong>To:</strong> {toUser?.name} ({toUser?.uniqueId}) - {toUser?.userType}
                            </p>
                            {product && (
                              <p>
                                <strong>Product:</strong> {product.productName}
                              </p>
                            )}
                            <p>
                              <strong>Contact Method:</strong>
                              <ContactIcon className="inline w-4 h-4 ml-1 mr-1" />
                              {request.contactMethod}
                            </p>
                            <p>
                              <strong>Message:</strong> {request.message}
                            </p>
                            <p>
                              <strong>Requested:</strong> {new Date(request.createdAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <Badge variant="outline" className="capitalize">
                              {request.type}
                            </Badge>
                            <Badge variant="secondary" className="capitalize">
                              {request.contactMethod}
                            </Badge>
                            <Badge variant="outline">Pending</Badge>
                          </div>
                        </div>
                      </div>
                      {(user?.userType === "superadmin" || user?.userType === "admin") && (
                        <div className="flex gap-2">
                          <Button size="sm" onClick={() => handleApproveRequest(request.id)}>
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRejectRequest(request.id)}>
                            <XCircle className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedRequests.map((request) => {
            const fromUser = getUser(request.fromUserId)
            const toUser = getUser(request.toUserId)
            const product = request.productId ? getProduct(request.productId) : null
            const RequestIcon = getRequestIcon(request.type)

            return (
              <Card key={request.id} className="border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <RequestIcon className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request - Approved
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          Between {fromUser?.name} and {toUser?.name}
                        </p>
                        {product && <p>Product: {product.productName}</p>}
                        <p>Contact Method: {request.contactMethod}</p>
                      </div>
                      <Badge className="bg-green-600 mt-2">Approved</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedRequests.map((request) => {
            const fromUser = getUser(request.fromUserId)
            const toUser = getUser(request.toUserId)
            const RequestIcon = getRequestIcon(request.type)

            return (
              <Card key={request.id} className="border-red-200">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-red-100 rounded-full">
                      <RequestIcon className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request - Rejected
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          Between {fromUser?.name} and {toUser?.name}
                        </p>
                        <p>Reason: {request.adminNotes || "Not specified"}</p>
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
          {requests.map((request) => {
            const fromUser = getUser(request.fromUserId)
            const toUser = getUser(request.toUserId)
            const product = request.productId ? getProduct(request.productId) : null
            const RequestIcon = getRequestIcon(request.type)

            return (
              <Card key={request.id}>
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-gray-100 rounded-full">
                      <RequestIcon className="h-6 w-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-2">
                        {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request
                      </h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>
                          <strong>From:</strong> {fromUser?.name} ({fromUser?.uniqueId})
                        </p>
                        <p>
                          <strong>To:</strong> {toUser?.name} ({toUser?.uniqueId})
                        </p>
                        {product && (
                          <p>
                            <strong>Product:</strong> {product.productName}
                          </p>
                        )}
                        <p>
                          <strong>Contact Method:</strong> {request.contactMethod}
                        </p>
                        <p>
                          <strong>Requested:</strong> {new Date(request.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant={
                          request.status === "approved"
                            ? "default"
                            : request.status === "pending"
                              ? "secondary"
                              : "destructive"
                        }
                        className="mt-2"
                      >
                        {request.status}
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
