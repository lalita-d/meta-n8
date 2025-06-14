```typescriptreact file="app/api/auth/register/route.ts"
[v0-no-op-code-block-prefix]import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({ 
    message: "Registration handled by client-side storage for preview" 
  }, { status: 200 })
}
