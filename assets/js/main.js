// THEME
function toggleTheme(){
  const html=document.documentElement;
  const dark=html.getAttribute('data-theme')==='dark';
  html.setAttribute('data-theme',dark?'light':'dark');
  localStorage.setItem('theme',dark?'light':'dark');
  const svg=document.getElementById('t-svg');
  const lbl=document.getElementById('t-label');
  if(dark){svg.innerHTML='<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';lbl.textContent='Dark';}
  else{svg.innerHTML='<circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>';lbl.textContent='Light';}
}

// Load saved theme
(function(){
  const saved=localStorage.getItem('theme')||'dark';
  document.documentElement.setAttribute('data-theme',saved);
  if(saved==='light'){
    const svg=document.getElementById('t-svg');
    const lbl=document.getElementById('t-label');
    if(svg)svg.innerHTML='<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>';
    if(lbl)lbl.textContent='Dark';
  }
})();

// STARS
const canvas=document.getElementById('stars-canvas');
if(canvas){
  const ctx=canvas.getContext('2d');
  let stars=[],frame=0,animId;
  function resize(){
    canvas.width=window.innerWidth;canvas.height=window.innerHeight;
    stars=[];
    const n=Math.floor(canvas.width*canvas.height/2800);
    for(let i=0;i<n;i++)stars.push({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:Math.random()*1.3+0.2,a:Math.random()*0.7+0.2,s:Math.random()*0.4+0.05,o:Math.random()*Math.PI*2});
  }
  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    const dark=document.documentElement.getAttribute('data-theme')==='dark';
    const c=dark?'255,255,255':'20,50,100';
    frame+=0.012;
    stars.forEach(s=>{
      const tw=0.5+0.5*Math.sin(frame*s.s*5+s.o);
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(${c},${s.a*(0.5+0.5*tw)})`;ctx.fill();
    });
    animId=requestAnimationFrame(draw);
  }
  window.addEventListener('resize',()=>{cancelAnimationFrame(animId);resize();draw()});
  resize();draw();
}

// NAV ACTIVE (highlight current page)
(function(){
  const path=window.location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href=a.getAttribute('href').split('/').pop();
    if(href===path||(path===''&&href==='index.html'))a.classList.add('active');
  });
})();
