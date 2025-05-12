"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapPin, Navigation } from "lucide-react"

const formSchema = z.object({
  district: z.string().min(2, { message: "الحي مطلوب" }),
  street: z.string().min(2, { message: "الشارع مطلوب" }),
  buildingNo: z.string().min(1, { message: "رقم المبنى مطلوب" }),
  additionalNo: z.string().optional(),
  landSize: z.string().optional(),
})

export default function LocationStep({ formData, updateFormData }:any) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [coordinates, setCoordinates] = useState(formData.location.coordinates || null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      district: formData.location.district || "",
      street: formData.location.street || "",
      buildingNo: formData.location.buildingNo || "",
      additionalNo: formData.location.additionalNo || "",
      landSize: formData.location.landSize || "",
    },
  })

  const onSubmit = (data:any) => {
    updateFormData("location", {
      ...data,
      coordinates,
    })
  }

  // Auto-save on field change
  const handleFieldChange = () => {
    const values = form.getValues()
    updateFormData("location", {
      ...values,
      coordinates,
    })
  }

  // Simulate map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setMapLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleMapClick = () => {
    // Simulate selecting a location on the map
    setCoordinates({
      lat: 24.7136 + (Math.random() * 0.1 - 0.05),
      lng: 46.6753 + (Math.random() * 0.1 - 0.05),
    })

    handleFieldChange()
  }

  const handleUseCurrentLocation = () => {
    // Simulate getting current location
    setCoordinates({
      lat: 24.7136,
      lng: 46.6753,
    })

    handleFieldChange()
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">موقع المنشأة</h2>
        <p className="text-gray-500 mt-1">يرجى تحديد موقع المنشأة التجارية بدقة</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Card className="p-4 border-gray-200 h-full">
            <h3 className="font-medium text-lg mb-4">بيانات العنوان</h3>

            <Form {...form}>
              <form onChange={handleFieldChange} onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="district"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحي</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسم الحي" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="street"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الشارع</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل اسم الشارع" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="buildingNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم المبنى</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل رقم المبنى" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="additionalNo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الرقم الإضافي</FormLabel>
                        <FormControl>
                          <Input placeholder="أدخل الرقم الإضافي (اختياري)" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="landSize"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>مساحة الأرض (متر مربع)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="أدخل مساحة الأرض (اختياري)" {...field} />
                      </FormControl>
                      <FormDescription>هذه المعلومة مطلوبة لبعض أنواع الأنشطة التجارية</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </Card>
        </div>

        <div>
          <Card className="p-4 border-gray-200 h-full">
            <h3 className="font-medium text-lg mb-4">تحديد الموقع على الخريطة</h3>

            <div className="space-y-4">
              <div className="flex justify-end mb-2">
                <Button variant="outline" size="sm" onClick={handleUseCurrentLocation} className="flex items-center">
                  <Navigation className="ml-2 h-4 w-4" />
                  استخدام موقعي الحالي
                </Button>
              </div>

              <div
                className="border rounded-md h-64 bg-gray-100 flex items-center justify-center cursor-pointer relative overflow-hidden"
                onClick={handleMapClick}
              >
                {!mapLoaded ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                    <p className="text-gray-500">جاري تحميل الخريطة...</p>
                  </div>
                ) : (
                  <>
                    {/* Simulated map */}
                    <div className="absolute inset-0 bg-gray-200">
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: "url('/placeholder.svg?height=256&width=512')",
                          backgroundSize: "cover",
                          backgroundPosition: "center",
                        }}
                      ></div>
                    </div>

                    {coordinates && (
                      <div
                        className="absolute"
                        style={{
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -100%)",
                        }}
                      >
                        <MapPin className="h-8 w-8 text-red-500" />
                      </div>
                    )}

                    {!coordinates && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/5">
                        <p className="bg-white px-3 py-2 rounded-md shadow-sm text-sm">
                          انقر على الخريطة لتحديد موقع المنشأة
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>

              {coordinates && (
                <div className="bg-gray-50 p-3 rounded-md">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">الإحداثيات المحددة:</p>
                      <p className="text-xs text-gray-500 mt-1">
                        خط العرض: {coordinates.lat.toFixed(6)}, خط الطول: {coordinates.lng.toFixed(6)}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs h-8">
                      تعديل
                    </Button>
                  </div>
                </div>
              )}

              <p className="text-sm text-gray-500">تحديد الموقع بدقة يساعد في تسريع إجراءات الترخيص والتفتيش</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
