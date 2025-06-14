"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  File,
  FileText,
  ImageIcon,
  Download,
  Eye,
  Shield,
  Calendar,
  User,
  AlertTriangle,
  CheckCircle,
} from "lucide-react"
import type { UploadedFile } from "@/components/ui/file-upload"

interface DocumentViewerProps {
  documents: UploadedFile[]
  title?: string
  showUploader?: boolean
  readOnly?: boolean
}

interface DocumentMetadata {
  uploadedBy: string
  uploadedAt: string
  lastModified: string
  version: string
  accessLevel: "public" | "restricted" | "confidential"
  downloadCount: number
}

const mockMetadata: Record<string, DocumentMetadata> = {
  "1": {
    uploadedBy: "John Smith (FND-1234)",
    uploadedAt: "2024-01-15 14:30",
    lastModified: "2024-01-15 14:30",
    version: "1.0",
    accessLevel: "restricted",
    downloadCount: 5,
  },
  "2": {
    uploadedBy: "Sarah Johnson (INV-5678)",
    uploadedAt: "2024-01-16 09:15",
    lastModified: "2024-01-16 09:15",
    version: "1.0",
    accessLevel: "confidential",
    downloadCount: 2,
  },
}

export function DocumentViewer({
  documents,
  title = "Documents",
  showUploader = false,
  readOnly = false,
}: DocumentViewerProps) {
  const [selectedDocument, setSelectedDocument] = useState<UploadedFile | null>(null)

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return ImageIcon
    if (type.includes("pdf")) return FileText
    if (type.includes("document") || type.includes("text")) return FileText
    return File
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "public":
        return "bg-green-100 text-green-800"
      case "restricted":
        return "bg-yellow-100 text-yellow-800"
      case "confidential":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleDownload = (document: UploadedFile) => {
    if (document.url) {
      const a = document.createElement("a")
      a.href = document.url
      a.download = document.name
      a.click()

      // In real app, this would update download count via API
      console.log(`Downloaded: ${document.name}`)
    }
  }

  const handlePreview = (document: UploadedFile) => {
    setSelectedDocument(document)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">{title}</h3>
        <Badge variant="outline">{documents.length} Documents</Badge>
      </div>

      {documents.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Documents</h3>
            <p className="text-muted-foreground">
              {showUploader ? "Upload documents to get started." : "No documents have been shared yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {documents.map((document) => {
            const FileIcon = getFileIcon(document.type)
            const metadata = mockMetadata[document.id] || {
              uploadedBy: "Unknown User",
              uploadedAt: "Unknown",
              lastModified: "Unknown",
              version: "1.0",
              accessLevel: "restricted" as const,
              downloadCount: 0,
            }

            return (
              <Card key={document.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <FileIcon className="h-10 w-10 text-muted-foreground" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium truncate">{document.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-muted-foreground">{formatFileSize(document.size)}</span>
                            <Badge variant="secondary" className={getAccessLevelColor(metadata.accessLevel)}>
                              {metadata.accessLevel}
                            </Badge>
                            {document.securityScan === "clean" && (
                              <Badge variant="default" className="bg-green-600">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                            {document.securityScan === "threat" && (
                              <Badge variant="destructive">
                                <AlertTriangle className="mr-1 h-3 w-3" />
                                Threat
                              </Badge>
                            )}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline" onClick={() => handlePreview(document)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[80vh]">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <FileIcon className="h-5 w-5" />
                                  {document.name}
                                </DialogTitle>
                              </DialogHeader>
                              <ScrollArea className="h-[60vh] w-full">
                                <div className="p-4">
                                  {document.type.startsWith("image/") ? (
                                    <img
                                      src={document.url || "/placeholder.svg"}
                                      alt={document.name}
                                      className="max-w-full h-auto"
                                    />
                                  ) : (
                                    <div className="text-center py-12">
                                      <FileIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                                      <p className="text-muted-foreground">Preview not available for this file type.</p>
                                      <Button className="mt-4" onClick={() => handleDownload(document)}>
                                        <Download className="mr-2 h-4 w-4" />
                                        Download to View
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </ScrollArea>
                            </DialogContent>
                          </Dialog>

                          <Button size="sm" variant="outline" onClick={() => handleDownload(document)}>
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <User className="h-3 w-3" />
                          <span>{metadata.uploadedBy}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{metadata.uploadedAt}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="h-3 w-3" />
                          <span>{metadata.downloadCount} downloads</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-900">Document Security</p>
              <ul className="mt-1 text-blue-700 space-y-1">
                <li>• All documents are encrypted and virus-scanned</li>
                <li>• Access is logged and monitored for security</li>
                <li>• Documents are automatically deleted after 90 days of inactivity</li>
                <li>• Only authorized users can access confidential documents</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
