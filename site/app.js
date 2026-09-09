// AI Skill & Agent 导航站前端逻辑
// 读取 data/skills.json 并进行搜索、平台筛选、分类多选筛选、排序与主题切换。

const PLATFORM_CLASS = {
  Codex: "codex",
  Claude: "claude",
  "DeepSeek (DSH)": "dsh",
  General: "general",
};

const PLATFORM_LABEL = {
  Codex: "Codex",
  Claude: "Claude",
  "DeepSeek (DSH)": "DeepSeek",
  General: "通用",
};

let skillsData = [];

// 各元素
const searchEl = document.getElementById("search");
const sortEl = document.getElementById("sortSelect");
const platformEl = document.getElementById("platformFilter");
const categoryChipsEl = document.getElementById("categoryChips");
const freeOnlyEl = document.getElementById("freeOnly");
const themeToggleEl = document.getElementById("themeToggle");
const statsEl = document.getElementById("stats");
const countEl = document.getElementById("count");
const gridEl = document.getElementById("grid");
const emptyEl = document.getElementById("empty");

// 状态
let activeCategories = new Set(); // 空集合 = 全部分类
const platformBtnEls = Array.from(platformEl.querySelectorAll(".seg-btn"));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function badgeFor(platform) {
  const cls = PLATFORM_CLASS[platform] || "general";
  const label = PLATFORM_LABEL[platform] || platform;
  return `<span class="badge ${cls}"><span class="dot ${cls}"></span>${escapeHtml(label)}</span>`;
}

function renderCard(skill) {
  const platforms = (skill.platform || []).map(badgeFor).join("");
  const freeText = skill.is_free ? "免费/公益" : "付费";
  const freeClass = skill.is_free ? "free" : "free no";
  const tags = (skill.tags || [])
    .map((t) => `<span class="tag">#${escapeHtml(t)}</span>`)
    .join("");
  const desc = escapeHtml(skill.description || "");
  const name = escapeHtml(skill.name || "");
  const url = skill.url || "#";
  return `
    <article class="card glass-panel">
      <h3><a href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">${name}</a></h3>
      <div class="platforms">${platforms}</div>
      <p class="desc">${desc}</p>
      <div class="meta">
        <span class="category">${escapeHtml(skill.category || "未分类")}</span>
        <span class="${freeClass}">${freeText}</span>
      </div>
      ${tags ? `<div class="tags">${tags}</div>` : ""}
    </article>`;
}

function currentlySelectedPlatform() {
  const active = platformBtnEls.find((b) => b.classList.contains("active"));
  return active ? active.dataset.value : "";
}

function filterSkills() {
  const q = (searchEl.value || "").trim().toLowerCase();
  const platform = currentlySelectedPlatform();
  const freeOnly = freeOnlyEl.checked;
  const hasCategoryFilter = activeCategories.size > 0;

  const results = skillsData.filter((s) => {
    if (platform && !(s.platform || []).includes(platform)) return false;
    if (hasCategoryFilter && !activeCategories.has(s.category)) return false;
    if (freeOnly && !s.is_free) return false;
    if (q) {
      const haystack = [
        s.name,
        s.description,
        s.category,
        ...(s.tags || []),
        ...(s.platform || []),
      ]
        .join(" ")
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  return results;
}

function sortResults(results) {
  const mode = sortEl.value;
  const sorted = results.slice();
  if (mode === "name") {
    sorted.sort((a, b) => String(a.name).localeCompare(String(b.name), "zh-Hans-CN"));
  } else if (mode === "date") {
    sorted.sort((a, b) =>
      String(b.date_added || "").localeCompare(String(a.date_added || ""))
    );
  }
  return sorted;
}

function applyFilters() {
  const results = sortResults(filterSkills());

  countEl.textContent = `共 ${results.length} / ${skillsData.length} 条记录`;
  emptyEl.classList.toggle("hidden", results.length > 0);
  gridEl.innerHTML = results.map(renderCard).join("");
}

function buildCategories() {
  const cats = [...new Set(skillsData.map((s) => s.category).filter(Boolean))].sort(
    (a, b) => a.localeCompare(b, "zh-Hans-CN")
  );
  const allChip = document.createElement("button");
  allChip.type = "button";
  allChip.className = "chip active";
  allChip.dataset.value = "";
  allChip.textContent = "全部";
  allChip.addEventListener("click", () => {
    activeCategories.clear();
    updateChipState();
    applyFilters();
  });

  categoryChipsEl.appendChild(allChip);

  cats.forEach((c) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "chip";
    chip.dataset.value = c;
    chip.textContent = c;
    chip.addEventListener("click", () => {
      if (activeCategories.has(c)) activeCategories.delete(c);
      else activeCategories.add(c);
      // 若通过点选重新选择了任一分类，则取消「全部」；全部清空时回到「全部」态
      updateChipState();
      applyFilters();
    });
    categoryChipsEl.appendChild(chip);
  });
}

function updateChipState() {
  const chips = categoryChipsEl.querySelectorAll(".chip");
  chips.forEach((chip) => {
    chip.classList.toggle("active", activeCategories.has(chip.dataset.value));
  });
  // 「全部」chip 在所有分类都未选中时高亮
  const allChip = categoryChipsEl.querySelector('.chip[data-value=""]');
  if (allChip) allChip.classList.toggle("active", activeCategories.size === 0);
}

function buildStats() {
  const total = skillsData.length;
  const counts = {};
  skillsData.forEach((s) =>
    (s.platform || []).forEach((p) => {
      counts[p] = (counts[p] || 0) + 1;
    })
  );
  const chips = [`<span class="stat"><b>${total}</b>收录 Skill</span>`];
  for (const p of Object.keys(counts)) {
    const cls = PLATFORM_CLASS[p] || "general";
    const label = PLATFORM_LABEL[p] || p;
    chips.push(
      `<span class="stat"><span class="dot ${cls}"></span>${escapeHtml(label)}<b>${counts[p]}</b></span>`
    );
  }
  statsEl.innerHTML = chips.join("");
}

/* ---------------- 主题切换 ---------------- */
function getSavedTheme() {
  try {
    return localStorage.getItem("dsh-nav-theme") || "";
  } catch (e) {
    return "";
  }
}

function setTheme(mode) {
  // mode: '' (跟随系统), 'light', 'dark'
  const root = document.documentElement;
  if (mode === "dark" || (mode === "" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    root.setAttribute("data-theme", "dark");
  } else {
    root.setAttribute("data-theme", "light");
  }
  themeToggleEl.setAttribute("aria-checked", String(mode !== "light"));
  try {
    localStorage.setItem("dsh-nav-theme", mode);
  } catch (e) {
    /* ignore */
  }
}

function cycleTheme() {
  const current = getSavedTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
}

async function init() {
  // 初始化主题
  const savedTheme = getSavedTheme();
  setTheme(savedTheme || "");

  try {
    const res = await fetch("data/skills.json");
    skillsData = await res.json();
  } catch (err) {
    gridEl.innerHTML = '<p class="empty">无法加载 data/skills.json，请确认文件存在。</p>';
    console.error(err);
    return;
  }
  buildStats();
  buildCategories();
  applyFilters();
}

// 监听变化
searchEl.addEventListener("input", applyFilters);
sortEl.addEventListener("change", applyFilters);
freeOnlyEl.addEventListener("change", applyFilters);
themeToggleEl.addEventListener("click", cycleTheme);
themeToggleEl.addEventListener("keydown", (e) => {
  if (e.key === "Enter" || e.key === " ") {
    e.preventDefault();
    cycleTheme();
  }
});

// 平台分段控件
platformBtnEls.forEach((btn) => {
  btn.addEventListener("click", () => {
    platformBtnEls.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    applyFilters();
  });
});

// 跟随系统主题变化
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (!getSavedTheme()) setTheme("");
  });

init();