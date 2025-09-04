// year
const y = document.getElementById('y');
if (y) y.textContent = new Date().getFullYear();

// theme toggle
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
const themeBtn = document.getElementById('theme-toggle');
if (themeBtn) {
  themeBtn.onclick = () => {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  };
}

// smooth scroll
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  const el = document.getElementById(id);
  if (el){ e.preventDefault(); el.scrollIntoView({behavior:'smooth', block:'start'}); }
});

// reveal on scroll
const io = new IntersectionObserver((ents)=>ents.forEach(en=>{
  if (en.isIntersecting){ en.target.classList.add('reveal-in'); io.unobserve(en.target); }
}), {threshold:.12});
document.querySelectorAll('[data-reveal]').forEach(el=>io.observe(el));

/* -------------------------
   Typed hero title (rotate)
-------------------------- */
(function typedHero(){
  const el = document.getElementById('typed');
  if (!el) return;

  // rotate these phrases (edit freely):
  const phrases = [
    "Aerospace Engineer",
    "Mechanical Design Engineer",
    "Systems-minded Builder",
    "Design · Build · Test"
  ];

  const typeSpeed = 60;     // ms per char
  const eraseSpeed = 40;    // ms per char
  const holdTime  = 1100;   // pause when a word is complete

  let i = 0, j = 0, typing = true;

  function tick(){
    const current = phrases[i];

    if (typing){
      el.textContent = current.slice(0, j + 1);
      j++;
      if (j === current.length){
        typing = false;
        setTimeout(tick, holdTime);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = current.slice(0, j - 1);
      j--;
      if (j === 0){
        typing = true;
        i = (i + 1) % phrases.length;
      }
      setTimeout(tick, eraseSpeed);
    }
  }
  tick();
})();
