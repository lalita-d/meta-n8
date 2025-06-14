"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users, Calendar, Award, Clock, Target } from "lucide-react"

export function MentorDashboard() {
  const [mentees] = useState([
    {
      id: 1,
      name: "John Smith",
      company: "HydroGrow",
      sector: "AgriTech",
      stage: "Series A",
      nextSession: "2024-01-20",
    },
  ])

  const stats = [
    {
      title: "Active Mentees",
      value: mentees.length,
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Sessions This Month",
      value: "12",
      icon: Calendar,
      color: "text-green-600",
    },
    {
      title: "Success Stories",
      value: "8",
      icon: Award,
      color: "text-purple-600",
    },
    {
      title: "Hours Mentored",
      value: "156",
      icon: Clock,
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Mentor Dashboard</h2>
        <p className="opacity-90">Guide the next generation of entrepreneurs and share your expertise.</p>
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

      <Tabs defaultValue="mentees" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="mentees">My Mentees</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="mentees" className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Current Mentees</h3>
            <Button className="bg-gradient-to-r from-orange-600 to-red-600">Find New Mentees</Button>
          </div>

          <div className="grid gap-6">
            {mentees.map((mentee) => (
              <Card key={mentee.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        {mentee.name}
                        <Badge variant="outline">{mentee.sector}</Badge>
                      </CardTitle>
                      <CardDescription>
                        {mentee.company} • {mentee.stage}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Next Session</div>
                      <div className="text-sm text-muted-foreground">{mentee.nextSession}</div>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-6">
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mentoring Sessions</h3>
            <p className="text-muted-foreground mb-4">Schedule and manage your mentoring sessions.</p>
            <Button variant="outline">View Calendar</Button>
          </div>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          <div className="text-center py-12">
            <Target className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Mentoring Impact</h3>
            <p className="text-muted-foreground mb-4">Track the success and impact of your mentoring efforts.</p>
            <Button variant="outline">View Impact Report</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
