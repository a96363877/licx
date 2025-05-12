import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">منصة ترخيص</h3>
            <p className="text-gray-400 text-sm">
              المنصة الوطنية الموحدة لترخيص المنشآت التجارية وتيسير أمورها بكل سهولة ويسر.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  الخدمات الإلكترونية
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  لوحة التحكم
                </Link>
              </li>
              <li>
                <Link href="/track" className="hover:text-white transition-colors">
                  تتبع الطلبات
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">الدعم</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  الأسئلة الشائعة
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-white transition-colors">
                  الدعم الفني
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  اتصل بنا
                </Link>
              </li>
              <li>
                <Link href="/guide" className="hover:text-white transition-colors">
                  دليل المستخدم
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-gray-400">
              <li>الرقم الموحد: 920000000</li>
              <li>البريد الإلكتروني: info@license.gov.sa</li>
              <li>ساعات العمل: الأحد - الخميس، 8 ص - 4 م</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة ترخيص - المملكة العربية السعودية
          </p>
          <div className="flex space-x-4 rtl:space-x-reverse mt-4 md:mt-0">
            <Link href="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
              شروط الاستخدام
            </Link>
            <Link href="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
              سياسة الخصوصية
            </Link>
            <Link href="/accessibility" className="text-gray-400 text-sm hover:text-white transition-colors">
              إمكانية الوصول
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
