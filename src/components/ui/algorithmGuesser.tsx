"use client";
import { useState } from "react";
import { checkAlgorithmGuess } from "@/lib/checkGuess";
import { InputWithButton } from "@/components/ui/inputWithButton";
import { AlgorithmCombobox } from "./algorithm-combobox";

const sampleData = [
  {
    name: "Quicksort",
    Type: "Sorting Algorithm",
    TimeComplexity: "Nlog(N)",
    spaceComplexity: "O(log N)",
    countryOfOrigin: "Great Britain",
    determanistic: "No",
  },
  {
    name: "Merge Sort",
    Type: "Sorting Algorithm",
    TimeComplexity: "Nlog(N)",
    spaceComplexity: "O(N)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Bubble Sort",
    Type: "Sorting Algorithm",
    TimeComplexity: "N²",
    spaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Heap Sort",
    Type: "Sorting Algorithm",
    TimeComplexity: "Nlog(N)",
    spaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Insertion Sort",
    Type: "Sorting Algorithm",
    TimeComplexity: "N²",
    spaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Binary Search",
    Type: "Search Algorithm",
    TimeComplexity: "O(log n)",
    SpaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    deterministic: "Yes",
  },
  {
    name: "Dijkstra's Algorithm",
    Type: "Graph Algorithm (Shortest Path)",
    TimeComplexity:
      "O(V²) with basic implementation, O(E + V log V) with priority queue",
    SpaceComplexity: "O(V)",
    countryOfOrigin: "Netherlands",
    deterministic: "Yes",
  },
  {
    name: "Depth-First Search (DFS)",
    Type: "Graph Traversal Algorithm",
    TimeComplexity: "O(V + E)",
    SpaceComplexity: "O(V)",
    countryOfOrigin: "United States",
    deterministic: "Yes",
  },
  {
    name: "Breadth-First Search (BFS)",
    Type: "Graph Traversal Algorithm",
    TimeComplexity: "O(V + E)",
    SpaceComplexity: "O(V)",
    countryOfOrigin: "United States",
    deterministic: "Yes",
  },
];

const categories = [
  "type",
  "timeComplexity",
  "spaceComplexity",
  "countryOfOrigin",
  "determanistic?",
];

export function AlgorithmGuesser() {
  interface Algorithm {
    name: string;
    Type: string;
    TimeComplexity: string;
    spaceComplexity?: string;
    SpaceComplexity?: string;
    countryOfOrigin: string;
    determanistic?: string;
    deterministic?: string;
  }

  const [correctAlgorithm] = useState(() => {
    const randomIndex = Math.floor(Math.random() * sampleData.length);
    console.log("Chose %s", sampleData[randomIndex].name);
    return sampleData[randomIndex];
  });

  const handleGuess = (guess: string) => {
    const isCorrect = checkAlgorithmGuess(guess, correctAlgorithm.name);
    alert(isCorrect ? "✅ Correct!" : "❌ Try again!");
  };
  return (
    <AlgorithmCombobox
      guess={handleGuess}
      items={sampleData.map((item) => ({
        label: item.name,
        value: item.name,
      }))}
    />
  );
}
