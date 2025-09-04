/* ---------- utility: current year ---------- */
(function () {
  var y = document.getElementById('y');
  if (y) y.textContent = new Date().getFullYear();
})();

/* ---------- theme toggle (persisted) ---------- */
(function () {
  var root = document.documentElement;
  var saved = localStorage.getItem('theme');
  if (saved === 'light') root.classList.add('light');
  var btn = document.getElementById('theme-toggle');
  if (btn) {
    btn.addEventListener('click', function () {
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
    });
  }
})();

/* ---------- smooth scroll for hash links ---------- */
document.addEventListener('click', function (e) {
  var a = e.target.closest('a[href^="#"]');
  if (!a) return;
  var id = a.getAttribute('href').slice(1);
  var el = document.getElementById(id);
  if (el) {
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

/* ---------- reveal-on-scroll ---------- */
(function () {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-reveal]').forEach(function (el) {
      el.classList.add('reveal-in');
    });
    return;
  }
  var io = new IntersectionObserver(function (ents) {
    ents.forEach(function (en) {
      if (en.isIntersecting) {
        en.target.classList.add('reveal-in');
        io.unobserve(en.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) { io.observe(el); });
})();

/* ---------- TYPED HERO TITLE (robust + simple) ---------- */
document.addEventListener('DOMContentLoaded', function () {
  var el = document.getElementById('typed');
  if (!el) return;

  // edit these to whatever you want to rotate
  var phrases = [
    'Aerospace Engineer',
    'Mechanical Design Engineer',
    'Systems-minded Builder',
    'Design · Build · Test'
  ];

  var typeMS = 60;    // per character while typing
  var eraseMS = 40;   // per character while deleting
  var holdMS  = 1100; // pause when a word completes

  var i = 0;          // phrase index
  var j = 0;          // char index
  var typing = true;  // typing or deleting

  function tick () {
    var current = phrases[i];

    if (typing) {
      el.textContent = current.slice(0, j + 1);
      j++;
      if (j === current.length) {
        typing = false;
        return setTimeout(tick, holdMS);
      }
      return setTimeout(tick, typeMS);
    } else {
      el.textContent = current.slice(0, j - 1);
      j--;
      if (j === 0) {
        typing = true;
        i = (i + 1) % phrases.length;
      }
      return setTimeout(tick, eraseMS);
    }
  }
  tick();
});
