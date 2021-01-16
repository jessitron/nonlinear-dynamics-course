
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


// Homework 1.4

const canvas = (document.getElementById("chart1") as HTMLCanvasElement).getContext("2d");
if (!canvas) {
  throw "poo";
} else {
  new Chart(canvas, {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'r = 2, x0 = 0.2',
        data: [{ x: 0, y: 0.2 }, { x: 1, y: 0.5 }],
        backgroundColor: "red",
        borderColor: "brown",
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        xAxes: [{
          type: 'linear',
          position: 'bottom',
        }],
        yAxes: [{
          type: 'linear',
          ticks: {
            beginAtZero: true,
            suggestedMin: 0,
            suggestedMax: 1.0,
          }
        }]
      }
    }
  });
}

