/* Global script shared by all pages: menu + stars + parallax + inactivity shake */
(function(){
  'use strict';

  /* MENU LOGIC */
  const menu = document.getElementById('site-menu');
  const toggle = document.getElementById('menu-toggle');
  function openMobileMenu(){
    menu.classList.add('mobile-open');
    toggle.setAttribute('aria-expanded','true');
  }
  function closeMobileMenu(){
    menu.classList.remove('mobile-open');
    toggle.setAttribute('aria-expanded','false');
  }
  if(toggle){
    toggle.addEventListener('click', ()=>{
      if(menu.classList.contains('mobile-open')) closeMobileMenu(); else openMobileMenu();
    });

    // close menu on navigation (mobile)
    menu.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{ 
      if(window.innerWidth<768) closeMobileMenu(); 
    }));
  }

  /* STARS + BACKGROUND */
  const STAR_COUNT = Math.min(180, Math.round((window.innerWidth*window.innerHeight)/6000));
  const starsLayer = document.createElement('div');
  starsLayer.id = 'stars-layer';
  document.body.appendChild(starsLayer);

  const stars = [];
  function rand(min,max){return Math.random()*(max-min)+min}

  for(let i=0;i<STAR_COUNT;i++){
    const s = document.createElement('div');
    s.className = 'star';
    const size = Math.pow(Math.random(),2)*2.8 + 0.6; // bias to small
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    const x = Math.random()*100;
    const y = Math.random()*100;
    s.style.left = x + '%';
    s.style.top = y + '%';
    // color variant subtle
    const hue = rand(260,290);
    s.style.background = `hsla(${hue},60%,85%,${rand(0.7,1)})`;
    // twinkle speed & delay
    const dur = rand(2.4,6.8);
    s.style.animation = `twinkle ${dur}s infinite ease-in-out`;
    s.style.animationDelay = `${rand(0,6)}s`;
    // store original position for parallax
    s.dataset.cx = x; 
    s.dataset.cy = y; 
    s.dataset.z = rand(0.2,1.4);
    starsLayer.appendChild(s);
    stars.push(s);
  }

  // Parallax handling
  let lastActivity = Date.now();
  let inactiveTimer = null;
  function resetInactivity(){
    lastActivity = Date.now();
    starsLayer.classList.remove('shake');
    if(inactiveTimer) clearTimeout(inactiveTimer);
    inactiveTimer = setTimeout(()=>{
      starsLayer.classList.add('shake');
      setTimeout(()=>starsLayer.classList.remove('shake'),900);
    }, 3000);
  }
  resetInactivity();

  // pointer parallax
  function onPointer(e){
    resetInactivity();
    const cx = (e.clientX || (e.touches && e.touches[0].clientX) || window.innerWidth/2) - window.innerWidth/2;
    const cy = (e.clientY || (e.touches && e.touches[0].clientY) || window.innerHeight/2) - window.innerHeight/2;
    const maxTrans = 30; // px
    stars.forEach(s=>{
      const z = Number(s.dataset.z);
      const tx = -(cx/(window.innerWidth/2)) * maxTrans * z;
      const ty = -(cy/(window.innerHeight/2)) * maxTrans * z;
      s.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${1+ (z-0.6)/8})`;
    });
  }
  window.addEventListener('mousemove', onPointer, {passive:true});
  window.addEventListener('touchmove', onPointer, {passive:true});

  // deviceorientation fallback for mobile
  function onDeviceOrientation(evt){
    if(evt.gamma === null) return;
    resetInactivity();
    // gamma: left-to-right tilt [-90,90], beta: front-to-back [-180,180]
    const gx = evt.gamma/30; // normalize
    const gy = evt.beta/30;
    const maxTrans = 28;
    stars.forEach(s=>{
      const z = Number(s.dataset.z);
      const tx = gx * maxTrans * z;
      const ty = gy * maxTrans * z;
      s.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(${1+ (z-0.6)/8})`;
    });
  }
  if(window.DeviceOrientationEvent){
    // request permission on iOS 13+ when needed
    function tryEnableOrientation(){
      if(typeof DeviceOrientationEvent.requestPermission === 'function'){
        DeviceOrientationEvent.requestPermission().then(res=>{
          if(res==='granted') window.addEventListener('deviceorientation', onDeviceOrientation);
        }).catch(()=>{});
      } else {
        window.addEventListener('deviceorientation', onDeviceOrientation);
      }
    }
    // enable on first user interaction
    const initOrientation = ()=>{ 
      tryEnableOrientation(); 
      window.removeEventListener('touchstart', initOrientation); 
      window.removeEventListener('click', initOrientation);
    };
    window.addEventListener('touchstart', initOrientation, {passive:true});
    window.addEventListener('click', initOrientation, {passive:true});
  }

  // adjust stars count on resize
  let resizeTimeout;
  window.addEventListener('resize', ()=>{
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(()=>{
      starsLayer.innerHTML = '';
      stars.length = 0;
      const newCount = Math.min(220, Math.round((window.innerWidth*window.innerHeight)/6000));
      for(let i=0;i<newCount;i++){
        const s = document.createElement('div');
        s.className = 'star';
        const size = Math.pow(Math.random(),2)*2.8 + 0.6;
        s.style.width = size + 'px';
        s.style.height = size + 'px';
        const x = Math.random()*100;
        const y = Math.random()*100;
        s.style.left = x + '%';
        s.style.top = y + '%';
        const hue = rand(260,290);
        s.style.background = `hsla(${hue},60%,85%,${rand(0.7,1)})`;
        const dur = rand(2.4,6.8);
        s.style.animation = `twinkle ${dur}s infinite ease-in-out`;
        s.style.animationDelay = `${rand(0,6)}s`;
        s.dataset.cx = x; 
        s.dataset.cy = y; 
        s.dataset.z = rand(0.2,1.4);
        starsLayer.appendChild(s);
        stars.push(s);
      }
    },150);
  });

  // click/touch resets inactivity
  ['touchstart','mousedown','mousemove','keydown']
    .forEach(ev=>window.addEventListener(ev, resetInactivity, {passive:true}));

  // accessibility: close mobile menu with Escape
  window.addEventListener('keydown', (e)=>{
    if(e.key==='Escape'){
      if(menu.classList.contains('mobile-open')) closeMobileMenu();
    }
  });

})();
