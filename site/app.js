// AI Skill & Agent 导航站前端逻辑
// 读取 data/skills.json 并进行搜索、平台筛选、分类筛选。

const PLATFORM_CLASS = {
  Codex: "codex",
  Claude: "claude",
  "DeepSeek (DSH)": "dsh",
  General: "general",
};

let skillsData = [];

// 各元素
const searchEl = document.getElementById("search");
const platformEl = document.getElementById("platformFilter");
const categoryEl = document.getElementById("categoryFilter");
const freeOnlyEl = document.getElementById("freeOnly");
const statsEl = document.getElementById("stats");
const countEl = document.getElementById("count");
const gridEl = document.getElementById("grid");
const emptyEl = document.getElementById("empty");

function badgeFor(platform) {
  const cls = PLATFORM_CLASS[platform] || "general";
  const label = platform === "DeepSeek (DSH)" ? "DeepSeek" : platform;
  return `<span class="badge ${cls}">${escapeHtml(label)}</span>`;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
    <article class="card">
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

function applyFilters() {
  const q = (searchEl.value || "").trim().toLowerCase();
  const platform = platformEl.value;
  const category = categoryEl.value;
  const freeOnly = freeOnlyEl.checked;

  const results = skillsData.filter((s) => {
    if (platform && !(s.platform || []).includes(platform)) return false;
    if (category && s.category !== category) return false;
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

  countEl.textContent = `共 ${results.length} / ${skillsData.length} 条记录`;
  emptyEl.classList.toggle("hidden", results.length > 0);
  gridEl.innerHTML = results.map(renderCard).join("");
}

function buildCategories() {
  const cats = [...new Set(skillsData.map((s) => s.category).filter(Boolean))];
  categoryEl.innerHTML =
    '<option value="">全部分类</option>' +
    cats.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("");
}

function buildStats() {
  const total = skillsData.length;
  const byPlatform = {};
  skillsData.forEach((s) =>
    (s.platform || []).forEach((p) => {
      byPlatform[p] = (byPlatform[p] || 0) + 1;
    })
  );
  const parts = [`收录 ${total} 个 Skill`];
  for (const [p, n] of Object.entries(byPlatform)) {
    parts.push(`${p}: ${n}`);
  }
  statsEl.textContent = parts.join(" · ");
}

async function init() {
  try {
    const res = await fetch("data/skills.json");
    skillsData = await res.json();
  } catch (err) {
    gridEl.innerHTML =
      '<p class="empty">无法加载 data/skills.json，请确认文件存在。</p>';
    console.error(err);
    return;
  }
  buildStats();
  buildCategories();
  applyFilters();
}

// 监听变化
searchEl.addEventListener("input", applyFilters);
platformEl.addEventListener("change", applyFilters);
categoryEl.addEventListener("change", applyFilters);
freeOnlyEl.addEventListener("change", applyFilters);

init();