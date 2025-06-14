export interface Product {
  id: string
  founderId: string
  founderUniqueId: string
  productName: string
  category: string
  description: string
  fundingRequired: number
  currentStage: string
  status: "pending" | "approved" | "rejected"
  submittedAt: Date
  views: number
  interests: number
}

export interface Interest {
  id: string
  investorId: string
  productId: string
  message: string
  status: "pending" | "approved" | "rejected"
  createdAt: Date
}

export interface ZoomCall {
  id: string
  hostId: string
  participantId: string
  title: string
  scheduledAt: Date
  duration: number
  status: "scheduled" | "completed" | "cancelled"
  meetingUrl?: string
}

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    founderId: "fnd-001",
    founderUniqueId: "FND-0001",
    productName: "Hydroponics Revolution",
    category: "AgriTech",
    description: "Advanced soilless growing systems for sustainable agriculture",
    fundingRequired: 500000,
    currentStage: "MVP",
    status: "approved",
    submittedAt: new Date("2024-01-20"),
    views: 245,
    interests: 12,
  },
  {
    id: "prod-002",
    founderId: "fnd-001",
    founderUniqueId: "FND-0001",
    productName: "ECG Smart Monitor",
    category: "HealthTech",
    description: "AI-powered electrocardiogram monitoring systems",
    fundingRequired: 750000,
    currentStage: "Prototype",
    status: "approved",
    submittedAt: new Date("2024-02-05"),
    views: 189,
    interests: 8,
  },
  {
    id: "prod-003",
    founderId: "fnd-001",
    founderUniqueId: "FND-0001",
    productName: "Smart Terrace Gardens",
    category: "GreenTech",
    description: "IoT-enabled urban farming solutions for residential spaces",
    fundingRequired: 300000,
    currentStage: "Ideation",
    status: "pending",
    submittedAt: new Date("2024-02-15"),
    views: 67,
    interests: 3,
  },
]

export const mockInterests: Interest[] = [
  {
    id: "int-001",
    investorId: "inv-001",
    productId: "prod-001",
    message: "Very interested in the hydroponics technology. Would like to discuss investment opportunities.",
    status: "pending",
    createdAt: new Date("2024-02-10"),
  },
]

export const mockZoomCalls: ZoomCall[] = [
  {
    id: "zoom-001",
    hostId: "fnd-001",
    participantId: "inv-001",
    title: "Hydroponics Investment Discussion",
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: 60,
    status: "scheduled",
    meetingUrl: "https://zoom.us/j/123456789",
  },
]

// Analytics mock data
export const getAnalyticsData = () => {
  const users = JSON.parse(localStorage.getItem("metavertex_users") || "[]")
  const products = JSON.parse(localStorage.getItem("metavertex_products") || JSON.stringify(mockProducts))

  const userStats = users.reduce((acc: any, user: any) => {
    acc[user.userType] = (acc[user.userType] || 0) + 1
    return acc
  }, {})

  const monthlyData = Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString("default", { month: "short" }),
    users: Math.floor(Math.random() * 50) + 10,
    products: Math.floor(Math.random() * 20) + 5,
  }))

  const productStats = products.reduce((acc: any, product: any) => {
    if (!acc[product.category]) {
      acc[product.category] = { count: 0, views: 0, interests: 0 }
    }
    acc[product.category].count++
    acc[product.category].views += product.views
    acc[product.category].interests += product.interests
    return acc
  }, {})

  return {
    userStats,
    monthlyData,
    productStats,
    totalUsers: users.length,
    totalProducts: products.length,
    pendingApprovals: users.filter((u: any) => u.status === "pending").length,
  }
}
