/* ============================================================
   ⭐ GENERADOR DE ESTRELLAS
============================================================ */

const starContainer = document.getElementById("stars-layer");
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
   ⭐ PARALLAX
============================================================ */

function parallaxMove(dx, dy) {
    const amplitude = 28;

    for (const s of stars) {
        const z = s.dataset.z;
        s.style.transform = `translate3d(${dx * amplitude * z}px, ${dy * amplitude * z}px, 0)`;
    }
}


/* Desktop: Mouse */
window.addEventListener("mousemove", e => {
    const dx = (e.clientX / innerWidth) * 2 - 1;
    const dy = (e.clientY / innerHeight) * 2 - 1;
    parallaxMove(dx, dy);
});


/* ============================================================
   ⭐ MÓVIL: GIROSCOPIO (iOS + Android)
============================================================ */

const motionButton = document.getElementById("enable-motion");

function handleOrientation(e) {
    const dx = (e.gamma || 0) / 25;
    const dy = (e.beta  || 0) / 25;
    parallaxMove(dx, dy);
}

function handleMotion(e) {
    if (!e.accelerationIncludingGravity) return;

    const dx = e.accelerationIncludingGravity.x / 10;
    const dy = e.accelerationIncludingGravity.y / 10;
    parallaxMove(dx, dy);
}

function activateMotion() {
    // iOS requiere permiso
    if (typeof DeviceOrientationEvent !== "undefined" &&
        typeof DeviceOrientationEvent.requestPermission === "function") {

        DeviceOrientationEvent.requestPermission().then(res => {
            if (res === "granted") {
                startGyro();
                motionButton.style.display = "none";
            } else {
                alert("Permiso denegado");
            }
        });

    } else {
        // Android
        startGyro();
        motionButton.style.display = "none";
    }
}

function startGyro() {
    window.addEventListener("deviceorientation", handleOrientation, true);
    window.addEventListener("devicemotion", handleMotion, true);
}

motionButton.addEventListener("click", activateMotion);


/* ============================================================
   ⭐ MENÚ MÓVIL
============================================================ */

const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    siteMenu.classList.toggle("mobile");
    siteMenu.classList.toggle("show");
});
