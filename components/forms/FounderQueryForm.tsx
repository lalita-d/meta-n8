"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/AuthContext"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { FileText, Send, X } from "lucide-react"

interface FounderQueryFormProps {
  product: any
  investor: any
  onClose: () => void
}

export function FounderQueryForm({ product, investor, onClose }: FounderQueryFormProps) {
  const { user } = useAuth()
  const { toast } = useToast()
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([])
  const [specificQuestions, setSpecificQuestions] = useState("")

  const investorApprovedQueries = [
    "Clarify Investor Requirements",
    "Investment Criteria",
    "Value-Add Beyond Funding",
    "Time Horizon",
    "Portfolio Companies",
    "Decision Process",
    "Market Insights",
    "Next Steps",
  ]

  const handleQuestionToggle = (question: string) => {
    setSelectedQuestions((prev) => (prev.includes(question) ? prev.filter((q) => q !== question) : [...prev, question]))
  }

  const handleSubmit = () => {
    if (selectedQuestions.length === 0) {
      toast({
        title: "No Questions Selected",
        description: "Please select at least one question to ask the investor",
        variant: "destructive",
      })
      return
    }

    const newQuery = {
      id: Date.now().toString(),
      founderId: user?.id || "",
      productId: product.id,
      investorId: investor.id,
      questions: selectedQuestions,
      specificQuestions,
      status: "pending" as const,
      createdAt: new Date(),
    }

    const existingQueries = storage.getFounderQueries()
    storage.setFounderQueries([...existingQueries, newQuery])

    toast({
      title: "✅ Questions Submitted",
      description: "Your questions have been sent to the admin for review and approval",
    })

    onClose()
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-6 w-6 text-blue-600" />
              Founders Form
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
        {/* Section 1: Investor's Approved Queries (Read-Only) */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Section 1: Investor's Approved Queries (Read-Only)</h3>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="space-y-2">
              <p>
                <strong>Primary Intent:</strong> <Badge variant="outline">Equity Investment</Badge>
              </p>
              <p>
                <strong>Areas of Interest:</strong> Financials & Valuation, Tech & IP
              </p>
              <p>
                <strong>Specific Questions:</strong> What are your current burn rate and IP protection strategy?
              </p>
            </div>
            <p className="text-xs text-blue-600 mt-2 italic">
              Note: Some parts may have been filtered by Admin for privacy.
            </p>
          </div>
        </div>

        {/* Section 2: Your Questions for the Investor */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Section 2: Your Questions for the Investor</h3>
          <div className="grid grid-cols-2 gap-4">
            {investorApprovedQueries.map((question) => (
              <div key={question} className="flex items-center space-x-2">
                <Checkbox
                  id={question}
                  checked={selectedQuestions.includes(question)}
                  onCheckedChange={() => handleQuestionToggle(question)}
                />
                <Label htmlFor={question} className="text-sm cursor-pointer">
                  {question}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Specific Questions / Clarifications */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Section 3: Specific Questions / Clarifications</h3>
          <Textarea
            placeholder="e.g., What is your typical investment ticket size?"
            value={specificQuestions}
            onChange={(e) => setSpecificQuestions(e.target.value)}
            rows={4}
          />
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">
              ⚠️ WARNING: Do not share personal contact info here. It will be filtered.
            </p>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
          <Button onClick={handleSubmit} className="flex-1">
            <Send className="w-4 h-4 mr-2" />
            Submit Questions
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
