export function logistic_map(r) {
    return (x) => r * x * (1 - x);
}
export function step(fn, x, n, subscript = 0) {
    if (n <= 0) {
        return x;
    }
    //console.log(`x[${subscript}] = ${x}`);
    return step(fn, fn(x), n - 1, subscript + 1);
}
export function collectSteps(fn, x0, n = 50) {
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
