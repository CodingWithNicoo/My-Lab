const starsContainer = document.getElementById('stars');
const STAR_COUNT = 150;

// Crear estrellas aleatorias
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = Math.random() * 2 + 1; // 1px a 3px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;

  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  starsContainer.appendChild(star);
}
