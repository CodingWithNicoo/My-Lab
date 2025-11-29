/* ============================
   STARFIELD GENERATION
============================ */
document.addEventListener("DOMContentLoaded", () => {
  const starsLayer = document.getElementById("stars-layer");

  const STAR_COUNT = 220;
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.position = "absolute";
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.background = "white";
    starsLayer.appendChild(star);
  }
});

/* ============================
   MOBILE MENU
============================ */
const menuToggle = document.getElementById("menu-toggle");
const siteMenu = document.getElementById("site-menu");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("open");
  siteMenu.classList.toggle("mobile-open");
});

/* ============================
   GLITCH SHAKE INACTIVIDAD
============================ */

let inactivityTimer = null;
const GLITCH_DELAY = 3000;
const starsLayer = document.getElementById("stars-layer");

function resetInactivity() {
  starsLayer.classList.remove("glitch");

  if (inactivityTimer) clearTimeout(inactivityTimer);

  inactivityTimer = setTimeout(() => {
    starsLayer.classList.add("glitch");
  }, GLITCH_DELAY);
}

resetInactivity();

["mousemove", "mousedown", "keydown", "touchstart", "touchmove"].forEach(evt => {
  window.addEventListener(evt, resetInactivity, { passive: true });
});
