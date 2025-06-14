"use client"

import { ZoomIntegration } from "@/components/zoom/ZoomIntegration"
import { DashboardLayout } from "@/components/layout/DashboardLayout"

export default function ZoomPage() {
  return (
    <DashboardLayout>
      <ZoomIntegration />
    </DashboardLayout>
  )
}
