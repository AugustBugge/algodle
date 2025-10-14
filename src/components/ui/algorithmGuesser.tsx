"use client";
import { useState } from "react";
import { checkAlgorithmGuess } from "@/lib/checkGuess";
import { InputWithButton } from "@/components/ui/inputWithButton";
import { AlgorithmCombobox } from "./algorithm-combobox";
import { AlgorithmGuessRow } from "./AlgorithmGuessRow";
import { compareAlgorithms } from "@/lib/compareAlgorithms";
import { GuessRows } from "./guessRows";

const sampleData = [
  {
    name: "Quicksort",
    type: "Sorting Algorithm",
    timeComplexity: "Nlog(N)",
    spaceComplexity: "O(log N)",
    countryOfOrigin: "Great Britain",
    determanistic: "No",
  },
  {
    name: "Merge Sort",
    type: "Sorting Algorithm",
    timeComplexity: "Nlog(N)",
    spaceComplexity: "O(N)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Bubble Sort",
    type: "Sorting Algorithm",
    timeComplexity: "N²",
    spaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Heap Sort",
    type: "Sorting Algorithm",
    timeComplexity: "Nlog(N)",
    spaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Insertion Sort",
    type: "Sorting Algorithm",
    timeComplexity: "N²",
    spaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Binary Search",
    type: "Search Algorithm",
    timeComplexity: "O(log n)",
    spaceComplexity: "O(1)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Dijkstra's Algorithm",
    type: "Graph Algorithm",
    timeComplexity:
      "O(E + V log V)",
    spaceComplexity: "O(V)",
    countryOfOrigin: "Netherlands",
    determanistic: "Yes",
  },
  {
    name: "Depth-First Search (DFS)",
    type: "Graph Algorithm",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
  },
  {
    name: "Breadth-First Search (BFS)",
    type: "Graph Algorithm",
    timeComplexity: "O(V + E)",
    spaceComplexity: "O(V)",
    countryOfOrigin: "United States",
    determanistic: "Yes",
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
    type: string;
    timeComplexity: string;
    spaceComplexity?: string;
    countryOfOrigin: string;
    determanistic?: string;
  }
  
  const [correctAlgorithm] = useState(() => {
    const randomIndex = Math.floor(Math.random() * sampleData.length);
    console.log("Chose %s", sampleData[randomIndex].name);
    return sampleData[randomIndex];
  });
const [guesses, setGuesses] = useState<Algorithm[]>([]);
const [guessedCorrect, setGuessedCorret] = useState(false);

  const handleGuess = (guess: string) => {
    if( guessedCorrect) return;
    const isCorrect = checkAlgorithmGuess(guess, correctAlgorithm.name);
    const match = sampleData.find(x => x.name === guess);
  setGuesses(prev => (match ? [match, ...prev] : prev));
    if (isCorrect) {
      setGuessedCorret(true);
    }
    //alert(isCorrect ? "✅ Correct!" : "❌ Try again!");
  };
  return (
    
    <div>
       {!guessedCorrect && (<AlgorithmCombobox
      guess={handleGuess}
      items={sampleData.map((item) => ({
        label: item.name,
        value: item.name,
      }))}
    />)}
    <GuessRows correct={correctAlgorithm} guesses={guesses}/>
    </div>
    
  );
}
