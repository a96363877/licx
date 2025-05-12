import type { Metadata } from "next"
import LicenseApplicationForm from "@/components/license-application-form"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"

export const metadata: Metadata = {
  title: "إصدار ترخيص جديد - منصة ترخيص",
  description: "تقديم طلب للحصول على ترخيص منشأة تجارية جديدة",
}

export default function NewLicensePage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rtl">
      <div className="max-w-5xl mx-auto">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">
                <Home className="h-4 w-4" />
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/services">الخدمات الإلكترونية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/license/new" isCurrentPage>
                إصدار ترخيص جديد
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-primary/10 rounded-lg p-3 ml-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-1">معلومات هامة</h2>
              <p className="text-gray-600">
                يرجى التأكد من توفر جميع المستندات المطلوبة قبل البدء في تعبئة النموذج. يمكنك الاطلاع على
                <a href="/requirements" className="text-primary mx-1 underline">
                  متطلبات الترخيص
                </a>
                للتأكد من استيفاء جميع الشروط.
              </p>
            </div>
          </div>
        </div>

        <LicenseApplicationForm />
      </div>
    </main>
  )
}
