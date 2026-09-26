const COPY = {
  zh: {
    brand: "新木鱼",
    brand_full: "新木鱼 WoodenFish",
    nav_practice: "修行",
    nav_features: "功能",
    nav_culture: "文化",
    nav_download: "下载",
    eyebrow_practice: "Practice",
    eyebrow_features: "Features",
    eyebrow_culture: "Culture",
    hero_title: "一叩一念，心归静处",
    hero_lead:
      "数字化木鱼，随时敲击、计功德、伴经声与冥想，在喧嚣里留一寸禅意。",
    cta_ios: "App Store 下载",
    cta_explore: "了解更多",
    practice_title: "指尖上的木鱼",
    practice_lead: "轻触屏幕，清脆一响；功德自计，心念自定。",
    merit_label: "功德",
    alt_muyu_tap: "木鱼插图，点击可体验功德+1",
    features_title: "静心所需，皆在其中",
    features_lead: "皮肤、经声、冥想与解压游戏，循着禅意慢慢展开。",
    f1_title: "敲击与功德",
    f1_body: "真实音效与震动反馈，自定义悬浮文字与计数。",
    f2_title: "多样木鱼皮肤",
    f2_body: "简约到复古，随心更换外观，让修行更有仪式感。",
    f3_title: "经文与背景",
    f3_body: "佛号、经诵与禅乐，配以氛围背景图，沉浸静修。",
    f4_title: "冥想计时",
    f4_body: "设定时长，专注呼吸与当下，修一寸光阴。",
    f5_title: "解压小游戏",
    f5_body: "戳泡泡、拨念珠、呼吸引导等，轻触放松身心。",
    f6_title: "木鱼文化",
    f6_body: "由来、寓意与常用佛号，在叩击之外多一分理解。",
    culture_title: "木鱼之声，醒心于片刻",
    culture_body:
      "木鱼中空，音短而清。每一次敲击，是正念，也是节奏——在读经与静坐之间，帮你把心安放回来。",
    download_title: "此刻，开始一叩",
    download_lead: "免费下载，随时随地修行与解压。",
    download_note: "Health & Fitness · 支持 iPhone、iPad",
    foot_copy: "© yugakhan · 让身心合一",
    doc_title: "新木鱼 WoodenFish — 敲击木鱼 · 静心解压",
    doc_desc:
      "新木鱼（WoodenFish）是一款数字化木鱼 App：敲击计功德、多种皮肤、经文音乐、冥想计时与解压游戏，助你在忙碌中找回平静。",
  },
  en: {
    brand: "WoodenFish",
    brand_full: "WoodenFish · Electronic",
    nav_practice: "Practice",
    nav_features: "Features",
    nav_culture: "Culture",
    nav_download: "Download",
    eyebrow_practice: "Practice",
    eyebrow_features: "Features",
    eyebrow_culture: "Culture",
    hero_title: "One tap. One breath. Stillness returns.",
    hero_lead:
      "A digital wooden fish for tapping, counting merit, scripture music, and meditation—calm in your pocket.",
    cta_ios: "Download on App Store",
    cta_explore: "Explore",
    practice_title: "Wooden fish at your fingertips",
    practice_lead: "Tap for a clear strike. Merit rises. Intention stays yours.",
    merit_label: "Merit",
    alt_muyu_tap: "Wooden fish illustration — tap for Merit +1",
    features_title: "Everything for a quiet mind",
    features_lead:
      "Skins, scripture music, meditation, and relax games—unfolded in a zen rhythm.",
    f1_title: "Tap & merit",
    f1_body: "Authentic sound and haptic feedback, with custom floating text.",
    f2_title: "Wooden fish skins",
    f2_body: "From minimal to vintage—change the look to suit your ritual.",
    f3_title: "Scripture & scenery",
    f3_body: "Buddha chants, sutras, and zen music with atmospheric backdrops.",
    f4_title: "Meditation timer",
    f4_body: "Set a duration and rest in the breath of now.",
    f5_title: "Relax games",
    f5_body: "Bubble pop, prayer beads, breathing guides, and more.",
    f6_title: "Wooden fish culture",
    f6_body: "Origin, meaning, and mantras—beyond the tap itself.",
    culture_title: "A short tone that wakes the mind",
    culture_body:
      "Hollow wood, clear and brief. Each strike is mindfulness and rhythm—helping you return between chanting and silence.",
    download_title: "Begin with one tap",
    download_lead: "Free to download. Practice and unwind anywhere.",
    download_note: "Health & Fitness · iPhone & iPad",
    foot_copy: "© yugakhan · Unite body and mind",
    doc_title: "WoodenFish — Digital Wooden Fish for Calm",
    doc_desc:
      "WoodenFish is a digital wooden fish app for tapping, merit counting, scripture music, meditation, and relaxing mini-games.",
  },
};

function applyLang(lang) {
  const dict = COPY[lang] || COPY.zh;
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hans";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] != null) el.textContent = dict[key];
  });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
    const key = el.getAttribute("data-i18n-alt");
    if (dict[key] != null) el.setAttribute("alt", dict[key]);
  });
  document.querySelectorAll(".lang button").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  document.title = dict.doc_title;
  const setMeta = (sel, attr, val) => {
    const el = document.querySelector(sel);
    if (el) el.setAttribute(attr, val);
  };
  setMeta('meta[name="description"]', "content", dict.doc_desc);
  setMeta('meta[property="og:title"]', "content", dict.doc_title);
  setMeta('meta[property="og:description"]', "content", dict.doc_desc);
  setMeta('meta[property="og:locale"]', "content", lang === "en" ? "en_US" : "zh_CN");
  setMeta('meta[name="twitter:title"]', "content", dict.doc_title);
  setMeta('meta[name="twitter:description"]', "content", dict.doc_desc);

  try {
    localStorage.setItem("muyu_site_lang", lang);
  } catch (_) {}

  const url = new URL(window.location.href);
  if (lang === "en") url.searchParams.set("lang", "en");
  else url.searchParams.delete("lang");
  window.history.replaceState({}, "", url);
}

window.MuyuI18n = { COPY, applyLang };
