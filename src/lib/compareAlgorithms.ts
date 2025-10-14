// src/lib/compareAlgorithms.ts
import { Algorithm, FieldState, AlgorithmField } from "./types";

function normalize(str: string | undefined) {
  return str?.trim().toLowerCase() ?? "";
}

/**
 * Compare two algorithms and return data for AlgorithmGuessRow.
 */
export function compareAlgorithms(
  guess: Algorithm,
  correct: Algorithm
): AlgorithmField[] {
  const fields: { key: keyof Algorithm; label: string }[] = [
    { key: "name", label: "name" },
    { key: "type", label: "type" },
    { key: "timeComplexity", label: "time" },
    { key: "spaceComplexity", label: "space" },
    { key: "countryOfOrigin", label: "origin" },
    { key: "determanistic", label: "deterministic" },
  ];

  return fields.map(({ key, label }) => {
    const gVal = normalize(guess[key]);
    const cVal = normalize(correct[key]);

    let state: FieldState = "wrong";

    if (gVal === cVal && gVal !== "") state = "correct";
    else if (gVal && cVal && cVal.includes(gVal.slice(0, 3))) state = "partial";

    return {
      label,
      value: guess[key] ?? "—",
      state,
    };
  });
}
