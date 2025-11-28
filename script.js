document.addEventListener("DOMContentLoaded", () => {

  /* -------- MENÚ -------- */
  const nav = document.getElementById("nav");
  const btn = document.getElementById("menu-btn");

  if (btn) {
    btn.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  /* -------- ESTRELLAS -------- */
  const starsContainer = document.getElementById("stars");
  const STAR_COUNT = 150;
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const s = document.createElement("div");
    s.classList.add("star");

    const size = Math.random() * 2 + 1;
    const depth = Math.random() * 3 + 1;

    s.dataset.depth = depth;
    s.style.width = size + "px";
    s.style.height = size + "px";
    s.style.top = Math.random() * 100 + "%";
    s.style.left = Math.random() * 100 + "%";

    stars.push(s);
    starsContainer.appendChild(s);
  }

  /* -------- PARALLAX -------- */
  function moveStars(x, y) {
    stars.forEach(star => {
      const d = parseFloat(star.dataset.depth);
      star.style.transform = `translate(${x * d * 10}px, ${y * d * 10}px)`;
    });
  }

  // PC
  document.addEventListener("mousemove", e => {
    const x = (e.clientX / window.innerWidth) - 0.5;
    const y = (e.clientY / window.innerHeight) - 0.5;
    moveStars(x, y);
    resetIdle();
  });

  // Móvil
  window.addEventListener("deviceorientation", e => {
    const x = (e.gamma || 0) / 45;
    const y = (e.beta || 0) / 45;
    moveStars(x, y);
    resetIdle();
  });

  /* -------- SHAKE -------- */
  let idleTimer;
  function startShake() {
    stars.forEach(s => s.classList.add("shake"));
  }
  function stopShake() {
    stars.forEach(s => s.classList.remove("shake"));
  }
  function resetIdle() {
    stopShake();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startShake, 3000);
  }
  resetIdle();

});
