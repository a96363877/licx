import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

interface ServiceCardProps {
  icon: React.ReactNode
  title: string
  description: string
  href: string
  color: string
}

export default function ServiceCard({ icon, title, description, href, color }: ServiceCardProps) {
  return (
    <Link href={href}>
      <Card className="border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-300 h-full">
        <CardContent className="p-6">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${color}`}>{icon}</div>
          <h3 className="text-xl font-bold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center text-primary font-medium">
            <span>ابدأ الخدمة</span>
            <ArrowLeft className="mr-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
