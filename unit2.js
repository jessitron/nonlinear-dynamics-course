export function doHomework() {
    console.log("Starting worker to do Unit 2 homework");
    const worker = new Worker("unit2worker.js");
    const elementToFill = document.getElementById("unit2-content");
    worker.addEventListener("message", (msg) => {
        elementToFill.innerText = msg.data;
    });
}
