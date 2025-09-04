// year
document.getElementById('y') && (document.getElementById('y').textContent = new Date().getFullYear());

// theme toggle
const root = document.documentElement;
const saved = localStorage.getItem('theme');
if (saved === 'light') root.classList.add('light');
const thBtn = document.getElementById('theme-toggle');
if (thBtn) thBtn.onclick = () => {
  root.classList.toggle('light');
  localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
};

// smooth scroll for hash links
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

