(() => {
  // Footer year
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", (e) => {
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      history.pushState(null, "", id);
    });
  });

  // Reveal on scroll
  const revealEls = Array.from(document.querySelectorAll(".reveal"));
  const io = new IntersectionObserver((entries) => {
    for (const ent of entries) {
      if (ent.isIntersecting) {
        ent.target.classList.add("in");
        io.unobserve(ent.target);
      }
    }
  }, { threshold: 0.12 });

  revealEls.forEach(el => io.observe(el));

  // Active nav link based on section in view
  const navLinks = Array.from(document.querySelectorAll(".nav a"))
    .filter(a => (a.getAttribute("href") || "").startsWith("#") && a.getAttribute("href") !== "#contact");

  const sections = navLinks
    .map(a => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  const navById = new Map(navLinks.map(a => [a.getAttribute("href"), a]));

  const ioNav = new IntersectionObserver((entries) => {
    // Pick the most visible section
    const visible = entries.filter(e => e.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;

    const id = "#" + visible.target.id;
    navLinks.forEach(a => a.classList.remove("active"));
    const active = navById.get(id);
    if (active) active.classList.add("active");
  }, { threshold: [0.25, 0.5, 0.75] });

  sections.forEach(s => ioNav.observe(s));

  // Topbar subtle shadow on scroll
  const topbar = document.getElementById("topbar");
  const onScroll = () => {
    if (!topbar) return;
    const y = window.scrollY || 0;
    topbar.style.boxShadow = y > 8 ? "0 10px 40px rgba(0,0,0,.35)" : "none";
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();
