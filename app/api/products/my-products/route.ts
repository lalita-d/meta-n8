import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(
    {
      message: "Product data handled by client-side storage for preview",
    },
    { status: 200 },
  )
}
