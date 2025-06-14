import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/mongodb"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization")
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const token = authHeader.substring(7)
    const decoded = verifyToken(token)

    if (!decoded) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 })
    }

    const body = await request.json()
    const { title, description, duration, scheduledTime, type } = body

    const client = await clientPromise
    const db = client.db("metavertex")
    const zoomCalls = db.collection("zoom_calls")

    // Generate mock Zoom meeting details
    const meetingId = Math.floor(100000000 + Math.random() * 900000000)
    const joinUrl = `https://zoom.us/j/${meetingId}`
    const passcode = Math.floor(100000 + Math.random() * 900000).toString()

    const zoomMeeting = {
      id: new Date().getTime().toString(),
      meetingId: meetingId.toString(),
      title,
      description,
      duration,
      scheduledTime: new Date(scheduledTime),
      type,
      organizerId: decoded.userId,
      organizerUniqueId: decoded.uniqueId,
      joinUrl,
      passcode,
      status: "scheduled",
      createdAt: new Date(),
    }

    await zoomCalls.insertOne(zoomMeeting)

    // Log admin action
    await db.collection("admin_actions").insertOne({
      action: "zoom_meeting_scheduled",
      userId: decoded.userId,
      details: { title, type, scheduledTime },
      timestamp: new Date(),
    })

    return NextResponse.json(
      {
        message: "Meeting scheduled successfully",
        meeting: {
          id: zoomMeeting.id,
          meetingId: zoomMeeting.meetingId,
          joinUrl: zoomMeeting.joinUrl,
          passcode: zoomMeeting.passcode,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Zoom scheduling error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
