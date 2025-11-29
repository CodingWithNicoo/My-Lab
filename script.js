/* ============================================================
   ⭐ GENERAR ESTRELLAS
============================================================ */

const starsLayer = document.getElementById("stars-layer");
let stars = [];

function createStars() {
    starsLayer.innerHTML = "";
    stars = [];

    const COUNT = 200;

    for (let i = 0; i < COUNT; i++) {
        const s = document.createElement("div");
        s.className = "star";

        const size = Math.random() * 2 + 1;
        s.style.width = size + "px";
        s.style.height = size + "px";

        s.style.top = Math.random() * 100 + "vh";
        s.style.left = Math.random() * 100 + "vw";

        s.dataset.z = Math.random() * 1.4 + 0.2;

        starsLayer.appendChild(s);
        stars.push(s);
    }
}

createStars();



/* ============================================================
   ⭐ PARALLAX (FUNCIONA)
============================================================ */

function parallaxMove(dx, dy) {
    const amp = 18; // intensidad del parallax

    stars.forEach(s => {
        const z = parseFloat(s.dataset.z);
        const tx = dx * amp * z;
        const ty = dy * amp * z;
        s.style.transform = `translate(${tx}px, ${ty}px)`;
    });
}

window.addEventListener("mousemove", e => {
    const dx = (e.clientX - innerWidth / 2) / (innerWidth / 2);
    const dy = (e.clientY - innerHeight / 2) / (innerHeight / 2);
    resetInactivity(); 
    deactivateGlitch();
    parallaxMove(dx, dy);
});

window.addEventListener("touchmove", e => {
    const t = e.touches[0];
    const dx = (t.clientX - innerWidth / 2) / (innerWidth / 2);
    const dy = (t.clientY - innerHeight / 2) / (innerHeight / 2);
    resetInactivity();
    deactivateGlitch();
    parallaxMove(dx, dy);
}, { passive: true });



/* ============================================================
   ⭐ INACTIVIDAD → GLITCH (FUNCIONA)
============================================================ */

let inactivityTimer;
const waitTime = 4000; // tiempo antes del glitch

function activateGlitch() {
    starsLayer.classList.add("glitch-active");
}

function deactivateGlitch() {
    starsLayer.classList.remove("glitch-active");
}

function resetInactivity() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(activateGlitch, waitTime);
}

resetInactivity();



/* ============================================================
   ⭐ MENÚ MÓVIL
============================================================ */

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("site-menu");

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("show");
});
