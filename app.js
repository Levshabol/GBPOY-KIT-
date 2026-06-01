/* Заставка */
window.addEventListener('load',()=>{setTimeout(()=>{const l=document.getElementById('loader');if(l)l.classList.add('hide');},1300);});

/* Шапка + прогресс */
const hdr=document.getElementById('hdr'),prog=document.getElementById('prog');
window.addEventListener('scroll',()=>{
  if(hdr)hdr.classList.toggle('scrolled',scrollY>40);
  const h=document.documentElement;
  if(prog)prog.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%';
});

/* Reveal */
const io=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}});},{threshold:.15});
document.querySelectorAll('.reveal,.fstep').forEach(el=>io.observe(el));

/* Печать слогана (если есть #typed) */
const tEl=document.getElementById('typed');
if(tEl){
  const phrases=['Знания сегодня — возможности завтра','Практика. Проекты. Профессия.','Твой старт в IT начинается здесь'];
  let pi=0,ci=0,del=false;
  function type(){const p=phrases[pi];tEl.innerHTML=(del?p.substring(0,ci--):p.substring(0,ci++))+'<span class="cursor">&nbsp;</span>';
    if(!del&&ci===p.length+1){del=true;setTimeout(type,1700);return;}
    if(del&&ci===0){del=false;pi=(pi+1)%phrases.length;}
    setTimeout(type,del?40:70);}
  setTimeout(type,1500);
}

/* Счётчики */
const cObs=new IntersectionObserver((es)=>{es.forEach(e=>{if(e.isIntersecting){const el=e.target,t=+el.dataset.count,suf=el.dataset.suffix||'';let n=0;const step=t/45;const tick=()=>{n+=step;if(n<t){el.textContent=Math.floor(n)+suf;requestAnimationFrame(tick);}else el.textContent=t+suf;};tick();cObs.unobserve(el);}});},{threshold:.6});
document.querySelectorAll('[data-count]').forEach(el=>cObs.observe(el));

/* 3D tilt */
document.querySelectorAll('.feat').forEach(c=>{
  c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    c.style.setProperty('--mx',x+'px');c.style.setProperty('--my',y+'px');
    const rx=((y/r.height)-.5)*-6,ry=((x/r.width)-.5)*6;
    c.style.transform=`perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;});
  c.addEventListener('mouseleave',()=>c.style.transform='');
});

/* Фон-сеть */
const cv=document.getElementById('net');
if(cv){
  const ctx=cv.getContext('2d');let W,H,pts,mouse={x:-999,y:-999};
  function resize(){W=cv.width=innerWidth;H=cv.height=innerHeight;const n=Math.min(90,Math.floor(W*H/16000));pts=Array.from({length:n},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4}));}
  resize();addEventListener('resize',resize);
  addEventListener('mousemove',e=>{mouse.x=e.clientX;mouse.y=e.clientY;});
  addEventListener('mouseleave',()=>{mouse.x=mouse.y=-999;});
  function draw(){ctx.clearRect(0,0,W,H);
    for(const p of pts){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      const dm=Math.hypot(p.x-mouse.x,p.y-mouse.y);
      ctx.beginPath();ctx.arc(p.x,p.y,dm<140?2.4:1.6,0,7);ctx.fillStyle=dm<140?'rgba(70,212,255,.9)':'rgba(70,212,255,.4)';ctx.fill();}
    for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const a=pts[i],b=pts[j],d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(46,166,230,${.16*(1-d/130)})`;ctx.lineWidth=1;ctx.stroke();}}
    for(const p of pts){const d=Math.hypot(p.x-mouse.x,p.y-mouse.y);if(d<160){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle=`rgba(70,212,255,${.3*(1-d/160)})`;ctx.lineWidth=1;ctx.stroke();}}
    requestAnimationFrame(draw);}
  draw();
}
