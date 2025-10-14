// 1) Ordered classes (lower = better)
export enum ComplexityClass {
  CONSTANT = 0, // O(1)
  LOGARITHMIC = 1, // O(log n)
  SQRT = 2, // O(sqrt n)  (rare but supported)
  LINEAR = 3, // O(n), O(V+E), O(V)
  N_LOG_N = 4, // O(n log n), O(V log V), O(E + V log V)
  QUADRATIC = 5, // O(n^2)
  CUBIC = 6, // O(n^3)
  POLY = 7, // O(n^k) for k>3 (fallback)
  EXPONENTIAL = 8, // O(c^n), O(2^n)
  FACTORIAL = 9, // O(n!)
  UNKNOWN = 99,
}

// 2) Normalize free-text to a class
export function parseComplexity(
  input: string | undefined | null
): ComplexityClass {
  if (!input) return ComplexityClass.UNKNOWN;

  // normalize: lowercase, strip spaces & "O(" ")" and commas
  let s = input
    .toLowerCase()
    .replace(/[oO]\s*\(|\)|\s+/g, "")
    .replace(/,/g, "");

  // tolerate variations: "nlogn", "n*logn", "n log n", "log(n)"
  s = s.replace(/log\(?n\)?/g, "logn");
  s = s.replace(/nlog\(?n\)?/g, "nlogn");

  // unify unicode superscripts: "n²" → "n^2", "n³" → "n^3"
  s = s.replace(/n²/g, "n^2").replace(/n³/g, "n^3");

  // Graph-friendly: treat V ~ nodes, E ~ edges
  // O(V+E) ~ linear in input size
  if (/^v\+e$/.test(s) || /^e\+v$/.test(s) || s === "v" || s === "e") {
    return ComplexityClass.LINEAR;
  }

  // O(E + V log V) ~ quasilinear
  if (/e\+vlogv/.test(s) || /vlogv\+e/.test(s) || /vlogv/.test(s)) {
    return ComplexityClass.N_LOG_N;
  }

  // pure tokens
  if (s === "1") return ComplexityClass.CONSTANT;
  if (s === "logn") return ComplexityClass.LOGARITHMIC;
  if (s === "sqrt n" || s === "sqrtn" || s === "√n")
    return ComplexityClass.SQRT; // optional

  // linear forms
  if (s === "n" || s === "v" || s === "e") return ComplexityClass.LINEAR;

  // n log n forms
  if (s.includes("nlogn") || /n.*logn/.test(s)) return ComplexityClass.N_LOG_N;

  // polynomial powers
  if (s.includes("n^2") || s === "n2") return ComplexityClass.QUADRATIC;
  if (s.includes("n^3") || s === "n3") return ComplexityClass.CUBIC;
  if (/n\^\d+/.test(s)) return ComplexityClass.POLY;

  // exponential / factorial
  if (/\d+\^n/.test(s) || /c\^n/.test(s) || s === "2^n")
    return ComplexityClass.EXPONENTIAL;
  if (/n!/.test(s)) return ComplexityClass.FACTORIAL;

  // last-resort heuristics for your dataset variants
  if (s === "nlog(n)" || s === "nlogn") return ComplexityClass.N_LOG_N;
  if (s === "n²" || s === "n^2") return ComplexityClass.QUADRATIC;
  if (s === "logn") return ComplexityClass.LOGARITHMIC;

  return ComplexityClass.UNKNOWN;
}

// 3) Comparator returning -1/0/1 (a better than b / same / worse)
export function compareComplexities(a: string, b: string): number {
  const ca = parseComplexity(a);
  const cb = parseComplexity(b);
  if (ca === cb) return 0;
  // UNKNOWN ranks worst; anything beats UNKNOWN
  if (ca === ComplexityClass.UNKNOWN && cb !== ComplexityClass.UNKNOWN)
    return 1;
  if (cb === ComplexityClass.UNKNOWN && ca !== ComplexityClass.UNKNOWN)
    return -1;
  return ca < cb ? -1 : 1;
}

// 4) Friendly label
export function relation(
  a: string,
  b: string
): "better" | "same" | "worse" | "unknown" {
  const cmp = compareComplexities(a, b);
  if (cmp === -1) return "better";
  if (cmp === 0) return "same";
  if (cmp === 1) return "worse";
  return "unknown";
}
