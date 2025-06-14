"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { wsService } from "@/lib/websocket"
import { Heart, Send, X } from "lucide-react"

interface InvestorInterestFormProps {
  product: any
  onClose: () => void
}

export function InvestorInterestForm({ product, onClose }: InvestorInterestFormProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    primaryIntent: "",
    areasOfInterest: [] as string[],
    specificQuestions: "",
  })

  const primaryIntentOptions = [
    { value: "equity-investment", label: "Equity Investment" },
    { value: "debt-funding", label: "Debt Funding" },
    { value: "strategic-partnership", label: "Strategic Partnership" },
    { value: "clinical-trials", label: "Clinical Trials" },
    { value: "technology-licensing", label: "Technology Licensing" },
    { value: "acquisition-interest", label: "Acquisition Interest" },
    { value: "mentorship-advisory", label: "Mentorship/Advisory" },
  ]

  const areasOfInterestOptions = [
    "Financials & Valuation",
    "Market Opportunity & Size",
    "Team & Experience",
    "Technology & IP",
    "Product Roadmap",
    "Customer Acquisition",
    "Regulatory & Legal",
    "Exit Strategy",
    "Sustainability & ESG",
    "Partnerships & Channels",
    "Competitor Analysis",
  ]

  const handleAreaOfInterestChange = (area: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        areasOfInterest: [...formData.areasOfInterest, area],
      })
    } else {
      setFormData({
        ...formData,
        areasOfInterest: formData.areasOfInterest.filter((a) => a !== area),
      })
    }
  }

  const handleSubmit = () => {
    if (!formData.primaryIntent || formData.areasOfInterest.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Create new interest submission
    const newInterest = {
      id: Date.now().toString(),
      investorId: user?.id || "",
      productId: product.id,
      primaryIntent: formData.primaryIntent,
      areasOfInterest: formData.areasOfInterest,
      specificQuestions: formData.specificQuestions,
      message: `Primary Intent: ${formData.primaryIntent}. Areas of Interest: ${formData.areasOfInterest.join(", ")}`,
      createdAt: new Date(),
      status: "pending" as const,
    }

    // Save to storage
    const existingInterests = storage.getInterests()
    storage.setInterests([...existingInterests, newInterest])

    // Send real-time notification to admin
    wsService.send("new-investor-interest", {
      interest: newInterest,
      investor: {
        id: user?.id,
        uniqueId: user?.uniqueId,
        userType: user?.userType,
      },
      product: {
        id: product.id,
        name: product.productName,
        category: product.category,
      },
      timestamp: new Date(),
    })

    toast({
      title: "✅ Interest Submitted",
      description: "Your detailed interest has been sent to admin for review. You'll be notified once approved.",
    })

    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6 text-red-600" />
                Submit Detailed Queries & Investment Intent
              </CardTitle>
              <CardDescription>
                Current Product: {product.productName} ({product.category})
              </CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Section 1: Primary Intent */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Section 1: Your Primary Intent</h3>
            <p className="text-sm text-muted-foreground">
              Please choose one option that best describes your interest in this product:
            </p>
            <RadioGroup
              value={formData.primaryIntent}
              onValueChange={(value) => setFormData({ ...formData, primaryIntent: value })}
            >
              {primaryIntentOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value}>{option.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Section 2: Key Areas of Interest */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Section 2: Key Areas of Interest / Questions</h3>
            <p className="text-sm text-muted-foreground">Select all that apply:</p>
            <div className="grid grid-cols-2 gap-4">
              {areasOfInterestOptions.map((area) => (
                <div key={area} className="flex items-center space-x-2">
                  <Checkbox
                    id={area}
                    checked={formData.areasOfInterest.includes(area)}
                    onCheckedChange={(checked) => handleAreaOfInterestChange(area, checked as boolean)}
                  />
                  <Label htmlFor={area} className="text-sm">
                    {area}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Specific Questions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Section 3: Specific Questions / Requirements</h3>
            <Textarea
              placeholder="e.g., What are your financial projections for the next 3 years?"
              value={formData.specificQuestions}
              onChange={(e) => setFormData({ ...formData, specificQuestions: e.target.value })}
              rows={4}
            />
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">
                ⚠️ WARNING: Do not share personal contact info here. It will be filtered by admin.
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              <Send className="w-4 h-4 mr-2" />
              Submit Queries
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
