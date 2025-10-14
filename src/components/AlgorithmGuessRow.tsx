import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

type FieldState = "correct" | "partial" | "wrong"

interface AlgorithmField {
  label: string
  value: string
  state?: FieldState
}

interface AlgorithmGuessRowProps {
  fields: AlgorithmField[]
}

export function AlgorithmGuessRow({ fields }: AlgorithmGuessRowProps) {
  const stateColors: Record<FieldState, string> = {
    correct: "bg-green-500 text-white border-green-600",
    partial: "bg-yellow-400 text-black border-yellow-500",
    wrong: "bg-gray-200 text-gray-800 border-gray-300",
  }

  return (
    <div className="grid grid-cols-6 gap-2 w-full max-w-3xl">
      {fields.map((f, i) => (
        <Card
          key={i}
          className={cn(
            "flex flex-col items-center justify-center p-2 text-center text-sm font-medium border rounded-xl h-24",
            f.state ? stateColors[f.state] : "bg-gray-100 text-gray-800"
          )}
        >
          <div className="truncate">{f.value}</div>
          <div className="text-xs text-muted-foreground font-normal">{f.label}</div>
        </Card>
      ))}
    </div>
  )
}
