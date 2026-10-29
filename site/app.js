// AI Skill & Agent Navigator — Navigation-first architecture
// Landing → Platform Cards + Quick Categories
// Browse  → Breadcrumb + Grouped Sections + Expandable Cards

(function () {
  "use strict";

  // ── Platform config ──────────────────────────────────────────
  const PLATFORM = [
    { key: "Codex",         label: "Codex",         cls: "plat-codex",   icon: "⚡", desc: "OpenAI Codex CLI / API / Automation — 自动化工作流与子智能体" },
    { key: "Claude",        label: "Claude",        cls: "plat-claude",  icon: "🦦", desc: "Anthropic Claude Code / Desktop — 网页设计与内容生成" },
    { key: "DeepSeek (DSH)",label: "DeepSeek",     cls: "plat-dsh",     icon: "🔮", desc: "DeepSeek Harness — 插件化 Agent，Everything is a Plugin" },
    { key: "General",       label: "通用",          cls: "plat-general", icon: "🌐", desc: "跨平台通用 Skills — 提示词工程、自动化、工具与资源集合" },
  ];

  const PLAT_LABELS = { Codex:"Codex", Claude:"Claude", "DeepSeek (DSH)":"DeepSeek", General:"通用" };
  const BADGE_CLS   = { Codex:"codex",  Claude:"claude", "DeepSeek (DSH)":"dsh",       General:"general" };

  // ── State ────────────────────────────────────────────────────
  let skillsData     = [];
  let activePlatform = "";   // "" = all
  let activeCats     = new Set();
  let expandedCard   = null; // id of expanded card

  // ── DOM refs ─────────────────────────────────────────────────
  const $ = (id) => document.getElementById(id);
  const searchEl      = $("search");
  const sortEl        = $("sortSelect");
  const freeOnlyEl    = $("freeOnly");
  const themeToggleEl = $("themeToggle");
  const bcHome        = $("bcHome");
  const bcPlatform    = $("bcPlatform");
  const bcSep2        = $("bcSep2");
  const bcCategory    = $("bcCategory");
  const bcReset       = $("bcReset");
  const landingEl     = $("landingState");
  const browseEl      = $("browseState");
  const platformGrid  = $("platformGrid");
  const qchipGrid     = $("qchipGrid");
  const platChipsEl   = $("platChips");
  const catChipsWrapEl= $("catChipsWrap");
  const platNavEl     = $("platNav");
  const platNavInner  = $("platNavInner");
  const sectionCont   = $("sectionsContainer");
  const countEl       = document.createElement("p");
  const emptyEl       = $("empty");
  const loadingEl     = $("loading");
  const footerCountEl = $("footerCount");
  countEl.id = "count";
  countEl.className = "browse-stats";

  // ── Theme ────────────────────────────────────────────────────
  function getSavedTheme() {
    try { return localStorage.getItem("theme") || ""; } catch (_) { return ""; }
  }
  function saveTheme(t) {
    try { localStorage.setItem("theme", t); } catch (_) {}
  }
  function setTheme(theme) {
    const isLight =
      theme === "light" ||
      (!theme && window.matchMedia("(prefers-color-scheme: light)").matches);
    document.documentElement.dataset.theme = isLight ? "light" : "dark";
    themeToggleEl.dataset.toggled = String(isLight);
    saveTheme(isLight ? "light" : "");
  }
  function cycleTheme() {
    const cur = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    setTheme(cur === "light" ? "dark" : "light");
  }
  themeToggleEl.addEventListener("click", cycleTheme);
  themeToggleEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); cycleTheme(); }
  });
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if (!getSavedTheme()) setTheme("");
  });

  // ── Utilities ────────────────────────────────────────────────
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function badge(platform) {
    const cls = BADGE_CLS[platform] || "general";
    return `<span class="badge ${cls}"><span class="dot ${cls}"></span>${esc(PLAT_LABELS[platform])}</span>`;
  }

  function tag(t) {
    return `<span class="tag">#${esc(t)}</span>`;
  }

  // ── Data helpers ─────────────────────────────────────────────
  function filtered() {
    let r = skillsData;
    if (activePlatform) r = r.filter(s => (s.platform || []).includes(activePlatform));
    if (activeCats.size) r = r.filter(s => activeCats.has(s.category));
    if (freeOnlyEl.checked) r = r.filter(s => s.is_free);
    const q = (searchEl.value || "").trim().toLowerCase();
    if (q) r = r.filter(s =>
      [s.name, s.description, s.category, ...(s.tags||[])].join(" ").toLowerCase().includes(q)
    );
    return r;
  }

  function sorted(r) {
    if (sortEl.value === "name") return r.slice().sort((a,b) => a.name.localeCompare(b.name, "zh-Hans-CN"));
    if (sortEl.value === "date") return r.slice().sort((a,b) => (b.date_added||"").localeCompare(a.date_added||""));
    return r;
  }

  function groupedByCategory(results) {
    const map = {};
    for (const s of results) (map[s.category] = map[s.category]||[]).push(s);
    const order = [...new Set(results.map(s => s.category))].sort();
    return order.map(cat => ({ category: cat, items: map[cat] }));
  }

  // ── Breadcrumb ───────────────────────────────────────────────
  function updateBreadcrumb() {
    const hasPlat = !!activePlatform;
    const hasCat  = activeCats.size > 0;

    bcPlatform.textContent = hasPlat
      ? (PLAT_LABELS[activePlatform] || activePlatform)
      : "";
    bcPlatform.style.display = hasPlat ? "" : "none";
    bcPlatform.onclick = hasPlat
      ? () => { activePlatform = ""; activeCats.clear(); updateAll(); }
      : null;

    const catNames = [...activeCats].join(" · ");
    bcCategory.textContent = catNames;
    bcCategory.style.display = hasCat ? "" : "none";
    bcCategory.onclick = hasCat
      ? () => { activeCats.clear(); updateAll(); }
      : null;

    bcSep2.style.display = (hasPlat && hasCat) ? "" : "none";

    const hasFilter = hasPlat || hasCat || freeOnlyEl.checked || searchEl.value.trim();
    bcReset.style.display = hasFilter ? "" : "none";
    bcHome.classList.toggle("active", !hasPlat && !hasCat);
  }
  bcHome.onclick = () => { activePlatform = ""; activeCats.clear(); updateAll(); };
  bcReset.onclick = () => {
    activePlatform = ""; activeCats.clear();
    freeOnlyEl.checked = false; searchEl.value = "";
    updateAll();
  };

  // ── Landing: Platform cards + Quick category chips ─────────────
  function renderLanding() {
    // Platform cards
    const byPlat = {};
    skillsData.forEach(s => (s.platform||[]).forEach(p => (byPlat[p]=(byPlat[p]||0)+1));

    platformGrid.innerHTML = PLATFORM.map((p, i) => {
      const cnt = byPlat[p.key] || 0;
      if (cnt === 0) return "";
      const topCats = [...new Set(skillsData.filter(s => (s.platform||[]).includes(p.key)).map(s=>s.category)]
        .slice(0, 4);
      return `
        <div class="plat-card ${p.cls}"
             role="button"
             tabindex="0"
             data-platform="${esc(p.key)}"
             aria-label="${esc(p.label)} — ${cnt} 个 Skill"
             style="animation-delay:${i*80}ms">
          <div class="plat-dot" aria-hidden="true">${p.icon}</div>
          <h3>${esc(p.label)}</h3>
          <p class="plat-desc">${esc(p.desc)}</p>
          <div class="plat-meta">
            <span class="plat-num">${cnt}</span>
            <span class="plat-num-label">Skill${cnt!==1?'s':''}</span>
          </div>
          ${topCats.length ? `<div class="plat-tags">${topCats.map(c=`<span class="plat-tag">${esc(c)}</span>`).join("")}</div>` : ""}
          <span class="plat-arrow" aria-hidden="true">→</span>
        </div>`;
    }).join("");

    // Click platform card
    platformGrid.querySelectorAll(".plat-card").forEach(el => {
      el.addEventListener("click", () => {
        activePlatform = el.dataset.platform;
        activeCats.clear();
        renderBrowse();
      });
      el.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); el.click(); }
      });
    });

    // Quick category chips
    const catCount = {};
    skillsData.forEach(s => (catCount[s.category] = (catCount[s.category]||0)+1);
    const cats = Object.entries(catCount).sort((a,b) => b[1]-a[1]);
    qchipGrid.innerHTML = cats.map(([cat, cnt]) =>
      `<button type="button" class="qchip" data-cat="${esc(cat)}" aria-label="分类：${esc(cat)}，${cnt} 条">
        ${esc(cat)} <span class="qchip-count">${cnt}</span>
      </button>`
    ).join("");
    qchipGrid.querySelectorAll(".qchip").forEach(el => {
      el.addEventListener("click", () => {
        activeCats.clear();
        activeCats.add(el.dataset.cat);
        renderBrowse();
      });
    });

    // Footer count
    footerCountEl.textContent = skillsData.length;
  }

  // ── Browse: Sticky platform chips + Category chips ────────────
  function renderBrowse() {
    updateBreadcrumb();
    if (!activePlatform) {
      // Show platform quick-nav
      const byPlat = {};
      skillsData.forEach(s => (s.platform||[]).forEach(p => (byPlat[p]=(byPlat[p]||0)+1));
      platNavEl.style.display = "";
      const sortedPlats = PLATFORM.filter(p => byPlat[p.key]);
      platNavInner.innerHTML = sortedPlats.map(p =>
        `<button type="button" class="pnav-chip" data-platform="${esc(p.key)}" aria-label="${esc(p.label)} ${byPlat[p.key]||0}">
          <span class="dot ${BADGE_CLS[p.key]}"></span>${esc(p.label)} <b>${byPlat[p.key]||0}</b>
        </button>`
      ).join("");
      platNavInner.querySelectorAll(".pnav-chip").forEach(el => {
        el.addEventListener("click", () => {
          activePlatform = el.dataset.platform;
          renderBrowse();
        });
      });
    } else {
      platNavEl.style.display = "none";
    }

    // Category chips in sticky bar (only show when platform selected)
    if (activePlatform) {
      const cats = {};
      skillsData.filter(s => (s.platform||[]).includes(activePlatform))
        .forEach(s => (cats[s.category]=(cats[s.category]||0)+1));
      const list = Object.entries(cats).sort((a,b) => b[1]-a[1]);
      catChipsWrapEl.style.display = (activeCats.size === 0 && list.length > 4) ? "none" : "";
      catChipsWrapEl.innerHTML = list.map(([cat,cnt]) =>
        `<button type="button" class="cat-chip${activeCats.has(cat)?" on":""}" data-cat="${esc(cat)}">
          ${esc(cat)} <span style="opacity:.6">${cnt}</span>
        </button>`
      ).join("");
      catChipsWrapEl.querySelectorAll(".cat-chip").forEach(el => {
        el.addEventListener("click", () => {
          if (activeCats.has(el.dataset.cat)) { activeCats.delete(el.dataset.cat); }
          else { activeCats.add(el.dataset.cat); }
          renderBrowse();
        });
      });
    } else {
      catChipsWrapEl.style.display = "none";
    }

    renderResults();
  }

  // ── Results: Grouped sections ────────────────────────────────
  function renderResults() {
    const results = sorted(filtered());
    const groups = groupedByCategory(results);
    const hasFilter = activePlatform || activeCats.size || freeOnlyEl.checked || searchEl.value.trim();

    // Stats pill
    if (results.length === skillsData.length) {
      countEl.innerHTML = `<span class="stat-pill"><b>${results.length}</b> 个 Skill · <b>${groups.length}</b> 个分类</span>`;
    } else {
      countEl.innerHTML = `<span class="stat-pill"><b>${results.length}</b> / ${skillsData.length}</span>
        ${hasFilter ? `<button type="button" onclick="document.getElementById('bcReset').click()"
          style="appearance:none;background:none;border:none;color:var(--accent);font-size:.78rem;cursor:pointer;">重置 →</button>` : ""}`;
    }

    if (results.length === 0) {
      sectionCont.innerHTML = "";
      emptyEl.classList.remove("hidden");
    } else {
      emptyEl.classList.add("hidden");
      sectionCont.innerHTML = groups.map(g => `
        <section class="section-group" aria-label="${esc(g.category)}">
          <div class="section-header" role="heading" aria-level="2">
            <span class="section-title">${esc(g.category)}</span>
            <span class="section-count">${g.items.length} 条</span>
          </div>
          <div class="section-cards">
            ${g.items.map(s => renderSkillCard(s)).join("")}
          </div>
        </section>
      `).join("");
      // Card click to expand
      sectionCont.querySelectorAll(".card").forEach(el => {
        el.addEventListener("click", (e) => {
          if (e.target.closest("a")) return; // don't intercept link clicks
          const id = el.dataset.id;
          if (expandedCard === id) {
            el.classList.remove("expanded");
            expandedCard = null;
          } else {
            sectionCont.querySelectorAll(".card.expanded").forEach(c => c.classList.remove("expanded"));
            el.classList.add("expanded");
            expandedCard = id;
          }
        });
      });
    }
  }

  function renderSkillCard(s) {
    const url = esc(s.url || "#");
    const platforms = (s.platform||[]).map(badge).join("");
    const tags = (s.tags||[]).map(tag).join("");
    const free = s.is_free ? "免费/公益" : "付费";
    const freeCls = s.is_free ? "free" : "free no";
    return `
      <article class="card glass-panel" data-id="${esc(s.id)}" tabindex="0" role="article"
               aria-label="${esc(s.name)}，${free}">
        <div class="card-body">
          <div class="card-title">
            <a href="${url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${esc(s.name)}</a>
          </div>
          <div class="platforms">${platforms}</div>
          <p class="desc">${esc(s.description||"")}</p>
        </div>
        <div class="card-meta">
          <span class="category">${esc(s.category)}</span>
          <span class="${freeCls}">${free}</span>
        </div>
        ${tags ? `<div class="tags">${tags}</div>` : ""}
        <a href="${url}" target="_blank" rel="noopener noreferrer"
           class="card-link-arrow" onclick="event.stopPropagation()"
           aria-label="打开 ${esc(s.name)}">
          GitHub → <span style="font-size:.7rem">↗</span>
        </a>
        <span class="card-expand-hint" aria-hidden="true">点击展开</span>
      </article>`;
  }

  function updateAll() {
    updateBreadcrumb();
    if (!activePlatform && activeCats.size === 0) {
      landingEl.style.display = "";
      browseEl.style.display = "none";
    } else {
      landingEl.style.display = "none";
      browseEl.style.display = "";
      renderBrowse();
    }
  }

  // ── Filter events ────────────────────────────────────────────
  searchEl.addEventListener("input", updateAll);
  sortEl.addEventListener("change", updateAll);
  freeOnlyEl.addEventListener("change", updateAll);

  // ── Show sticky bar only when browsing ────────────────────────
  const stickyBar = $("stickyBar");
  let lastScrollY = 0;
  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    if (activePlatform || activeCats.size > 0) {
      stickyBar.classList.toggle("hidden", y < 80);
    } else {
      stickyBar.classList.add("hidden");
    }
    lastScrollY = y;
  }, { passive: true });

  // ── Init ────────────────────────────────────────────────────
  async function init() {
    setTheme(getSavedTheme());

    // Show loading skeleton (8 cards)
    landingEl.style.display = "none";
    browseEl.style.display = "";
    loadingEl.classList.remove("hidden");
    loadingEl.innerHTML = Array.from({length: 8}, () =>
      `<div class="skeleton" aria-hidden="true">
         <div class="s-bar s-bar tall w60"></div>
         <div class="s-bar" style="width:80%"></div>
         <div class="s-bar short"></div>
         <div class="s-bar w75"></div>
       </div>`
    ).join("");

    try {
      const res = await fetch("data/skills.json");
      if (!res.ok) throw new Error("HTTP " + res.status);
      skillsData = await res.json();
      if (!Array.isArray(skillsData)) throw new Error("bad JSON");
    } catch (err) {
      landingEl.style.display = "";
      browseEl.style.display = "none";
      loadingEl.classList.add("hidden");
      footerCountEl.textContent = "?";
      console.error(err);
      return;
    }

    loadingEl.classList.add("hidden");
    renderLanding();
    updateAll();
  }

  init();
})();