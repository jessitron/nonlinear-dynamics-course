export type R = number;
export type Steps = number; // nonnegative int

export function logistic_map(r: R) {
  return (x: number) => r * x * (1 - x);
}

export type IterateMap = (x: number) => number;

export function step(fn: IterateMap, x: number, n: Steps, subscript: Steps = 0): number {
  if (n <= 0) {
    return x;
  }
  //console.log(`x[${subscript}] = ${x}`);
  return step(fn, fn(x), n - 1, subscript + 1);
}