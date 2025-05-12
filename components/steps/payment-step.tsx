"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CreditCard, Landmark, Receipt, CheckCircle2, AlertTriangle } from "lucide-react"

const formSchema = z.object({
  method: z.string().min(1, { message: "يرجى اختيار طريقة الدفع" }),
})

export default function PaymentStep({ formData, updateFormData }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(formData.payment.completed || false)
  const [paymentError, setPaymentError] = useState(null)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      method: formData.payment.method || "",
    },
  })

  const onSubmit = (data) => {
    updateFormData("payment", {
      ...formData.payment,
      method: data.method,
    })
  }

  const handleFieldChange = () => {
    const values = form.getValues()
    updateFormData("payment", {
      ...formData.payment,
      method: values.method,
    })
  }

  const handleProcessPayment = () => {
    setIsProcessing(true)
    setPaymentError(null)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)

      // Simulate successful payment
      if (Math.random() > 0.2) {
        setIsCompleted(true)
        updateFormData("payment", {
          ...formData.payment,
          method: form.getValues().method,
          reference: `PAY-${Math.floor(100000 + Math.random() * 900000)}`,
          completed: true,
        })
      } else {
        // Simulate payment error
        setPaymentError("حدث خطأ أثناء معالجة الدفع. يرجى المحاولة مرة أخرى.")
      }
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4 mb-6">
        <h2 className="text-xl font-bold">دفع رسوم الترخيص</h2>
        <p className="text-gray-500 mt-1">يرجى اختيار طريقة الدفع المناسبة لسداد رسوم الترخيص</p>
      </div>

      {isCompleted ? (
        <Card className="p-6 border-green-200 bg-green-50">
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">تم الدفع بنجاح</h3>
            <p className="text-green-700 mb-4">تم سداد رسوم الترخيص بنجاح</p>

            <div className="bg-white rounded-md p-4 w-full max-w-md border border-green-200 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">رقم المرجع:</span>
                <span className="font-bold">
                  {formData.payment.reference || `PAY-${Math.floor(100000 + Math.random() * 900000)}`}
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">المبلغ المدفوع:</span>
                <span className="font-bold">{formData.payment.amount} ريال</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">تاريخ الدفع:</span>
                <span>{new Date().toLocaleDateString("ar-SA")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">طريقة الدفع:</span>
                <span>
                  {formData.payment.method === "credit-card" && "بطاقة ائتمانية"}
                  {formData.payment.method === "bank-transfer" && "تحويل بنكي"}
                  {formData.payment.method === "sadad" && "سداد"}
                </span>
              </div>
            </div>

            <Button variant="outline" className="flex items-center">
              <Receipt className="ml-2 h-4 w-4" />
              تنزيل الإيصال
            </Button>
          </div>
        </Card>
      ) : (
        <>
          <Card className="p-4 border-gray-200 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">ملخص الرسوم</h3>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between py-2 border-b">
                <span>رسوم إصدار الترخيص الأساسي</span>
                <span className="font-medium">2,000 ريال</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>رسوم الخدمات الإلكترونية</span>
                <span className="font-medium">300 ريال</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span>رسوم التسجيل في الغرفة التجارية</span>
                <span className="font-medium">200 ريال</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-bold">الإجمالي</span>
                <span className="font-bold text-lg">{formData.payment.amount} ريال</span>
              </div>
            </div>
          </Card>

          <Form {...form}>
            <form onChange={handleFieldChange} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card className="p-4 border-gray-200">
                <h3 className="font-medium text-lg mb-4">اختر طريقة الدفع</h3>

                <FormField
                  control={form.control}
                  name="method"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-4">
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="credit-card" id="credit-card" />
                            <div className="grid gap-1.5 leading-none w-full">
                              <div className="flex items-center justify-between">
                                <FormLabel htmlFor="credit-card" className="font-medium cursor-pointer">
                                  <div className="flex items-center">
                                    <CreditCard className="ml-2 h-5 w-5 text-primary" />
                                    بطاقة ائتمانية
                                  </div>
                                </FormLabel>
                                <div className="flex space-x-1 rtl:space-x-reverse">
                                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                  <div className="w-8 h-5 bg-gray-200 rounded"></div>
                                </div>
                              </div>
                              <FormDescription className="mr-6">
                                الدفع باستخدام بطاقة فيزا أو ماستركارد أو مدى
                              </FormDescription>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                            <div className="grid gap-1.5 leading-none w-full">
                              <div className="flex items-center justify-between">
                                <FormLabel htmlFor="bank-transfer" className="font-medium cursor-pointer">
                                  <div className="flex items-center">
                                    <Landmark className="ml-2 h-5 w-5 text-primary" />
                                    تحويل بنكي
                                  </div>
                                </FormLabel>
                              </div>
                              <FormDescription className="mr-6">التحويل المباشر من حسابك البنكي</FormDescription>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <RadioGroupItem value="sadad" id="sadad" />
                            <div className="grid gap-1.5 leading-none w-full">
                              <div className="flex items-center justify-between">
                                <FormLabel htmlFor="sadad" className="font-medium cursor-pointer">
                                  <div className="flex items-center">
                                    <Receipt className="ml-2 h-5 w-5 text-primary" />
                                    سداد
                                  </div>
                                </FormLabel>
                              </div>
                              <FormDescription className="mr-6">الدفع من خلال نظام سداد للمدفوعات</FormDescription>
                            </div>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>

              {form.watch("method") === "credit-card" && (
                <Card className="p-4 border-gray-200">
                  <h3 className="font-medium text-lg mb-4">تفاصيل البطاقة</h3>

                  <div className="space-y-4">
                    <div>
                      <FormLabel>رقم البطاقة</FormLabel>
                      <Input placeholder="0000 0000 0000 0000" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <FormLabel>تاريخ الانتهاء</FormLabel>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <FormLabel>رمز الأمان (CVV)</FormLabel>
                        <Input placeholder="123" />
                      </div>
                    </div>

                    <div>
                      <FormLabel>اسم حامل البطاقة</FormLabel>
                      <Input placeholder="الاسم كما هو مكتوب على البطاقة" />
                    </div>
                  </div>
                </Card>
              )}

              {form.watch("method") === "bank-transfer" && (
                <Card className="p-4 border-gray-200">
                  <h3 className="font-medium text-lg mb-4">معلومات التحويل البنكي</h3>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="font-medium mb-2">تفاصيل الحساب البنكي:</p>
                      <p className="text-sm">اسم المستفيد: وزارة التجارة والاستثمار</p>
                      <p className="text-sm">رقم الحساب: SA0380000000608010167519</p>
                      <p className="text-sm">اسم البنك: البنك الأهلي السعودي</p>
                    </div>

                    <div>
                      <FormLabel>رقم المرجع للتحويل</FormLabel>
                      <Input placeholder="أدخل رقم المرجع للتحويل البنكي" />
                      <FormDescription>يرجى إدخال رقم المرجع الخاص بالتحويل البنكي للتحقق من العملية</FormDescription>
                    </div>
                  </div>
                </Card>
              )}

              {form.watch("method") === "sadad" && (
                <Card className="p-4 border-gray-200">
                  <h3 className="font-medium text-lg mb-4">معلومات سداد</h3>

                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded-md">
                      <p className="font-medium mb-2">تفاصيل فاتورة سداد:</p>
                      <p className="text-sm">رقم المفوتر: 129</p>
                      <p className="text-sm">رقم الفاتورة: {Math.floor(1000000000 + Math.random() * 9000000000)}</p>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p>يمكنك دفع الفاتورة من خلال:</p>
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>الخدمات المصرفية الإلكترونية لبنكك</li>
                        <li>تطبيق الهاتف المصرفي</li>
                        <li>أجهزة الصراف الآلي</li>
                        <li>فروع البنوك المشاركة</li>
                      </ul>
                    </div>
                  </div>
                </Card>
              )}

              {paymentError && (
                <div className="bg-red-50 border border-red-200 rounded-md p-4">
                  <div className="flex">
                    <AlertTriangle className="h-5 w-5 text-red-500 ml-2 flex-shrink-0" />
                    <p className="text-red-800 text-sm">{paymentError}</p>
                  </div>
                </div>
              )}

              <div className="flex justify-end">
                <Button
                  type="button"
                  onClick={handleProcessPayment}
                  disabled={!form.watch("method") || isProcessing}
                  className="min-w-[150px]"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                      جاري المعالجة...
                    </>
                  ) : (
                    "إتمام الدفع"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </>
      )}
    </div>
  )
}
