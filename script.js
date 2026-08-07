/* ==========================================================================
   VANDAN FOUNDATION SEVA TRUST — Script
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Navbar scroll state + active link ---------- */
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 110;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));

    const backTop = document.getElementById('backTop');
    backTop.classList.toggle('show', window.scrollY > 500);
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinksWrap = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navLinksWrap.classList.toggle('open');
    const open = navLinksWrap.classList.contains('open');
    navToggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  navLinksWrap.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinksWrap.classList.remove('open');
    navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }));



  /* ---------- Back to top ---------- */
  document.getElementById('backTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Animated counters ---------- */
  const counters = document.querySelectorAll('.num[data-count]');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = +el.getAttribute('data-count');
      const suffix = el.getAttribute('data-suffix') || '';
      let cur = 0;
      const step = Math.max(target / 90, 1);
      const tick = () => {
        cur += step;
        if (cur >= target) { el.textContent = target.toLocaleString() + suffix; return; }
        el.textContent = Math.floor(cur).toLocaleString() + suffix;
        requestAnimationFrame(tick);
      };
      tick();
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(c => counterObserver.observe(c));

  /* ---------- Donation progress bar ---------- */
  const progressFill = document.getElementById('progressFill');
  const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        progressFill.style.width = progressFill.getAttribute('data-width');
        progressObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  if (progressFill) progressObserver.observe(progressFill);

  /* ---------- About tabs ---------- */
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const group = btn.closest('.about-copy, .tabs-wrap');
      const target = btn.getAttribute('data-tab');
      group.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      group.querySelector(`#${target}`).classList.add('active');
    });
  });

  /* ---------- Projects filter ---------- */
  document.querySelectorAll('.proj-filter').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.proj-filter').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      document.querySelectorAll('.proj-card').forEach(card => {
        card.style.display = (filter === 'all' || card.getAttribute('data-status') === filter) ? '' : 'none';
      });
    });
  });



  /* ---------- Testimonial slider (auto) ---------- */
  const track = document.getElementById('testTrack');
  const dotsWrap = document.getElementById('testDots');
  const slides = track.children.length;
  let testIndex = 0;
  for (let i = 0; i < slides; i++) {
    const dot = document.createElement('button');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => { testIndex = i; updateSlider(); });
    dotsWrap.appendChild(dot);
  }
  function updateSlider() {
    track.style.transform = `translateX(-${testIndex * 100}%)`;
    dotsWrap.querySelectorAll('button').forEach((d, i) => d.classList.toggle('active', i === testIndex));
  }
  setInterval(() => { testIndex = (testIndex + 1) % slides; updateSlider(); }, 5000);





  /* ---------- File input label update ---------- */
  document.querySelectorAll('.field-file input[type="file"]').forEach(input => {
    input.addEventListener('change', () => {
      const label = input.closest('.field-file').querySelector('.file-label');
      label.textContent = input.files.length ? input.files[0].name : label.getAttribute('data-default');
    });
  });

});


  /* ---------- Volunteer form submit ---------- */
document.getElementById("bookingForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("fname").value.trim();
    const phone = document.getElementById("fphone").value.trim();
    const age = document.getElementById("fguests").value.trim();
    const message = document.getElementById("fmsg").value.trim();

    if (name === "" || phone === "" || age === "") {
        alert("Please fill all required fields.");
        return;
    }

    const whatsappNumber = "919327863557";

    const whatsappMessage =
`*🌟 Volunteer Registration Form 🌟*

👤 *Name:* ${name}
📱 *Mobile:* ${phone}
🎂 *Age:* ${age}

📝 *Message:*
${message || "No message provided."}`;

    const url = `https://wa.me/919327863557?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(url, "_blank");
});
