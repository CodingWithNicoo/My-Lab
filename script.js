const starsContainer = document.getElementById('stars');
const meteorsContainer = document.getElementById('meteors');

const STAR_COUNT = 150;
const METEOR_INTERVAL = 3000;

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

// Crear meteoritos periódicamente
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');

  meteor.style.top = `${Math.random() * 50 - 50}px`;
  meteor.style.left = `${Math.random() * window.innerWidth}px`;

  const duration = Math.random() * 2 + 1;
  meteor.style.animationDuration = `${duration}s`;

  meteorsContainer.appendChild(meteor);

  setTimeout(() => {
    meteor.remove();
  }, duration * 1000);
}

setInterval(createMeteor, METEOR_INTERVAL);
