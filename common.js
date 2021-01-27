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
