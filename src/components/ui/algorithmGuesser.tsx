"use client"
import { useState } from "react"
import { checkAlgorithmGuess } from "@/lib/checkGuess";
import { InputWithButton } from "@/components/ui/inputWithButton";

export function AlgorithmGuesser() {
  const correctAlgorithm = "Dijkstra's algorithm";

  const handleGuess = (guess: string) => {
    const isCorrect = checkAlgorithmGuess(guess, correctAlgorithm);
    alert(isCorrect ? "✅ Correct!" : "❌ Try again!");
  };
   return <InputWithButton onGuess={handleGuess} />
}

