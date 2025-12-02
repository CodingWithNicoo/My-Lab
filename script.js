/* ============================================================
   script.js - Estrellas, Parallax, Gyro y Menú móvil
   - Recomendado: <script defer src="script.js"></script> en HTML
============================================================ */

/* ------------------------------
   Helpers y referencias DOM
------------------------------- */
const starContainer = document.getElementById("stars-layer");
const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");

/* Si no existe starContainer, prevenimos errores */
if (!starContainer) {
  console.warn("No se encontró #stars-layer — se omiten las estrellas.");
}

/* ------------------------------
   GENERADOR DE ESTRELLAS
------------------------------- */
const starCount = 200;
const stars = [];

if (starContainer) {
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.className = "star";

    const size = Math.random() * 2 + 1; // 1 - 3px
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const depth = Math.random() * 0.6 + 0.2; // 0.2 - 0.8

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    star.dataset.z = depth;

    starContainer.appendChild(star);
    stars.push(star);
  }
}

/* ------------------------------
   PARALLAX (optimizado con RAF)
   - Mouse parallax en desktop
   - Gyro en móvil
   - TOUCH parallax DESACTIVADO (evita el bug)
------------------------------- */

let lastDx = 0;
let lastDy = 0;
let rafId = null;
const amplitude = 28;

function applyParallax(dx, dy) {
  // solo actualizamos si cambió suficiente
  lastDx = dx;
  lastDy = dy;

  if (!stars.length) return;
  for (const s of stars) {
    const z = parseFloat(s.dataset.z) || 0.4;
    s.style.transform = `translate3d(${dx * amplitude * z}px, ${dy * amplitude * z}px, 0)`;
  }
}

function scheduleParallax(dx, dy) {
  // cancelamos RAF anterior y pedimos uno nuevo
  if (rafId) cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => applyParallax(dx, dy));
}

/* Mouse (desktop) */
function isMobileScreen() {
  return window.matchMedia && window.matchMedia("(pointer: coarse)").matches;
}

if (!isMobileScreen()) {
  window.addEventListener("mousemove", e => {
    const dx = (e.clientX / innerWidth) * 2 - 1;
    const dy = (e.clientY / innerHeight) * 2 - 1;
    stopShake();
    resetInactivity();
    scheduleParallax(dx, dy);
  }, { passive: true });
}

/* NOTE: touchmove intentionally disabled to avoid mobile jitter */

/* ------------------------------
   GIROSCOPIO MÓVIL (habilitado con interacción)
------------------------------- */

let gyroEnabled = false;

function handleOrientation(e) {
  const dx = (e.gamma || 0) / 30;
  const dy = (e.beta || 0) / 30;
  scheduleParallax(dx, dy);
}

function handleMotion(e) {
  if (!e.accelerationIncludingGravity) return;
  const ax = e.accelerationIncludingGravity.x || 0;
  const ay = e.accelerationIncludingGravity.y || 0;
  const dx = ax / 10;
  const dy = ay / 10;
  scheduleParallax(dx, dy);
}

function enableGyroFinal() {
  if (gyroEnabled) return;
  gyroEnabled = true;

  // iOS requires requestPermission on DeviceOrientationEvent
  if (typeof DeviceOrientationEvent !== "undefined") {
    if (DeviceOrientationEvent.requestPermission) {
      DeviceOrientationEvent.requestPermission()
        .then(res => {
          if (res === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        })
        .catch(() => {
          // permiso denegado o no disponible
        });
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }
  }

  if (typeof DeviceMotionEvent !== "undefined") {
    try {
      window.addEventListener("devicemotion", handleMotion);
    } catch (err) {
      // algunos navegadores exigen permiso similar
    }
  }
}

/* activamos gyros en primer toque o click (no forzamos touchmove) */
window.addEventListener("touchstart", enableGyroFinal, { once: true });
window.addEventListener("click", enableGyroFinal, { once: true });

/* ------------------------------
   SISTEMA ANTIBLOQUEO: SHAKE AUTOMÁTICO
------------------------------- */
let inactivityTimer;
let shaking = false;
let shakeInterval;

function startShake() {
  if (shaking) return;
  shaking = true;
  // añadir clase para aplicar otras animaciones si quieres
  if (starContainer) starContainer.classList.add("shake-on");

  shakeInterval = setInterval(() => {
    const dx = (Math.random() - 0.5) * 0.6;
    const dy = (Math.random() - 0.5) * 0.6;
    scheduleParallax(dx, dy);
  }, 400);
}

function stopShake() {
  if (!shaking) return;
  shaking = false;
  if (starContainer) starContainer.classList.remove("shake-on");
  clearInterval(shakeInterval);
}

function resetInactivity() {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(startShake, 3000);
}

resetInactivity();

/* ------------------------------
   ESTRELLAS FUGACES (automáticas)
------------------------------- */

function spawnShootingStar() {
  if (!document.body) return;
  const s = document.createElement("div");
  s.className = "shooting-star";

  // random start pos (off-screen left/top)
  const startX = Math.random() * 30 - 40; // -40vw .. -10vw
  const startY = Math.random() * 50; // 0..50vh
  s.style.left = `${startX}vw`;
  s.style.top = `${startY}vh`;

  document.body.appendChild(s);

  // remover después de la animación
  setTimeout(() => {
    s.remove();
  }, 1900);
}

// esporádicamente lanzar una shooting star
setInterval(() => {
  // probabilidad baja cada vez
  if (Math.random() < 0.25) spawnShootingStar();
}, 2500);

/* ------------------------------
   MENÚ MÓVIL FUNCIONAL
------------------------------- */

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.classList.toggle("active");
    siteMenu.classList.toggle("mobile");
    siteMenu.classList.toggle("show");
    // accesibilidad
    const isExpanded = expanded ? "true" : "false";
    menuToggle.setAttribute("aria-expanded", isExpanded);
  });

  // cerrar menú al navegar (útil en mobile)
  siteMenu.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => {
      if (menuToggle.classList.contains("active")) {
        menuToggle.classList.remove("active");
        siteMenu.classList.remove("show");
        siteMenu.classList.remove("mobile");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });
}

/* ------------------------------
   Limpieza on unload (opcional)
------------------------------- */
window.addEventListener("beforeunload", () => {
  if (rafId) cancelAnimationFrame(rafId);
  clearInterval(shakeInterval);
});
