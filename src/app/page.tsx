"use client";
import { AlgorithmGuesser } from "@/components/ui/algorithmGuesser";
import { Button } from "@/components/ui/button";




export default function Home() {
  const correctAlgorithm = "Dijkstra's algorithm";

  return (
    <main className="min-h-dvh flex items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-bold tracking-tight">algodle</h1>
        <p className="text-muted-foreground">Next.js + Tailwind + shadcn/ui</p>
        <Button>It works</Button>
        <Button> It sure does </Button>
        <AlgorithmGuesser />
      </div>
    </main>
  );
}
