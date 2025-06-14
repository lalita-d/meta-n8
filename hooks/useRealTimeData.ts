"use client"

import { useState, useEffect } from "react"
import { storage, eventEmitter, type User, type Product, type Interest } from "@/lib/storage"

export function useRealTimeData() {
  const [users, setUsers] = useState<User[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [interests, setInterests] = useState<Interest[]>([])
  const [analytics, setAnalytics] = useState<any>(null)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  const refreshData = () => {
    const currentUsers = storage.getUsers()
    const currentProducts = storage.getProducts()
    const currentInterests = storage.getInterests()
    const currentAnalytics = storage.getAnalytics()

    setUsers(currentUsers)
    setProducts(currentProducts)
    setInterests(currentInterests)
    setAnalytics(currentAnalytics)
    setLastUpdate(new Date())
  }

  useEffect(() => {
    // Initial load
    refreshData()

    // Set up real-time listeners
    const handleUsersUpdate = (updatedUsers: User[]) => {
      setUsers(updatedUsers)
      setAnalytics(storage.getAnalytics())
      setLastUpdate(new Date())
    }

    const handleProductsUpdate = (updatedProducts: Product[]) => {
      setProducts(updatedProducts)
      setAnalytics(storage.getAnalytics())
      setLastUpdate(new Date())
    }

    const handleInterestsUpdate = (updatedInterests: Interest[]) => {
      setInterests(updatedInterests)
      setAnalytics(storage.getAnalytics())
      setLastUpdate(new Date())
    }

    eventEmitter.on("users-updated", handleUsersUpdate)
    eventEmitter.on("products-updated", handleProductsUpdate)
    eventEmitter.on("interests-updated", handleInterestsUpdate)

    // Auto-refresh every 30 seconds
    const interval = setInterval(refreshData, 30000)

    return () => {
      eventEmitter.off("users-updated", handleUsersUpdate)
      eventEmitter.off("products-updated", handleProductsUpdate)
      eventEmitter.off("interests-updated", handleInterestsUpdate)
      clearInterval(interval)
    }
  }, [])

  return {
    users,
    products,
    interests,
    analytics,
    lastUpdate,
    refreshData,
  }
}
