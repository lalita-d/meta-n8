"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Calendar, Clock, Users, Video, CheckCircle, Plus } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/hooks/use-toast"

interface ZoomCall {
  id: string
  title: string
  scheduledAt: Date
  duration: number
  participants: string[]
  status: "scheduled" | "in-progress" | "completed" | "cancelled"
  meetingUrl?: string
  meetingId?: string
  passcode?: string
  organizer: string
  type: "investor-founder" | "mentorship" | "admin-review" | "general"
}

export function ZoomIntegration() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [calls, setCalls] = useState<ZoomCall[]>([])
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [isScheduling, setIsScheduling] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    duration: 60,
    participants: "",
    agenda: "",
    type: "general" as ZoomCall["type"],
  })

  useEffect(() => {
    // Load calls from localStorage
    const storedCalls = localStorage.getItem("metavertex_zoom_calls")
    if (storedCalls) {
      const parsedCalls = JSON.parse(storedCalls).map((call: any) => ({
        ...call,
        scheduledAt: new Date(call.scheduledAt),
      }))
      setCalls(parsedCalls)
    } else {
      // Initialize with some demo calls for testing
      initializeDemoCalls()
    }
  }, [])

  const initializeDemoCalls = () => {
    const demoCalls: ZoomCall[] = [
      {
        id: "demo-1",
        title: "HydroGrow Investment Discussion",
        scheduledAt: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
        duration: 45,
        participants: ["investor@example.com", "founder@hydrogrow.com"],
        status: "scheduled",
        meetingUrl: "https://zoom.us/j/123456789",
        meetingId: "123-456-789",
        passcode: "HydroGrow2025",
        organizer: user?.name || "Current User",
        type: "investor-founder",
      },
      {
        id: "demo-2",
        title: "Weekly Mentorship Session",
        scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        duration: 60,
        participants: ["mentor@metavertex.com", "startup@example.com"],
        status: "scheduled",
        meetingUrl: "https://zoom.us/j/987654321",
        meetingId: "987-654-321",
        passcode: "Mentor2025",
        organizer: user?.name || "Current User",
        type: "mentorship",
      },
    ]
    setCalls(demoCalls)
    localStorage.setItem("metavertex_zoom_calls", JSON.stringify(demoCalls))
  }

  const generateMeetingDetails = () => {
    const meetingId = Math.floor(100000000 + Math.random() * 900000000).toString()
    const formattedId = `${meetingId.slice(0, 3)}-${meetingId.slice(3, 6)}-${meetingId.slice(6)}`
    const passcode = Math.random().toString(36).substring(2, 8).toUpperCase()
    return {
      meetingId: formattedId,
      meetingUrl: `https://zoom.us/j/${meetingId}`,
      passcode,
    }
  }

  const handleScheduleCall = async () => {
    if (!formData.title || !formData.date || !formData.time) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsScheduling(true)

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const meetingDetails = generateMeetingDetails()
    const newCall: ZoomCall = {
      id: Date.now().toString(),
      title: formData.title,
      scheduledAt: new Date(`${formData.date}T${formData.time}`),
      duration: formData.duration,
      participants: formData.participants
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      status: "scheduled",
      organizer: user?.name || "Current User",
      type: formData.type,
      ...meetingDetails,
    }

    const updatedCalls = [...calls, newCall]
    setCalls(updatedCalls)
    localStorage.setItem("metavertex_zoom_calls", JSON.stringify(updatedCalls))

    toast({
      title: "Meeting Scheduled Successfully! 🎉",
      description: `${formData.title} has been scheduled for ${new Date(`${formData.date}T${formData.time}`).toLocaleString()}`,
    })

    setShowScheduleForm(false)
    setIsScheduling(false)
    setFormData({
      title: "",
      date: "",
      time: "",
      duration: 60,
      participants: "",
      agenda: "",
      type: "general",
    })
  }

  const joinMeeting = (call: ZoomCall) => {
    // Update call status to in-progress
    const updatedCalls = calls.map((c) => (c.id === call.id ? { ...c, status: "in-progress" as const } : c))
    setCalls(updatedCalls)
    localStorage.setItem("metavertex_zoom_calls", JSON.stringify(updatedCalls))

    toast({
      title: "Joining Meeting",
      description: `Opening ${call.title} in Zoom...`,
    })

    // Simulate opening Zoom
    window.open(call.meetingUrl, "_blank")

    // After 3 seconds, mark as completed (for demo purposes)
    setTimeout(() => {
      const completedCalls = calls.map((c) => (c.id === call.id ? { ...c, status: "completed" as const } : c))
      setCalls(completedCalls)
      localStorage.setItem("metavertex_zoom_calls", JSON.stringify(completedCalls))
    }, 3000)
  }

  const createTestMeeting = () => {
    const testMeeting: ZoomCall = {
      id: `test-${Date.now()}`,
      title: "🧪 Test Meeting - Quick Demo",
      scheduledAt: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
      duration: 15,
      participants: ["test@example.com"],
      status: "scheduled",
      organizer: user?.name || "Test User",
      type: "general",
      ...generateMeetingDetails(),
    }

    const updatedCalls = [...calls, testMeeting]
    setCalls(updatedCalls)
    localStorage.setItem("metavertex_zoom_calls", JSON.stringify(updatedCalls))

    toast({
      title: "Test Meeting Created! 🚀",
      description: "A demo meeting has been scheduled for 5 minutes from now",
    })
  }

  const upcomingCalls = calls.filter((call) => call.status === "scheduled" && new Date(call.scheduledAt) > new Date())

  const activeCalls = calls.filter((call) => call.status === "in-progress")

  const pastCalls = calls.filter(
    (call) => call.status === "completed" || (call.status === "scheduled" && new Date(call.scheduledAt) < new Date()),
  )

  const getStatusColor = (status: ZoomCall["status"]) => {
    switch (status) {
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "in-progress":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-gray-100 text-gray-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTypeIcon = (type: ZoomCall["type"]) => {
    switch (type) {
      case "investor-founder":
        return "💼"
      case "mentorship":
        return "🎓"
      case "admin-review":
        return "⚙️"
      default:
        return "📹"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold">Zoom Integration</h2>
          <p className="text-muted-foreground">Manage your virtual meetings and calls</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={createTestMeeting}>
            <Plus className="w-4 h-4 mr-2" />
            Quick Test
          </Button>
          <Button onClick={() => setShowScheduleForm(true)}>
            <Video className="w-4 h-4 mr-2" />
            Schedule Call
          </Button>
        </div>
      </div>

      {/* Active Calls Alert */}
      {activeCalls.length > 0 && (
        <Alert className="border-green-200 bg-green-50">
          <Video className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            You have {activeCalls.length} active meeting{activeCalls.length > 1 ? "s" : ""} in progress
          </AlertDescription>
        </Alert>
      )}

      {showScheduleForm && (
        <Card className="border-2 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="w-5 h-5" />
              Schedule New Meeting
            </CardTitle>
            <CardDescription>Create a new Zoom meeting with participants</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="title">Meeting Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Product Demo with Investors"
                />
              </div>

              <div>
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div>
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: Number.parseInt(e.target.value) })}
                  min="15"
                  max="480"
                />
              </div>

              <div>
                <Label htmlFor="type">Meeting Type</Label>
                <select
                  id="type"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ZoomCall["type"] })}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="general">General Meeting</option>
                  <option value="investor-founder">Investor-Founder</option>
                  <option value="mentorship">Mentorship Session</option>
                  <option value="admin-review">Admin Review</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="participants">Participants (comma-separated emails)</Label>
                <Input
                  id="participants"
                  value={formData.participants}
                  onChange={(e) => setFormData({ ...formData, participants: e.target.value })}
                  placeholder="investor@example.com, founder@startup.com"
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="agenda">Meeting Agenda</Label>
                <Textarea
                  id="agenda"
                  value={formData.agenda}
                  onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                  placeholder="Discuss product roadmap, funding requirements, market strategy..."
                  rows={3}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={handleScheduleCall} disabled={isScheduling} className="flex-1">
                {isScheduling ? "Scheduling..." : "Schedule Meeting"}
              </Button>
              <Button variant="outline" onClick={() => setShowScheduleForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Upcoming Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Upcoming Calls
              </span>
              <Badge variant="secondary">{upcomingCalls.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingCalls.length === 0 ? (
              <div className="text-center py-8">
                <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No upcoming calls scheduled</p>
                <Button variant="outline" size="sm" className="mt-2" onClick={() => setShowScheduleForm(true)}>
                  Schedule Your First Call
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingCalls.map((call) => (
                  <div key={call.id} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold flex items-center gap-2">
                          <span>{getTypeIcon(call.type)}</span>
                          {call.title}
                        </h4>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {call.scheduledAt.toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {call.scheduledAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {call.participants.length} participants
                          </span>
                        </div>
                        <div className="mt-2">
                          <Badge className={getStatusColor(call.status)}>{call.status}</Badge>
                        </div>
                        {call.meetingId && (
                          <div className="mt-2 text-xs text-muted-foreground">
                            Meeting ID: {call.meetingId} | Passcode: {call.passcode}
                          </div>
                        )}
                      </div>
                      <Button size="sm" onClick={() => joinMeeting(call)} className="ml-4">
                        <Video className="w-3 h-3 mr-1" />
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Past Calls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Recent Calls
              </span>
              <Badge variant="secondary">{pastCalls.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {pastCalls.length === 0 ? (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No past calls yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pastCalls.slice(0, 5).map((call) => (
                  <div key={call.id} className="border rounded-lg p-3">
                    <h4 className="font-semibold flex items-center gap-2">
                      <span>{getTypeIcon(call.type)}</span>
                      {call.title}
                    </h4>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {call.scheduledAt.toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {call.duration}min
                      </span>
                      <Badge className={getStatusColor(call.status)} variant="outline">
                        {call.status}
                      </Badge>
                    </div>
                  </div>
                ))}
                {pastCalls.length > 5 && (
                  <p className="text-sm text-muted-foreground text-center">And {pastCalls.length - 5} more calls...</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Meeting Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Meeting Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{calls.length}</div>
              <div className="text-sm text-muted-foreground">Total Meetings</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{upcomingCalls.length}</div>
              <div className="text-sm text-muted-foreground">Upcoming</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{activeCalls.length}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-600">
                {calls.filter((c) => c.status === "completed").length}
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
