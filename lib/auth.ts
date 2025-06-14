export interface User {
  id: string
  email: string
  name: string
  userType: "founder" | "investor" | "organization" | "mentor" | "admin" | "superadmin"
  uniqueId: string
  status: "pending" | "approved" | "rejected"
  profile?: any
  createdAt: Date
  lastActive: Date
}

// Mock users data
const mockUsers: User[] = [
  {
    id: "sa-001",
    email: "superadmin@metavertex.co.uk",
    name: "Super Administrator",
    userType: "superadmin",
    uniqueId: "SA-0001",
    status: "approved",
    createdAt: new Date("2024-01-01"),
    lastActive: new Date(),
  },
  {
    id: "fnd-001",
    email: "founder@example.com",
    name: "John Founder",
    userType: "founder",
    uniqueId: "FND-0001",
    status: "approved",
    createdAt: new Date("2024-01-15"),
    lastActive: new Date(),
  },
  {
    id: "inv-001",
    email: "investor@example.com",
    name: "Jane Investor",
    userType: "investor",
    uniqueId: "INV-0001",
    status: "approved",
    createdAt: new Date("2024-02-01"),
    lastActive: new Date(),
  },
]

export const generateUniqueId = (userType: string): string => {
  const prefix =
    {
      founder: "FND",
      investor: "INV",
      organization: "ORG",
      mentor: "MNT",
      admin: "ADM",
    }[userType] || "USR"

  const randomNum = Math.floor(Math.random() * 9999)
    .toString()
    .padStart(4, "0")
  return `${prefix}-${randomNum}`
}

export const hashPassword = async (password: string): Promise<string> => {
  // Simple hash simulation for demo
  return btoa(password)
}

export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return btoa(password) === hashedPassword
}

export const generateToken = (user: User): string => {
  // Simple token generation for demo
  return btoa(
    JSON.stringify({
      userId: user.id,
      email: user.email,
      userType: user.userType,
      uniqueId: user.uniqueId,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }),
  )
}

export const verifyToken = (token: string): any => {
  try {
    const decoded = JSON.parse(atob(token))
    if (decoded.exp < Date.now()) {
      return null
    }
    return decoded
  } catch {
    return null
  }
}

// Local storage helpers
export const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") return mockUsers
  const stored = localStorage.getItem("metavertex_users")
  return stored ? JSON.parse(stored) : mockUsers
}

export const storeUsers = (users: User[]) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("metavertex_users", JSON.stringify(users))
  }
}

export const getCurrentUser = (): User | null => {
  if (typeof window === "undefined") return null
  const token = localStorage.getItem("metavertex_token")
  if (!token) return null

  const decoded = verifyToken(token)
  if (!decoded) return null

  const users = getStoredUsers()
  return users.find((u) => u.id === decoded.userId) || null
}
