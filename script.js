// Configuración de estrellas
const starContainer = document.getElementById('star-container');
const meteorContainer = document.getElementById('meteor-container');

const STAR_COUNT = 200;
const METEOR_INTERVAL = 3000; // cada 3 segundos

// Crear estrellas aleatorias
for (let i = 0; i < STAR_COUNT; i++) {
  const star = document.createElement('div');
  star.classList.add('star');
  const size = Math.random() * 2 + 1; // 1px a 3px
  star.style.width = `${size}px`;
  star.style.height = `${size}px`;
  star.style.top = `${Math.random() * 100}%`;
  star.style.left = `${Math.random() * 100}%`;
  star.style.animationDuration = `${Math.random() * 3 + 2}s`; // variación de parpadeo
  starContainer.appendChild(star);
}

// Función para crear meteoritos aleatorios
function createMeteor() {
  const meteor = document.createElement('div');
  meteor.classList.add('meteor');
  meteor.style.top = `${Math.random() * 50 - 50}px`; // parte superior
  meteor.style.left = `${Math.random() * window.innerWidth}px`;
  meteor.style.height = `${Math.random() * 80 + 50}px`; // longitud variable
  meteorContainer.appendChild(meteor);

  // Animar meteorito
  const duration = Math.random() * 2 + 1; // 1 a 3 segundos
  meteor.animate([
    { transform: `translate(0,0)` },
    { transform: `translate(1200px, 600px)` }
  ], {
    duration: duration * 1000,
    easing: 'linear',
    fill: 'forwards'
  });

  // Eliminar después de la animación
  setTimeout(() => meteor.remove(), duration * 1000);
}

// Crear meteoritos periódicamente
setInterval(createMeteor, METEOR_INTERVAL);
