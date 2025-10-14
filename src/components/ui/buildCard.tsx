import { buildFields } from "@/lib/buildFields";
import { AlgorithmGuessRow } from "./AlgorithmGuessRow";

function GuessCard({ guess, answer }: { guess: Algo; answer: Algo }) {
  const fields = buildFields(guess, answer);
  return <AlgorithmGuessRow fields={fields} />;
}
