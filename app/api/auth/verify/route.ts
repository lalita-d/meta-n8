import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "No token provided" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    // For super admin, return hardcoded data
    if (decoded.uniqueId === "SA-0001") {
      return NextResponse.json({
        user: {
          id: "sa-001",
          email: "superadmin@metavertex.co.uk",
          userType: "superadmin",
          uniqueId: "SA-0001",
          name: "Super Administrator",
          status: "approved",
        },
      })
    }

    const client = await clientPromise
    const db = client.db("metavertex")
    const users = db.collection("users")

    const user = await users.findOne({ id: decoded.userId })
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Token verification error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
