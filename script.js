// Typing effect
document.addEventListener('DOMContentLoaded', function(){
  if(window.Typed){
    new Typed('.typed', {
      strings: ['Web Developer', 'Cybersecurity Student', 'Problem Solver', 'Lifelong Learner'],
      typeSpeed: 60,
      backSpeed: 30,
      backDelay: 1400,
      loop: true
    });
  }

  // Simple GSAP entrance animations
  if(window.gsap){
    gsap.from('.hero-left h1', {y:30, opacity:0, duration:0.8, ease:'power3.out'});
    gsap.from('.hero-left .lead', {y:20, opacity:0, duration:0.9, delay:0.2});
    gsap.from('.avatar-card', {scale:0.9, opacity:0, duration:0.9, delay:0.3});
    gsap.from('.project-card', {y:20, opacity:0, duration:0.8, stagger:0.12, scrollTrigger: {trigger: '.projects'}});
  }

  // Simple mobile nav toggle
  const toggle = document.getElementById('nav-toggle');
  toggle && toggle.addEventListener('click', ()=>{
    const nav = document.querySelector('.nav');
    if(nav.style.display === 'flex') nav.style.display = 'none';
    else nav.style.display = 'flex';
  });

  // Reveal on scroll for sections
  const obs = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('in-view');
    });
  }, {threshold: 0.15});
  document.querySelectorAll('.section, .article').forEach(s=>obs.observe(s));
});


// ------------------------------------------
// 📰 Load Markdown Article (for article.html)
// ------------------------------------------

document.addEventListener("DOMContentLoaded", async () => {
  const contentDiv = document.getElementById("content");
  if (!contentDiv) return; // Only run this on article.html

  const urlParams = new URLSearchParams(window.location.search);
  const file = urlParams.get("file");

  if (!file) {
    contentDiv.innerHTML = "<p>No article specified.</p>";
    return;
  }

  try {
    const res = await fetch(`articles/${file}`);
    if (!res.ok) throw new Error("File not found");
    const text = await res.text();

    // Render markdown using Marked.js
    if (window.marked) {
      contentDiv.innerHTML = marked.parse(text);
    } else {
      contentDiv.innerHTML = "<p>Markdown renderer not loaded.</p>";
    }
  } catch (err) {
    contentDiv.innerHTML = `<p>⚠️ Error loading article: ${err.message}</p>`;
  }
});
