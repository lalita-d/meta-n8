"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown, User } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"

export function Navbar() {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  const [showProductsDropdown, setShowProductsDropdown] = useState(false)

  const scrollToSection = (sectionId: string) => {
    // If not on home page, navigate to home first then scroll
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  const handleLogout = () => {
    logout()
    setShowUserDropdown(false)
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MV</span>
              </div>
              <span className="text-xl font-bold text-gray-900">METAVERTEX</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("hero")}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Home
            </button>

            {/* Products Dropdown with User Types */}
            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                onMouseEnter={() => setShowProductsDropdown(true)}
                onMouseLeave={() => setShowProductsDropdown(false)}
              >
                Products
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {showProductsDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border"
                  onMouseEnter={() => setShowProductsDropdown(true)}
                  onMouseLeave={() => setShowProductsDropdown(false)}
                >
                  <button
                    onClick={() => scrollToSection("products")}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    All Products
                  </button>
                  <div className="border-t my-1"></div>
                  <Link href="/founders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    For Founders
                  </Link>
                  <Link href="/investors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    For Investors
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("solutions")}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              Solutions
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-700 hover:text-purple-600 transition-colors"
            >
              About
            </button>

            {/* User Dropdown */}
            {/* <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-purple-600 transition-colors"
                onClick={() => setShowUserDropdown(!showUserDropdown)}
              >
                For Users
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {showUserDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg border">
                  <Link href="/founders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Founders
                  </Link>
                  <Link href="/investors" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Investors
                  </Link>
                </div>
              )}
            </div> */}

            {/* Auth Section */}
            {user ? (
              <div className="relative">
                <button
                  className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 transition-colors"
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                >
                  <User className="h-5 w-5" />
                  <span>{user.name}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {showUserDropdown && (
                  <div className="absolute top-full right-0 mt-1 w-48 bg-white rounded-md shadow-lg border">
                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth/signin">
                  <Button variant="outline">Sign In</Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button
                onClick={() => scrollToSection("hero")}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 w-full text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("products")}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 w-full text-left"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("solutions")}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 w-full text-left"
              >
                Solutions
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 w-full text-left"
              >
                About
              </button>
              <Link href="/founders" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Founders
              </Link>
              <Link href="/investors" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                Investors
              </Link>

              {user ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-3 py-2">
                    <User className="h-5 w-5 mr-2" />
                    <span className="font-medium">{user.name}</span>
                  </div>
                  <Link href="/dashboard" className="block px-3 py-2 text-gray-700 hover:text-purple-600">
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex flex-col space-y-2">
                    <Link href="/auth/signin">
                      <Button variant="outline" className="w-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600">Sign Up</Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
