"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Package,
  Users,
  TrendingUp,
  Video,
  LogOut,
  Menu,
  X,
  Home,
  Crown,
  GraduationCap,
  Heart,
  BarChart3,
  MessageSquare,
  FileText,
  UserCheck,
  ClipboardList,
  Activity,
  Cog,
  Eye,
  Plus,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  const getNavigationItems = () => {
    switch (user?.userType) {
      case "superadmin":
        return [
          { name: "Dashboard", href: "/dashboard", icon: Crown, section: "OVERVIEW" },
          { name: "View All Users", href: "/dashboard/users", icon: Users, section: "MANAGEMENT" },
          {
            name: "Approve/Reject Products",
            href: "/dashboard/products/approve",
            icon: UserCheck,
            section: "MANAGEMENT",
          },
          { name: "Product Submissions", href: "/dashboard/products", icon: ClipboardList, section: "MANAGEMENT" },
          {
            name: "Product Popularity",
            href: "/dashboard/analytics/products",
            icon: TrendingUp,
            section: "MANAGEMENT",
          },
          { name: "Investor Interest", href: "/dashboard/interests", icon: Heart, section: "MANAGEMENT" },
          { name: "Mentor Suggestions", href: "/dashboard/mentors", icon: GraduationCap, section: "MANAGEMENT" },
          { name: "Service Requests", href: "/dashboard/requests", icon: FileText, section: "MANAGEMENT" },
          { name: "My Requests", href: "/dashboard/my-requests", icon: MessageSquare, section: "MANAGEMENT" },
          { name: "Zoom Calls", href: "/dashboard/zoom", icon: Video, section: "MANAGEMENT" },
          { name: "Visitor Metrics", href: "/dashboard/metrics", icon: Activity, section: "MANAGEMENT" },
          { name: "Platform Settings", href: "/dashboard/settings", icon: Cog, section: "MANAGEMENT" },
        ]
      case "founder":
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "OVERVIEW" },
          { name: "My Products", href: "/dashboard/products", icon: Package, section: "PRODUCTS" },
          { name: "Submit Product", href: "/dashboard/products/new", icon: Plus, section: "PRODUCTS" },
          { name: "View Products", href: "/dashboard/products/view", icon: Eye, section: "PRODUCTS" },
          { name: "Browse Investors", href: "/dashboard/browse", icon: Search, section: "DISCOVERY" },
          { name: "Requests", href: "/dashboard/requests", icon: MessageSquare, section: "COMMUNICATION" },
          { name: "Zoom Calls", href: "/dashboard/zoom", icon: Video, section: "TOOLS" },
          { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, section: "TOOLS" },
          { name: "Profile", href: "/dashboard/profile", icon: User, section: "ACCOUNT" },
        ]
      case "investor":
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "OVERVIEW" },
          { name: "Browse Products", href: "/dashboard/browse", icon: Package, section: "DISCOVERY" },
          { name: "My Interests", href: "/dashboard/interests", icon: Heart, section: "DISCOVERY" },
          { name: "Investment Analytics", href: "/dashboard/analytics", icon: BarChart3, section: "ANALYTICS" },
          { name: "Requests", href: "/dashboard/requests", icon: MessageSquare, section: "COMMUNICATION" },
          { name: "Zoom Calls", href: "/dashboard/zoom", icon: Video, section: "TOOLS" },
          { name: "Profile", href: "/dashboard/profile", icon: User, section: "ACCOUNT" },
        ]
      case "mentor":
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "OVERVIEW" },
          { name: "Mentorship", href: "/dashboard/mentorship", icon: GraduationCap, section: "MENTORING" },
          { name: "Sessions", href: "/dashboard/sessions", icon: Video, section: "MENTORING" },
          { name: "Requests", href: "/dashboard/requests", icon: MessageSquare, section: "COMMUNICATION" },
          { name: "Profile", href: "/dashboard/profile", icon: User, section: "ACCOUNT" },
        ]
      default:
        return [
          { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, section: "OVERVIEW" },
          { name: "Profile", href: "/dashboard/profile", icon: User, section: "ACCOUNT" },
        ]
    }
  }

  const navigationItems = getNavigationItems()
  const groupedItems = navigationItems.reduce(
    (acc, item) => {
      if (!acc[item.section]) {
        acc[item.section] = []
      }
      acc[item.section].push(item)
      return acc
    },
    {} as Record<string, typeof navigationItems>,
  )

  const getUserTypeColor = () => {
    switch (user?.userType) {
      case "superadmin":
        return "bg-purple-100 text-purple-800"
      case "founder":
        return "bg-blue-100 text-blue-800"
      case "investor":
        return "bg-green-100 text-green-800"
      case "organization":
        return "bg-orange-100 text-orange-800"
      case "mentor":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? (sidebarCollapsed ? "w-16" : "w-80") : "w-0"
        } transition-all duration-300 ease-in-out bg-slate-900 text-white flex flex-col relative`}
      >
        {sidebarOpen && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700">
              {!sidebarCollapsed && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">MV</span>
                  </div>
                  <span className="font-semibold text-white">MetaVertex</span>
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-slate-800"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              </Button>
            </div>

            {/* User Info */}
            {!sidebarCollapsed && (
              <div className="p-6 border-b border-slate-700">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                    <p className="text-xs text-slate-300 truncate">{user?.uniqueId}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Badge className={getUserTypeColor()}>
                    {user?.userType?.charAt(0).toUpperCase() + user?.userType?.slice(1)}
                  </Badge>
                  {user?.isActive && <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>}
                </div>
              </div>
            )}

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
              {Object.entries(groupedItems).map(([section, items]) => (
                <div key={section}>
                  {!sidebarCollapsed && (
                    <h3 className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                      {section}
                    </h3>
                  )}
                  <div className="space-y-1">
                    {items.map((item) => (
                      <Button
                        key={item.name}
                        variant="ghost"
                        className={`w-full ${
                          sidebarCollapsed ? "justify-center px-2" : "justify-start"
                        } text-left text-slate-300 hover:text-white hover:bg-slate-800 h-auto py-3`}
                        onClick={() => {
                          router.push(item.href)
                        }}
                        title={sidebarCollapsed ? item.name : undefined}
                      >
                        <item.icon className={`h-5 w-5 flex-shrink-0 ${sidebarCollapsed ? "" : "mr-3"}`} />
                        {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-slate-700 space-y-2">
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-2" : "justify-start"
                } text-left text-slate-300 hover:text-white hover:bg-slate-800`}
                onClick={() => router.push("/")}
                title={sidebarCollapsed ? "Home Page" : undefined}
              >
                <Home className={`h-5 w-5 ${sidebarCollapsed ? "" : "mr-3"}`} />
                {!sidebarCollapsed && "Home Page"}
              </Button>
              <Button
                variant="ghost"
                className={`w-full ${
                  sidebarCollapsed ? "justify-center px-2" : "justify-start"
                } text-left text-red-400 hover:text-red-300 hover:bg-red-900/20`}
                onClick={handleLogout}
                title={sidebarCollapsed ? "Logout" : undefined}
              >
                <LogOut className={`h-5 w-5 ${sidebarCollapsed ? "" : "mr-3"}`} />
                {!sidebarCollapsed && "Logout"}
              </Button>
            </div>
          </>
        )}

        {/* Sidebar Toggle Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute -right-3 top-20 bg-slate-900 border border-slate-700 text-white hover:bg-slate-800 rounded-full p-1 z-10"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar for mobile */}
        <div className="sticky top-0 z-10 bg-white shadow-sm border-b lg:hidden">
          <div className="flex items-center justify-between h-16 px-4">
            <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">MV</span>
              </div>
              <span className="font-semibold text-gray-900">MetaVertex</span>
            </div>
            <div className="w-10" />
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
