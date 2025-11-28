document.addEventListener('DOMContentLoaded', () => {

  // --- Toggle menú lateral ---
  const menu = document.getElementById('side-menu');
  const toggle = document.getElementById('menu-toggle');

  toggle.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  // --- Fondo de estrellas ---
  const starsContainer = document.getElementById('stars');

  const STAR_COUNT = 150;
  const stars = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 2 + 1;
    const depth = Math.random() * 3 + 1;

    star.dataset.depth = depth;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    starsContainer.appendChild(star);
    stars.push(star);
  }

  // Parallax 3D
  function moveStars(offsetX, offsetY) {
    stars.forEach(star => {
      const depth = parseFloat(star.dataset.depth);
      const x = offsetX * depth * 10;
      const y = offsetY * depth * 10;
      star.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  document.addEventListener('mousemove', e => {
    const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
    const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
    moveStars(x, y);
  });

});
