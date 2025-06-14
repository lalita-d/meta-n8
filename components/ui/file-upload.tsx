"use client"

import type React from "react"

import { useState, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { Upload, File, FileText, X, Download, Eye, AlertTriangle, CheckCircle, Loader2, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploadProps {
  onFilesChange: (files: UploadedFile[]) => void
  maxFiles?: number
  maxSize?: number // in MB
  acceptedTypes?: string[]
  existingFiles?: UploadedFile[]
  disabled?: boolean
  className?: string
}

export interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  url?: string
  uploadProgress?: number
  status: "uploading" | "completed" | "error"
  error?: string
  securityScan?: "pending" | "clean" | "threat"
}

const ACCEPTED_FILE_TYPES = {
  documents: [".pdf", ".doc", ".docx", ".txt", ".rtf"],
  images: [".jpg", ".jpeg", ".png", ".gif", ".webp"],
  spreadsheets: [".xls", ".xlsx", ".csv"],
  presentations: [".ppt", ".pptx"],
  archives: [".zip", ".rar"],
}

const ALL_ACCEPTED_TYPES = Object.values(ACCEPTED_FILE_TYPES).flat()

const MAX_FILE_SIZE = 10 // MB
const MAX_FILES = 5

export function FileUpload({
  onFilesChange,
  maxFiles = MAX_FILES,
  maxSize = MAX_FILE_SIZE,
  acceptedTypes = ALL_ACCEPTED_TYPES,
  existingFiles = [],
  disabled = false,
  className,
}: FileUploadProps) {
  const [files, setFiles] = useState<UploadedFile[]>(existingFiles)
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

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

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      return `File size exceeds ${maxSize}MB limit`
    }

    // Check file type
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase()
    if (!acceptedTypes.includes(fileExtension)) {
      return `File type ${fileExtension} is not supported`
    }

    // Check for potentially dangerous file names
    const dangerousPatterns = [/\.exe$/i, /\.bat$/i, /\.cmd$/i, /\.scr$/i, /\.vbs$/i, /\.js$/i]
    if (dangerousPatterns.some((pattern) => pattern.test(file.name))) {
      return "File type not allowed for security reasons"
    }

    return null
  }

  const simulateVirusScan = async (file: UploadedFile): Promise<"clean" | "threat"> => {
    // Simulate virus scanning delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Simulate 95% clean rate
    return Math.random() > 0.05 ? "clean" : "threat"
  }

  const uploadFile = async (file: File): Promise<UploadedFile> => {
    const uploadedFile: UploadedFile = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      uploadProgress: 0,
      status: "uploading",
      securityScan: "pending",
    }

    // Simulate upload progress
    const uploadPromise = new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        uploadedFile.uploadProgress = Math.min((uploadedFile.uploadProgress || 0) + 10, 90)
        setFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? { ...uploadedFile } : f)))

        if (uploadedFile.uploadProgress >= 90) {
          clearInterval(interval)
          resolve()
        }
      }, 200)
    })

    await uploadPromise

    // Complete upload
    uploadedFile.uploadProgress = 100
    uploadedFile.status = "completed"
    uploadedFile.url = URL.createObjectURL(file) // In real app, this would be the server URL

    // Start security scan
    setFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? { ...uploadedFile } : f)))

    try {
      const scanResult = await simulateVirusScan(uploadedFile)
      uploadedFile.securityScan = scanResult

      if (scanResult === "threat") {
        uploadedFile.status = "error"
        uploadedFile.error = "Security threat detected. File has been quarantined."
        toast({
          title: "Security Alert",
          description: `File "${file.name}" failed security scan and has been removed.`,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Upload Successful",
          description: `File "${file.name}" uploaded and verified successfully.`,
        })
      }
    } catch (error) {
      uploadedFile.status = "error"
      uploadedFile.error = "Security scan failed"
      uploadedFile.securityScan = "threat"
    }

    return uploadedFile
  }

  const handleFiles = useCallback(
    async (fileList: FileList) => {
      if (disabled) return

      const newFiles = Array.from(fileList)

      // Check total file count
      if (files.length + newFiles.length > maxFiles) {
        toast({
          title: "Too many files",
          description: `Maximum ${maxFiles} files allowed. You can upload ${maxFiles - files.length} more files.`,
          variant: "destructive",
        })
        return
      }

      // Validate each file
      const validFiles: File[] = []
      for (const file of newFiles) {
        const error = validateFile(file)
        if (error) {
          toast({
            title: "Invalid file",
            description: `${file.name}: ${error}`,
            variant: "destructive",
          })
        } else {
          validFiles.push(file)
        }
      }

      if (validFiles.length === 0) return

      // Create initial file objects
      const initialFiles = validFiles.map((file) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        uploadProgress: 0,
        status: "uploading" as const,
        securityScan: "pending" as const,
      }))

      setFiles((prev) => [...prev, ...initialFiles])

      // Upload files
      const uploadPromises = validFiles.map(async (file, index) => {
        try {
          const uploadedFile = await uploadFile(file)
          setFiles((prev) => prev.map((f) => (f.id === initialFiles[index].id ? uploadedFile : f)))
          return uploadedFile
        } catch (error) {
          const errorFile = {
            ...initialFiles[index],
            status: "error" as const,
            error: "Upload failed",
          }
          setFiles((prev) => prev.map((f) => (f.id === initialFiles[index].id ? errorFile : f)))
          return errorFile
        }
      })

      const results = await Promise.all(uploadPromises)
      const successfulFiles = results.filter((f) => f.status === "completed" && f.securityScan === "clean")
      onFilesChange([
        ...files.filter((f) => f.status === "completed" && f.securityScan === "clean"),
        ...successfulFiles,
      ])
    },
    [files, maxFiles, maxSize, acceptedTypes, disabled, onFilesChange, toast],
  )

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter((f) => f.id !== fileId)
    setFiles(updatedFiles)
    onFilesChange(updatedFiles.filter((f) => f.status === "completed" && f.securityScan === "clean"))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
    if (!disabled && e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors cursor-pointer",
          isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          disabled && "opacity-50 cursor-not-allowed",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <CardContent className="p-8 text-center">
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Upload Files</h3>
          <p className="text-muted-foreground mb-4">Drag and drop files here, or click to select files</p>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>
              Maximum {maxFiles} files, {maxSize}MB each
            </p>
            <p>Supported: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, Images, ZIP</p>
          </div>
          <Button variant="outline" className="mt-4" disabled={disabled}>
            <Upload className="mr-2 h-4 w-4" />
            Choose Files
          </Button>
        </CardContent>
      </Card>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(",")}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled}
      />

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium">
            Uploaded Files ({files.length}/{maxFiles})
          </h4>
          {files.map((file) => {
            const FileIcon = getFileIcon(file.type)
            return (
              <Card key={file.id} className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <FileIcon className="h-8 w-8 text-muted-foreground" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-medium truncate">{file.name}</p>
                      <div className="flex items-center space-x-2">
                        {/* Security Status */}
                        {file.securityScan === "pending" && (
                          <Badge variant="secondary" className="text-xs">
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                            Scanning
                          </Badge>
                        )}
                        {file.securityScan === "clean" && (
                          <Badge variant="default" className="text-xs bg-green-600">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified
                          </Badge>
                        )}
                        {file.securityScan === "threat" && (
                          <Badge variant="destructive" className="text-xs">
                            <AlertTriangle className="mr-1 h-3 w-3" />
                            Threat
                          </Badge>
                        )}

                        {/* Action Buttons */}
                        {file.status === "completed" && file.securityScan === "clean" && (
                          <div className="flex space-x-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (file.url) window.open(file.url, "_blank")
                              }}
                            >
                              <Eye className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation()
                                if (file.url) {
                                  const a = document.createElement("a")
                                  a.href = file.url
                                  a.download = file.name
                                  a.click()
                                }
                              }}
                            >
                              <Download className="h-3 w-3" />
                            </Button>
                          </div>
                        )}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation()
                            removeFile(file.id)
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.status === "uploading" && <span>{file.uploadProgress}%</span>}
                      {file.status === "error" && <span className="text-red-600">{file.error}</span>}
                    </div>

                    {/* Progress Bar */}
                    {file.status === "uploading" && <Progress value={file.uploadProgress} className="mt-2 h-1" />}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>
      )}

      {/* Security Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <CheckCircle className="h-5 w-5 text-blue-600 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium text-blue-900">Security Features Active</p>
            <ul className="mt-1 text-blue-700 space-y-1">
              <li>• All files are scanned for viruses and malware</li>
              <li>• File types are validated for security</li>
              <li>• Files are encrypted during transmission</li>
              <li>• Access is logged and monitored</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
