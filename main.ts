
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

function collectSteps(fn: IterateMap, x0: number, n: Steps = 50): number[] {
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

const curlyXncurly = collectSteps(logistic_map(2), 0.2);

const toChartPoint = (xn: number, n: Steps) => ({ x: n, y: xn });

function zipWith<A, B>(fn: (a1: A, a2: A) => B, a1: A[], a2: A[]): B[] {
  // input arrays better be same length
  return a1.map((a, i) => fn(a, a2[i]));
}

type DataSet = { label: string, iterates: number[], color: string }
function toDataSet(config: DataSet): Chart.ChartDataSets {
  const { label, iterates, color } = config;
  return {
    label,
    data: iterates.map(toChartPoint),
    backgroundColor: color,
    borderColor: "brown",
    borderWidth: 1
  }
}

const curlyXHatncurly = collectSteps(logistic_map(2), 0.200001);
placeChartFrom0To1("chart1", [
  { label: 'r = 2, x0 = 0.2', iterates: curlyXncurly, color: "red" },
  { label: 'r = 2, x = 0.200001', iterates: curlyXHatncurly, color: "orange" }
]);

placeChart("chart2", [
  { label: 'x0=0.20001 - x0=0.2', iterates: zipWith((a, b) => a - b, curlyXHatncurly, curlyXncurly), color: "blue" },
]);

{
  const rOfInterest = 3.4;
  const firstStartingState = 0.2;
  const nearbyStartingState = firstStartingState + 0.000001;
  const seriesToCompare = [collectSteps(logistic_map(rOfInterest), firstStartingState), collectSteps(logistic_map(rOfInterest), nearbyStartingState)];
  placeChartFrom0To1("chart3", [
    { label: `r = ${rOfInterest}, x0 = ${firstStartingState}`, iterates: seriesToCompare[0], color: "red" },
    { label: `r = ${rOfInterest}, x = ${nearbyStartingState}`, iterates: seriesToCompare[1], color: "orange" }
  ]);

  placeChart("chart4", [
    { label: 'x0=0.20001 - x0=0.2', iterates: zipWith((a, b) => a - b, seriesToCompare[0], seriesToCompare[1]), color: "blue" },
  ]);
}


{
  const rOfInterest = 3.72;
  const firstStartingState = 0.2;
  const nearbyStartingState = firstStartingState + 0.000001;
  const seriesToCompare = [collectSteps(logistic_map(rOfInterest), firstStartingState), collectSteps(logistic_map(rOfInterest), nearbyStartingState)];
  placeChartFrom0To1("chart5", [
    { label: `r = ${rOfInterest}, x0 = ${firstStartingState}`, iterates: seriesToCompare[0], color: "red" },
    { label: `r = ${rOfInterest}, x = ${nearbyStartingState}`, iterates: seriesToCompare[1], color: "orange" }
  ]);

  placeChart("chart6", [
    { label: 'x0=0.20001 - x0=0.2', iterates: zipWith((a, b) => a - b, seriesToCompare[0], seriesToCompare[1]), color: "blue" },
  ]);
}

function placeChartFrom0To1(canvasId: string, data: DataSet[]): void {
  const canvas = (document.getElementById(canvasId) as HTMLCanvasElement).getContext("2d");
  if (!canvas) {
    throw "poo";
  } else {
    new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: data.map(toDataSet),
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
}


function placeChart(canvasId: string, data: DataSet[]): void {
  const canvas = (document.getElementById(canvasId) as HTMLCanvasElement).getContext("2d");
  if (!canvas) {
    throw "poo";
  } else {
    new Chart(canvas, {
      type: 'scatter',
      data: {
        datasets: data.map(toDataSet),
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
            }
          }]
        }
      }
    });
  }
}
