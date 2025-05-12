"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import BusinessInfoStep from "@/components/steps/business-info-step"
import OwnerInfoStep from "@/components/steps/owner-info-step"
import ActivityInfoStep from "@/components/steps/activity-info-step"
import DocumentsStep from "@/components/steps/documents-step"
import LocationStep from "@/components/steps/location-step"
import PaymentStep from "@/components/steps/payment-step"
import ReviewStep from "@/components/steps/review-step"
import SuccessStep from "@/components/steps/success-step"
import StepIndicator from "@/components/step-indicator"
import { AlertCircle, ArrowLeft, ArrowRight, Save } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function LicenseApplicationForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    businessInfo: {
      name: "",
      legalForm: "",
      capital: "",
      address: "",
      city: "",
      postalCode: "",
      commercialRegistration: "",
      taxRegistration: "",
    },
    ownerInfo: {
      name: "",
      idNumber: "",
      nationality: "",
      phone: "",
      email: "",
      partners: [],
    },
    activityInfo: {
      mainActivity: "",
      subActivities: [],
      employeesCount: "",
      workingHours: "",
      isicCode: "",
    },
    location: {
      coordinates: null,
      district: "",
      street: "",
      buildingNo: "",
      additionalNo: "",
      landSize: "",
    },
    documents: {
      idCopy: false,
      commercialRegister: false,
      leaseContract: false,
      municipalityApproval: false,
      environmentalApproval: false,
      civilDefensePermit: false,
    },
    payment: {
      method: "",
      amount: 2500,
      reference: "",
      completed: false,
    },
  })

  const [formProgress, setFormProgress] = useState({
    businessInfo: 0,
    ownerInfo: 0,
    activityInfo: 0,
    location: 0,
    documents: 0,
    payment: 0,
  })

  const steps = [
    { title: "معلومات المنشأة", component: BusinessInfoStep, key: "businessInfo" },
    { title: "معلومات المالك", component: OwnerInfoStep, key: "ownerInfo" },
    { title: "النشاط التجاري", component: ActivityInfoStep, key: "activityInfo" },
    { title: "الموقع", component: LocationStep, key: "location" },
    { title: "المستندات", component: DocumentsStep, key: "documents" },
    { title: "الدفع", component: PaymentStep, key: "payment" },
    { title: "المراجعة", component: ReviewStep, key: null },
    { title: "تأكيد الطلب", component: SuccessStep, key: null },
  ]

  const updateFormData = (stepName, data) => {
    setFormData((prev) => ({
      ...prev,
      [stepName]: {
        ...prev[stepName],
        ...data,
      },
    }))

    // Calculate progress for the step
    if (stepName in formProgress) {
      const stepFields = Object.keys(formData[stepName]).length
      const filledFields = Object.values(data).filter(
        (value) =>
          value !== "" && value !== false && value !== null && (Array.isArray(value) ? value.length > 0 : true),
      ).length

      const progress = Math.min(Math.round((filledFields / stepFields) * 100), 100)
      setFormProgress((prev) => ({
        ...prev,
        [stepName]: progress,
      }))
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSaveDraft = () => {
    // Simulate saving draft
    console.log("Saving draft:", formData)

    // Show toast notification
    alert("تم حفظ مسودة الطلب بنجاح")
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">إصدار ترخيص منشأة تجارية جديدة</h1>
        <p className="text-gray-600">يرجى تعبئة النموذج التالي للحصول على ترخيص منشأة تجارية جديدة</p>

        <div className="flex items-center justify-between mt-4 border-t pt-4">
          <div className="flex items-center">
            <span className="text-sm text-gray-500 ml-2">رقم الطلب:</span>
            <span className="text-sm font-medium">TL-{Math.floor(100000 + Math.random() * 900000)}</span>
          </div>

          <div className="flex items-center">
            <span className="text-sm text-gray-500 ml-2">تاريخ الطلب:</span>
            <span className="text-sm font-medium">{new Date().toLocaleDateString("ar-SA")}</span>
          </div>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handleSaveDraft} className="flex items-center">
                  <Save className="h-4 w-4 ml-2" />
                  حفظ كمسودة
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>حفظ الطلب كمسودة للرجوع إليه لاحقاً</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <StepIndicator steps={steps} currentStep={currentStep} progress={formProgress} />

      {currentStep < steps.length - 1 && currentStep > 0 && (
        <Alert className="bg-blue-50 border-blue-200 text-blue-800">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertTitle>تذكير</AlertTitle>
          <AlertDescription>
            يمكنك التنقل بين الخطوات في أي وقت. سيتم حفظ جميع البيانات التي أدخلتها تلقائياً.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-gray-200">
        <CardContent className="p-6">
          <CurrentStepComponent formData={formData} updateFormData={updateFormData} />
        </CardContent>
      </Card>

      <div className="flex justify-between">
        {currentStep > 0 && currentStep < steps.length - 1 && (
          <Button variant="outline" onClick={handlePrevious} className="flex items-center">
            <ArrowRight className="ml-2 h-4 w-4" />
            السابق
          </Button>
        )}

        {currentStep === 0 && (
          <Button variant="outline" onClick={() => (window.location.href = "/")} className="flex items-center">
            <ArrowRight className="ml-2 h-4 w-4" />
            الرئيسية
          </Button>
        )}

        <div className="flex gap-2">
          {currentStep < steps.length - 2 && (
            <Button onClick={handleNext} className="flex items-center">
              التالي
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          )}

          {currentStep === steps.length - 2 && (
            <Button onClick={handleNext} className="bg-green-600 hover:bg-green-700 flex items-center">
              تقديم الطلب
              <ArrowLeft className="mr-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
