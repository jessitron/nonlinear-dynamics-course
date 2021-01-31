import { collectSteps, logistic_map } from "./common.js";
postMessage("Here is a strong");
function transmit(...points) {
    console.log("Sending " + points.length + " points");
    points.forEach(p => postMessage(p));
}
/**
 * Write a program to construct a bifurcation diagram for the logistic map.
 *  (Hint: this should be a loop that calls your logistic map program from Unit 1.3.)
 *  Your program should take the following arguments:

An initial condition x0
An rmin and an rmax that specify a range of r values for the x-axis of your bifurcation plot
An rstep, which specifies how many "slices" your plot has
A number n of total iterates to perform
A number k of total iterates to discard without plotting (i.e., to remove the transient)
The output should be a plot of the logistic map bifurcation diagram for a range of r.

Check your program by constructing a bifurcation plot for r between 2.4 and 4 with a step size of 0.01.
For each r, construct a 1000-iterate trajectory from x0 = 0.2, and discard the first five points --
i.e., plot x5 to x1000 for each r.
 */
const rmin = 2.4;
const rmax = 4;
const x0 = 0.2;
const rstep = 0.1;
const transientSteps = 10;
const maxSteps = 50; // 1000;
for (let anR = rmin; anR += rstep; anR <= rmax) {
    const allStepsForAnR = collectSteps(logistic_map(anR), x0, maxSteps);
    const interestingStepsForAnR = allStepsForAnR.slice(transientSteps);
    const points = interestingStepsForAnR.map(d => ({ x: anR, y: d }));
    transmit(...points);
}
