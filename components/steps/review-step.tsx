"use client"

import { Check, AlertCircle, FileText, MapPin, User, Building, Activity, CreditCard } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

function ReviewSection({ title, icon, children, isComplete }) {
  return (
    <Card className="p-4">
      <div className="flex items-center space-x-3 rtl:space-x-reverse mb-4">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
        {isComplete && <Check className="h-4 w-4 text-green-500" />}
      </div>
      <div>{children}</div>
    </Card>
  )
}

function ReviewItem({ label, value, status }) {
  let statusColor = "text-gray-500"

  if (status === true) {
    statusColor = "text-green-500"
  } else if (status === false) {
    statusColor = "text-red-500"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
      <div className="font-medium text-gray-700">{label}:</div>
      <div className={`text-gray-900 ${statusColor}`}>{value || "غير مدخل"}</div>
    </div>
  )
}

export default function ReviewStep({ formData }) {
  const [termsAccepted, setTermsAccepted] = useState(false)

  const { businessInfo, ownerInfo, activityInfo, location, documents, payment } = formData

  const isFormComplete = () => {
    // Check if all required fields are filled
    const businessInfoComplete =
      businessInfo.name &&
      businessInfo.legalForm &&
      businessInfo.capital &&
      businessInfo.address &&
      businessInfo.city &&
      businessInfo.postalCode

    const ownerInfoComplete =
      ownerInfo.name && ownerInfo.idNumber && ownerInfo.nationality && ownerInfo.phone && ownerInfo.email

    const activityInfoComplete = activityInfo.mainActivity && activityInfo.employeesCount && activityInfo.workingHours

    const locationComplete = location.district && location.street && location.buildingNo && location.coordinates

    // Check if required documents are uploaded
    const requiredDocuments = ["idCopy", "leaseContract", "municipalityApproval", "civilDefensePermit"]
    const documentsComplete = requiredDocuments.every((doc) => documents[doc])

    // Check if payment is completed
    const paymentComplete = payment.completed

    return (
      businessInfoComplete &&
      ownerInfoComplete &&
      activityInfoComplete &&
      locationComplete &&
      documentsComplete &&
      paymentComplete
    )
  }

  const getCompletedDocumentsCount = () => {
    return Object.values(documents).filter(Boolean).length
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">مراجعة الطلب</h2>
        <p className="text-gray-500 mt-1">يرجى مراجعة المعلومات قبل تقديم الطلب</p>
      </div>

      {!isFormComplete() && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>تنبيه</AlertTitle>
          <AlertDescription>
            يرجى إكمال جميع البيانات المطلوبة قبل تقديم الطلب. يمكنك العودة للخطوات السابقة لإكمال البيانات الناقصة.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ReviewSection
          title="معلومات المنشأة"
          icon={<Building className="h-5 w-5 text-primary" />}
          isComplete={businessInfo.name && businessInfo.legalForm && businessInfo.capital}
        >
          <ReviewItem label="اسم المنشأة" value={businessInfo.name} />
          <ReviewItem label="الشكل القانوني" value={businessInfo.legalForm} />
          <ReviewItem label="رأس المال" value={businessInfo.capital ? `${businessInfo.capital} ريال` : ""} />
          <ReviewItem
            label="العنوان"
            value={`${businessInfo.address || ""}, ${businessInfo.city || ""}, ${businessInfo.postalCode || ""}`}
          />
          {businessInfo.commercialRegistration && (
            <ReviewItem label="رقم السجل التجاري" value={businessInfo.commercialRegistration} />
          )}
          {businessInfo.taxRegistration && <ReviewItem label="الرقم الضريبي" value={businessInfo.taxRegistration} />}
        </ReviewSection>

        <ReviewSection
          title="معلومات المالك"
          icon={<User className="h-5 w-5 text-primary" />}
          isComplete={ownerInfo.name && ownerInfo.idNumber && ownerInfo.nationality}
        >
          <ReviewItem label="الاسم الكامل" value={ownerInfo.name} />
          <ReviewItem label="رقم الهوية" value={ownerInfo.idNumber} />
          <ReviewItem label="الجنسية" value={ownerInfo.nationality} />
          <ReviewItem label="رقم الهاتف" value={ownerInfo.phone} />
          <ReviewItem label="البريد الإلكتروني" value={ownerInfo.email} />

          {ownerInfo.partners && ownerInfo.partners.length > 0 && (
            <div className="mt-2 pt-2 border-t">
              <h4 className="font-medium mb-2">الشركاء ({ownerInfo.partners.length})</h4>
              {ownerInfo.partners.map((partner, index) => (
                <div key={index} className="text-sm mb-1">
                  {partner.name} ({partner.sharePercentage}%)
                </div>
              ))}
            </div>
          )}
        </ReviewSection>

        <ReviewSection
          title="النشاط التجاري"
          icon={<Activity className="h-5 w-5 text-primary" />}
          isComplete={activityInfo.mainActivity && activityInfo.employeesCount}
        >
          <ReviewItem label="النشاط الرئيسي" value={activityInfo.mainActivity} />
          {activityInfo.isicCode && <ReviewItem label="رمز التصنيف (ISIC)" value={activityInfo.isicCode} />}
          <ReviewItem
            label="الأنشطة الفرعية"
            value={
              activityInfo.subActivities && activityInfo.subActivities.length > 0
                ? activityInfo.subActivities.join("، ")
                : "لا يوجد"
            }
          />
          <ReviewItem label="عدد الموظفين" value={activityInfo.employeesCount} />
          <ReviewItem label="ساعات العمل" value={activityInfo.workingHours} />
        </ReviewSection>

        <ReviewSection
          title="الموقع"
          icon={<MapPin className="h-5 w-5 text-primary" />}
          isComplete={location.district && location.street && location.coordinates}
        >
          <ReviewItem label="الحي" value={location.district} />
          <ReviewItem label="الشارع" value={location.street} />
          <ReviewItem label="رقم المبنى" value={location.buildingNo} />
          {location.additionalNo && <ReviewItem label="الرقم الإضافي" value={location.additionalNo} />}
          {location.landSize && <ReviewItem label="مساحة الأرض" value={`${location.landSize} متر مربع`} />}
          {location.coordinates && (
            <ReviewItem
              label="الإحداثيات"
              value={`${location.coordinates.lat.toFixed(6)}, ${location.coordinates.lng.toFixed(6)}`}
            />
          )}
        </ReviewSection>

        <ReviewSection
          title="المستندات"
          icon={<FileText className="h-5 w-5 text-primary" />}
          isComplete={getCompletedDocumentsCount() >= 4}
        >
          <ReviewItem
            label="صورة الهوية / الإقامة"
            value={documents.idCopy ? "تم التحميل" : "لم يتم التحميل"}
            status={documents.idCopy}
          />
          <ReviewItem
            label="السجل التجاري"
            value={documents.commercialRegister ? "تم التحميل" : "لم يتم التحميل"}
            status={documents.commercialRegister}
          />
          <ReviewItem
            label="عقد الإيجار"
            value={documents.leaseContract ? "تم التحميل" : "لم يتم التحميل"}
            status={documents.leaseContract}
          />
          <ReviewItem
            label="موافقة البلدية"
            value={documents.municipalityApproval ? "تم التحميل" : "لم يتم التحميل"}
            status={documents.municipalityApproval}
          />
          <ReviewItem
            label="الموافقة البيئية"
            value={documents.environmentalApproval ? "تم التحميل" : "لم يتم التحميل"}
            status={documents.environmentalApproval}
          />
          <ReviewItem
            label="تصريح الدفاع المدني"
            value={documents.civilDefensePermit ? "تم التحميل" : "لم يتم التحميل"}
            status={documents.civilDefensePermit}
          />
        </ReviewSection>

        <ReviewSection
          title="الدفع"
          icon={<CreditCard className="h-5 w-5 text-primary" />}
          isComplete={payment.completed}
        >
          <ReviewItem label="المبلغ المدفوع" value={`${payment.amount} ريال`} />
          <ReviewItem
            label="حالة الدفع"
            value={payment.completed ? "تم الدفع" : "لم يتم الدفع"}
            status={payment.completed}
          />
          {payment.completed && (
            <>
              <ReviewItem
                label="طريقة الدفع"
                value={
                  payment.method === "credit-card"
                    ? "بطاقة ائتمانية"
                    : payment.method === "bank-transfer"
                      ? "تحويل بنكي"
                      : payment.method === "sadad"
                        ? "سداد"
                        : ""
                }
              />
              <ReviewItem label="رقم المرجع" value={payment.reference} />
            </>
          )}
        </ReviewSection>
      </div>

      <Card className="p-6 border-gray-200 mt-8">
        <div className="flex items-start space-x-2 rtl:space-x-reverse">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            className="mt-1"
          />
          <div className="space-y-1 leading-none">
            <label
              htmlFor="terms"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              أقر بأن جميع المعلومات المقدمة صحيحة وأتحمل المسؤولية القانونية في حال ثبوت خلاف ذلك
            </label>
            <p className="text-sm text-gray-500">بالنقر على "تأكيد الطلب" أدناه، فإنك توافق على الشروط والأحكام.</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
