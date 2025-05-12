import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, FileText, Clock, AlertTriangle, Plus, Search, Filter } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "لوحة التحكم - منصة ترخيص",
  description: "لوحة تحكم المنشآت التجارية",
}

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 rtl">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
            <p className="text-gray-600 mt-1">إدارة تراخيص المنشآت التجارية الخاصة بك</p>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <Link href="/license/new">
              <Button className="flex items-center">
                <Plus className="ml-2 h-4 w-4" />
                ترخيص جديد
              </Button>
            </Link>
            <Button variant="outline" className="flex items-center">
              <Search className="ml-2 h-4 w-4" />
              بحث متقدم
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <DashboardCard
            title="التراخيص النشطة"
            value="3"
            icon={<Building className="h-5 w-5 text-green-600" />}
            color="bg-green-50"
          />
          <DashboardCard
            title="طلبات قيد المعالجة"
            value="2"
            icon={<Clock className="h-5 w-5 text-amber-600" />}
            color="bg-amber-50"
          />
          <DashboardCard
            title="تراخيص منتهية"
            value="1"
            icon={<AlertTriangle className="h-5 w-5 text-red-600" />}
            color="bg-red-50"
          />
          <DashboardCard
            title="إجمالي التراخيص"
            value="6"
            icon={<FileText className="h-5 w-5 text-blue-600" />}
            color="bg-blue-50"
          />
        </div>

        <Tabs defaultValue="licenses" className="space-y-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="licenses">التراخيص</TabsTrigger>
              <TabsTrigger value="applications">الطلبات</TabsTrigger>
              <TabsTrigger value="renewals">التجديدات</TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-2">
              <Input className="w-64" placeholder="بحث..." />
              <Button variant="ghost" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <TabsContent value="licenses" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>التراخيص النشطة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4 font-medium">رقم الترخيص</th>
                        <th className="text-right py-3 px-4 font-medium">اسم المنشأة</th>
                        <th className="text-right py-3 px-4 font-medium">النشاط</th>
                        <th className="text-right py-3 px-4 font-medium">تاريخ الإصدار</th>
                        <th className="text-right py-3 px-4 font-medium">تاريخ الانتهاء</th>
                        <th className="text-right py-3 px-4 font-medium">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">TR-123456</td>
                        <td className="py-3 px-4">شركة الأفق للتجارة</td>
                        <td className="py-3 px-4">تجارة التجزئة</td>
                        <td className="py-3 px-4">01/01/2023</td>
                        <td className="py-3 px-4">01/01/2024</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              تجديد
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">TR-789012</td>
                        <td className="py-3 px-4">مؤسسة النجاح للمقاولات</td>
                        <td className="py-3 px-4">المقاولات</td>
                        <td className="py-3 px-4">15/03/2023</td>
                        <td className="py-3 px-4">15/03/2024</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              تجديد
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4">TR-345678</td>
                        <td className="py-3 px-4">مطعم الذواقة</td>
                        <td className="py-3 px-4">المطاعم والمقاهي</td>
                        <td className="py-3 px-4">10/05/2023</td>
                        <td className="py-3 px-4">10/05/2024</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">نشط</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              تجديد
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>التراخيص المنتهية</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4 font-medium">رقم الترخيص</th>
                        <th className="text-right py-3 px-4 font-medium">اسم المنشأة</th>
                        <th className="text-right py-3 px-4 font-medium">النشاط</th>
                        <th className="text-right py-3 px-4 font-medium">تاريخ الإصدار</th>
                        <th className="text-right py-3 px-4 font-medium">تاريخ الانتهاء</th>
                        <th className="text-right py-3 px-4 font-medium">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4">TR-567890</td>
                        <td className="py-3 px-4">مكتب الخبرة للاستشارات</td>
                        <td className="py-3 px-4">الخدمات المهنية</td>
                        <td className="py-3 px-4">20/02/2022</td>
                        <td className="py-3 px-4">20/02/2023</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100">منتهي</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm" className="text-primary">
                              تجديد
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>طلبات الترخيص</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4 font-medium">رقم الطلب</th>
                        <th className="text-right py-3 px-4 font-medium">اسم المنشأة</th>
                        <th className="text-right py-3 px-4 font-medium">النشاط</th>
                        <th className="text-right py-3 px-4 font-medium">تاريخ التقديم</th>
                        <th className="text-right py-3 px-4 font-medium">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">APP-123456</td>
                        <td className="py-3 px-4">شركة الريادة للتقنية</td>
                        <td className="py-3 px-4">تقنية المعلومات</td>
                        <td className="py-3 px-4">01/05/2023</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">قيد المراجعة</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm">
                              تعديل
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4">APP-789012</td>
                        <td className="py-3 px-4">مركز الصحة للعلاج الطبيعي</td>
                        <td className="py-3 px-4">الصحة والرعاية الطبية</td>
                        <td className="py-3 px-4">15/05/2023</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">طلب معلومات إضافية</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm" className="text-primary">
                              استكمال
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="renewals" className="space-y-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>طلبات التجديد</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-right py-3 px-4 font-medium">رقم الطلب</th>
                        <th className="text-right py-3 px-4 font-medium">رقم الترخيص</th>
                        <th className="text-right py-3 px-4 font-medium">اسم المنشأة</th>
                        <th className="text-right py-3 px-4 font-medium">تاريخ التقديم</th>
                        <th className="text-right py-3 px-4 font-medium">الحالة</th>
                        <th className="text-right py-3 px-4 font-medium">الإجراءات</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="py-3 px-4">REN-123456</td>
                        <td className="py-3 px-4">TR-567890</td>
                        <td className="py-3 px-4">مكتب الخبرة للاستشارات</td>
                        <td className="py-3 px-4">25/05/2023</td>
                        <td className="py-3 px-4">
                          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">قيد الدفع</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-2 rtl:space-x-reverse">
                            <Button variant="ghost" size="sm">
                              عرض
                            </Button>
                            <Button variant="ghost" size="sm" className="text-primary">
                              دفع الرسوم
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function DashboardCard({ title, value, icon, color }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
          </div>
          <div className={`p-3 rounded-full ${color}`}>{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
