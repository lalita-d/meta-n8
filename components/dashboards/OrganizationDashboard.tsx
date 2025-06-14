"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, TrendingUp, Handshake, Target } from "lucide-react"

export function OrganizationDashboard() {
  const [partnerships] = useState([
    {
      id: 1,
      startup: "EcoTrack",
      sector: "GreenTech",
      type: "Strategic Partnership",
      status: "Active",
      startDate: "2024-01-15",
    },
  ])

  const stats = [
    {
      title: "Active Partnerships",
      value: partnerships.length,
      icon: Handshake,
      color: "text-blue-600",
    },
    {
      title: "Innovation Projects",
      value: "8",
      icon: Target,
      color: "text-green-600",
    },
    {
      title: "Team Members",
      value: "45",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "92%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Organization Dashboard</h2>
        <p className="opacity-90">Manage partnerships and drive innovation through strategic collaborations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="partnerships" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
          <TabsTrigger value="innovation">Innovation Hub</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="partnerships" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Strategic Partnerships</h3>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">New Partnership</Button>
          </div>

          <div className="grid gap-6">
            {partnerships.map((partnership) => (
              <Card key={partnership.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {partnership.startup}
                        <Badge variant="outline">{partnership.sector}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {partnership.type} • Started {partnership.startDate}
                      </CardDescription>
                    </div>
                    <Badge variant="default">{partnership.status}</Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="innovation" className="space-y-6">
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Innovation Projects</h3>
            <p className="text-muted-foreground mb-4">Manage your innovation initiatives and track progress.</p>
            <Button variant="outline">View Projects</Button>
          </div>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <div className="text-center py-12">
            <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Team Management</h3>
            <p className="text-muted-foreground mb-4">Manage your team members and their roles in the organization.</p>
            <Button variant="outline">Manage Team</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
