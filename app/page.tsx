import HeroSection from "@/components/hero-section"
import ServiceCard from "@/components/service-card"
import StatisticCard from "@/components/statistic-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Building, FileText, RefreshCw, FileSearch, Clock, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen rtl">
      <HeroSection />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">خدماتنا الإلكترونية</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نقدم مجموعة متكاملة من الخدمات الإلكترونية لتسهيل إجراءات ترخيص المنشآت التجارية وإدارتها بكفاءة عالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Building className="h-6 w-6 text-white" />}
              title="إصدار ترخيص جديد"
              description="تقديم طلب للحصول على ترخيص منشأة تجارية جديدة بخطوات بسيطة وسريعة"
              href="/license/new"
              color="bg-primary"
            />
            <ServiceCard
              icon={<RefreshCw className="h-6 w-6 text-white" />}
              title="تجديد ترخيص"
              description="تجديد ترخيص منشأتك التجارية قبل انتهاء صلاحيته لضمان استمرارية العمل"
              href="/license/renew"
              color="bg-green-600"
            />
            <ServiceCard
              icon={<FileText className="h-6 w-6 text-white" />}
              title="تعديل ترخيص"
              description="تعديل بيانات الترخيص أو النشاط التجاري أو الموقع أو المعلومات الأخرى"
              href="/license/modify"
              color="bg-amber-600"
            />
            <ServiceCard
              icon={<FileSearch className="h-6 w-6 text-white" />}
              title="الاستعلام عن ترخيص"
              description="الاستعلام عن حالة الترخيص أو طلب الترخيص ومتابعة الإجراءات"
              href="/license/inquiry"
              color="bg-blue-600"
            />
          </div>

          <div className="text-center mt-10">
            <Link href="/services">
              <Button variant="outline" className="mt-4">
                عرض جميع الخدمات
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">إحصائيات المنصة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              نفخر بخدمة آلاف المنشآت التجارية في المملكة وتسهيل إجراءات الترخيص بكفاءة عالية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatisticCard
              title="التراخيص النشطة"
              value="15,234"
              unit="ترخيص"
              change="12%"
              trend="up"
              description="خلال العام الحالي"
            />
            <StatisticCard
              title="متوسط وقت المعالجة"
              value="3.5"
              unit="يوم"
              change="25%"
              trend="down"
              description="مقارنة بالعام السابق"
            />
            <StatisticCard
              title="المنشآت المسجلة"
              value="24,567"
              unit="منشأة"
              change="18%"
              trend="up"
              description="خلال العام الحالي"
            />
            <StatisticCard
              title="معدل رضا المستخدمين"
              value="92"
              unit="%"
              change="5%"
              trend="up"
              description="مقارنة بالربع السابق"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">كيف تعمل المنصة؟</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              خطوات بسيطة للحصول على ترخيص منشأتك التجارية بكل سهولة ويسر
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-gray-200 text-center">
              <CardContent className="pt-10 pb-8 px-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">1. تقديم الطلب</h3>
                <p className="text-gray-600">
                  قم بتعبئة نموذج طلب الترخيص وإرفاق المستندات المطلوبة من خلال المنصة الإلكترونية
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 text-center">
              <CardContent className="pt-10 pb-8 px-8">
                <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">2. مراجعة الطلب</h3>
                <p className="text-gray-600">
                  تتم مراجعة الطلب والتحقق من استيفاء جميع المتطلبات والشروط اللازمة للترخيص
                </p>
              </CardContent>
            </Card>

            <Card className="border-gray-200 text-center">
              <CardContent className="pt-10 pb-8 px-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">3. إصدار الترخيص</h3>
                <p className="text-gray-600">
                  بعد الموافقة على الطلب، يتم إصدار الترخيص إلكترونياً ويمكنك تنزيله وطباعته مباشرة
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/guide">
              <Button className="mt-4">
                دليل استخدام المنصة
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">ابدأ رحلتك التجارية الآن</h2>
            <p className="text-xl opacity-90 mb-8">
              انضم إلى آلاف المنشآت التجارية التي تستفيد من خدماتنا الإلكترونية المتكاملة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                  إنشاء حساب جديد
                </Button>
              </Link>
              <Link href="/license/new">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 w-full sm:w-auto"
                >
                  تقديم طلب ترخيص
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
