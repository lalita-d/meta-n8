import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json(
    {
      message: "User approval handled by client-side storage for preview",
    },
    { status: 200 },
  )
}
