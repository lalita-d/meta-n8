"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { storage, initializeDemoData, generateUserId, SUPER_ADMIN_CREDENTIALS, type User } from "@/lib/storage"
import { JWTService } from "@/lib/jwt"
import { wsService } from "@/lib/websocket"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>
  register: (userData: any) => Promise<{ success: boolean; message: string }>
  logout: () => void
  loading: boolean
  token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState<string | null>(null)

  useEffect(() => {
    initializeDemoData()

    // Check for existing JWT token
    const existingToken = JWTService.getToken()
    if (existingToken && JWTService.isTokenValid(existingToken)) {
      const tokenData = JWTService.decodeToken(existingToken)

      // Get user from storage
      const users = storage.getUsers()
      const foundUser = users.find((u) => u.id === tokenData.userId)

      if (foundUser) {
        setUser(foundUser)
        setToken(existingToken)
        // Connect to WebSocket
        wsService.connect(existingToken)
      } else {
        JWTService.removeToken()
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      // Super Admin check
      if (email === SUPER_ADMIN_CREDENTIALS.email && password === SUPER_ADMIN_CREDENTIALS.password) {
        const superAdminUser: User = {
          id: "sa-001",
          email: SUPER_ADMIN_CREDENTIALS.email,
          userType: "superadmin",
          uniqueId: SUPER_ADMIN_CREDENTIALS.uniqueId,
          name: SUPER_ADMIN_CREDENTIALS.name,
          status: "approved",
          createdAt: new Date("2024-01-01"),
          lastActive: new Date(),
          isActive: true,
        }

        const jwtToken = JWTService.generateToken(superAdminUser)
        JWTService.setToken(jwtToken)
        setUser(superAdminUser)
        setToken(jwtToken)
        wsService.connect(jwtToken)

        return { success: true, message: "Welcome back, Super Admin!" }
      }

      // Regular user check
      const users = storage.getUsers()
      const foundUser = users.find((u: User) => u.email === email)

      if (!foundUser) {
        return { success: false, message: "Invalid email or password" }
      }

      if (foundUser.status !== "approved") {
        return { success: false, message: "Account pending admin approval" }
      }

      // Update last active and set as active
      foundUser.lastActive = new Date()
      foundUser.isActive = true
      const updatedUsers = users.map((u: User) => (u.id === foundUser.id ? foundUser : u))
      storage.setUsers(updatedUsers)

      const jwtToken = JWTService.generateToken(foundUser)
      JWTService.setToken(jwtToken)
      setUser(foundUser)
      setToken(jwtToken)
      wsService.connect(jwtToken)

      return { success: true, message: `Welcome back, ${foundUser.name}!` }
    } catch (error) {
      return { success: false, message: "Login failed. Please try again." }
    }
  }

  const register = async (userData: any) => {
    try {
      const users = storage.getUsers()

      // Check if user exists
      if (users.find((u: User) => u.email === userData.email)) {
        return { success: false, message: "User already exists with this email. Please sign in instead." }
      }

      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        name: userData.name,
        userType: userData.userType,
        uniqueId: generateUserId(userData.userType),
        status: "pending", // Requires admin approval
        profile: userData,
        createdAt: new Date(),
        lastActive: new Date(),
        company: userData.company || "",
        phone: userData.phone || "",
        basicInfo: {
          industry: userData.industry || "",
          experience: userData.experience || "",
          location: userData.location || "",
          bio: userData.bio || "",
        },
        isActive: false,
      }

      const updatedUsers = [...users, newUser]
      storage.setUsers(updatedUsers)

      // Notify admin via WebSocket
      wsService.send("new-user-registration", {
        user: newUser,
        timestamp: new Date(),
      })

      return {
        success: true,
        message: "Registration successful! Your account is pending admin approval. You'll be notified once approved.",
      }
    } catch (error) {
      return { success: false, message: "Registration failed. Please try again." }
    }
  }

  const logout = () => {
    // Set user as inactive before logout
    if (user) {
      const users = storage.getUsers()
      const updatedUsers = users.map((u: User) => (u.id === user.id ? { ...u, isActive: false } : u))
      storage.setUsers(updatedUsers)
    }

    setUser(null)
    setToken(null)
    JWTService.removeToken()
    wsService.disconnect()
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, token }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
