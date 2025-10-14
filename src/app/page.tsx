"use client";
import { Button } from "@/components/ui/button";
import { InputWithButton } from "@/components/ui/inputWithButton";
import { checkAlgorithmGuess } from "@/lib/checkGuess";

export default function Home() {
  const correctAlgorithm = "Dijkstra's algorithm";

  const handleGuess = (guess: string) => {
    const isCorrect = checkAlgorithmGuess(guess, correctAlgorithm);
    alert(isCorrect ? "✅ Correct!" : "❌ Try again!");
  };

  return (
    <main className="min-h-dvh flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">algodle</h1>
        <p className="text-muted-foreground">Next.js + Tailwind + shadcn/ui</p>
        <Button>It works</Button>
        <Button> It sure does </Button>
        <InputWithButton onGuess={handleGuess} />
      </div>
    </main>
  );
}
