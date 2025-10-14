import { buildFields } from "@/lib/buildFields";
import { AlgorithmGuessRow } from "./AlgorithmGuessRow";
import { Algorithm } from "@/lib/types";

export function GuessCard({
  guess,
  answer,
}: {
  guess: Algorithm;
  answer: Algorithm;
}) {
  const fields = buildFields(guess, answer);
  return <AlgorithmGuessRow fields={fields} />;
}
