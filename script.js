/* ============================================================
   ⭐ GENERADOR DE ESTRELLAS
============================================================ */

const starContainer = document.getElementById("star-layer");
const starCount = 200;
const stars = [];

for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 2 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const depth = Math.random() * 0.6 + 0.2;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    star.dataset.z = depth;

    starContainer.appendChild(star);
    stars.push(star);
}


/* ============================================================
   ⭐ FUNCIÓN PARALLAX UNIVERSAL
============================================================ */

function parallaxMove(dx, dy) {
    const amplitude = 28;

    for (const s of stars) {
        const z = s.dataset.z;
        s.style.transform = `translate3d(${dx * amplitude * z}px, ${dy * amplitude * z}px, 0)`;
    }
}


/* ============================================================
   ⭐ PARALLAX DESKTOP (MOUSE)
============================================================ */

window.addEventListener("mousemove", e => {
    const dx = (e.clientX / innerWidth) * 2 - 1;
    const dy = (e.clientY / innerHeight) * 2 - 1;
    stopShake();
    resetInactivity();
    parallaxMove(dx, dy);
});


/* ============================================================
   ⭐ PARALLAX TOUCH
============================================================ */

window.addEventListener("touchmove", e => {
    if (!e.touches.length) return;
    const t = e.touches[0];

    const dx = (t.clientX / innerWidth) * 2 - 1;
    const dy = (t.clientY / innerHeight) * 2 - 1;

    stopShake();
    resetInactivity();
    parallaxMove(dx, dy);

}, { passive: true });



/* ============================================================
   ⭐ PARALLAX GIROSCOPIO (ANDROID + IPHONE)
   Funciona en Xiaomi, Samsung, Pixel, iPhone, tablets…
============================================================ */

let gyroEnabled = false;

function handleOrientation(e) {
    const dx = (e.gamma || 0) / 30;
    const dy = (e.beta  || 0) / 30;
    parallaxMove(dx, dy);
}

function handleMotion(e) {
    if (!e.accelerationIncludingGravity) return;

    const ax = e.accelerationIncludingGravity.x || 0;
    const ay = e.accelerationIncludingGravity.y || 0;

    const dx = ax / 10;
    const dy = ay / 10;

    parallaxMove(dx, dy);
}

function enableGyroFinal() {
    if (gyroEnabled) return;
    gyroEnabled = true;

    console.log("Giroscopio activado");

    if (typeof DeviceOrientationEvent !== "undefined") {

        if (DeviceOrientationEvent.requestPermission) {
            // iPhone pide permiso
            DeviceOrientationEvent.requestPermission()
                .then(res => {
                    if (res === "granted") {
                        window.addEventListener("deviceorientation", handleOrientation);
                    }
                });
        } else {
            // Android ya lo soporta
            window.addEventListener("deviceorientation", handleOrientation);
        }
    }

    // Para Xiaomi que solo envía devicemotion
    if (typeof DeviceMotionEvent !== "undefined") {
        window.addEventListener("devicemotion", handleMotion);
    }
}

window.addEventListener("touchstart", enableGyroFinal, { once: true });
window.addEventListener("click", enableGyroFinal, { once: true });



/* ============================================================
   ⭐ SISTEMA ANTIBLOQUEO: SHAKE AUTOMÁTICO
============================================================ */

let inactivityTimer;
let shaking = false;
let shakeInterval;

function startShake() {
    if (shaking) return;
    shaking = true;

    shakeInterval = setInterval(() => {
        const dx = (Math.random() - 0.5) * 0.6;
        const dy = (Math.random() - 0.5) * 0.6;
        parallaxMove(dx, dy);
    }, 400);
}

function stopShake() {
    if (!shaking) return;
    shaking = false;
    clearInterval(shakeInterval);
}

function resetInactivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(startShake, 3000);
}

resetInactivity();
