(function () {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("lang");
  const stored = (() => {
    try {
      return localStorage.getItem("muyu_site_lang");
    } catch (_) {
      return null;
    }
  })();
  const preferEn =
    typeof navigator !== "undefined" &&
    (navigator.language || "").toLowerCase().startsWith("en");
  const initial =
    fromQuery === "en" || fromQuery === "zh"
      ? fromQuery
      : stored || (preferEn ? "en" : "zh");

  window.MuyuI18n.applyLang(initial);

  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.MuyuI18n.applyLang(btn.dataset.lang);
    });
  });

  // Header glass on scroll
  const top = document.querySelector(".top");
  const onScroll = () => {
    if (!top) return;
    top.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Practice tap
  const muyu = document.querySelector(".practice-muyu");
  const merit = document.querySelector(".merit");
  if (muyu && merit) {
    const hit = () => {
      muyu.classList.remove("is-hit");
      void muyu.offsetWidth;
      muyu.classList.add("is-hit");
      merit.classList.remove("is-show");
      void merit.offsetWidth;
      merit.classList.add("is-show");
    };
    muyu.addEventListener("click", hit);
    muyu.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        hit();
      }
    });
    muyu.setAttribute("tabindex", "0");
    muyu.setAttribute("role", "button");
  }

  // Reveal on scroll
  const nodes = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 6, 4) * 0.07}s`;
      io.observe(el);
    });
  } else {
    nodes.forEach((el) => el.classList.add("is-in"));
  }
})();
