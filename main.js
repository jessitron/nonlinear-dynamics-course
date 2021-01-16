"use strict";
function logistic_map(r) {
    return (x) => r * x * (1 - x);
}
function step(fn, x, n, subscript = 0) {
    if (n <= 0) {
        return x;
    }
    console.log(`x[${subscript}] = ${x}`);
    return step(fn, fn(x), n - 1, subscript + 1);
}
console.log("Problem 1: " + step(logistic_map(2.5), 0.5, 3));
console.log("Problem 2: " + step(logistic_map(2.6), 0.2, 10));
// Homework 1.4
function collectSteps(fn, x0, n = 50) {
    function collectStepsInternal(fn, x, stepsToGo, soFar) {
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
const toChartPoint = (xn, n) => ({ x: n, y: xn });
function toDataSet(config) {
    const { label, iterates, color } = config;
    return {
        label,
        data: iterates.map(toChartPoint),
        backgroundColor: color,
        borderColor: "brown",
        borderWidth: 1
    };
}
const curlyXHatncurly = collectSteps(logistic_map(2), 0.200001);
placeChartFrom0To1("chart1", [
    { label: 'r = 2, x0 = 0.2', iterates: curlyXncurly, color: "red" },
    { label: 'r = 2, x = 0.200001', iterates: curlyXHatncurly, color: "orange" }
]);
function zipWith(fn, a1, a2) {
    // input arrays better be same length
    return a1.map((a, i) => fn(a, a2[i]));
}
placeChart("chart2", [
    { label: 'x0=0.20001 - x0=0.2', iterates: zipWith((a, b) => a - b, curlyXHatncurly, curlyXncurly), color: "blue" },
]);
function placeChartFrom0To1(canvasId, data) {
    const canvas = document.getElementById(canvasId).getContext("2d");
    if (!canvas) {
        throw "poo";
    }
    else {
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
function placeChart(canvasId, data) {
    const canvas = document.getElementById(canvasId).getContext("2d");
    if (!canvas) {
        throw "poo";
    }
    else {
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
                            ticks: {}
                        }]
                }
            }
        });
    }
}
