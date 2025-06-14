"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { User, Building, MapPin, Calendar, Edit, Save, X } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    industry: "",
    experience: "",
    location: "",
    bio: "",
  })

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        company: user.company || "",
        industry: user.basicInfo?.industry || "",
        experience: user.basicInfo?.experience || "",
        location: user.basicInfo?.location || "",
        bio: user.basicInfo?.bio || "",
      })
    }
  }, [user])

  const handleSave = () => {
    try {
      const users = storage.getUsers()
      const updatedUsers = users.map((u) =>
        u.id === user?.id
          ? {
              ...u,
              name: profileData.name,
              phone: profileData.phone,
              company: profileData.company,
              basicInfo: {
                industry: profileData.industry,
                experience: profileData.experience,
                location: profileData.location,
                bio: profileData.bio,
              },
            }
          : u,
      )
      storage.setUsers(updatedUsers)

      // Update current user in localStorage
      const updatedUser = updatedUsers.find((u) => u.id === user?.id)
      if (updatedUser) {
        localStorage.setItem("metavertex_current_user", JSON.stringify(updatedUser))
      }

      setIsEditing(false)
      toast({
        title: "✅ Profile Updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    if (user) {
      setProfileData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        company: user.company || "",
        industry: user.basicInfo?.industry || "",
        experience: user.basicInfo?.experience || "",
        location: user.basicInfo?.location || "",
        bio: user.basicInfo?.bio || "",
      })
    }
    setIsEditing(false)
  }

  const getUserTypeColor = () => {
    switch (user?.userType) {
      case "superadmin":
        return "bg-purple-100 text-purple-800"
      case "founder":
        return "bg-blue-100 text-blue-800"
      case "investor":
        return "bg-green-100 text-green-800"
      case "organization":
        return "bg-orange-100 text-orange-800"
      case "mentor":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
        </div>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Profile Overview */}
        <Card className="md:col-span-1">
          <CardHeader className="text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
              {user?.name?.charAt(0) || "U"}
            </div>
            <CardTitle>{user?.name}</CardTitle>
            <CardDescription>{user?.email}</CardDescription>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className={getUserTypeColor()}>
                {user?.userType?.charAt(0).toUpperCase() + user?.userType?.slice(1)}
              </Badge>
              <Badge variant="outline">{user?.uniqueId}</Badge>
              {user?.isActive && <Badge className="bg-green-600">Online</Badge>}
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                Joined {new Date(user?.createdAt || "").toLocaleDateString()}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                Last active {new Date(user?.lastActive || "").toLocaleDateString()}
              </div>
              {user?.company && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="w-4 h-4" />
                  {user.company}
                </div>
              )}
              {user?.basicInfo?.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {user.basicInfo.location}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Profile Details */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Update your personal and professional information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  disabled={true} // Email should not be editable
                  className="bg-gray-50"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  value={profileData.company}
                  onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={profileData.industry}
                  onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
                  disabled={!isEditing}
                  placeholder="e.g., Technology, Healthcare, Finance"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={profileData.experience}
                  onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                  disabled={!isEditing}
                  placeholder="e.g., 5+ years, 10+ years"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={profileData.location}
                onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                disabled={!isEditing}
                placeholder="e.g., London, UK"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                disabled={!isEditing}
                placeholder="Tell us about yourself, your interests, and your goals..."
                rows={4}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Statistics */}
      <Card>
        <CardHeader>
          <CardTitle>Account Statistics</CardTitle>
          <CardDescription>Your activity and engagement metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {user?.userType === "founder" ? "3" : user?.userType === "investor" ? "12" : "0"}
              </div>
              <div className="text-sm text-muted-foreground">
                {user?.userType === "founder" ? "Products" : user?.userType === "investor" ? "Interests" : "Items"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {user?.userType === "founder" ? "245" : user?.userType === "investor" ? "89" : "0"}
              </div>
              <div className="text-sm text-muted-foreground">
                {user?.userType === "founder"
                  ? "Total Views"
                  : user?.userType === "investor"
                    ? "Profile Views"
                    : "Views"}
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {user?.userType === "founder" ? "8" : user?.userType === "investor" ? "5" : "0"}
              </div>
              <div className="text-sm text-muted-foreground">Active Requests</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">92%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
