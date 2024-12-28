
let x = 10;
let v = 0;
let a = 0;
const aMax = 90;

function formatNumber(n) {
    const rounded = Math.round(n)
    return String(rounded)
}

function closeEnough(a, b) {
    return Math.abs(a - b) < 1 ? 1 : 0
}

let iterations = 0;

function setThrottle(value) {
    setTimeout(() => {
        a = value
    }, 10)
}

function render() {
    const point = document.getElementById("point")
    const dt = 0.000_05
    
    for(let i = 0; i < 1000; i++) {
        iterations++;
        

        const expectedA = Math.abs((v**2) / (2 * x))
        if(closeEnough(x, 0) && closeEnough(v, 0)) {
            setThrottle(0)
        }
        else {
            if(expectedA < aMax) {
                if(expectedA > 0.3 * aMax) {
                    setThrottle(expectedA * -Math.sign(v))
                }
                else {
                    setThrottle(aMax * -Math.sign(x))
                }
            }
            else {
                setThrottle(aMax * -Math.sign(v))
            }
        }

        x += v * dt;
        v += a * dt;

        if(iterations % 10_000 === 0) {
            // Simulate some random external impulse
            // Probability distribution = 50% / second
            const vErrorChance = 0.25
            const vErrorAmplitude = aMax * 1 // Equvalent to 5 * max acceleration for 0.1 second
            const vError = (Math.random() - 0.5) * 2 * vErrorAmplitude

            if(Math.random() < vErrorChance) { 
                console.log("Push: ", vError)
                v += vError
            }
        }
    }


    point.style.left = (x + 200) + "px"
    document.getElementById("x").innerHTML = formatNumber(x)
    document.getElementById("v").innerHTML = formatNumber(v)
    document.getElementById("a").innerHTML = formatNumber(a)
    document.getElementById("iterations").innerHTML = iterations

    requestAnimationFrame(render)
}

document.addEventListener("DOMContentLoaded", render)
