"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { AlgorithmGuessRow } from "@/components/AlgorithmGuessRow"
import { compareAlgorithms } from "@/lib/compareAlgorithms"

export interface Algorithm {
  name: string
  Type: string
  TimeComplexity: string
  spaceComplexity?: string
  countryOfOrigin: string
  determanistic?: string // keeping your original spelling
}

interface GuessRowsProps {
  correct: Algorithm
  guesses: Algorithm[]
  className?: string
  /**
   * Optional: render a small label above each row (e.g., "Guess 1")
   */
  showRowLabels?: boolean
}

export function GuessRows({
  correct,
  guesses,
  className,
  showRowLabels = false,
}: GuessRowsProps) {
  if (!guesses?.length) return null

  return (
    <div className={cn("w-full space-y-3", className)}>
      {guesses.map((guess, idx) => {
        const fields = compareAlgorithms(guess, correct)
        return (
          <div key={`${guess.name}-${idx}`} className="space-y-1">
            {showRowLabels && (
              <div className="text-xs text-muted-foreground px-1">
                Guess {idx + 1}: {guess.name || "—"}
              </div>
            )}
            <AlgorithmGuessRow fields={fields} />
          </div>
        )
      })}
    </div>
  )
}
