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
   ⭐ PARALLAX UNIVERSAL (PC + MÓVIL)
============================================================ */

function parallaxMove(dx, dy) {
    const amplitude = 28;
    for (const s of stars) {
        const z = s.dataset.z;
        s.style.transform = `translate3d(${dx * amplitude * z}px, ${dy * amplitude * z}px, 0)`;
    }
}

/* ===== PC (mouse) ===== */
window.addEventListener("mousemove", e => {
    const dx = (e.clientX / innerWidth) * 2 - 1;
    const dy = (e.clientY / innerHeight) * 2 - 1;
    stopShake(); resetInactivity();
    parallaxMove(dx, dy);
});

/* ===== Móvil – Touch ===== */
window.addEventListener("touchmove", e => {
    if (!e.touches.length) return;
    const t = e.touches[0];
    const dx = (t.clientX / innerWidth) * 2 - 1;
    const dy = (t.clientY / innerHeight) * 2 - 1;
    stopShake(); resetInactivity();
    parallaxMove(dx, dy);
}, { passive: true });

/* ===== Móvil – Giroscopio ===== */
function enableGyro() {
    if (typeof DeviceOrientationEvent === "undefined") return;

    function handler(e) {
        const dx = e.gamma / 45;
        const dy = e.beta / 45;
        parallaxMove(dx, dy);
    }

    if (DeviceOrientationEvent.requestPermission) {
        // iPhone iOS 13+
        DeviceOrientationEvent.requestPermission()
            .then(res => {
                if (res === "granted") {
                    window.addEventListener("deviceorientation", handler);
                }
            })
            .catch(console.warn);
    } else {
        // Android
        window.addEventListener("deviceorientation", handler);
    }
}

// activar giroscopio tras primer toque
window.addEventListener("touchstart", enableGyro, { once: true });



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
