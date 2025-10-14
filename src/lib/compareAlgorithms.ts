// src/lib/compareAlgorithms.ts

export interface Algorithm {
  name: string
  Type: string
  TimeComplexity: string
  spaceComplexity?: string
  countryOfOrigin: string
  determanistic?: string
}

export type FieldState = "correct" | "partial" | "wrong"

export interface AlgorithmField {
  label: string
  value: string
  state: FieldState
}

function normalize(str: string | undefined) {
  return str?.trim().toLowerCase() ?? ""
}

/**
 * Compare two algorithms and return data for AlgorithmGuessRow.
 */
export function compareAlgorithms(guess: Algorithm, correct: Algorithm): AlgorithmField[] {
  const fields: { key: keyof Algorithm; label: string }[] = [
    { key: "name", label: "name" },
    { key: "Type", label: "Type" },
    { key: "TimeComplexity", label: "Time" },
    { key: "spaceComplexity", label: "Space" },
    { key: "countryOfOrigin", label: "Origin" },
    { key: "determanistic", label: "Deterministic" },
  ]

  return fields.map(({ key, label }) => {
    const gVal = normalize(guess[key])
    const cVal = normalize(correct[key])

    let state: FieldState = "wrong"

    if (gVal === cVal && gVal !== "") state = "correct"
    else if (gVal && cVal && cVal.includes(gVal.slice(0, 3))) state = "partial"

    return {
      label,
      value: guess[key] ?? "—",
      state,
    }
  })
}
