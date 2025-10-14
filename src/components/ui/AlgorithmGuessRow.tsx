import { Card } from "@/components/ui/card";
import { AlgorithmField, FieldState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AlgorithmGuessRowProps {
  fields: readonly AlgorithmField[];
  showHeaders?: boolean;
}

export function AlgorithmGuessRow({
  fields,
  showHeaders = false,
}: AlgorithmGuessRowProps) {
  const stateColors: Record<FieldState, string> = {
    correct: "bg-green-500 text-stone-50 border-green-600",
    partial: "bg-yellow-400 text-stone-50 border-yellow-500",
    wrong: "bg-red-600 text-stone-50 border-gray-300",
    better: "bg-red-600 text-stone-50 border-gray-300",
    worse: "bg-red-600 text-stone-50 border-gray-300",
  };

  return (
    <div className="w-full max-w-3xl">
      {/* Header Row */}
      {showHeaders && (
        <div className="grid grid-cols-6 gap-2 mb-1 text-sm font-semibold text-center text-muted-foreground">
          {fields.map((f, i) => (
            <div key={`header-${i}`} className="truncate">
              {f.label}
            </div>
          ))}
        </div>
      )}

      {/* Guess Cards */}
      <div className="grid grid-cols-6 gap-2">
        {fields.map((f, i) => (
          <Card
            key={i}
            className={cn(
              "flex flex-col items-center justify-center p-2 text-center text-sm font-medium border rounded-xl h-24",
              f.state ? stateColors[f.state] : "bg-gray-100 text-gray-800"
            )}
          >
            <div className="flex flex-col items-center justify-center text-center break-words">
              <span>{f.value}</span>
              {f.state === "better" && <ArrowUp className="mt-1" size={16} />}
              {f.state === "worse" && <ArrowDown className="mt-1" size={16} />}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
