import { Card } from "@/components/ui/card";
import { AlgorithmField, FieldState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface AlgorithmGuessRowProps {
  fields: readonly AlgorithmField[];
}

export function AlgorithmGuessRow({ fields }: AlgorithmGuessRowProps) {
  const stateColors: Record<FieldState, string> = {
    correct: "bg-green-500 text-stone-50 border-green-600",
    partial: "bg-yellow-400 text-stone-50 border-yellow-500",
    wrong: "bg-red-600 text-stone-50 border-gray-300",
    better: "bg-red-600 text-stone-50 border-gray-300",
    worse: "bg-red-600 text-stone-50 border-gray-300",
  };

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
          <div className="break-words text-center">
            {f.value}{" "}
            {f.state === "better" ? (
              <ArrowUp />
            ) : f.state === "worse" ? (
              <ArrowDown />
            ) : (
              ""
            )}
          </div>
          <div className="text-xs text-muted-foreground font-normal">
            {f.label}
          </div>
        </Card>
      ))}
    </div>
  );
}
