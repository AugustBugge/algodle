// src/lib/checkGuess.ts
export function checkAlgorithmGuess(
  guess: string,
  correctAlgorithm: string
): boolean {
  if (!guess || !correctAlgorithm) return false;

  // normalize: lowercase, trim, remove extra spaces
  const normalize = (s: string) => s.trim().toLowerCase().replace(/\s+/g, " ");

  return normalize(guess) === normalize(correctAlgorithm);
}
