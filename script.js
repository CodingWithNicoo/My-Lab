const starContainer = document.getElementById('star-container');
const meteorContainer = document.getElementById('meteor-container');

const STAR_COUNT = 200;
const METEOR_INTERVAL = 2000; // cada 2 segundos

// Crear estrellas aleatorias
const stars = [];
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  star.classList.add('star');

  const size = Math.random() * 2 + 1;
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;

  const top = Math.random() * 100;
  const left = Math.random() * 100;
  star.dataset.baseTop = top;
  star.dataset.baseLeft = left;

  star.style.top = `${top}%`;
  star.style.left = `${left}%`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`;

  stars.push(star);
  starContainer.appendChild(star);
}

// Crear meteoritos
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');

  const startX = Math.random() * window.innerWidth + 'px';
  const startY = -50 + 'px';
  const endX = (Math.random() * window.innerWidth + 400) + 'px';
  const endY = (window.innerHeight + 200) + 'px';

  meteor.style.setProperty('--startX', startX);
  meteor.style.setProperty('--startY', startY);
  meteor.style.setProperty('--endX', endX);
  meteor.style.setProperty('--endY', endY);
  meteor.style.animationDuration = (Math.random() * 2 + 1) + 's';

  meteorContainer.appendChild(meteor);
  setTimeout(() => meteor.remove(), parseFloat(meteor.style.animationDuration) * 1000);
}

setInterval(createMeteor, METEOR_INTERVAL);

// Interacción con el mouse (parallax)
document.addEventListener('mousemove', e => {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  const moveX = (e.clientX - centerX) / centerX; // -1 a 1
  const moveY = (e.clientY - centerY) / centerY;

  stars.forEach(star => {
    const depth = parseFloat(star.style.width); // más grande = más cerca
    const offsetX = moveX * depth * 2;
    const offsetY = moveY * depth * 2;
    star.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
  });
});
