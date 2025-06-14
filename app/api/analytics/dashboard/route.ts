import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded || decoded.userType !== "superadmin") {
      return NextResponse.json({ message: "Insufficient permissions" }, { status: 403 })
    }

    const client = await clientPromise
    const db = client.db("metavertex")

    // Get user statistics
    const userStats = await db
      .collection("users")
      .aggregate([
        {
          $group: {
            _id: "$userType",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    // Get monthly user registrations
    const monthlyRegistrations = await db
      .collection("users")
      .aggregate([
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { "_id.year": 1, "_id.month": 1 } },
      ])
      .toArray()

    // Get product statistics
    const productStats = await db
      .collection("products")
      .aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
            totalViews: { $sum: "$views" },
            totalInterests: { $sum: "$interests" },
          },
        },
      ])
      .toArray()

    // Get recent activities
    const recentActivities = await db.collection("admin_actions").find({}).sort({ timestamp: -1 }).limit(10).toArray()

    return NextResponse.json({
      userStats,
      monthlyRegistrations,
      productStats,
      recentActivities,
      totalUsers: await db.collection("users").countDocuments(),
      totalProducts: await db.collection("products").countDocuments(),
      pendingApprovals: await db.collection("users").countDocuments({ status: "pending" }),
    })
  } catch (error) {
    console.error("Analytics error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
