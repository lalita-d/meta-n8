"use client"

import { DashboardLayout } from "@/components/layout/DashboardLayout"
import { ProductSubmissionForm } from "@/components/forms/ProductSubmissionForm"

export default function NewProductPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Submit New Product</h1>
          <p className="text-muted-foreground">
            Create a comprehensive product submission to connect with potential investors and partners.
          </p>
        </div>

        <ProductSubmissionForm />
      </div>
    </DashboardLayout>
  )
}
