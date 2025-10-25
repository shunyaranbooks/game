const canvas = document.getElementById('scene');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;

// --- Simple easing helpers ---
const lerp = (a,b,t)=>a+(b-a)*t;
const easeInOut = t => 0.5*(1-Math.cos(Math.PI*t));

// --- World state ---
let masks = [];
let last = performance.now();
let acc = 0;
let frames = 0;
let fps = 0;

// --- Mask entity ---
function spawnMask(x=W*Math.random(), y=H*Math.random()){
  const base = 20 + Math.random()*30;
  masks.push({
    x, y,
    r: base,
    t: Math.random()*Math.PI*2,
    hue: Math.floor(200 + Math.random()*100),
    drift: (Math.random()*2-1)*0.25,
    breathe: 0
  });
}

for(let i=0;i<8;i++) spawnMask();

// --- Draw helpers ---
function drawBackground(t){
  const breathe = 0.5 + 0.5*Math.sin(t*0.5); // 0..1
  const g = ctx.createRadialGradient(W*0.5, H*0.5, 50, W*0.5, H*0.5, Math.max(W,H)*0.7);
  const c = Math.floor(16 + 16*breathe);
  g.addColorStop(0, `rgb(${c},${c},${c})`);
  g.addColorStop(1, '#000');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);
}

function drawMask(m, t){
  // breathing radius
  const r = m.r * (0.85 + 0.15*Math.sin(t*1.2 + m.t));
  // float
  m.t += 0.002 + Math.abs(m.drift)*0.001;
  m.x += Math.cos(m.t)*m.drift;
  m.y += Math.sin(m.t)*m.drift;
  // wrap-around
  if(m.x<-50) m.x=W+50; if(m.x>W+50) m.x=-50;
  if(m.y<-50) m.y=H+50; if(m.y>H+50) m.y=-50;

  // face (mask)
  ctx.save();
  ctx.translate(m.x, m.y);
  // outer glow
  const glow = ctx.createRadialGradient(0,0, r*0.6, 0,0, r*1.2);
  glow.addColorStop(0, `hsla(${m.hue},90%,70%,0.35)`);
  glow.addColorStop(1, 'hsla(0,0%,0%,0)');
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(0,0,r*1.2,0,Math.PI*2);
  ctx.fill();

  // mask shape
  ctx.fillStyle = `hsl(${m.hue},60%,65%)`;
  ctx.beginPath();
  ctx.ellipse(0,0, r*0.9, r*1.1, 0, 0, Math.PI*2);
  ctx.fill();
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  // eyes
  ctx.beginPath(); ctx.arc(-r*0.33, -r*0.15, r*0.14, 0, Math.PI*2); ctx.fill();
  ctx.beginPath(); ctx.arc(+r*0.33, -r*0.15, r*0.14, 0, Math.PI*2); ctx.fill();
  // mouth
  ctx.fillStyle='rgba(0,0,0,0.55)';
  ctx.beginPath();
  ctx.ellipse(0, r*0.25, r*0.35, r*0.15, 0, 0, Math.PI);
  ctx.fill();
  ctx.restore();
}

function loop(now){
  const dt = (now - last)/1000;
  last = now;
  acc += dt;
  frames++;
  if(acc >= 1){ fps = frames; frames=0; acc=0; }

  drawBackground(now/1000);
  masks.forEach(m => drawMask(m, now/1000));

  // HUD
  document.getElementById('fps').textContent = 'FPS: ' + fps;

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);

// UI
const btnBreath = document.getElementById('btnBreath');
const btnSpawn = document.getElementById('btnSpawn');
btnBreath.addEventListener('click', ()=>{
  // simple "breath" pulse: push all masks outward a bit
  masks.forEach(m=>{ m.x = lerp(m.x, W/2 + (m.x-W/2)*1.1, 0.5); m.y = lerp(m.y, H/2 + (m.y-H/2)*1.1, 0.5); });
  alert('Inhale once fully… exhale twice as long. The scene breathes with you.');
});
btnSpawn.addEventListener('click', ()=> spawnMask());
