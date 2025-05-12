import { Check } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface StepIndicatorProps {
  steps: { title: string; key?: string }[]
  currentStep: number
  progress?: Record<string, number>
}

export default function StepIndicator({ steps, currentStep, progress }: StepIndicatorProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const stepProgress = step.key && progress ? progress[step.key] : 0

          return (
            <div key={index} className="flex flex-col items-center relative group">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 z-10 transition-colors
                  ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isCurrent
                        ? "border-primary text-primary"
                        : "border-gray-300 text-gray-300"
                  }`}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : <span>{index + 1}</span>}
              </div>

              <span
                className={`text-xs mt-2 text-center max-w-[80px] font-medium transition-colors
                  ${isCompleted ? "text-green-600" : isCurrent ? "text-primary" : "text-gray-400"}`}
              >
                {step.title}
              </span>

              {step.key && progress && isCurrent && stepProgress > 0 && (
                <div className="absolute -bottom-6 w-full">
                  <div className="relative pt-1 w-16">
                    <Progress value={stepProgress} className="h-1 w-16" />
                  </div>
                  <span className="text-[10px] text-gray-500 absolute -bottom-4 right-0">{stepProgress}%</span>
                </div>
              )}

              {index < steps.length - 1 && (
                <div
                  className={`absolute top-5 right-10 w-[calc(100%-20px)] h-0.5 transition-colors
                    ${index < currentStep ? "bg-green-500" : "bg-gray-300"}`}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
