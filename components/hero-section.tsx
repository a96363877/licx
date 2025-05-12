import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Building, FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  return (
    <div className="bg-gradient-to-b from-primary/90 to-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-sm font-medium mb-2">
              منصة ترخيص - الخدمات الإلكترونية الموحدة
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              المنصة الوطنية الموحدة لترخيص المنشآت التجارية
            </h1>
            <p className="text-xl text-white/80 leading-relaxed">
              أنجز معاملات ترخيص منشأتك التجارية بكل سهولة ويسر من خلال منصتنا الإلكترونية المتكاملة
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/license/new">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 w-full sm:w-auto">
                  <Building className="ml-2 h-5 w-5" />
                  إصدار ترخيص جديد
                </Button>
              </Link>
              <Link href="/track">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-white/10 hover:bg-white/50 w-full sm:w-auto"
                >
                  <FileText className="ml-2 h-5 w-5" />
                  تتبع طلب
                </Button>
              </Link>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">استعلام سريع</h2>
              <p className="text-white/70">ابحث عن طلب أو ترخيص أو منشأة تجارية</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute right-3 top-3 h-5 w-5 text-white/50" />
                <Input
                  className="bg-white/5 border-white/20 text-white placeholder:text-white/50 pr-10"
                  placeholder="رقم الطلب أو رقم الترخيص أو اسم المنشأة"
                />
              </div>

              <Button className="w-full bg-white/20 hover:bg-white/30 text-white">
                بحث
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Button>

              <div className="pt-4 border-t border-white/10 mt-4 text-center">
                <p className="text-sm text-white/70 mb-3">خيارات البحث المتقدم</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <Button variant="ghost" size="sm" className="text-white/90 hover:bg-white/10 text-xs">
                    بحث بالسجل التجاري
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white/90 hover:bg-white/10 text-xs">
                    بحث بالموقع
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
