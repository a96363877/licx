"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, Check, AlertTriangle, X, FileUp, Eye, FileIcon as FilePdf } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

export default function DocumentsStep({ formData, updateFormData }) {
  const [documents, setDocuments] = useState({
    idCopy: formData.documents.idCopy || false,
    commercialRegister: formData.documents.commercialRegister || false,
    leaseContract: formData.documents.leaseContract || false,
    municipalityApproval: formData.documents.municipalityApproval || false,
    environmentalApproval: formData.documents.environmentalApproval || false,
    civilDefensePermit: formData.documents.civilDefensePermit || false,
  })

  const [uploadProgress, setUploadProgress] = useState({})
  const [uploadStatus, setUploadStatus] = useState({})
  const [previewDocument, setPreviewDocument] = useState(null)
  const [fileErrors, setFileErrors] = useState({})
  const [uploadedFiles, setUploadedFiles] = useState({})

  const fileInputRefs = {
    idCopy: useRef(null),
    commercialRegister: useRef(null),
    leaseContract: useRef(null),
    municipalityApproval: useRef(null),
    environmentalApproval: useRef(null),
    civilDefensePermit: useRef(null),
  }

  // Auto-save on component mount to ensure documents object is initialized
  useEffect(() => {
    updateFormData("documents", documents)
  }, [])

  const validateFile = (file, documentType) => {
    // Clear previous errors
    setFileErrors((prev) => ({ ...prev, [documentType]: null }))

    // Check if file exists
    if (!file) {
      setFileErrors((prev) => ({ ...prev, [documentType]: "لم يتم اختيار ملف" }))
      return false
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileErrors((prev) => ({ ...prev, [documentType]: "حجم الملف يتجاوز الحد المسموح (5 ميجابايت)" }))
      return false
    }

    // For commercial registration, only allow PDF
    if (documentType === "commercialRegister") {
      if (file.type !== "application/pdf") {
        setFileErrors((prev) => ({ ...prev, [documentType]: "يجب أن يكون السجل التجاري بصيغة PDF فقط" }))
        return false
      }
    } else {
      // For other documents, allow PDF, JPG, PNG
      const allowedTypes = ["application/pdf", "image/jpeg", "image/jpg", "image/png"]
      if (!allowedTypes.includes(file.type)) {
        setFileErrors((prev) => ({ ...prev, [documentType]: "صيغة الملف غير مدعومة. الصيغ المدعومة: PDF, JPG, PNG" }))
        return false
      }
    }

    return true
  }

  const handleFileChange = (event, documentType) => {
    const file = event.target.files[0]

    if (validateFile(file, documentType)) {
      handleFileUpload(documentType, file)
    }
  }

  const handleFileUpload = (documentType, file) => {
    // Store the file
    setUploadedFiles((prev) => ({
      ...prev,
      [documentType]: file,
    }))

    // Simulate file upload
    setUploadProgress({
      ...uploadProgress,
      [documentType]: 0,
    })

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = (prev[documentType] || 0) + 10

        if (newProgress >= 100) {
          clearInterval(interval)

          // Update document status
          setDocuments({
            ...documents,
            [documentType]: true,
          })

          // Update form data
          updateFormData("documents", {
            ...documents,
            [documentType]: true,
          })

          // Set upload status
          setUploadStatus({
            ...uploadStatus,
            [documentType]: "success",
          })

          return { ...prev, [documentType]: 100 }
        }

        return { ...prev, [documentType]: newProgress }
      })
    }, 300)
  }

  const handleDeleteDocument = (documentType) => {
    // Reset document status
    setDocuments({
      ...documents,
      [documentType]: false,
    })

    // Reset upload progress and status
    setUploadProgress({
      ...uploadProgress,
      [documentType]: 0,
    })

    setUploadStatus({
      ...uploadStatus,
      [documentType]: null,
    })

    // Clear uploaded file
    setUploadedFiles((prev) => {
      const newFiles = { ...prev }
      delete newFiles[documentType]
      return newFiles
    })

    // Clear file input
    if (fileInputRefs[documentType]?.current) {
      fileInputRefs[documentType].current.value = ""
    }

    // Update form data
    updateFormData("documents", {
      ...documents,
      [documentType]: false,
    })
  }

  const handlePreviewDocument = (documentType) => {
    setPreviewDocument(documentType)
  }

  const getCompletedDocumentsCount = () => {
    return Object.values(documents).filter(Boolean).length
  }

  const getTotalDocumentsCount = () => {
    return Object.keys(documents).length
  }

  const getCompletionPercentage = () => {
    return Math.round((getCompletedDocumentsCount() / getTotalDocumentsCount()) * 100)
  }

  const triggerFileInput = (documentType) => {
    fileInputRefs[documentType]?.current?.click()
  }

  const requiredDocuments = [
    {
      id: "idCopy",
      title: "صورة الهوية / الإقامة",
      description: "نسخة واضحة من هوية المالك أو المفوض بالتوقيع",
      required: true,
      acceptedFormats: ".jpg,.jpeg,.png,.pdf",
      formatDescription: "JPG, PNG, PDF",
    },
    {
      id: "commercialRegister",
      title: "السجل التجاري",
      description: "نسخة من السجل التجاري (يجب أن تكون بصيغة PDF)",
      required: true,
      acceptedFormats: ".pdf",
      formatDescription: "PDF فقط",
      isPdfOnly: true,
    },
    {
      id: "leaseContract",
      title: "عقد الإيجار",
      description: "نسخة من عقد إيجار المقر موثق من منصة إيجار",
      required: true,
      acceptedFormats: ".jpg,.jpeg,.png,.pdf",
      formatDescription: "JPG, PNG, PDF",
    },
  ]

  const additionalDocuments = [
    {
      id: "municipalityApproval",
      title: "موافقة البلدية",
      description: "شهادة موافقة البلدية على ممارسة النشاط في الموقع",
      required: true,
      acceptedFormats: ".jpg,.jpeg,.png,.pdf",
      formatDescription: "JPG, PNG, PDF",
    },
    {
      id: "environmentalApproval",
      title: "الموافقة البيئية",
      description: "موافقة الهيئة العامة للأرصاد وحماية البيئة (لبعض الأنشطة)",
      required: false,
      acceptedFormats: ".jpg,.jpeg,.png,.pdf",
      formatDescription: "JPG, PNG, PDF",
    },
    {
      id: "civilDefensePermit",
      title: "تصريح الدفاع المدني",
      description: "شهادة سلامة من الدفاع المدني",
      required: true,
      acceptedFormats: ".jpg,.jpeg,.png,.pdf",
      formatDescription: "JPG, PNG, PDF",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">المستندات المطلوبة</h2>
        <p className="text-gray-500 mt-1">يرجى تحميل المستندات المطلوبة للترخيص</p>
      </div>

      <div className="bg-white rounded-md border p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-medium">تقدم تحميل المستندات</h3>
            <p className="text-sm text-gray-500">
              {getCompletedDocumentsCount()} من {getTotalDocumentsCount()} مستندات مكتملة
            </p>
          </div>
          <span className="text-lg font-bold">{getCompletionPercentage()}%</span>
        </div>
        <Progress value={getCompletionPercentage()} className="h-2" />
      </div>

      <Tabs defaultValue="required" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="required">المستندات الأساسية</TabsTrigger>
          <TabsTrigger value="additional">المستندات الإضافية</TabsTrigger>
        </TabsList>

        <TabsContent value="required" className="pt-4">
          <Card className="p-4 border-gray-200">
            <div className="space-y-4">
              {requiredDocuments.map((doc) => (
                <div key={doc.id}>
                  <DocumentUploadItem
                    id={doc.id}
                    title={doc.title}
                    description={doc.description}
                    required={doc.required}
                    isUploaded={documents[doc.id]}
                    progress={uploadProgress[doc.id] || 0}
                    status={uploadStatus[doc.id]}
                    error={fileErrors[doc.id]}
                    acceptedFormats={doc.acceptedFormats}
                    formatDescription={doc.formatDescription}
                    isPdfOnly={doc.isPdfOnly}
                    onUpload={() => triggerFileInput(doc.id)}
                    onDelete={() => handleDeleteDocument(doc.id)}
                    onPreview={() => handlePreviewDocument(doc.id)}
                    fileName={uploadedFiles[doc.id]?.name}
                  />
                  <input
                    type="file"
                    ref={fileInputRefs[doc.id]}
                    className="hidden"
                    accept={doc.acceptedFormats}
                    onChange={(e) => handleFileChange(e, doc.id)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="additional" className="pt-4">
          <Card className="p-4 border-gray-200">
            <div className="space-y-4">
              {additionalDocuments.map((doc) => (
                <div key={doc.id}>
                  <DocumentUploadItem
                    id={doc.id}
                    title={doc.title}
                    description={doc.description}
                    required={doc.required}
                    isUploaded={documents[doc.id]}
                    progress={uploadProgress[doc.id] || 0}
                    status={uploadStatus[doc.id]}
                    error={fileErrors[doc.id]}
                    acceptedFormats={doc.acceptedFormats}
                    formatDescription={doc.formatDescription}
                    onUpload={() => triggerFileInput(doc.id)}
                    onDelete={() => handleDeleteDocument(doc.id)}
                    onPreview={() => handlePreviewDocument(doc.id)}
                    fileName={uploadedFiles[doc.id]?.name}
                  />
                  <input
                    type="file"
                    ref={fileInputRefs[doc.id]}
                    className="hidden"
                    accept={doc.acceptedFormats}
                    onChange={(e) => handleFileChange(e, doc.id)}
                  />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="bg-amber-50 border border-amber-200 rounded-md p-4 mt-6">
        <div className="flex">
          <AlertTriangle className="h-5 w-5 text-amber-500 ml-2 flex-shrink-0" />
          <div>
            <p className="text-amber-800 text-sm">ملاحظات هامة:</p>
            <ul className="text-amber-800 text-sm list-disc list-inside mt-1">
              <li>
                يجب أن يكون <strong>السجل التجاري بصيغة PDF فقط</strong>.
              </li>
              <li>باقي المستندات يمكن أن تكون بصيغة PDF أو JPG أو PNG وبحجم لا يتجاوز 5 ميجابايت للملف الواحد.</li>
              <li>تأكد من وضوح جميع المستندات وأن تكون سارية المفعول.</li>
              <li>قد يتم طلب مستندات إضافية حسب نوع النشاط التجاري.</li>
            </ul>
          </div>
        </div>
      </div>

      {previewDocument && uploadedFiles[previewDocument] && (
        <Dialog open={!!previewDocument} onOpenChange={() => setPreviewDocument(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>معاينة المستند</DialogTitle>
              <DialogDescription>
                {requiredDocuments.find((d) => d.id === previewDocument)?.title ||
                  additionalDocuments.find((d) => d.id === previewDocument)?.title}
              </DialogDescription>
            </DialogHeader>
            <div className="h-96 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
              {uploadedFiles[previewDocument]?.type === "application/pdf" ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <FilePdf className="h-16 w-16 text-red-500 mb-4" />
                  <p className="text-gray-600">ملف PDF - {uploadedFiles[previewDocument].name}</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      const url = URL.createObjectURL(uploadedFiles[previewDocument])
                      window.open(url, "_blank")
                    }}
                  >
                    فتح ملف PDF
                  </Button>
                </div>
              ) : uploadedFiles[previewDocument]?.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(uploadedFiles[previewDocument]) || "/placeholder.svg"}
                  alt="معاينة المستند"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <FileText className="h-16 w-16 text-gray-400" />
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

function DocumentUploadItem({
  id,
  title,
  description,
  required,
  isUploaded,
  progress,
  status,
  error,
  acceptedFormats,
  formatDescription,
  isPdfOnly,
  onUpload,
  onDelete,
  onPreview,
  fileName,
}) {
  return (
    <div
      className={`flex items-start space-x-4 rtl:space-x-reverse p-4 border rounded-md ${isPdfOnly ? "bg-blue-50 border-blue-200" : "bg-gray-50"}`}
    >
      <div className="flex-shrink-0">
        {isUploaded ? (
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-5 w-5 text-green-600" />
          </div>
        ) : isPdfOnly ? (
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FilePdf className="h-5 w-5 text-blue-600" />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FileUp className="h-5 w-5 text-gray-500" />
          </div>
        )}
      </div>

      <div className="flex-1 space-y-1">
        <div className="flex items-center">
          <h4 className="font-medium">{title}</h4>
          {required && <span className="mr-2 text-xs text-red-500">(مطلوب)</span>}
          {isPdfOnly && <Badge className="mr-2 bg-blue-100 text-blue-800 hover:bg-blue-100">PDF فقط</Badge>}
        </div>
        <p className="text-sm text-gray-500">{description}</p>

        {fileName && isUploaded && (
          <p className="text-xs text-gray-600 mt-1 flex items-center">
            <FileText className="h-3 w-3 mr-1" />
            {fileName}
          </p>
        )}

        {progress > 0 && progress < 100 && (
          <div className="w-full mt-2">
            <Progress value={progress} className="h-1" />
            <p className="text-xs text-gray-500 mt-1">جاري التحميل... {progress}%</p>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="py-2 mt-2">
            <AlertDescription className="text-xs">{error}</AlertDescription>
          </Alert>
        )}

        <p className="text-xs text-gray-500 mt-1">الصيغ المقبولة: {formatDescription}</p>
      </div>

      <div className="flex-shrink-0 flex gap-2">
        {isUploaded ? (
          <>
            <Button variant="outline" size="sm" onClick={onPreview} className="h-8">
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onDelete}
              className="h-8 text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <Button
            variant="outline"
            size="sm"
            onClick={onUpload}
            className={`h-8 ${isPdfOnly ? "border-blue-300 text-blue-700 hover:bg-blue-50" : ""}`}
          >
            <Upload className="h-4 w-4 ml-2" />
            تحميل
          </Button>
        )}
      </div>
    </div>
  )
}
