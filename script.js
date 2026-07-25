/* ============ OPENING / ENVELOPE ============ */
const openBtn = document.getElementById('openBtn');
const envelope = document.getElementById('envelope');
const opening = document.getElementById('opening');
const site = document.getElementById('site');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

openBtn.addEventListener('click', () => {
  envelope.classList.add('opened');
  openBtn.style.opacity = '0';
  openBtn.style.pointerEvents = 'none';
  // Play music
 music.volume = 0.3;

const playPromise = music.play();

if (playPromise !== undefined) {
    playPromise
        .then(() => {
            musicBtn.classList.add("playing");
        })
        .catch((error) => {
            console.log("Impossible de lire la musique :", error);
        });
}

  setTimeout(()=>{
    envelope.classList.add('launched');
  }, 2200);

  setTimeout(()=>{
    opening.classList.add('gone');
    site.classList.remove('hidden');
    initAOS();
    startPetals();
    window.scrollTo({top:0,behavior:'instant'});
  }, 3200);
});

/* ============ MUSIC TOGGLE ============ */
musicBtn.addEventListener("click", () => {

    if (music.paused) {

        music.play()
            .then(() => {
                musicBtn.classList.add("playing");
                musicBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
            });

    } else {

        music.pause();
        musicBtn.classList.remove("playing");
        musicBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';

    }

});
/* ============ AOS ============ */
function initAOS(){
  AOS.init({
    duration: 1000,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80,
  });
}

/* ============ FALLING PETALS ============ */
function startPetals(){
  const container = document.getElementById('petals');
  const colors = ['#7B2330', '#A8B89A', '#C8A45D', '#DDBE7C'];
  for (let i=0; i<18; i++){
    const p = document.createElement('span');
    p.className = 'petal';
    p.style.left = Math.random()*100 + 'vw';
    p.style.animationDuration = (12 + Math.random()*14) + 's';
    p.style.animationDelay = (Math.random()*10) + 's';
    p.style.background = `radial-gradient(ellipse at 30% 30%, ${colors[Math.floor(Math.random()*colors.length)]}aa, ${colors[Math.floor(Math.random()*colors.length)]})`;
    p.style.transform = `rotate(${Math.random()*360}deg) scale(${0.7 + Math.random()*0.6})`;
    p.style.opacity = 0.4 + Math.random()*0.4;
    container.appendChild(p);
  }
}

/* ============ COUNTDOWN ============ */
const targetDate = new Date('2026-10-24T18:30:00+01:00').getTime();
function updateCountdown(){
  const now = Date.now();
  let diff = Math.max(0, targetDate - now);
  const d = Math.floor(diff / (1000*60*60*24));
  diff -= d * (1000*60*60*24);
  const h = Math.floor(diff / (1000*60*60));
  diff -= h * (1000*60*60);
  const m = Math.floor(diff / (1000*60));
  diff -= m * (1000*60);
  const s = Math.floor(diff / 1000);
  const pad = n => String(n).padStart(2,'0');
  const set = (id,v)=>{const el=document.getElementById(id);if(el)el.textContent=pad(v)};
  set('cd-days', d);
  set('cd-hours', h);
  set('cd-mins', m);
  set('cd-secs', s);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ============ PROGRESS BAR & TOP BTN ============ */
const progressFill = document.getElementById('progressFill');
const topBtn = document.getElementById('topBtn');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressFill.style.width = scrolled + '%';
  if (h.scrollTop > 400) topBtn.classList.add('show');
  else topBtn.classList.remove('show');
});
topBtn.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

/* ============ LIGHTBOX ============ */
const lb = document.getElementById('lightbox');
const lbContent = lb.querySelector('.lb-content');
document.querySelectorAll('.g-item').forEach(item => {
  item.addEventListener('click', () => {
    const bg = getComputedStyle(item).backgroundImage;
    lbContent.style.backgroundImage = bg;
    lb.classList.add('active');
  });
});
lb.addEventListener('click', () => lb.classList.remove('active'));

/* ============ RSVP FORM ============ */
/* ============ RSVP FORM -> WHATSAPP ============ */
document.getElementById('rsvpForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const nom = document.querySelector('input[name="name"]').value;
    const personnes = document.querySelector('input[name="guests"]').value;
    const presence = document.querySelector('input[name="attend"]:checked').value;
    const message = document.querySelector('textarea[name="message"]').value;

    const statut = presence === "yes"
        ? "✅ Oui, je serai présent(e)"
        : "❌ Non, je ne pourrai pas être présent(e)";

    const texte = `🌸 *Confirmation de présence - Fiançailles* 🌸

👤 Nom : ${nom}
👥 Nombre de personnes : ${personnes}

${statut}

💌 Message :
${message}`;

    // Numéro WhatsApp (Algérie)
    const numero = "213774075155";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texte)}`;

    window.open(url, "_blank");
});
/* ============ INIT WITHOUT ENVELOPE (if reloaded) ============ */
// AOS gets initialized once envelope is opened; if user reloads and site is already visible we still want it
if (!site.classList.contains('hidden')) initAOS();
