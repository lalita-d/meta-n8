"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, MessageSquare, CheckCircle, XCircle, Eye, AlertTriangle } from "lucide-react"

export function AdminDashboard() {
  const [pendingApprovals] = useState([
    {
      id: 1,
      type: "user",
      name: "Jane Doe",
      userType: "founder",
      email: "jane@example.com",
      submittedAt: "2024-01-16",
    },
    {
      id: 2,
      type: "product",
      name: "Smart Irrigation System",
      founder: "FND-1234",
      category: "AgriTech",
      submittedAt: "2024-01-15",
    },
  ])

  const stats = [
    {
      title: "Pending Approvals",
      value: pendingApprovals.length,
      icon: AlertTriangle,
      color: "text-orange-600",
    },
    {
      title: "Active Users",
      value: "1,234",
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Communications",
      value: "89",
      icon: MessageSquare,
      color: "text-green-600",
    },
    {
      title: "Approved Today",
      value: "15",
      icon: CheckCircle,
      color: "text-purple-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-pink-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
        <p className="opacity-90">Manage platform operations and ensure quality standards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="approvals" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="approvals">Pending Approvals</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="communications">Communications</TabsTrigger>
        </TabsList>

        <TabsContent value="approvals" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pending Approvals</h3>
            <Badge variant="outline">{pendingApprovals.length} Items</Badge>
          </div>

          <div className="grid gap-6">
            {pendingApprovals.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {item.name}
                        <Badge variant="outline" className="capitalize">
                          {item.type}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        {item.type === "user"
                          ? `${item.email} • ${item.userType}`
                          : `${item.founder} • ${item.category}`}
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button variant="outline" size="sm">
                        <Eye className="mr-2 h-4 w-4" />
                        Review
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">User Management</h3>
            <p className="text-muted-foreground mb-4">Manage all platform users and their permissions.</p>
            <Button variant="outline">View All Users</Button>
          </div>
        </TabsContent>

        <TabsContent value="communications" className="space-y-6">
          <div className="text-center py-12">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Communication Management</h3>
            <p className="text-muted-foreground mb-4">Monitor and manage all platform communications.</p>
            <Button variant="outline">View Communications</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
