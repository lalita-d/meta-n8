"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { Users, Package, Heart, DollarSign, Activity, Eye, MessageSquare } from "lucide-react"

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [analytics, setAnalytics] = useState<any>(null)
  const [userActivity, setUserActivity] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAnalytics()
  }, [user])

  const fetchAnalytics = () => {
    try {
      const analyticsData = storage.getAnalytics()
      const users = storage.getUsers()
      const products = storage.getProducts()
      const interests = storage.getInterests()
      const requests = storage.getRequests()

      // Generate user-specific analytics
      let userSpecificData = {}
      if (user?.userType === "founder") {
        const myProducts = products.filter((p) => p.founderId === user.id)
        const myInterests = interests.filter((i) => myProducts.some((p) => p.id === i.productId))
        const myRequests = requests.filter((r) => r.fromUserId === user.id || r.toUserId === user.id)

        userSpecificData = {
          myProducts: myProducts.length,
          totalViews: myProducts.reduce((sum, p) => sum + (p.views || 0), 0),
          totalInterests: myInterests.length,
          totalRequests: myRequests.length,
          productPerformance: myProducts.map((p) => ({
            name: p.productName.substring(0, 10) + "...",
            views: p.views || 0,
            interests: p.interests || 0,
          })),
        }
      } else if (user?.userType === "investor") {
        const myInterests = interests.filter((i) => i.investorId === user.id)
        const myRequests = requests.filter((r) => r.fromUserId === user.id || r.toUserId === user.id)

        userSpecificData = {
          myInterests: myInterests.length,
          totalRequests: myRequests.length,
          interestsByCategory: myInterests.reduce((acc: any, interest) => {
            const product = products.find((p) => p.id === interest.productId)
            if (product) {
              acc[product.category] = (acc[product.category] || 0) + 1
            }
            return acc
          }, {}),
        }
      }

      // Generate monthly activity data
      const monthlyActivity = Array.from({ length: 6 }, (_, i) => {
        const date = new Date()
        date.setMonth(date.getMonth() - i)
        return {
          month: date.toLocaleString("default", { month: "short" }),
          products: Math.floor(Math.random() * 10) + 5,
          interests: Math.floor(Math.random() * 20) + 10,
          requests: Math.floor(Math.random() * 15) + 5,
          views: Math.floor(Math.random() * 100) + 50,
        }
      }).reverse()

      setAnalytics({ ...analyticsData, ...userSpecificData })
      setUserActivity(monthlyActivity)
    } catch (error) {
      console.error("Failed to fetch analytics:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#8dd1e1", "#d084d0"]

  const getStatsForUserType = () => {
    if (user?.userType === "founder") {
      return [
        {
          title: "My Products",
          value: analytics?.myProducts || 0,
          icon: Package,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          title: "Total Views",
          value: analytics?.totalViews || 0,
          icon: Eye,
          color: "text-green-600",
          bgColor: "bg-green-100",
        },
        {
          title: "Investor Interests",
          value: analytics?.totalInterests || 0,
          icon: Heart,
          color: "text-red-600",
          bgColor: "bg-red-100",
        },
        {
          title: "Active Requests",
          value: analytics?.totalRequests || 0,
          icon: MessageSquare,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
      ]
    } else if (user?.userType === "investor") {
      return [
        {
          title: "My Interests",
          value: analytics?.myInterests || 0,
          icon: Heart,
          color: "text-red-600",
          bgColor: "bg-red-100",
        },
        {
          title: "Active Requests",
          value: analytics?.totalRequests || 0,
          icon: MessageSquare,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
        {
          title: "Available Products",
          value: analytics?.approvedProducts || 0,
          icon: Package,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          title: "Platform Activity",
          value: "High",
          icon: Activity,
          color: "text-green-600",
          bgColor: "bg-green-100",
        },
      ]
    } else {
      return [
        {
          title: "Total Users",
          value: analytics?.totalUsers || 0,
          icon: Users,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
        },
        {
          title: "Total Products",
          value: analytics?.totalProducts || 0,
          icon: Package,
          color: "text-green-600",
          bgColor: "bg-green-100",
        },
        {
          title: "Total Interests",
          value: analytics?.totalInterests || 0,
          icon: Heart,
          color: "text-red-600",
          bgColor: "bg-red-100",
        },
        {
          title: "Total Funding",
          value: `£${((analytics?.totalFunding || 0) / 1000000).toFixed(1)}M`,
          icon: DollarSign,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
        },
      ]
    }
  }

  const stats = getStatsForUserType()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          {user?.userType === "founder"
            ? "Track your product performance and investor engagement"
            : user?.userType === "investor"
              ? "Monitor your investment activities and market insights"
              : "Comprehensive platform analytics and insights"}
        </p>
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

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="performance">📈 Performance</TabsTrigger>
          <TabsTrigger value="trends">📉 Trends</TabsTrigger>
          <TabsTrigger value="insights">💡 Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
                <CardDescription>Your activity over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={userActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#8884d8" name="Views" />
                    <Bar dataKey="interests" fill="#82ca9d" name="Interests" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {user?.userType === "founder" && analytics?.productPerformance && (
              <Card>
                <CardHeader>
                  <CardTitle>Product Performance</CardTitle>
                  <CardDescription>Views and interests by product</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={analytics.productPerformance}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="views" fill="#8884d8" name="Views" />
                      <Bar dataKey="interests" fill="#82ca9d" name="Interests" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {user?.userType === "investor" && analytics?.interestsByCategory && (
              <Card>
                <CardHeader>
                  <CardTitle>Interests by Category</CardTitle>
                  <CardDescription>Your investment interests distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(analytics.interestsByCategory).map(([category, count]) => ({
                          name: category,
                          value: count,
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.entries(analytics.interestsByCategory).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {(user?.userType === "superadmin" || user?.userType === "admin") && (
              <Card>
                <CardHeader>
                  <CardTitle>User Distribution</CardTitle>
                  <CardDescription>Platform users by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={Object.entries(analytics?.usersByType || {}).map(([type, count]) => ({
                          name: type,
                          value: count,
                        }))}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {Object.entries(analytics?.usersByType || {}).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Trends</CardTitle>
              <CardDescription>Track your key metrics over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={userActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="views" stroke="#8884d8" strokeWidth={2} name="Views" />
                  <Line type="monotone" dataKey="interests" stroke="#82ca9d" strokeWidth={2} name="Interests" />
                  <Line type="monotone" dataKey="requests" stroke="#ffc658" strokeWidth={2} name="Requests" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Growth Metrics</CardTitle>
                <CardDescription>Month-over-month growth rates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Views Growth</span>
                    <span className="font-bold text-green-600">+15.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Interest Growth</span>
                    <span className="font-bold text-blue-600">+8.7%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Request Growth</span>
                    <span className="font-bold text-purple-600">+12.3%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Engagement Rate</span>
                    <span className="font-bold text-orange-600">+5.1%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-powered recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      💡 Your {user?.userType === "founder" ? "products" : "interests"} are performing 23% above average
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm text-green-800">📈 Peak activity time: Tuesday-Thursday, 2-4 PM</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      🎯 {user?.userType === "founder" ? "AgriTech" : "FinTech"} category shows highest engagement
                    </p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-sm text-orange-800">
                      🚀 Consider expanding to {user?.userType === "founder" ? "HealthTech" : "GreenTech"} sector
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Success Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">87%</div>
                  <p className="text-sm text-muted-foreground">
                    {user?.userType === "founder" ? "Product approval rate" : "Interest acceptance rate"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Response Time</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">2.3</div>
                  <p className="text-sm text-muted-foreground">Days to get response</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Engagement Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">9.2</div>
                  <p className="text-sm text-muted-foreground">Out of 10 (Excellent)</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recommendations</CardTitle>
              <CardDescription>Personalized suggestions to improve your performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user?.userType === "founder" ? (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Optimize Product Descriptions</h4>
                        <p className="text-sm text-muted-foreground">
                          Products with detailed problem-solution descriptions get 40% more interest
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Add Financial Projections</h4>
                        <p className="text-sm text-muted-foreground">
                          Include 3-year financial forecasts to attract serious investors
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Engage with Investors</h4>
                        <p className="text-sm text-muted-foreground">
                          Respond to investor queries within 24 hours for better conversion
                        </p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Diversify Portfolio</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider investing in multiple sectors to reduce risk
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Early Stage Focus</h4>
                        <p className="text-sm text-muted-foreground">
                          MVP and prototype stage companies show highest growth potential
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <div>
                        <h4 className="font-medium">Network Building</h4>
                        <p className="text-sm text-muted-foreground">
                          Connect with other investors for co-investment opportunities
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
