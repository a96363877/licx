"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Bell, Search } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">فتح القائمة</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  الرئيسية
                </Link>
                <Link href="/services" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  الخدمات الإلكترونية
                </Link>
                <Link href="/dashboard" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  لوحة التحكم
                </Link>
                <Link href="/track" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  تتبع الطلبات
                </Link>
                <Link href="/support" className="text-lg font-medium" onClick={() => setIsOpen(false)}>
                  الدعم الفني
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
            <span className="inline-block font-bold text-xl">منصة ترخيص</span>
          </Link>
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>الرئيسية</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>الخدمات الإلكترونية</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/license/new" title="إصدار ترخيص جديد">
                      إصدار ترخيص لمنشأة تجارية جديدة
                    </ListItem>
                    <ListItem href="/license/renew" title="تجديد ترخيص">
                      تجديد ترخيص منشأة تجارية قائمة
                    </ListItem>
                    <ListItem href="/license/modify" title="تعديل ترخيص">
                      تعديل بيانات ترخيص منشأة تجارية
                    </ListItem>
                    <ListItem href="/license/cancel" title="إلغاء ترخيص">
                      إلغاء ترخيص منشأة تجارية
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/dashboard" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>لوحة التحكم</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/track" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>تتبع الطلبات</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-gray-700">
            <Search className="h-5 w-5" />
            <span className="sr-only">البحث</span>
          </Button>
          <Button variant="ghost" size="icon" className="text-gray-700 relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">2</Badge>
            <span className="sr-only">الإشعارات</span>
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=32&width=32" alt="صورة المستخدم" />
              <AvatarFallback>م.س</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  )
}

const ListItem = ({ className, title, children, ...props }:any) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
