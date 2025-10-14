import { relation } from "./compareComplexity";
import { Algorithm, FieldState } from "./types";

const relToState = (r: ReturnType<typeof relation>): FieldState => {
  if (r === "same") return "correct";
  else if (r === "better") return "better";
  else return "worse";
};

export function buildFields(guess: Algorithm, answer: Algorithm) {
  const boolToState = (ok: boolean): FieldState => (ok ? "correct" : "wrong");

  return [
    {
      label: "Name",
      value: guess.name,
      state: boolToState(guess.name === answer.name),
    },
    {
      label: "Type",
      value: guess.type,
      state: boolToState(guess.type === answer.type),
    },
    {
      label: "Time",
      value: guess.timeComplexity,
      state: relToState(relation(guess.timeComplexity, answer.timeComplexity)),
    },
    {
      label: "Space",
      value: guess.spaceComplexity,
      state: relToState(
        relation(guess.spaceComplexity, answer.spaceComplexity)
      ),
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
