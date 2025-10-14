"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { AlgorithmGuessRow } from "@/components/ui/AlgorithmGuessRow";
import { compareAlgorithms } from "@/lib/compareAlgorithms";
import { Algorithm } from "@/lib/types";
import { GuessCard } from "./buildCard";

interface GuessRowsProps {
  correct: Algorithm;
  guesses: Algorithm[];
  className?: string;
  showRowLabels?: boolean;
}

export function GuessRows({
  correct,
  guesses,
  className,
  showRowLabels = false,
}: GuessRowsProps) {
  if (!guesses?.length) return null;

  return (
    <div className={cn("w-full space-y-3", className)}>
      {guesses.map((guess, idx) => {
        const fields = compareAlgorithms(guess, correct);
        return (
          <div key={`${guess.name}-${idx}`} className="space-y-1">
            {showRowLabels && (
              <div className="text-xs text-muted-foreground px-1">
                Guess {idx + 1}: {guess.name || "—"}
              </div>
            )}
            {/* Show headers only for the first row */}
            <GuessCard guess={guess} answer={correct} showHeaders={idx === 0} />
          </div>
        );
      })}
    </div>
  );
}
