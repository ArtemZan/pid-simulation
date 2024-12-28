
let x = 100;
let v = 0;
let targetA = 0;
let a = 0;
const aMax = 9000;
let integral = 0;

const reactivity = 300;

let ctx

let P, I, D

function formatNumber(n) {
    const rounded = Math.round(n)
    return String(rounded)
}

let iterations = 0;

function setThrottle(value) {
    setTimeout(() => {
        a = value
    }, 10)
}

function render() {
    const point = document.getElementById("point")
    const dt = 0.01

    for (let i = 0; i < 1; i++) {
        iterations++;


        targetA = Math.max(Math.min(P * x + I * integral + D * v, aMax), -aMax)
        console.log(a, P * x, D * v)

        integral += x * dt;
        x += v * dt;
        v += a * dt;
        a = (Math.abs(targetA - a) < reactivity * dt) ? targetA : (a + Math.sign(targetA - a) * reactivity * dt)

        // if (iterations % 1000 === 0) {
        //     // Simulate some random external impulse
        //     // Probability distribution = 50% / second
        //     const vErrorChance = 0
        //     const vErrorAmplitude = 150
        //     const vError = (Math.random() - 0.5) * 2 * vErrorAmplitude

        //     if (Math.random() < vErrorChance) {
        //         console.log("Push: ", vError)
        //         v += vError
        //     }
        // }
        ctx.strokeStyle = "rgba(0, 120, 0, 0.5)"
        ctx.beginPath();
        ctx.moveTo(iterations / 1, 600);
        ctx.lineTo(iterations / 1, 300 - v);
        ctx.stroke();

        ctx.strokeStyle = "rgba(120, 0, 0, 0.5)"
        ctx.beginPath();
        ctx.moveTo(iterations / 1, 600)
        ctx.lineTo(iterations / 1, 300 - a);
        ctx.stroke();
    }



    point.style.left = (x + 200) + "px"
    document.getElementById("x").innerHTML = formatNumber(x)
    document.getElementById("v").innerHTML = formatNumber(v)
    document.getElementById("a").innerHTML = formatNumber(a)
    document.getElementById("iterations").innerHTML = iterations

    requestAnimationFrame(render)
}

function getSliderValue(name) {
    const input = document.getElementById(name + "-slider")
    return Number(input.value)
}

function createSlider(name) {
    // <label>P</label>
    //     <input type="range" min="-10" max="0" step="0.1" value="0" id="P-slider">
    //     <p id="P-slider-value"></p>

    const label = document.createElement("label")
    label.textContent = name

    const input = document.createElement("input")
    input.type = "range"
    input.min = "-10"
    input.max = "0"
    input.step = "0.1"
    input.value = "0"
    input.id = name + "-slider"

    const valueHolder = document.createElement("p")
    valueHolder.id = `${name}-slider-value`
    // valueHolder.style.marginRight = "15px"

    input.addEventListener("input", e => {
        valueHolder.textContent = e.target.value
    })

    const container = document.getElementById("inputs-container")

    container.prepend(label, input, valueHolder)
}

function onLoad() {
    const canvas = document.getElementById("canvas")
    ctx = canvas.getContext("2d")
    ctx.strokeStyle = "#000000"
    ctx.beginPath();
    ctx.moveTo(0, 300);
    ctx.lineTo(1200, 300);
    ctx.stroke();
    ctx.globalAlpha = 0.2;

    createSlider("P")
    createSlider("I")
    createSlider("D")

    document.getElementById("start-button").addEventListener("click", () => {
        P = getSliderValue("P")
        I = getSliderValue("I")
        D = getSliderValue("D")

        console.log(P, I, D)
        render()
    })



}

document.addEventListener("DOMContentLoaded", onLoad)
