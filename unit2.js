const canvasId = "unit2-chart1";
const terminateButtonId = "unit2-terminate";
function placeEmptyChart() {
    const canvas = document.getElementById(canvasId).getContext("2d");
    if (!canvas) {
        throw new Error("poo");
    }
    else {
        console.log("Placing an empty chart");
        // @ts-ignore: Yes this is available globally dammit
        return new Chart(canvas, {
            type: 'scatter',
            data: {
                datasets: [{ label: "R", data: [] }],
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
export function doHomework() {
    console.log("Starting worker to do Unit 2 homework");
    const worker = new Worker("unit2worker.js", { type: "module" });
    const terminate = document.getElementById(terminateButtonId);
    terminate?.addEventListener("click", _e => {
        worker.terminate();
    });
    const elementToFill = document.getElementById("unit2-commentary");
    let chart = placeEmptyChart();
    function addData(newPoint) {
        chart.data.datasets.forEach((dataset) => {
            // @ts-ignore: it doesn't know the type of data so thinks the new one has to be number&ChartPoint
            dataset.data.push(newPoint);
        });
        chart.update();
    }
    worker.addEventListener("message", (msg) => {
        if (typeof msg.data === "string") {
            elementToFill.innerText = msg.data;
            return;
        }
        const point = msg.data;
        console.log("got point: ", point);
        addData(point);
    });
    worker.addEventListener("error", err => {
        console.log("oh no!!", err);
    });
}
