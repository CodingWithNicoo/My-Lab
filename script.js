/* ============================================================
   ⭐ GENERAR ESTRELLAS
============================================================ */

const starsLayer = document.getElementById("stars-layer");
let stars = [];

function createStars() {
    starsLayer.innerHTML = "";
    stars = [];

    const COUNT = 220; // más estrellas, efecto más denso

    for (let i = 0; i < COUNT; i++) {
        const s = document.createElement("div");
        s.className = "star";

        const size = (Math.random() ** 2) * 2.3 + 0.6;
        s.style.width = size + "px";
        s.style.height = size + "px";

        s.style.top = Math.random() * 100 + "vh";
        s.style.left = Math.random() * 100 + "vw";

        // profundidad real 3D
        s.dataset.z = Math.random() * 1.8 + 0.2;

        starsLayer.appendChild(s);
        stars.push(s);
    }
}

createStars();



/* ============================================================
   ⭐ PARALLAX 3D MEJORADO
============================================================ */

function parallaxMove(dx, dy) {
    const amplitude = 28; // más profundidad

    stars.forEach(s => {
        const z = parseFloat(s.dataset.z);
        const tx = dx * amplitude * z;
        const ty = dy * amplitude * z;

        s.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
}

function handleMove(x, y) {
    const dx = (x - innerWidth / 2) / (innerWidth / 2);
    const dy = (y - innerHeight / 2) / (innerHeight / 2);

    resetInactivity();
    stopShake();
    parallaxMove(dx, dy);
}

window.addEventListener("mousemove", e => handleMove(e.clientX, e.clientY));
window.addEventListener("touchmove", e => {
    const t = e.touches[0];
    handleMove(t.clientX, t.clientY);
}, { passive: true });



/* ============================================================
   ⭐ SHAKE SUAVE EN INACTIVIDAD
============================================================ */

let inactivityTimer;
const waitTime = 3500;

function startShake() {
    starsLayer.classList.add("shake-on");
}

function stopShake() {
    starsLayer.classList.remove("shake-on");
}

function resetInactivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(startShake, waitTime);
}

resetInactivity();



/* ============================================================
   ⭐ ESTRELLAS FUGACES
============================================================ */

function createShootingStar() {
    const s = document.createElement("div");
    s.className = "shooting-star";

    s.style.top = Math.random() * 60 + "vh";
    s.style.left = "-10vw"; // empieza fuera de pantalla

    starsLayer.appendChild(s);

    setTimeout(() => s.remove(), 2000); // eliminar después de animar
}

function shootingStarLoop() {
    const delay = Math.random() * 4000 + 3000; // entre 3 y 7 segundos
    setTimeout(() => {
        createShootingStar();
        shootingStarLoop();
    }, delay);
}

shootingStarLoop();



/* ============================================================
   ⭐ MENÚ MÓVIL
============================================================ */

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("site-menu");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("show");
});
