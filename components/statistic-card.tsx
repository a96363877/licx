import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"

interface StatisticCardProps {
  title: string
  value: string
  unit?: string
  change: string
  trend: "up" | "down" | "neutral"
  description: string
}

export default function StatisticCard({ title, value, unit, change, trend, description }: StatisticCardProps) {
  return (
    <Card className="border-gray-200">
      <CardContent className="p-6">
        <h3 className="text-gray-500 font-medium mb-1">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-3xl font-bold">{value}</span>
          {unit && <span className="text-gray-600 mr-1">{unit}</span>}
        </div>

        <div className="flex items-center mt-2">
          {trend === "up" && (
            <div className="flex items-center text-green-600 text-sm">
              <ArrowUp className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          )}
          {trend === "down" && (
            <div className="flex items-center text-red-600 text-sm">
              <ArrowDown className="h-3 w-3 mr-1" />
              <span>{change}</span>
            </div>
          )}
          <span className="text-gray-500 text-sm mr-2">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}
