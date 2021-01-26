
type R = number;
type Steps = number; // nonnegative int

function logistic_map(r: R) {
  return (x: number) => r * x * (1 - x);
}

type DifferenceEquation = (x: number) => number;

function step(fn: DifferenceEquation, x: number, n: Steps, subscript: Steps = 0): number {
  if (n <= 0) {
    return x;
  }
  //console.log(`x[${subscript}] = ${x}`);
  return step(fn, fn(x), n - 1, subscript + 1);
}

console.log("Problem 1: " + step(logistic_map(2.5), 0.5, 3));
console.log("Problem 2: " + step(logistic_map(2.6), 0.2, 10));


// Homework 1.4

function collectSteps(fn: DifferenceEquation, x0: number, n: Steps = 50): number[] {
  function collectStepsInternal(fn: DifferenceEquation, x: number, stepsToGo: Steps, soFar: number[]): number[] {
    if (stepsToGo <= 0) {
      return soFar;
    }
    const xNext = fn(x);
    soFar.push(xNext);
    return collectStepsInternal(fn, xNext, stepsToGo - 1, soFar);
  }
  return collectStepsInternal(fn, x0, n, []);
}

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

{
  const rOfInterest = 2;
  const firstStartingState = 0.2;
  const nearbyStartingState = firstStartingState + 0.000001;
  const seriesToCompare = [collectSteps(logistic_map(rOfInterest), firstStartingState), collectSteps(logistic_map(rOfInterest), nearbyStartingState)];
  placeChartFrom0To1("chart1", [
    { label: `r = ${rOfInterest}, x0 = ${firstStartingState}`, iterates: seriesToCompare[0], color: "red" },
    { label: `r = ${rOfInterest}, x = ${nearbyStartingState}`, iterates: seriesToCompare[1], color: "orange" }
  ]);

  placeChart("chart2", [
    { label: 'x0=0.20001 - x0=0.2', iterates: zipWith((a, b) => a - b, seriesToCompare[0], seriesToCompare[1]), color: "blue" },
  ]);

  const aFarStep = 500;
  const fiveHundredthDifference = step(logistic_map(rOfInterest), firstStartingState, aFarStep)
    - step(logistic_map(rOfInterest), nearbyStartingState, aFarStep);
  const blank = document.getElementById("answer1");
  if (!!blank) { blank.innerText = "" + fiveHundredthDifference; }
}

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


  const aFarStep = 500;
  const fiveHundredthDifference = step(logistic_map(rOfInterest), firstStartingState, aFarStep)
    - step(logistic_map(rOfInterest), nearbyStartingState, aFarStep);
  const blank = document.getElementById("answer2");
  if (!!blank) { blank.innerText = "" + fiveHundredthDifference; }
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

  {
    const aFarStep = 5000;
    const fiveHundredDifferences = zipWith((a, b) => a - b,
      collectSteps(logistic_map(rOfInterest), firstStartingState, aFarStep),
      collectSteps(logistic_map(rOfInterest), nearbyStartingState, aFarStep));
    const averageDifference = fiveHundredDifferences.map(Math.abs).reduce((a, b) => a + b, 0) / aFarStep;

    const blank = document.getElementById("answer3");
    if (!!blank) { blank.innerText = "" + averageDifference; }
  }
  {
    // OK, this one takes too much memory to do in the browser.
    // I could use streams, but really Jess, just write the function.

    class DiscreteSystem {
      private state: number;
      constructor(private fn: DifferenceEquation, x0: number) {
        this.state = x0;
      }

      // advance one step; return the new value
      public step(): number {
        this.state = this.fn(this.state);
        return this.state;
      }
    }

    const iterate1 = new DiscreteSystem(logistic_map(rOfInterest), firstStartingState);
    const iterate2 = new DiscreteSystem(logistic_map(rOfInterest), nearbyStartingState);
    const aFarStep = 500000;
    let fiveHundredThousandDifferences = 0;
    console.log("Starting to calculate a big one");
    for (let i = 0; i < aFarStep; i++) {
      const difference = Math.abs(iterate1.step() - iterate2.step());
      fiveHundredThousandDifferences += difference;
    }

    const averageDifference = fiveHundredThousandDifferences / aFarStep;
    console.log("Answer 4 should be: " + averageDifference);
    const blank = document.getElementById("answer4");
    if (!!blank) { blank.innerText = "" + averageDifference; }
  }
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
