
type R = number;
type Steps = number; // nonnegative int

function logistic_map(r: R) {
  return (x: number) => r * x * (1 - x);
}

type IterateMap = (x: number) => number;

const canvas = (document.getElementById("chart1") as HTMLCanvasElement).getContext("2d");
if (!canvas) {
  throw "poo";
} else {
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

function step(fn: IterateMap, x: number, n: Steps, subscript: Steps = 0): number {
  if (n <= 0) {
    return x;
  }
  console.log(`x[${subscript}] = ${x}`);
  return step(fn, fn(x), n - 1, subscript + 1);
}

console.log("Problem 1: " + step(logistic_map(2.5), 0.5, 3));
console.log("Problem 2: " + step(logistic_map(2.6), 0.2, 10));

