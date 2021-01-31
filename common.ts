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

export function collectSteps(fn: IterateMap, x0: number, n: Steps = 50): number[] {
  function collectStepsInternal(fn: IterateMap, x: number, stepsToGo: Steps, soFar: number[]): number[] {
    if (stepsToGo <= 0) {
      return soFar;
    }
    const xNext = fn(x);
    soFar.push(xNext);
    return collectStepsInternal(fn, xNext, stepsToGo - 1, soFar);
  }
  return collectStepsInternal(fn, x0, n, []);
}