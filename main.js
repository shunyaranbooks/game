const SCENE = `You awaken inside a loading screen called <em>me</em>… The objective is simple and impossible: notice the player is also the game.`;
const STORAGE_KEY = 'gob_resonance';

function loadScore(){
  const s = localStorage.getItem(STORAGE_KEY);
  return s ? parseInt(s,10) : 0;
}
function saveScore(n){
  localStorage.setItem(STORAGE_KEY, String(n));
}
function setScene(){
  document.getElementById('scene').innerHTML = `<p>${SCENE}</p>`;
}
function setScore(n){
  document.getElementById('score').textContent = n;
}
function addScore(delta){
  const n = loadScore() + delta;
  saveScore(n);
  setScore(n);
  if(n>0 && n%10===0){
    alert('Milestone unlocked. The next world is ready.');
  }
}
function breathReset(){
  // Simple text cue; real breathing happens off-screen :)
  alert('Inhale once fully… exhale twice as long. Engine reset.');
}

window.addEventListener('DOMContentLoaded', ()=>{
  setScene();
  setScore(loadScore());
  document.querySelectorAll('.score-buttons button').forEach(b=>{
    b.addEventListener('click', ()=> addScore(parseInt(b.dataset.score,10)));
  });
  document.getElementById('savePoint').addEventListener('click', breathReset);
  document.querySelectorAll('.choice-buttons button').forEach(b=>{
    b.addEventListener('click', ()=>{
      const c = b.dataset.choice;
      alert('Choice '+c+' selected. Reality renders at the speed of attention + sincerity.');
    });
  });
});
