(function () {
  const params = new URLSearchParams(window.location.search);
  const fromQuery = params.get("lang");
  const supported = window.MuyuI18n.SUPPORTED || ["zh", "en", "ja", "ko"];

  const readStored = (key) => {
    try {
      return localStorage.getItem(key);
    } catch (_) {
      return null;
    }
  };

  const detectSystemLang = () => {
    const candidates = [];
    if (typeof navigator !== "undefined") {
      if (Array.isArray(navigator.languages)) {
        candidates.push(...navigator.languages);
      }
      if (navigator.language) candidates.push(navigator.language);
      if (navigator.userLanguage) candidates.push(navigator.userLanguage);
    }

    for (const raw of candidates) {
      const tag = String(raw || "").toLowerCase().replace(/_/g, "-");
      if (!tag) continue;
      if (tag === "zh" || tag.startsWith("zh-")) return "zh";
      if (tag === "ja" || tag.startsWith("ja-")) return "ja";
      if (tag === "ko" || tag.startsWith("ko-")) return "ko";
      if (tag === "en" || tag.startsWith("en-")) return "en";
    }
    return null;
  };

  const userPicked = readStored("muyu_site_lang_picked") === "1";
  const stored = readStored("muyu_site_lang");
  const fromSystem = detectSystemLang();

  // URL > explicit user pick > system locale > Chinese
  const initial = supported.includes(fromQuery)
    ? fromQuery
    : userPicked && supported.includes(stored)
      ? stored
      : fromSystem || "zh";

  window.MuyuI18n.applyLang(initial, { persistPick: false });

  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.addEventListener("click", () => {
      window.MuyuI18n.applyLang(btn.dataset.lang, { persistPick: true });
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
