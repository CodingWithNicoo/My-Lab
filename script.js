document.addEventListener('DOMContentLoaded', () => {
  const starsContainer = document.getElementById('stars');

  if (!starsContainer) return; // si no hay #stars, salir

  const STAR_COUNT = 150;
  const stars = [];

  // Crear estrellas
  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 2 + 1;
    const depth = Math.random() * 3 + 1;

    star.dataset.size = size;
    star.dataset.depth = depth;

    const top = Math.random() * 100;
    const left = Math.random() * 100;
    star.dataset.top = top;
    star.dataset.left = left;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${top}%`;
    star.style.left = `${left}%`;

    star.style.animationDuration = `${Math.random() * 3 + 2}s`;

    starsContainer.appendChild(star);
    stars.push(star);
  }

  // Parallax 3D
  function moveStars(offsetX, offsetY) {
    stars.forEach(star => {
      const depth = parseFloat(star.dataset.depth);
      const scale = 1 + depth / 5;
      const x = offsetX * depth * 10;
      const y = offsetY * depth * 10;
      star.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
    });
  }

  // Parallax con mouse
  document.addEventListener('mousemove', e => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const moveX = (e.clientX - centerX) / centerX;
    const moveY = (e.clientY - centerY) / centerY;
    moveStars(moveX, moveY);
    resetIdleTimer();
  });

  // Parallax en dispositivos móviles
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', e => {
      const moveX = e.gamma ? e.gamma / 45 : 0;
      const moveY = e.beta ? e.beta / 45 : 0;
      moveStars(moveX, moveY);
      resetIdleTimer();
    });
  }

  // --- Shake cuando idle ---
  let idleTimer;
  const IDLE_DELAY = 3000;

  function startShake() { stars.forEach(s => s.classList.add('shake')); }
  function stopShake() { stars.forEach(s => s.classList.remove('shake')); }

  function resetIdleTimer() {
    stopShake();
    clearTimeout(idleTimer);
    idleTimer = setTimeout(startShake, IDLE_DELAY);
  }
  resetIdleTimer();
});

// --- Menú hide on scroll ---
let lastScrollTop = 0;
const menu = document.querySelector('.menu');

window.addEventListener('scroll', () => {
  const st = window.pageYOffset || document.documentElement.scrollTop;
  if (st > lastScrollTop) {
    menu.style.transform = 'translate(-50%, -100%)';
  } else {
    menu.style.transform = 'translateX(-50%)';
  }
  lastScrollTop = st <= 0 ? 0 : st;
});
