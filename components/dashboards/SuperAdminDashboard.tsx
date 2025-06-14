"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminReviewPanel } from "@/components/admin/AdminReviewPanel"
import { useRealTimeData } from "@/hooks/useRealTimeData"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { Crown, Users, Package, TrendingUp, CheckCircle, XCircle, AlertTriangle, BarChart3 } from "lucide-react"

export function SuperAdminDashboard() {
  const { user } = useAuth()
  const { users, products, interests, analytics, lastUpdate } = useRealTimeData()
  const { toast } = useToast()

  const pendingUsers = users.filter((u) => u.status === "pending")
  const pendingProducts = products.filter((p) => p.status === "pending")
  const pendingInterests = interests.filter((i) => i.status === "pending")

  const stats = [
    {
      title: "Total Users",
      value: users.length.toString(),
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Pending Approvals",
      value: (pendingUsers.length + pendingProducts.length + pendingInterests.length).toString(),
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      title: "Active Products",
      value: products.filter((p) => p.status === "approved").length.toString(),
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Total Interests",
      value: interests.length.toString(),
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ]

  const handleApproveUser = (userId: string) => {
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, status: "approved" as const } : user))
    storage.setUsers(updatedUsers)
    toast({
      title: "✅ User Approved",
      description: "User has been approved and can now access the platform",
    })
  }

  const handleRejectUser = (userId: string) => {
    const updatedUsers = users.map((user) => (user.id === userId ? { ...user, status: "rejected" as const } : user))
    storage.setUsers(updatedUsers)
    toast({
      title: "❌ User Rejected",
      description: "User has been rejected",
      variant: "destructive",
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Crown className="h-8 w-8" />
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user?.name?.split(" ")[0]}! 👑</h2>
              <p className="opacity-90">Super Admin Dashboard - Complete platform oversight and control</p>
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="users">👥 Users</TabsTrigger>
          <TabsTrigger value="products">📦 Products</TabsTrigger>
          <TabsTrigger value="reviews">🔍 Reviews</TabsTrigger>
          <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  User Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Users</span>
                    <Badge variant="outline">{users.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Founders</span>
                    <Badge className="bg-blue-100 text-blue-800">
                      {users.filter((u) => u.userType === "founder").length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Investors</span>
                    <Badge className="bg-green-100 text-green-800">
                      {users.filter((u) => u.userType === "investor").length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending</span>
                    <Badge variant="secondary">{pendingUsers.length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Product Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Products</span>
                    <Badge variant="outline">{products.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved</span>
                    <Badge className="bg-green-100 text-green-800">
                      {products.filter((p) => p.status === "approved").length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending</span>
                    <Badge variant="secondary">{pendingProducts.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Views</span>
                    <Badge variant="outline">{products.reduce((sum, p) => sum + p.views, 0)}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Activity Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Interests</span>
                    <Badge variant="outline">{interests.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Pending Reviews</span>
                    <Badge variant="secondary">{pendingInterests.length}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Approved</span>
                    <Badge className="bg-green-100 text-green-800">
                      {interests.filter((i) => i.status === "approved").length}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Funding</span>
                    <Badge variant="outline">
                      ${(products.reduce((sum, p) => sum + p.fundingRequired, 0) / 1000000).toFixed(1)}M
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>👥 All Registered Users</CardTitle>
              <CardDescription>Manage all platform users and their access permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.length === 0 ? (
                  <div className="text-center py-8">
                    <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Users Yet</h3>
                    <p className="text-muted-foreground">Users will appear here once they register</p>
                  </div>
                ) : (
                  users.map((user) => (
                    <Card key={user.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {user.name.charAt(0)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{user.name}</h4>
                              <p className="text-sm text-muted-foreground">{user.email}</p>
                              <div className="flex gap-2 mt-1">
                                <Badge variant="outline">{user.uniqueId}</Badge>
                                <Badge
                                  className={
                                    user.userType === "founder"
                                      ? "bg-blue-100 text-blue-800"
                                      : user.userType === "investor"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-gray-100 text-gray-800"
                                  }
                                >
                                  {user.userType}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                user.status === "approved"
                                  ? "default"
                                  : user.status === "pending"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {user.status}
                            </Badge>
                            {user.status === "pending" && (
                              <div className="flex gap-2">
                                <Button size="sm" onClick={() => handleApproveUser(user.id)}>
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="destructive" onClick={() => handleRejectUser(user.id)}>
                                  <XCircle className="w-4 h-4 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>📦 Product Management</CardTitle>
              <CardDescription>Review and manage all product submissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No Products Yet</h3>
                    <p className="text-muted-foreground">Product submissions will appear here</p>
                  </div>
                ) : (
                  products.map((product) => (
                    <Card key={product.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg">{product.productName}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                            <div className="flex gap-2 mb-2">
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
                            <div className="flex gap-4 text-sm text-muted-foreground">
                              <span>{product.views} views</span>
                              <span>{product.interests} interests</span>
                              <span>${product.fundingRequired.toLocaleString()} funding</span>
                            </div>
                          </div>
                          {product.status === "pending" && (
                            <div className="flex gap-2">
                              <Button size="sm">
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="destructive">
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reviews" className="space-y-6">
          <AdminReviewPanel />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Platform Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>User Growth Rate</span>
                    <span className="font-bold text-green-600">+15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Product Approval Rate</span>
                    <span className="font-bold text-blue-600">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Interest Conversion</span>
                    <span className="font-bold text-purple-600">12%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Platform Activity</span>
                    <span className="font-bold text-orange-600">High</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm">New user registered: {users[users.length - 1]?.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm">Product submitted for review</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-sm">New investor interest received</span>
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
