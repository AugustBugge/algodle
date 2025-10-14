import { buildFields } from "@/lib/buildFields";
import { AlgorithmGuessRow } from "./AlgorithmGuessRow";
import { Algorithm } from "@/lib/types";

export function GuessCard({
  guess,
  answer,
  showHeaders,
}: {
  guess: Algorithm;
  answer: Algorithm;
  showHeaders: boolean;
}) {
  const fields = buildFields(guess, answer);
  return <AlgorithmGuessRow fields={fields} showHeaders={showHeaders} />;
}
