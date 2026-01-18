/* ---------- Cute emoji background ---------- */
(function mountEmojiBackground(){
  const bag = ["🐼","🧿","🗡️","🌀","✨","😼","🪬","💥"];
  const layer = document.getElementById('emoji-bg');
  const count = 64;
  for(let i=0;i<count;i++){
    const s = document.createElement('span');
    s.textContent = bag[i % bag.length];
    s.style.left = Math.random()*100 + '%';
    s.style.top  = Math.random()*100 + '%';
    s.style.transform = `rotate(${Math.random()*40-20}deg)`;
    s.style.fontSize = (36 + Math.random()*28) + 'px';
    layer.appendChild(s);
  }
})();

/* ---------- JJK knowledge base (concise & lore-safe) ---------- */
const KB = {
  "Satoru Gojo": {role:"Sorcerer/Teacher", techniques:["Limitless","Infinity","Hollow Purple","Blue","Red"], domain:"Unlimited Void"},
  "Ryomen Sukuna": {role:"King of Curses", techniques:["Cleave","Dismantle","Malevolent Shrine"], domain:"Malevolent Shrine"},
  "Yuji Itadori": {role:"Student/Host of Sukuna", techniques:["Superhuman Physique","Black Flash","Divergent Fist"]},
  "Megumi Fushiguro": {role:"Student", techniques:["Ten Shadows Technique","Divine Dogs","Nue","Mahoraga"]},
  "Nobara Kugisaki": {role:"Student", techniques:["Straw Doll Technique","Resonance","Hairpin"]},
  "Toji Fushiguro": {role:"Assassin", techniques:["Heavenly Restriction"], weapons:["Inverted Spear of Heaven","Playful Cloud"]},
  "Kento Nanami": {role:"Sorcerer", techniques:["Ratio Technique (7:3)"]},
  "Suguru Geto": {role:"Sorcerer/Curse User", techniques:["Cursed Spirit Manipulation"]},
  "Mahito": {role:"Curse", techniques:["Idle Transfiguration"], domain:"Self-Embodiment of Perfection"},
  "Yuta Okkotsu": {role:"Special Grade", techniques:["Copy (various)","Cursed Energy Overflow"], notes:["Rika"]},
  "Toge Inumaki": {role:"Student", techniques:["Cursed Speech"]},
  "Maki Zenin": {role:"Sorcerer", techniques:["Heavenly Restriction"], weapons:["Cursed Tools"]},
  "Panda": {role:"Cursed Corpse", techniques:["Gorilla Mode"]},
  "Choso": {role:"Curse", techniques:["Blood Manipulation"]},
  "Kinji Hakari": {role:"Gambler Sorcerer", techniques:["Private Pure Love Train (DE)"]},
  "Hiromi Higuruma": {role:"Sorcerer", techniques:["Judgeman","Deadly Sentencing"], domain:"Deadly Sentencing"},
  "_Shikigami": ["Divine Dogs","Nue","Mahoraga","Max Elephant","Toad","Great Serpent","Rabbit Escape"]
};

const ALL_CHAR = Object.keys(KB).filter(k=>!k.startsWith('_'));
const ALL_TECH = Array.from(new Set(ALL_CHAR.flatMap(n => (KB[n].techniques||[]))));
const ALL_DOMAINS = Array.from(new Set(ALL_CHAR.map(n => KB[n].domain).filter(Boolean)));
const ALL_ROLES = Array.from(new Set(ALL_CHAR.map(n => KB[n].role)));
const SHIKIGAMI = KB["_Shikigami"];

function shuffle(a){ for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function pick(arr, n, exclude=[]) {
  const pool = arr.filter(x=>!exclude.includes(x));
  return shuffle(pool.slice()).slice(0, n);
}
function asMCQ(question, correct, distractors){
  const options = shuffle([correct, ...distractors]);
  return {question, options, answer: correct};
}

/* ---------- Question factory ---------- */
function buildQuestionBank(){
  const qs = [];

  ALL_TECH.forEach(tech=>{
    const owners = ALL_CHAR.filter(n=> (KB[n].techniques||[]).includes(tech));
    const owner = owners[0];
    const distract = pick(ALL_CHAR, 3, [owner]);
    qs.push(asMCQ(`Who uses the technique “${tech}”?`, owner, distract));
  });

  ALL_CHAR.forEach(name=>{
    const t = (KB[name].techniques||[]);
    if(t.length){
      const correct = t[0];
      const distract = pick(ALL_TECH, 3, t);
      qs.push(asMCQ(`Which of the following is associated with ${name}?`, correct, distract));
    }
  });

  ALL_CHAR.forEach(name=>{
    const r = KB[name].role;
    const distract = pick(ALL_ROLES, 3, [r]);
    qs.push(asMCQ(`What best describes ${name}'s role?`, r, distract));
  });

  ALL_CHAR.forEach(name=>{
    const d = KB[name].domain;
    if(d){
      const distract = pick(ALL_DOMAINS, 3, [d]);
      qs.push(asMCQ(`Which Domain Expansion belongs to ${name}?`, d, distract));
    }
  });

  SHIKIGAMI.forEach(s=>{
    const distract = pick(SHIKIGAMI, 3, [s]);
    qs.push(asMCQ(`“${s}” is a shikigami associated with which technique set?`, "Ten Shadows Technique", ["Cursed Speech","Straw Doll Technique","Blood Manipulation"]));
    qs.push(asMCQ(`“${s}” most closely relates to which sorcerer?`, "Megumi Fushiguro", pick(ALL_CHAR,3,["Megumi Fushiguro"])));
  });

  ALL_CHAR.forEach(name=>{
    const w = (KB[name].weapons||[]);
    w.forEach(weapon=>{
      qs.push(asMCQ(`Who is famously associated with “${weapon}”?`, name, pick(ALL_CHAR,3,[name])));
    });
  });

  qs.push(
    asMCQ(`Mahoraga’s special ability is best described as:`, "Adaptation", ["Teleportation","Invisibility","Mind Control"]),
    asMCQ(`Sukuna’s Domain Expansion is called:`, "Malevolent Shrine", pick(ALL_DOMAINS,3,["Malevolent Shrine"])),
    asMCQ(`Gojo’s barrierless annihilation combo (Blue+Red) is known as:`, "Hollow Purple", ["Black Flash","Ratio Technique","Idle Transfiguration"])
  );

  /* ---------- Added 10 new questions here ---------- */
  qs.push(
    asMCQ("Which sorcerer is known for using Black Flash the most reliably?", "Yuji Itadori", ["Megumi Fushiguro","Nobara Kugisaki","Yuta Okkotsu"]),
    asMCQ("Which cursed tool has the power to negate techniques?", "Inverted Spear of Heaven", ["Playful Cloud","Split Soul Katana","Dragon Bone"]),
    asMCQ("What is the main drawback of Cursed Speech?", "Throat strain and self-damage risk", ["Low range","Cannot affect curses","High CE waste"]),
    asMCQ("Which shikigami overwhelms enemies through sheer numbers?", "Rabbit Escape", ["Toad","Divine Dogs","Mahoraga"]),
    asMCQ("What ratio defines Nanami’s technique?", "7:3", ["50:50","3:1","4:1"]),
    asMCQ("Who originally used Cursed Spirit Manipulation?", "Suguru Geto", ["Mahito","Choso","Sukuna"]),
    asMCQ("Whose Domain Expansion has no barrier?", "Ryomen Sukuna", ["Gojo Satoru","Higuruma","Mahito"]),
    asMCQ("Which technique allows altering a body's soul shape?", "Idle Transfiguration", ["Blood Manipulation","Ten Shadows","Cursed Speech"]),
    asMCQ("Which character is directly linked with Rika?", "Yuta Okkotsu", ["Geto","Gojo","Maki Zenin"]),
    asMCQ("Which shikigami is considered the strongest in Ten Shadows?", "Mahoraga", ["Nue","Max Elephant","Divine Dogs"])
  );

  const seen = new Set();
  const dedup = [];
  for(const q of qs){
    if(!seen.has(q.question)){ dedup.push(q); seen.add(q.question); }
  }
  return shuffle(dedup);
}

const BANK = buildQuestionBank();

const DIFF_TO_COUNT = { 1:10, 2:15, 3:20, 4:25, 5:50 };

const els = {
  diff: document.getElementById('difficulty'),
  start: document.getElementById('startBtn'),
  area: document.getElementById('quizArea'),
  result: document.getElementById('resultArea'),
  qText: document.getElementById('qText'),
  opts: document.getElementById('opts'),
  next: document.getElementById('nextBtn'),
  quit: document.getElementById('quitBtn'),
  progressTxt: document.getElementById('progressTxt'),
  scoreTxt: document.getElementById('scoreTxt'),
  barFill: document.getElementById('barFill'),
  helper: document.getElementById('helper'),
};

let state = {
  deck: [],
  index: 0,
  score: 0,
  answered: false,
  selection: null
};

function startQuiz(){
  const level = +els.diff.value;
  const need = DIFF_TO_COUNT[level];
  const deck = BANK.slice(0, need);
  if(deck.length < need){
    while(deck.length < need){
      deck.push(BANK[Math.floor(Math.random()*BANK.length)]);
    }
  }
  state = { deck, index:0, score:0, answered:false, selection:null };
  els.result.style.display = 'none';
  els.area.style.display = 'block';
  els.next.disabled = true;
  renderCurrent();
}

function renderCurrent(){
  const { deck, index, score } = state;
  const q = deck[index];
  els.qText.textContent = q.question;
  els.opts.innerHTML = '';
  q.options.forEach((opt, i)=>{
    const id = `opt-${index}-${i}`;
    const label = document.createElement('label');
    label.className = 'opt';
    label.innerHTML = `<input type="radio" name="opt" id="${id}" value="${opt}"> ${opt}`;
    els.opts.appendChild(label);
    label.addEventListener('click', ()=>{
      state.selection = opt;
      els.next.disabled = false;
      els.helper.textContent = 'Locked and loaded. Submit when ready.';
    });
  });

  els.progressTxt.textContent = `Q ${index+1} / ${deck.length}`;
  els.scoreTxt.textContent = `Score: ${score}`;
  els.barFill.style.width = `${((index)/deck.length)*100}%`;
  els.helper.textContent = 'Select an answer to proceed.';
}

function submitAndNext(){
  const q = state.deck[state.index];
  if(!state.selection){ return; }
  if(state.selection === q.answer){
    state.score++;
  }

  [...els.opts.children].forEach(label=>{
    const input = label.querySelector('input');
    const val = input.value;
    if(val === q.answer){
      label.style.borderColor = 'rgba(48, 255, 194, 0.85)';
      label.style.background = '#0c1f1a';
    }else if(val === state.selection){
      label.style.borderColor = 'rgba(255, 87, 87, 0.8)';
      label.style.background = '#1a0f12';
    }else{
      label.style.opacity = .8;
    }
  });

  setTimeout(()=>{
    if(state.index+1 >= state.deck.length){
      finishQuiz();
    }else{
      state.index++;
      state.selection = null;
      els.next.disabled = true;
      renderCurrent();
    }
  }, 350);
}

function finishQuiz(){
  els.area.style.display = 'none';
  const total = state.deck.length;
  const pct = Math.round((state.score/total)*100);
  const remark = getRemark(pct, total);
  const emoji = getEmoji(pct);

  els.result.innerHTML = `
    <div class="result card">
      <h2>Results ${emoji}</h2>
      <div class="stats">
        <span class="tag">Correct: <strong>${state.score}</strong> / ${total}</span>
        <span class="tag">Accuracy: <strong>${pct}%</strong></span>
      </div>
      <div class="remark">${remark}</div>
      <div style="margin-top:16px">
        <button class="primary" onclick="startQuiz()">Retry Same Level</button>
        <button style="margin-left:8px" onclick="document.getElementById('resultArea').style.display='none'">Close</button>
      </div>
      <p class="muted small" style="margin-top:10px">Tip: Dial the difficulty selector to scale questions from 10 → 50.</p>
    </div>
  `;
  els.result.style.display = 'block';
}

function getEmoji(pct){
  if(pct >= 90) return "🤩";
  if(pct >= 75) return "😊";
  if(pct >= 60) return "😼";
  if(pct >= 40) return "😐";
  return "🫥";
}

function getRemark(pct, total){
  if(total===50 && pct>=90) return "Certified JJK Die-Hard. Absolute sorcery.";
  if(pct>=90) return "Domain Expansion level mastery.";
  if(pct>=75) return "Special Grade performance—keep going.";
  if(pct>=60) return "Grade 1 potential—polish your technique.";
  if(pct>=40) return "Still a trainee—more cursed reps needed.";
  return "Cursed energy low—time to rewatch and train.";
}

els.start.addEventListener('click', startQuiz);
els.next.addEventListener('click', submitAndNext);
els.quit.addEventListener('click', ()=>{
  els.area.style.display='none';
  els.result.style.display='none';
});

(function sanity(){
  if(BANK.length < 60){
    console.warn("Question bank is lean; consider extending KB for even more variety.");
  }
})();
