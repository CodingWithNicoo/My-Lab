const starsContainer = document.getElementById('stars');
const STAR_COUNT = 150;
const stars = [];

// Crear estrellas con profundidad y tamaño
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = Math.random() * 2 + 1; // tamaño base
  const depth = Math.random() * 3 + 1; // profundidad
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
});

// Función de parallax con efecto 3D
function moveStars(offsetX, offsetY) {
  stars.forEach(star => {
    const depth = parseFloat(star.dataset.depth);
    const baseSize = parseFloat(star.dataset.size);

    const x = offsetX * depth * 10;
    const y = offsetY * depth * 10;
    const scale = 1 + depth / 5;

    star.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  });
}

// Parallax con mouse
document.addEventListener('mousemove', e => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  const moveX = (e.clientX - centerX) / centerX; // -1 a 1
  const moveY = (e.clientY - centerY) / centerY;

  moveStars(moveX, moveY);
});

// Parallax con sensor de dispositivo (móvil/tablet)
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', e => {
    const moveX = e.gamma ? e.gamma / 45 : 0;
    const moveY = e.beta ? e.beta / 45 : 0;
    moveStars(moveX, moveY);
  });
}

// Rotación lenta del cielo
let angle = 0;
function rotateStars() {
  angle += 0.01; // velocidad de rotación
  starsContainer.style.transform = `rotate(${angle}rad)`;
  requestAnimationFrame(rotateStars);
}
rotateStars();
