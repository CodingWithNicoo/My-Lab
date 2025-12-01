/* ============================================================
   ⭐ GENERAR ESTRELLAS
============================================================ */

const starsLayer = document.getElementById("stars-layer");
let stars = [];

function createStars() {
    const COUNT = 220;
    starsLayer.innerHTML = "";
    stars = new Array(COUNT);

    for (let i = 0; i < COUNT; i++) {
        const el = document.createElement("div");
        el.className = "star";

        const size = (Math.random() ** 2) * 2.3 + 0.6;
        el.style.width = el.style.height = size + "px";

        el.style.top = Math.random() * 100 + "vh";
        el.style.left = Math.random() * 100 + "vw";

        el.dataset.z = Math.random() * 1.8 + 0.2;

        starsLayer.appendChild(el);
        stars[i] = el;
    }
}

createStars();

/* ============================================================
   ⭐ PARALLAX 3D MEJORADO
============================================================ */

function parallaxMove(dx, dy) {
    const amplitude = 28;

    for (const s of stars) {
        const z = s.dataset.z;
        s.style.transform = `translate3d(${dx * amplitude * z}px, ${dy * amplitude * z}px, 0)`;
    }
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
   ⭐ SHAKE EN INACTIVIDAD
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
    s.style.left = "-10vw";
    starsLayer.appendChild(s);

    setTimeout(() => s.remove(), 2000);
}

(function shootingStarLoop() {
    setTimeout(() => {
        createShootingStar();
        shootingStarLoop();
    }, Math.random() * 4000 + 3000);
})();

/* ============================================================
   ⭐ MENÚ MÓVIL ARREGLADO
============================================================ */

const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("site-menu");

function checkMobileMenu() {
    if (window.innerWidth <= 768) {
        menu.classList.add("mobile");
    } else {
        menu.classList.remove("mobile", "show");
        toggle.classList.remove("active");
    }
}

checkMobileMenu();
window.addEventListener("resize", checkMobileMenu);

toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    menu.classList.toggle("show");
});
