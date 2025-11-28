/* GLOBAL SCRIPT: MENU + STARS + PARALLAX */
(function(){
  'use strict';

  /* ======================
        MOBILE MENU
  ====================== */
  const menu = document.getElementById('site-menu');
  const toggle = document.getElementById('menu-toggle');

  function openMenu(){
    menu.classList.add('mobile-open');
    toggle.setAttribute('aria-expanded','true');
  }
  function closeMenu(){
    menu.classList.remove('mobile-open');
    toggle.setAttribute('aria-expanded','false');
  }

  if(toggle){
    toggle.addEventListener('click', ()=>{
      menu.classList.contains('mobile-open') ? closeMenu() : openMenu();
    });

    menu.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click', ()=>{
        if(window.innerWidth < 768) closeMenu();
      });
    });
  }

  /* ======================
        STARFIELD
  ====================== */
  const STAR_COUNT = Math.min(180, Math.round((window.innerWidth*window.innerHeight)/6000));
  const starsLayer = document.createElement('div');
  starsLayer.id = 'stars-layer';
  document.body.appendChild(starsLayer);

  const stars = [];

  function rand(min,max){ return Math.random()*(max-min)+min; }

  function createStar() {
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.pow(Math.random(),2)*2.6 + 0.7;
    s.style.width = size+'px';
    s.style.height = size+'px';
    const x = Math.random()*100;
    const y = Math.random()*100;
    s.style.left = x+'%';
    s.style.top = y+'%';
    const hue = rand(260,290);
    s.style.background = `hsla(${hue},60%,85%,${rand(0.7,1)})`;
    const dur = rand(2.4,6.8);
    s.style.animation = `twinkle ${dur}s infinite ease-in-out`;
    s.style.animationDelay = `${rand(0,6)}s`;

    s.dataset.z = rand(0.2,1.4);

    starsLayer.appendChild(s);
    stars.push(s);
  }

  for(let i=0;i<STAR_COUNT;i++) createStar();

  /* ======================
        PARALLAX + SHAKE
  ====================== */
  let lastActivity = Date.now();
  let inactivityTimer = null;

  function resetInactivity(){
    lastActivity = Date.now();
    starsLayer.classList.remove('shake');
    if(inactivityTimer) clearTimeout(inactivityTimer);

    inactivityTimer = setTimeout(()=>{
      starsLayer.classList.add('shake');
      setTimeout(()=>starsLayer.classList.remove('shake'),800);
    }, 3000);
  }
  resetInactivity();

  function moveStars(dx, dy){
    const max = 30;
    stars.forEach(s=>{
      const z = Number(s.dataset.z);
      const tx = dx * max * z;
      const ty = dy * max * z;
      s.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
    });
  }

  window.addEventListener('mousemove', e=>{
    resetInactivity();
    const dx = (e.clientX - window.innerWidth/2) / (window.innerWidth/2);
    const dy = (e.clientY - window.innerHeight/2) / (window.innerHeight/2);
    moveStars(dx, dy);
  });

  window.addEventListener('touchmove', e=>{
    resetInactivity();
    const t = e.touches[0];
    const dx = (t.clientX - window.innerWidth/2) / (window.innerWidth/2);
    const dy = (t.clientY - window.innerHeight/2) / (window.innerHeight/2);
    moveStars(dx, dy);
  }, {passive:true});

  /* Device orientation */
  function enableOrientation(){
    function handler(evt){
      resetInactivity();
      if(evt.gamma === null) return;
      const dx = evt.gamma/30;
      const dy = evt.beta/30;
      moveStars(dx, dy);
    }

    if(typeof DeviceOrientationEvent.requestPermission === 'function'){
      DeviceOrientationEvent.requestPermission()
        .then(res=>{ if(res==='granted') window.addEventListener('deviceorientation', handler); });
    } else {
      window.addEventListener('deviceorientation', handler);
    }
  }

  window.addEventListener('click', enableOrientation, {once:true});
  window.addEventListener('touchstart', enableOrientation, {once:true, passive:true});

  /* Resize = rebuild stars */
  let rT = null;
  window.addEventListener('resize', ()=>{
    clearTimeout(rT);
    rT = setTimeout(()=>{
      starsLayer.innerHTML = '';
      stars.length = 0;
      for(let i=0;i<STAR_COUNT;i++) createStar();
    }, 150);
  });

})();

document.addEventListener("DOMContentLoaded", () => {

  const toggle = document.getElementById("menu-toggle");
  const menu = document.getElementById("site-menu");

  toggle.addEventListener("click", () => {

    menu.classList.toggle("mobile-open");
    toggle.classList.toggle("open");

  });

});
