/* ===== STAR GENERATOR ===== */
const starsContainer = document.getElementById("stars");

function spawnStars() {
  for (let i = 0; i < 120; i++) {
    let s = document.createElement("div");
    s.classList.add("star");
    s.style.top = Math.random() * 100 + "%";
    s.style.left = Math.random() * 100 + "%";
    starsContainer.appendChild(s);
  }
}
spawnStars();

/* ===== MOBILE MENU ===== */
const menu = document.getElementById("menu");

menu.addEventListener("click", () => {
  if (window.innerWidth < 700) {
    menu.classList.toggle("open");
  }
});

/* ===== SHAKE AFTER 3s INACTIVITY ===== */
let timer;

function resetTimer() {
  menu.classList.remove("shake");
  clearTimeout(timer);

  timer = setTimeout(() => {
    menu.classList.add("shake");
  }, 3000);
}

window.addEventListener("mousemove", resetTimer);
window.addEventListener("keydown", resetTimer);
window.addEventListener("touchstart", resetTimer);

resetTimer();
