"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, UserPlus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const formSchema = z.object({
  name: z.string().min(3, { message: "اسم المالك مطلوب ويجب أن يكون 3 أحرف على الأقل" }),
  idNumber: z.string().min(10, { message: "رقم الهوية يجب أن يكون 10 أرقام على الأقل" }),
  nationality: z.string().min(1, { message: "الجنسية مطلوبة" }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يكون 10 أرقام على الأقل" }),
  email: z.string().email({ message: "يرجى إدخال بريد إلكتروني صحيح" }),
})

const partnerSchema = z.object({
  name: z.string().min(3, { message: "اسم الشريك مطلوب" }),
  idNumber: z.string().min(10, { message: "رقم الهوية مطلوب" }),
  nationality: z.string().min(1, { message: "الجنسية مطلوبة" }),
  sharePercentage: z.string().min(1, { message: "نسبة الملكية مطلوبة" }),
})

export default function OwnerInfoStep({ formData, updateFormData }) {
  const [partners, setPartners] = useState(formData.ownerInfo.partners || [])
  const [isAddingPartner, setIsAddingPartner] = useState(false)
  const [newPartner, setNewPartner] = useState({
    name: "",
    idNumber: "",
    nationality: "",
    sharePercentage: "",
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: formData.ownerInfo,
  })

  const onSubmit = (data) => {
    updateFormData("ownerInfo", {
      ...data,
      partners,
    })
  }

  // Auto-save on field change
  const handleFieldChange = () => {
    const values = form.getValues()
    updateFormData("ownerInfo", {
      ...values,
      partners,
    })
  }

  const addPartner = () => {
    try {
      partnerSchema.parse(newPartner)
      const updatedPartners = [...partners, newPartner]
      setPartners(updatedPartners)
      setNewPartner({
        name: "",
        idNumber: "",
        nationality: "",
        sharePercentage: "",
      })
      setIsAddingPartner(false)

      // Update form data
      const values = form.getValues()
      updateFormData("ownerInfo", {
        ...values,
        partners: updatedPartners,
      })
    } catch (error) {
      console.error("Validation error:", error)
      alert("يرجى التأكد من إدخال جميع بيانات الشريك بشكل صحيح")
    }
  }

  const removePartner = (index) => {
    const updatedPartners = partners.filter((_, i) => i !== index)
    setPartners(updatedPartners)

    // Update form data
    const values = form.getValues()
    updateFormData("ownerInfo", {
      ...values,
      partners: updatedPartners,
    })
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">معلومات المالك</h2>
        <p className="text-gray-500 mt-1">يرجى تقديم معلومات عن مالك المنشأة والشركاء (إن وجدوا)</p>
      </div>

      <Tabs defaultValue="owner" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="owner">المالك الرئيسي</TabsTrigger>
          <TabsTrigger value="partners">الشركاء</TabsTrigger>
        </TabsList>

        <TabsContent value="owner" className="pt-4">
          <Form {...form}>
            <form onChange={handleFieldChange} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="p-4 border-gray-200">
                <h3 className="font-medium text-lg mb-4">بيانات المالك الرئيسي</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الاسم الكامل</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل الاسم الكامل للمالك" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="idNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهوية / الإقامة</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل رقم الهوية أو الإقامة" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <FormField
                    control={form.control}
                    name="nationality"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الجنسية</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="اختر الجنسية" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="سعودي">سعودي</SelectItem>
                            <SelectItem value="مصري">مصري</SelectItem>
                            <SelectItem value="أردني">أردني</SelectItem>
                            <SelectItem value="يمني">يمني</SelectItem>
                            <SelectItem value="سوداني">سوداني</SelectItem>
                            <SelectItem value="سوري">سوري</SelectItem>
                            <SelectItem value="لبناني">لبناني</SelectItem>
                            <SelectItem value="فلسطيني">فلسطيني</SelectItem>
                            <SelectItem value="أخرى">أخرى</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>

              <Card className="p-4 border-gray-200">
                <h3 className="font-medium text-lg mb-4">بيانات الاتصال</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input type="tel" placeholder="05xxxxxxxx" {...field} />
                        </FormControl>
                        <FormDescription>سيتم استخدام هذا الرقم للتواصل بخصوص الطلب</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="example@domain.com" {...field} />
                        </FormControl>
                        <FormDescription>سيتم إرسال إشعارات حالة الطلب على هذا البريد</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </Card>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="partners" className="pt-4">
          <Card className="p-4 border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">الشركاء</h3>

              <Dialog open={isAddingPartner} onOpenChange={setIsAddingPartner}>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center">
                    <UserPlus className="ml-2 h-4 w-4" />
                    إضافة شريك
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>إضافة شريك جديد</DialogTitle>
                    <DialogDescription>أدخل بيانات الشريك في المنشأة التجارية</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <FormLabel htmlFor="partnerName">اسم الشريك</FormLabel>
                      <Input
                        id="partnerName"
                        value={newPartner.name}
                        onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                        placeholder="أدخل اسم الشريك"
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormLabel htmlFor="partnerIdNumber">رقم الهوية</FormLabel>
                      <Input
                        id="partnerIdNumber"
                        value={newPartner.idNumber}
                        onChange={(e) => setNewPartner({ ...newPartner, idNumber: e.target.value })}
                        placeholder="أدخل رقم الهوية"
                      />
                    </div>
                    <div className="grid gap-2">
                      <FormLabel htmlFor="partnerNationality">الجنسية</FormLabel>
                      <Select
                        value={newPartner.nationality}
                        onValueChange={(value) => setNewPartner({ ...newPartner, nationality: value })}
                      >
                        <SelectTrigger id="partnerNationality">
                          <SelectValue placeholder="اختر الجنسية" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="سعودي">سعودي</SelectItem>
                          <SelectItem value="مصري">مصري</SelectItem>
                          <SelectItem value="أردني">أردني</SelectItem>
                          <SelectItem value="يمني">يمني</SelectItem>
                          <SelectItem value="سوداني">سوداني</SelectItem>
                          <SelectItem value="أخرى">أخرى</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <FormLabel htmlFor="partnerSharePercentage">نسبة الملكية (%)</FormLabel>
                      <Input
                        id="partnerSharePercentage"
                        type="number"
                        min="1"
                        max="99"
                        value={newPartner.sharePercentage}
                        onChange={(e) => setNewPartner({ ...newPartner, sharePercentage: e.target.value })}
                        placeholder="أدخل نسبة الملكية"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={addPartner}>
                      إضافة
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            {partners.length === 0 ? (
              <div className="text-center py-8 border border-dashed rounded-md">
                <UserPlus className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                <p className="text-gray-500">لا يوجد شركاء مضافين</p>
                <p className="text-gray-400 text-sm mt-1">اضغط على زر "إضافة شريك" لإضافة شركاء للمنشأة</p>
              </div>
            ) : (
              <div className="space-y-4">
                {partners.map((partner, index) => (
                  <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-md">
                    <div>
                      <div className="font-medium">{partner.name}</div>
                      <div className="text-sm text-gray-500">
                        {partner.nationality} | نسبة الملكية: {partner.sharePercentage}%
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removePartner(index)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}

                <div className="pt-4">
                  <p className="text-sm text-gray-500">
                    مجموع نسب الملكية: {partners.reduce((sum, partner) => sum + Number(partner.sharePercentage), 0)}%
                  </p>
                </div>
              </div>
            )}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
