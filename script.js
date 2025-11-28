document.addEventListener("DOMContentLoaded", () => {

  /* ESTRELLAS */
  const starsContainer = document.getElementById("stars");
  const STAR_COUNT = 150;

  for (let i = 0; i < STAR_COUNT; i++) {
    const star = document.createElement("div");
    star.classList.add("star");

    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;

    starsContainer.appendChild(star);
  }

  /* MENÚ MÓVIL */
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menu-toggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
  }
});
