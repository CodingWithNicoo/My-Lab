document.addEventListener("DOMContentLoaded", () => {

  /* ===== MENÚ ===== */
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menu-toggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }

  /* ===== ESTRELLAS ===== */
  const starsContainer = document.getElementById("stars");
  const STAR_COUNT = 150;
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 2 + 1;
    const depth = Math.random() * 3 + 1;

    star.dataset.depth = depth;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;

    stars.push(star);
    starsContainer.appendChild(star);
  }

  /* ===== PARALLAX GENERAL ===== */
  function moveStars(x, y) {
    stars.forEach(star => {
      const depth = parseFloat(star.dataset.depth);
      const dx = x * depth * 12;
      const dy = y * depth * 12;
      star.style.transform = `translate(${dx}px, ${dy}px)`;
    });
  }

  /* PC */
  document.addEventListener("mousemove", e => {
    const x = (e.clientX - window.innerWidth / 2) / window.innerWidth;
    const y = (e.clientY - window.innerHeight / 2) / window.innerHeight;
    moveStars(x, y);
    resetIdle();
  });

  /* MÓVIL */
  window.addEventListener("deviceorientation", e => {
    const x = (e.gamma || 0) / 45;
    const y = (e.beta || 0) / 45;
    moveStars(x, y);
    resetIdle();
  });

  /* ===== SHAKE TRAS INACTIVIDAD ===== */
  let idleTimer;
  const idleDelay = 3000;

  function startShake() {
    stars.forEach(s => s.classList.add("shake"));
  }

  function stopShake() {
    stars.forEach(s => s.classList.remove("shake"));
  }

  function resetIdle() {
    stopShake();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startShake, idleDelay);
  }

  resetIdle();
});
