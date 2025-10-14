import { relation } from "./compareComplexity";

// buildFields.ts
type FieldState = "correct" | "partial" | "wrong";

type Algo = {
  name: string;
  type: string;
  timeComplexity: string;
  spaceComplexity: string;
  countryOfOrigin: string;
  determanistic: "Yes" | "No";
};

const relToState = (r: ReturnType<typeof relation>): FieldState =>
  r === "same" ? "correct" : "partial"; // better/worse → partial

export function buildFields(guess: Algo, answer: Algo) {
  const boolToState = (ok: boolean): FieldState => (ok ? "correct" : "wrong");

  return [
    { label: "Name", value: guess.name, state: boolToState(guess.name === answer.name) },
    { label: "Type", value: guess.type, state: boolToState(guess.type === answer.type) },
    {
      label: "Time",
      value: guess.timeComplexity,
      state: relToState(relation(guess.timeComplexity, answer.timeComplexity)),
    },
    {
      label: "Space",
      value: guess.spaceComplexity,
      state: relToState(relation(guess.spaceComplexity, answer.spaceComplexity)),
    },
    {
      label: "Origin",
      value: guess.countryOfOrigin,
      state: boolToState(guess.countryOfOrigin === answer.countryOfOrigin),
    },
    {
      label: "Deterministic",
      value: guess.determanistic,
      state: boolToState(guess.determanistic === answer.determanistic),
    },
  ] as const;
}
