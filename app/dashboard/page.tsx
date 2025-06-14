"use client"

import { useAuth } from "@/contexts/AuthContext"
import { SuperAdminDashboard } from "@/components/dashboards/SuperAdminDashboard"
import { FounderDashboard } from "@/components/dashboards/FounderDashboard"
import { InvestorDashboard } from "@/components/dashboards/InvestorDashboard"
import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin")
      return
    }

    // Redirect users to their specific dashboard based on user type
    if (!loading && user) {
      const currentPath = window.location.pathname
      const expectedPath = `/dashboard`

      // Only redirect if we're on the base dashboard page
      if (currentPath === expectedPath) {
        switch (user.userType) {
          case "superadmin":
            // Super admin stays on main dashboard
            break
          case "founder":
            // Founder stays on main dashboard
            break
          case "investor":
            // Investor stays on main dashboard
            break
          case "organization":
            // Organization gets a coming soon message
            break
          case "mentor":
            // Mentor gets a coming soon message
            break
          default:
            // Unknown user type, show generic dashboard
            break
        }
      }
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect to signin
  }

  const renderDashboard = () => {
    switch (user.userType) {
      case "superadmin":
        return <SuperAdminDashboard />
      case "founder":
        return <FounderDashboard />
      case "investor":
        return <InvestorDashboard />
      case "organization":
        return (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-2">🏢 Organization Dashboard</h2>
              <p className="text-lg opacity-90">Welcome, {user.name}!</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                Your organization dashboard with partnership management and collaboration tools is being developed.
              </p>
            </div>
          </div>
        )
      case "mentor":
        return (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-2">🎓 Mentor Dashboard</h2>
              <p className="text-lg opacity-90">Welcome, {user.name}!</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                Your mentor dashboard with mentorship tools and founder connections is being developed.
              </p>
            </div>
          </div>
        )
      case "admin":
        return (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-2">⚙️ Admin Dashboard</h2>
              <p className="text-lg opacity-90">Welcome, {user.name}!</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Coming Soon</h3>
              <p className="text-muted-foreground">
                Your admin dashboard with user management and platform administration tools is being developed.
              </p>
            </div>
          </div>
        )
      default:
        return (
          <div className="text-center py-12">
            <div className="bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg p-8 text-white mb-8">
              <h2 className="text-3xl font-bold mb-2">🚀 Welcome to MetaVertex</h2>
              <p className="text-lg opacity-90">Hello, {user.name}!</p>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Dashboard Loading</h3>
              <p className="text-muted-foreground">Your personalized dashboard is being prepared...</p>
            </div>
          </div>
        )
    }
  }

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>
}
