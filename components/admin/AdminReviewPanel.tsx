"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useRealTimeData } from "@/hooks/useRealTimeData"
import { storage } from "@/lib/storage"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

export function AdminReviewPanel() {
  const { interests, products, users } = useRealTimeData()
  const { toast } = useToast()
  const [selectedInterest, setSelectedInterest] = useState<any>(null)
  const [editedIntent, setEditedIntent] = useState("")
  const [editedAreas, setEditedAreas] = useState<string[]>([])
  const [adminText, setAdminText] = useState("")

  const pendingInterests = interests.filter((interest) => interest.status === "pending")

  const handleSelectInterest = (interest: any) => {
    setSelectedInterest(interest)
    setEditedIntent(interest.primaryIntent)
    setEditedAreas(interest.areasOfInterest || [])
    setAdminText("")
  }

  const handleApprove = () => {
    if (!selectedInterest) return

    const updatedInterests = interests.map((interest) =>
      interest.id === selectedInterest.id ? { ...interest, status: "approved" as const } : interest,
    )
    storage.setInterests(updatedInterests)

    toast({
      title: "✅ Interest Approved",
      description: "Investor queries have been approved and sent to founder",
    })

    setSelectedInterest(null)
  }

  const handleReject = () => {
    if (!selectedInterest) return

    const updatedInterests = interests.map((interest) =>
      interest.id === selectedInterest.id ? { ...interest, status: "rejected" as const } : interest,
    )
    storage.setInterests(updatedInterests)

    toast({
      title: "❌ Interest Rejected",
      description: "Investor queries have been rejected",
    })

    setSelectedInterest(null)
  }

  const getProduct = (productId: string) => products.find((p) => p.id === productId)
  const getUser = (userId: string) => users.find((u) => u.id === userId)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
            Review & Approve Queries
          </CardTitle>
          <CardDescription>Review investor interests and founder queries before approval</CardDescription>
        </CardHeader>
        <CardContent>
          {pendingInterests.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All Caught Up!</h3>
              <p className="text-muted-foreground">No pending reviews at the moment</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {pendingInterests.map((interest) => {
                const product = getProduct(interest.productId)
                const investor = getUser(interest.investorId)

                return (
                  <Card
                    key={interest.id}
                    className={`cursor-pointer transition-colors ${
                      selectedInterest?.id === interest.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleSelectInterest(interest)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Interest ID: INT-{interest.id.slice(-6)}</h4>
                          <p className="text-sm text-muted-foreground">
                            Product: {product?.productName} | Investor: {investor?.email} | Founder:{" "}
                            {getUser(product?.founderId || "")?.email}
                          </p>
                          <Badge variant="secondary" className="mt-2">
                            Current Status: investor_queries_submitted
                          </Badge>
                        </div>
                        <Badge variant="outline">Pending Review</Badge>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Review Panel */}
      {selectedInterest && (
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Investor's Submitted Queries */}
          <Card>
            <CardHeader>
              <CardTitle>Investor's Submitted Queries</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Primary Intent (Editable):</Label>
                <RadioGroup value={editedIntent} onValueChange={setEditedIntent} className="mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Equity Investment" id="equity" />
                    <Label htmlFor="equity">Equity Investment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Debt Funding" id="debt" />
                    <Label htmlFor="debt">Debt Funding</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other" />
                    <Label htmlFor="other">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label className="text-sm font-medium">Areas of Interest (Editable):</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {["Financials & Valuation", "Technology & IP", "Customer Acquisition"].map((area) => (
                    <div key={area} className="flex items-center space-x-2">
                      <Checkbox
                        id={area}
                        checked={editedAreas.includes(area)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setEditedAreas([...editedAreas, area])
                          } else {
                            setEditedAreas(editedAreas.filter((a) => a !== area))
                          }
                        }}
                      />
                      <Label htmlFor={area} className="text-xs">
                        {area}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Original Question:</Label>
                <div className="bg-gray-100 p-3 rounded mt-2">
                  <p className="text-sm">{selectedInterest.specificQuestions || "Financial projections and IP"}</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Admin-Approved Text:</Label>
                <Textarea
                  placeholder="Edit or filter the question if needed"
                  value={adminText}
                  onChange={(e) => setAdminText(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">
                  ⚠️ DANGER: Potential contact info detected! Please remove before approving.
                </p>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleApprove} className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Investor Queries & Send to Founder
                </Button>
                <Button variant="destructive" onClick={handleReject}>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Investor Queries / Request Revision
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Founder's Submitted Questions */}
          <Card>
            <CardHeader>
              <CardTitle>Founder's Submitted Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium">Topics Selected:</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge variant="outline">Investment Criteria</Badge>
                  <Badge variant="outline">Next Steps</Badge>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Original Question:</Label>
                <div className="bg-gray-100 p-3 rounded mt-2">
                  <p className="text-sm">Can you explain your due diligence process?</p>
                </div>
              </div>

              <div>
                <Label className="text-sm font-medium">Admin-Approved Text:</Label>
                <Textarea placeholder="Edit or clarify as needed" rows={3} />
              </div>

              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">
                  ⚠️ DANGER: Potential contact info detected! Please remove before approving.
                </p>
              </div>

              <div className="flex gap-2">
                <Button className="bg-green-600 hover:bg-green-700">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Founder Questions & Send to Investor
                </Button>
                <Button variant="destructive">
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Founder Questions / Request Revision
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
