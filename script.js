const starsContainer = document.getElementById('stars');
const STAR_COUNT = 150;
const stars = [];

// Crear estrellas aleatorias
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = Math.random() * 2 + 1; // 1px a 3px
  star.dataset.baseSize = size;       // tamaño original
  star.dataset.depth = size;           // profundidad para parallax

  const top = Math.random() * 100;
  const left = Math.random() * 100;
  star.dataset.baseTop = top;
  star.dataset.baseLeft = left;

  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.top = `${top}%`;
  star.style.left = `${left}%`;

  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  stars.push(star);
  starsContainer.appendChild(star);
});

// Función para mover y escalar estrellas
function moveStars(offsetX, offsetY) {
  stars.forEach(star => {
    const depth = parseFloat(star.dataset.depth);
    const baseSize = parseFloat(star.dataset.baseSize);

    const x = offsetX * depth * 5; // movimiento horizontal
    const y = offsetY * depth * 5; // movimiento vertical
    const scale = 1 + depth / 5;   // efecto 3D: estrellas cercanas se ven más grandes

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
});

// Parallax con sensor de dispositivo (móvil/tablet)
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', e => {
    const moveX = e.gamma / 45; // normalizado
    const moveY = e.beta / 45;  // normalizado
    moveStars(moveX, moveY);
  });
}
