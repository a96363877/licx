"use client"

import { CheckCircle2, FileText, Printer, Download, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function SuccessStep() {
  const applicationNumber = `BL-${Math.floor(100000 + Math.random() * 900000)}`
  const currentDate = new Date().toLocaleDateString("ar-SA")

  return (
    <div className="space-y-6 text-center">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle2 className="h-12 w-12 text-green-600" />
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-2xl font-bold">تم تقديم طلبك بنجاح</h2>
        <p className="text-gray-500">تم استلام طلب ترخيص منشأتك التجارية وسيتم مراجعته من قبل الفريق المختص</p>
      </div>

      <Card className="mx-auto max-w-md bg-gray-50 border-dashed">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">رقم الطلب:</span>
              <span className="font-bold">{applicationNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">تاريخ التقديم:</span>
              <span>{currentDate}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">حالة الطلب:</span>
              <span className="text-amber-600 font-medium">قيد المراجعة</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">الوقت المتوقع:</span>
              <span>3-5 أيام عمل</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="pt-4 space-y-4">
        <p className="text-gray-600">سيتم إرسال تحديثات حالة الطلب إلى بريدك الإلكتروني المسجل</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Button variant="outline" className="flex items-center">
            <Printer className="ml-2 h-4 w-4" />
            طباعة الإيصال
          </Button>
          <Button variant="outline" className="flex items-center">
            <Download className="ml-2 h-4 w-4" />
            تنزيل PDF
          </Button>
          <Button variant="outline" className="flex items-center">
            <FileText className="ml-2 h-4 w-4" />
            تتبع الطلب
          </Button>
        </div>
      </div>

      <div className="pt-8">
        <Link href="/">
          <Button variant="outline" className="flex items-center">
            <ArrowLeft className="ml-2 h-4 w-4" />
            العودة للصفحة الرئيسية
          </Button>
        </Link>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mt-6 text-right">
        <p className="text-blue-800 text-sm">
          للاستفسار عن طلبك، يرجى التواصل مع مركز خدمة العملاء على الرقم: 920000000
        </p>
      </div>
    </div>
  )
}
