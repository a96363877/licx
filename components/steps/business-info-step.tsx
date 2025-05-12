"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const formSchema = z.object({
  name: z.string().min(3, { message: "اسم المنشأة مطلوب ويجب أن يكون 3 أحرف على الأقل" }),
  legalForm: z.string().min(1, { message: "الشكل القانوني مطلوب" }),
  capital: z.string().min(1, { message: "رأس المال مطلوب" }),
  address: z.string().min(5, { message: "العنوان مطلوب ويجب أن يكون 5 أحرف على الأقل" }),
  city: z.string().min(2, { message: "المدينة مطلوبة" }),
  postalCode: z.string().min(5, { message: "الرمز البريدي مطلوب" }),
  commercialRegistration: z.string().optional(),
  taxRegistration: z.string().optional(),
})

export default function BusinessInfoStep({ formData, updateFormData }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData.businessInfo,
  })

  const onSubmit = (data) => {
    updateFormData("businessInfo", data)
  }

  // Auto-save on field change
  const handleFieldChange = () => {
    const values = form.getValues()
    updateFormData("businessInfo", values)
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">معلومات المنشأة</h2>
        <p className="text-gray-500 mt-1">يرجى تقديم المعلومات الأساسية عن منشأتك التجارية</p>
      </div>

      <Form {...form}>
        <form onChange={handleFieldChange} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Card className="p-4 border-gray-200">
            <h3 className="font-medium text-lg mb-4">البيانات الأساسية</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>اسم المنشأة التجارية</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل اسم المنشأة التجارية" {...field} />
                    </FormControl>
                    <FormDescription>يجب أن يكون الاسم مطابقاً للاسم في السجل التجاري إن وجد</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="legalForm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الشكل القانوني</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر الشكل القانوني" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="مؤسسة فردية">مؤسسة فردية</SelectItem>
                        <SelectItem value="شركة ذات مسؤولية محدودة">شركة ذات مسؤولية محدودة</SelectItem>
                        <SelectItem value="شركة مساهمة">شركة مساهمة</SelectItem>
                        <SelectItem value="شركة تضامنية">شركة تضامنية</SelectItem>
                        <SelectItem value="شركة توصية بسيطة">شركة توصية بسيطة</SelectItem>
                        <SelectItem value="شركة مهنية">شركة مهنية</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <FormField
                control={form.control}
                name="capital"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center">
                      رأس المال (بالريال)
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4 mr-1 text-gray-400" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>الحد الأدنى لرأس المال يختلف حسب النشاط والشكل القانوني</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="أدخل رأس المال" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>المدينة</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="اختر المدينة" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="الرياض">الرياض</SelectItem>
                        <SelectItem value="جدة">جدة</SelectItem>
                        <SelectItem value="الدمام">الدمام</SelectItem>
                        <SelectItem value="مكة المكرمة">مكة المكرمة</SelectItem>
                        <SelectItem value="المدينة المنورة">المدينة المنورة</SelectItem>
                        <SelectItem value="الطائف">الطائف</SelectItem>
                        <SelectItem value="بريدة">بريدة</SelectItem>
                        <SelectItem value="تبوك">تبوك</SelectItem>
                        <SelectItem value="خميس مشيط">خميس مشيط</SelectItem>
                        <SelectItem value="أبها">أبها</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-4 border-gray-200">
            <h3 className="font-medium text-lg mb-4">بيانات العنوان</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>العنوان التفصيلي</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل عنوان المنشأة" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرمز البريدي</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الرمز البريدي" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-4 border-gray-200">
            <h3 className="font-medium text-lg mb-4">بيانات التسجيل (اختياري)</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="commercialRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>رقم السجل التجاري (إن وجد)</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل رقم السجل التجاري" {...field} />
                    </FormControl>
                    <FormDescription>اتركه فارغاً إذا كنت تقدم على سجل تجاري جديد</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="taxRegistration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>الرقم الضريبي (إن وجد)</FormLabel>
                    <FormControl>
                      <Input placeholder="أدخل الرقم الضريبي" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>
        </form>
      </Form>
    </div>
  )
}
