"use client"

import { useState, useEffect, JSXElementConstructor, Key, PromiseLikeOfReactNode, ReactElement, ReactNode, ReactPortal } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, X, Info, Plus } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  mainActivity: z.string().min(1, { message: "النشاط الرئيسي مطلوب" }),
  employeesCount: z.string().min(1, { message: "عدد الموظفين مطلوب" }),
  workingHours: z.string().min(1, { message: "ساعات العمل مطلوبة" }),
  isicCode: z.string().optional(),
})

export default function ActivityInfoStep({ formData, updateFormData }:any) {
  const [subActivities, setSubActivities] = useState(formData.activityInfo.subActivities || [])
  const [newSubActivity, setNewSubActivity] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mainActivity: formData.activityInfo.mainActivity || "",
      employeesCount: formData.activityInfo.employeesCount || "",
      workingHours: formData.activityInfo.workingHours || "",
      isicCode: formData.activityInfo.isicCode || "",
    },
  })

  // Ensure form data is initialized
  useEffect(() => {
    const values = form.getValues()
    updateFormData("activityInfo", {
      ...values,
      subActivities,
    })
  }, [])

  const onSubmit = (data:any) => {
    updateFormData("activityInfo", {
      ...data,
      subActivities,
    })
  }

  // Auto-save on field change
  const handleFieldChange = () => {
    const values = form.getValues()
    updateFormData("activityInfo", {
      ...values,
      subActivities,
    })
  }

  const addSubActivity = () => {
    if (newSubActivity.trim() && !subActivities.includes(newSubActivity.trim())) {
      const updatedActivities = [...subActivities, newSubActivity.trim()]
      setSubActivities(updatedActivities)
      setNewSubActivity("")

      // Update form data
      const values = form.getValues()
      updateFormData("activityInfo", {
        ...values,
        subActivities: updatedActivities,
      })
    }
  }

  const removeSubActivity = (index:number) => {
    const updatedActivities = subActivities.filter((_: any, i: number) => i !== index)
    setSubActivities(updatedActivities)

    // Update form data
    const values = form.getValues()
    updateFormData("activityInfo", {
      ...values,
      subActivities: updatedActivities,
    })
  }

  const handleSearch = () => {
    // Simulate search results
    if (searchTerm.trim()) {
      const mockResults = [
        { code: "4711", title: "بيع المواد الغذائية بالتجزئة في المتاجر غير المتخصصة" },
        { code: "4719", title: "بيع السلع الأخرى بالتجزئة في المتاجر غير المتخصصة" },
        { code: "4721", title: "بيع الأغذية بالتجزئة في المتاجر المتخصصة" },
        { code: "5610", title: "أنشطة المطاعم وخدمات الأطعمة المتنقلة" },
      ]
      setSearchResults(mockResults.filter((item) => item.title.includes(searchTerm) || item.code.includes(searchTerm)) as any)
    } else {
      setSearchResults([])
    }
  }

  const selectActivity = (activity:any) => {
    form.setValue("mainActivity", activity.title)
    form.setValue("isicCode", activity.code)
    setSearchResults([])
    setSearchTerm("")
    handleFieldChange()
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">النشاط التجاري</h2>
        <p className="text-gray-500 mt-1">يرجى تحديد نشاط منشأتك التجاري والأنشطة الفرعية</p>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="basic">البيانات الأساسية</TabsTrigger>
          <TabsTrigger value="search">البحث عن نشاط</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="pt-4">
          <Form {...form}>
            <form onChange={handleFieldChange} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="p-4 border-gray-200">
                <h3 className="font-medium text-lg mb-4">النشاط الرئيسي</h3>

                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="mainActivity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>النشاط الرئيسي</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر النشاط الرئيسي" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="تجارة التجزئة">تجارة التجزئة</SelectItem>
                            <SelectItem value="تجارة الجملة">تجارة الجملة</SelectItem>
                            <SelectItem value="المطاعم والمقاهي">المطاعم والمقاهي</SelectItem>
                            <SelectItem value="الخدمات المهنية">الخدمات المهنية</SelectItem>
                            <SelectItem value="التصنيع">التصنيع</SelectItem>
                            <SelectItem value="المقاولات">المقاولات</SelectItem>
                            <SelectItem value="التعليم والتدريب">التعليم والتدريب</SelectItem>
                            <SelectItem value="الصحة والرعاية الطبية">الصحة والرعاية الطبية</SelectItem>
                            <SelectItem value="تقنية المعلومات">تقنية المعلومات</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isicCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                          رمز التصنيف الدولي للأنشطة (ISIC)
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Info className="h-4 w-4 mx-1 text-gray-400" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>رمز التصنيف الدولي الموحد للأنشطة الاقتصادية</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل رمز التصنيف أو استخدم البحث" {...field} />
                        </FormControl>
                        <FormDescription>يمكنك البحث عن رمز النشاط من خلال تبويب "البحث عن نشاط"</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              <Card className="p-4 border-gray-200">
                <h3 className="font-medium text-lg mb-4">الأنشطة الفرعية</h3>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="أضف نشاط فرعي"
                      value={newSubActivity}
                      onChange={(e) => setNewSubActivity(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="button" variant="outline" onClick={addSubActivity}>
                      <Plus className="h-4 w-4 ml-2" />
                      إضافة
                    </Button>
                  </div>

                  {subActivities.length > 0 ? (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {subActivities.map((activity: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined, index: Key | null | undefined) => (
                        <Badge key={index} variant="outline" className="py-2 px-3 bg-gray-50">
                          {activity}
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeSubActivity(index as Key)}
                            className="h-4 w-4 p-0 mx-2 text-gray-500 hover:text-red-500"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm mt-2">لم يتم إضافة أنشطة فرعية بعد</p>
                  )}
                </div>
              </Card>

              <Card className="p-4 border-gray-200">
                <h3 className="font-medium text-lg mb-4">معلومات إضافية</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="employeesCount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>عدد الموظفين المتوقع</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر عدد الموظفين" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1-5">1-5 موظفين</SelectItem>
                            <SelectItem value="6-10">6-10 موظفين</SelectItem>
                            <SelectItem value="11-20">11-20 موظف</SelectItem>
                            <SelectItem value="21-50">21-50 موظف</SelectItem>
                            <SelectItem value="51-100">51-100 موظف</SelectItem>
                            <SelectItem value="أكثر من 100">أكثر من 100 موظف</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workingHours"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ساعات العمل</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر ساعات العمل" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="8 ساعات">8 ساعات</SelectItem>
                            <SelectItem value="12 ساعة">12 ساعة</SelectItem>
                            <SelectItem value="16 ساعة">16 ساعة</SelectItem>
                            <SelectItem value="24 ساعة">24 ساعة</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="search" className="pt-4">
          <Card className="p-4 border-gray-200">
            <h3 className="font-medium text-lg mb-4">البحث عن نشاط تجاري</h3>

            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute right-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="ابحث باسم النشاط أو رمز التصنيف"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10 rtl:pr-10 rtl:pl-3"
                  />
                </div>
                <Button type="button" onClick={handleSearch}>
                  بحث
                </Button>
              </div>

              {searchResults.length > 0 ? (
                <div className="mt-4 border rounded-md divide-y">
                  {searchResults.map((result:any, index:any) => (
                    <div
                      key={index}
                      className="p-3 hover:bg-gray-50 cursor-pointer"
                      onClick={() => selectActivity(result)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{result.title}</p>
                          <p className="text-sm text-gray-500">رمز التصنيف: {result.code}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            selectActivity(result)
                          }}
                        >
                          اختيار
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchTerm ? (
                <div className="text-center py-8 border border-dashed rounded-md">
                  <p className="text-gray-500">لا توجد نتائج مطابقة</p>
                </div>
              ) : null}

              <div className="bg-blue-50 p-4 rounded-md mt-4">
                <div className="flex">
                  <Info className="h-5 w-5 text-blue-500 ml-2 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 text-sm">
                      يمكنك البحث عن النشاط التجاري باستخدام اسم النشاط أو رمز التصنيف الدولي (ISIC). اختيار النشاط
                      المناسب يساعد في تسريع إجراءات الترخيص.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
