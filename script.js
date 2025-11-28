const starsContainer = document.getElementById('stars');
const STAR_COUNT = 150;
const stars = [];

// Crear estrellas aleatorias
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = Math.random() * 2 + 1; // 1px a 3px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  const top = Math.random() * 100;
  const left = Math.random() * 100;
  star.dataset.baseTop = top;
  star.dataset.baseLeft = left;
  star.dataset.depth = size; // usar tamaño como profundidad

  star.style.top = `${top}%`;
  star.style.left = `${left}%`;

  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  stars.push(star);
  starsContainer.appendChild(star);
}

// Función de parallax usando valores x e y
function moveStars(offsetX, offsetY) {
  stars.forEach(star => {
    const depth = parseFloat(star.dataset.depth);
    const x = offsetX * depth * 5; // ajustar sensibilidad
    const y = offsetY * depth * 5;
    star.style.transform = `translate(${x}px, ${y}px)`;
  });
}

// Parallax con mouse
document.addEventListener('mousemove', e => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const moveX = (e.clientX - centerX) / centerX;
  const moveY = (e.clientY - centerY) / centerY;

  moveStars(moveX, moveY);
});

// Parallax con sensor de dispositivo (móvil/tablet)
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', e => {
    // gamma: izquierda/derecha, beta: adelante/atrás
    const moveX = e.gamma / 45; // normalizado aproximado -1 a 1
    const moveY = e.beta / 45;  // normalizado aproximado -1 a 1
    moveStars(moveX, moveY);
  });
}
