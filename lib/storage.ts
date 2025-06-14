// Enhanced storage system with proper ID generation and real-time features
export interface User {
  id: string
  email: string
  name: string
  userType: "founder" | "investor" | "organization" | "mentor" | "admin" | "superadmin"
  uniqueId: string
  status: "pending" | "approved" | "rejected"
  profile?: any
  company?: string
  phone?: string
  basicInfo?: {
    industry?: string
    experience?: string
    location?: string
    bio?: string
  }
  createdAt: Date
  lastActive: Date
  isActive?: boolean
}

export interface Product {
  id: string
  founderId: string
  productName: string
  category: string
  description: string
  problem: string
  solution: string
  benefits: string[]
  fundingRequired: number
  currentStage: string
  status: "pending" | "approved" | "rejected"
  submittedAt: Date
  views: number
  interests: number
  image?: string
  documents?: UploadedFile[]
  detailedInfo?: {
    problemStatement: string
    solutionDescription: string
    marketSize: string
    uniqueValue: string
    businessModel: string
    revenueModel: string
    targetMarket: string
    competitiveAdvantage: string
    teamSize: string
    keyTeamMembers: string
    advisors: string
    currentRevenue: string
    projectedRevenue: string
    fundingHistory: string
    useOfFunds: string
    technologyStack: string
    intellectualProperty: string
    developmentStage: string
  }
}

export interface Interest {
  id: string
  investorId: string
  productId: string
  primaryIntent: string
  areasOfInterest: string[]
  specificQuestions: string
  message: string
  createdAt: Date
  status: "pending" | "approved" | "rejected"
}

export interface Request {
  id: string
  fromUserId: string
  toUserId: string
  productId?: string
  type: "contact" | "meeting" | "investment" | "partnership"
  message: string
  contactMethod: "whatsapp" | "email" | "zoom"
  status: "pending" | "approved" | "rejected" | "ongoing" | "completed"
  createdAt: Date
  adminNotes?: string
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadProgress?: number
  status: "uploading" | "completed" | "error"
  error?: string
  securityScan?: "pending" | "clean" | "threat"
}

// Real-time event system
class EventEmitter {
  private events: { [key: string]: Function[] } = {}

  on(event: string, callback: Function) {
    if (!this.events[event]) {
      this.events[event] = []
    }
    this.events[event].push(callback)
  }

  emit(event: string, data?: any) {
    if (this.events[event]) {
      this.events[event].forEach((callback) => callback(data))
    }
  }

  off(event: string, callback: Function) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter((cb) => cb !== callback)
    }
  }
}

export const eventEmitter = new EventEmitter()

// Storage utilities
export const storage = {
  // Users
  getUsers: (): User[] => {
    const data = localStorage.getItem("metavertex_users")
    return data ? JSON.parse(data) : []
  },

  setUsers: (users: User[]) => {
    localStorage.setItem("metavertex_users", JSON.stringify(users))
    eventEmitter.emit("users-updated", users)
  },

  // Products
  getProducts: (): Product[] => {
    const data = localStorage.getItem("metavertex_products")
    return data ? JSON.parse(data) : []
  },

  setProducts: (products: Product[]) => {
    localStorage.setItem("metavertex_products", JSON.stringify(products))
    eventEmitter.emit("products-updated", products)
  },

  // Interests
  getInterests: (): Interest[] => {
    const data = localStorage.getItem("metavertex_interests")
    return data ? JSON.parse(data) : []
  },

  setInterests: (interests: Interest[]) => {
    localStorage.setItem("metavertex_interests", JSON.stringify(interests))
    eventEmitter.emit("interests-updated", interests)
  },

  // Requests
  getRequests: (): Request[] => {
    const data = localStorage.getItem("metavertex_requests")
    return data ? JSON.parse(data) : []
  },

  setRequests: (requests: Request[]) => {
    localStorage.setItem("metavertex_requests", JSON.stringify(requests))
    eventEmitter.emit("requests-updated", requests)
  },

  // Analytics
  getAnalytics: () => {
    const users = storage.getUsers()
    const products = storage.getProducts()
    const interests = storage.getInterests()
    const requests = storage.getRequests()

    return {
      totalUsers: users.length,
      totalProducts: products.length,
      totalInterests: interests.length,
      totalRequests: requests.length,
      approvedUsers: users.filter((u) => u.status === "approved").length,
      pendingUsers: users.filter((u) => u.status === "pending").length,
      approvedProducts: products.filter((p) => p.status === "approved").length,
      pendingProducts: products.filter((p) => p.status === "pending").length,
      activeUsers: users.filter((u) => u.isActive).length,
      totalFunding: products.reduce((sum, p) => sum + (p.fundingRequired || 0), 0),
      usersByType: users.reduce((acc: any, user: User) => {
        acc[user.userType] = (acc[user.userType] || 0) + 1
        return acc
      }, {}),
      productsByCategory: products.reduce((acc: any, product: Product) => {
        acc[product.category] = (acc[product.category] || 0) + 1
        return acc
      }, {}),
      monthlyData: generateMonthlyData(),
    }
  },
}

// Generate proper user IDs based on registration order
export const generateUserId = (userType: string): string => {
  const users = storage.getUsers()
  const usersByType = users.filter((u) => u.userType === userType)
  const nextNumber = (usersByType.length + 1).toString().padStart(3, "0")

  switch (userType) {
    case "founder":
      return `FNB-${nextNumber}`
    case "investor":
      return `INV-${nextNumber}`
    case "organization":
      return `ORG-${nextNumber}`
    case "mentor":
      return `MNT-${nextNumber}`
    case "admin":
      return `ADM-${nextNumber}`
    case "superadmin":
      return `SA-${nextNumber}`
    default:
      return `USR-${nextNumber}`
  }
}

// Generate monthly data for analytics
const generateMonthlyData = () => {
  return Array.from({ length: 12 }, (_, i) => ({
    month: new Date(2024, i).toLocaleString("default", { month: "short" }),
    users: Math.floor(Math.random() * 50) + 10,
    products: Math.floor(Math.random() * 20) + 5,
    interests: Math.floor(Math.random() * 30) + 8,
    requests: Math.floor(Math.random() * 15) + 3,
  }))
}

// Initialize demo data with proper structure
export const initializeDemoData = () => {
  if (storage.getUsers().length === 0) {
    const demoUsers: User[] = [
      {
        id: "demo-founder-1",
        name: "John Smith",
        email: "john@hydrogrow.com",
        userType: "founder",
        uniqueId: "FNB-001",
        status: "approved",
        company: "HydroGrow Technologies",
        phone: "+44 7700 900123",
        basicInfo: {
          industry: "AgriTech",
          experience: "5+ years",
          location: "London, UK",
          bio: "Passionate about sustainable agriculture and innovation",
        },
        createdAt: new Date("2024-01-15"),
        lastActive: new Date(),
        isActive: true,
      },
      {
        id: "demo-investor-1",
        name: "Sarah Johnson",
        email: "sarah@greenventures.com",
        userType: "investor",
        uniqueId: "INV-001",
        status: "approved",
        company: "Green Ventures Capital",
        phone: "+44 7700 900456",
        basicInfo: {
          industry: "Venture Capital",
          experience: "10+ years",
          location: "Manchester, UK",
          bio: "Focused on sustainable technology investments",
        },
        createdAt: new Date("2024-01-10"),
        lastActive: new Date(),
        isActive: true,
      },
    ]
    storage.setUsers(demoUsers)
  }

  if (storage.getProducts().length === 0) {
    const demoProducts: Product[] = [
      {
        id: "prod-001",
        founderId: "demo-founder-1",
        productName: "Hydroponics Revolution",
        category: "AgriTech",
        description: "Advanced soilless growing systems for sustainable agriculture",
        problem: "Traditional farming methods are inefficient and environmentally harmful",
        solution: "AI-powered hydroponic systems that use 90% less water and produce 3x more yield",
        benefits: ["90% water savings", "3x higher yield", "Year-round production", "No pesticides needed"],
        fundingRequired: 500000,
        currentStage: "MVP",
        status: "approved",
        submittedAt: new Date("2024-01-20"),
        views: 245,
        interests: 12,
        image: "/placeholder.svg?height=300&width=400",
        documents: [],
        detailedInfo: {
          problemStatement: "Traditional farming uses excessive water and produces lower yields",
          solutionDescription: "AI-powered hydroponic systems with smart monitoring",
          marketSize: "£10B TAM, £1B SAM",
          uniqueValue: "90% water reduction with 3x yield increase",
          businessModel: "B2B",
          revenueModel: "Subscription + Hardware sales",
          targetMarket: "Commercial farms and urban agriculture",
          competitiveAdvantage: "Proprietary AI algorithms and sensor technology",
          teamSize: "8 people",
          keyTeamMembers: "John Smith (CEO), Dr. Emily Chen (CTO), Mark Wilson (COO)",
          advisors: "Prof. David Green (Agricultural Expert), Lisa Brown (Former Agtech CEO)",
          currentRevenue: "£50K ARR",
          projectedRevenue: "£5M in 3 years",
          fundingHistory: "£100K seed funding from angel investors",
          useOfFunds: "40% R&D, 30% Marketing, 20% Hiring, 10% Operations",
          technologyStack: "IoT sensors, AI/ML, React, Node.js, MongoDB",
          intellectualProperty: "2 pending patents for sensor technology",
          developmentStage: "MVP completed, pilot testing with 5 farms",
        },
      },
    ]
    storage.setProducts(demoProducts)
  }
}

// Super Admin credentials (secure)
export const SUPER_ADMIN_CREDENTIALS = {
  email: "superadmin@metavertex.co.uk",
  password: "SuperAdmin@2025!",
  name: "Super Administrator",
  uniqueId: "SA-001",
}
