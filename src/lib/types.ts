export interface Algorithm {
  name: string;
  type: string;
  timeComplexity: string;
  spaceComplexity: string;
  countryOfOrigin: string;
  determanistic: "Yes" | "No";
}

export type FieldState = "correct" | "partial" | "wrong" | "better" | "worse";

export interface AlgorithmField {
  label: string;
  value: string;
  state: FieldState;
}
