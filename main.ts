
type R = number;
type Steps = number; // nonnegative int

function logistic_map(r: R) {
  return (x: number) => r * x * (1 - x);
}

type IterateMap = (x: number) => number;

function step(fn: IterateMap, x: number, n: Steps, subscript: Steps = 0): number {
  if (n <= 0) {
    return x;
  }
  console.log(`x[${subscript}] = ${x}`);
  return step(fn, fn(x), n - 1, subscript + 1);
}

console.log("Problem 1: " + step(logistic_map(2.5), 0.5, 3));
console.log("Problem 2: " + step(logistic_map(2.6), 0.2, 10));

