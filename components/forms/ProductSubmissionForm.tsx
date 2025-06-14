"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUpload, type UploadedFile } from "@/components/ui/file-upload"
import { useToast } from "@/hooks/use-toast"
import { Lightbulb, FileText, DollarSign, Users, BarChart3, Shield } from "lucide-react"

interface ProductFormData {
  // Basic Information
  productName: string
  category: string
  stage: string
  fundingRequired: string

  // Detailed Description
  problemStatement: string
  solutionDescription: string
  marketSize: string
  uniqueValue: string

  // Business Information
  businessModel: string
  revenueModel: string
  targetMarket: string
  competitiveAdvantage: string

  // Team Information
  teamSize: string
  keyTeamMembers: string
  advisors: string

  // Financial Information
  currentRevenue: string
  projectedRevenue: string
  fundingHistory: string
  useOfFunds: string

  // Technical Information
  technologyStack: string
  intellectualProperty: string
  developmentStage: string

  // Documents
  documents: UploadedFile[]
}

const initialFormData: ProductFormData = {
  productName: "",
  category: "",
  stage: "",
  fundingRequired: "",
  problemStatement: "",
  solutionDescription: "",
  marketSize: "",
  uniqueValue: "",
  businessModel: "",
  revenueModel: "",
  targetMarket: "",
  competitiveAdvantage: "",
  teamSize: "",
  keyTeamMembers: "",
  advisors: "",
  currentRevenue: "",
  projectedRevenue: "",
  fundingHistory: "",
  useOfFunds: "",
  technologyStack: "",
  intellectualProperty: "",
  developmentStage: "",
  documents: [],
}

export function ProductSubmissionForm() {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTab, setCurrentTab] = useState("basic")
  const { toast } = useToast()

  const handleInputChange = (field: keyof ProductFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleDocumentsChange = (files: UploadedFile[]) => {
    setFormData((prev) => ({ ...prev, documents: files }))
  }

  const validateForm = (): string[] => {
    const errors: string[] = []

    if (!formData.productName.trim()) errors.push("Product name is required")
    if (!formData.category) errors.push("Category is required")
    if (!formData.stage) errors.push("Development stage is required")
    if (!formData.fundingRequired) errors.push("Funding requirement is required")
    if (!formData.problemStatement.trim()) errors.push("Problem statement is required")
    if (!formData.solutionDescription.trim()) errors.push("Solution description is required")

    return errors
  }

  const handleSubmit = async () => {
    const errors = validateForm()
    if (errors.length > 0) {
      toast({
        title: "Validation Error",
        description: errors.join(", "),
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // In real app, this would send data to backend
      console.log("Submitting product:", formData)

      toast({
        title: "Product Submitted Successfully!",
        description: "Your product has been submitted for admin review. You'll be notified once it's approved.",
      })

      // Reset form
      setFormData(initialFormData)
      setCurrentTab("basic")
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "An error occurred while submitting your product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const tabs = [
    { id: "basic", label: "Basic Info", icon: Lightbulb },
    { id: "business", label: "Business", icon: BarChart3 },
    { id: "team", label: "Team", icon: Users },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "technical", label: "Technical", icon: Shield },
    { id: "documents", label: "Documents", icon: FileText },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-purple-600" />
            Submit New Product
          </CardTitle>
          <CardDescription>
            Provide detailed information about your product to connect with potential investors and partners.
          </CardDescription>
        </CardHeader>
      </Card>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          {tabs.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-1">
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Tell us about your product and its current stage</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="productName">Product Name *</Label>
                  <Input
                    id="productName"
                    placeholder="Enter your product name"
                    value={formData.productName}
                    onChange={(e) => handleInputChange("productName", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agritech">AgriTech</SelectItem>
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="edutech">EduTech</SelectItem>
                      <SelectItem value="medtech">MedTech</SelectItem>
                      <SelectItem value="healthtech">HealthTech</SelectItem>
                      <SelectItem value="greentech">GreenTech</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stage">Development Stage *</Label>
                  <Select onValueChange={(value) => handleInputChange("stage", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ideation">Ideation</SelectItem>
                      <SelectItem value="prototype">Prototype</SelectItem>
                      <SelectItem value="mvp">MVP</SelectItem>
                      <SelectItem value="beta">Beta Testing</SelectItem>
                      <SelectItem value="launched">Launched</SelectItem>
                      <SelectItem value="scaling">Scaling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundingRequired">Funding Required *</Label>
                  <Select onValueChange={(value) => handleInputChange("fundingRequired", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select funding range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-50k">£0 - £50K</SelectItem>
                      <SelectItem value="50k-250k">£50K - £250K</SelectItem>
                      <SelectItem value="250k-1m">£250K - £1M</SelectItem>
                      <SelectItem value="1m-5m">£1M - £5M</SelectItem>
                      <SelectItem value="5m-10m">£5M - £10M</SelectItem>
                      <SelectItem value="10m+">£10M+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="problemStatement">Problem Statement *</Label>
                <Textarea
                  id="problemStatement"
                  placeholder="Describe the problem your product solves..."
                  value={formData.problemStatement}
                  onChange={(e) => handleInputChange("problemStatement", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="solutionDescription">Solution Description *</Label>
                <Textarea
                  id="solutionDescription"
                  placeholder="Explain how your product solves the problem..."
                  value={formData.solutionDescription}
                  onChange={(e) => handleInputChange("solutionDescription", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marketSize">Market Size</Label>
                  <Input
                    id="marketSize"
                    placeholder="e.g., £10B TAM, £1B SAM"
                    value={formData.marketSize}
                    onChange={(e) => handleInputChange("marketSize", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="uniqueValue">Unique Value Proposition</Label>
                  <Input
                    id="uniqueValue"
                    placeholder="What makes you different?"
                    value={formData.uniqueValue}
                    onChange={(e) => handleInputChange("uniqueValue", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Business Model</CardTitle>
              <CardDescription>Describe your business strategy and market approach</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="businessModel">Business Model</Label>
                  <Select onValueChange={(value) => handleInputChange("businessModel", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business model" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="b2b">B2B</SelectItem>
                      <SelectItem value="b2c">B2C</SelectItem>
                      <SelectItem value="b2b2c">B2B2C</SelectItem>
                      <SelectItem value="marketplace">Marketplace</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                      <SelectItem value="freemium">Freemium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="revenueModel">Revenue Model</Label>
                  <Input
                    id="revenueModel"
                    placeholder="e.g., Subscription, One-time, Commission"
                    value={formData.revenueModel}
                    onChange={(e) => handleInputChange("revenueModel", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="targetMarket">Target Market</Label>
                <Textarea
                  id="targetMarket"
                  placeholder="Describe your target customers and market segments..."
                  value={formData.targetMarket}
                  onChange={(e) => handleInputChange("targetMarket", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="competitiveAdvantage">Competitive Advantage</Label>
                <Textarea
                  id="competitiveAdvantage"
                  placeholder="What gives you an edge over competitors?"
                  value={formData.competitiveAdvantage}
                  onChange={(e) => handleInputChange("competitiveAdvantage", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Team Information</CardTitle>
              <CardDescription>Tell us about your team and key personnel</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="teamSize">Team Size</Label>
                <Select onValueChange={(value) => handleInputChange("teamSize", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo Founder</SelectItem>
                    <SelectItem value="2-5">2-5 people</SelectItem>
                    <SelectItem value="6-10">6-10 people</SelectItem>
                    <SelectItem value="11-25">11-25 people</SelectItem>
                    <SelectItem value="26-50">26-50 people</SelectItem>
                    <SelectItem value="50+">50+ people</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="keyTeamMembers">Key Team Members</Label>
                <Textarea
                  id="keyTeamMembers"
                  placeholder="List key team members and their roles/experience..."
                  value={formData.keyTeamMembers}
                  onChange={(e) => handleInputChange("keyTeamMembers", e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="advisors">Advisors & Board Members</Label>
                <Textarea
                  id="advisors"
                  placeholder="List advisors, board members, and their expertise..."
                  value={formData.advisors}
                  onChange={(e) => handleInputChange("advisors", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Information</CardTitle>
              <CardDescription>Provide financial details and projections</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currentRevenue">Current Revenue (Annual)</Label>
                  <Input
                    id="currentRevenue"
                    placeholder="e.g., £100K, Pre-revenue"
                    value={formData.currentRevenue}
                    onChange={(e) => handleInputChange("currentRevenue", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectedRevenue">Projected Revenue (3 years)</Label>
                  <Input
                    id="projectedRevenue"
                    placeholder="e.g., £5M"
                    value={formData.projectedRevenue}
                    onChange={(e) => handleInputChange("projectedRevenue", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fundingHistory">Previous Funding</Label>
                <Textarea
                  id="fundingHistory"
                  placeholder="Describe any previous funding rounds, grants, or investments..."
                  value={formData.fundingHistory}
                  onChange={(e) => handleInputChange("fundingHistory", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="useOfFunds">Use of Funds</Label>
                <Textarea
                  id="useOfFunds"
                  placeholder="How will you use the funding? (e.g., 40% R&D, 30% Marketing, 20% Hiring, 10% Operations)"
                  value={formData.useOfFunds}
                  onChange={(e) => handleInputChange("useOfFunds", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Technical Information</CardTitle>
              <CardDescription>Provide technical details about your product</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technologyStack">Technology Stack</Label>
                <Textarea
                  id="technologyStack"
                  placeholder="List the technologies, frameworks, and tools you use..."
                  value={formData.technologyStack}
                  onChange={(e) => handleInputChange("technologyStack", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="intellectualProperty">Intellectual Property</Label>
                <Textarea
                  id="intellectualProperty"
                  placeholder="Describe any patents, trademarks, or proprietary technology..."
                  value={formData.intellectualProperty}
                  onChange={(e) => handleInputChange("intellectualProperty", e.target.value)}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="developmentStage">Development Stage Details</Label>
                <Textarea
                  id="developmentStage"
                  placeholder="Provide more details about your current development stage..."
                  value={formData.developmentStage}
                  onChange={(e) => handleInputChange("developmentStage", e.target.value)}
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>
                Upload relevant documents to support your product submission. All files are securely scanned and
                encrypted.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onFilesChange={handleDocumentsChange}
                maxFiles={10}
                maxSize={10}
                existingFiles={formData.documents}
              />

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Recommended Documents:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Business Plan or Executive Summary</li>
                  <li>• Financial Projections and Models</li>
                  <li>• Product Demo or Screenshots</li>
                  <li>• Market Research and Analysis</li>
                  <li>• Technical Architecture Diagrams</li>
                  <li>• Team CVs and Profiles</li>
                  <li>• Legal Documents (if applicable)</li>
                  <li>• Customer Testimonials or Case Studies</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Navigation and Submit */}
        <div className="flex justify-between items-center pt-6 border-t">
          <div className="flex space-x-2">
            {tabs.map((tab, index) => (
              <Button
                key={tab.id}
                variant={currentTab === tab.id ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentTab(tab.id)}
                disabled={isSubmitting}
              >
                {index + 1}
              </Button>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                const currentIndex = tabs.findIndex((tab) => tab.id === currentTab)
                if (currentIndex > 0) {
                  setCurrentTab(tabs[currentIndex - 1].id)
                }
              }}
              disabled={currentTab === "basic" || isSubmitting}
            >
              Previous
            </Button>

            {currentTab === "documents" ? (
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isSubmitting ? "Submitting..." : "Submit Product"}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  const currentIndex = tabs.findIndex((tab) => tab.id === currentTab)
                  if (currentIndex < tabs.length - 1) {
                    setCurrentTab(tabs[currentIndex + 1].id)
                  }
                }}
                disabled={isSubmitting}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      </Tabs>
    </div>
  )
}
