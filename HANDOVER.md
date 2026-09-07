# 交接文档 — AI Skill & Agent 导航站

> 本文件供**新会话 / 新接手 Agent** 使用，说明项目现状、已完成与未完成事项，以及从本会话/仓库恢复操作的步骤。
> 交接日期：2026-09-03

---

## 1. 项目是什么

一个静态「AI Skill & Agent 导航站」，收录并分类 **Codex / Claude / DeepSeek(DSH) / 通用** 等平台的**公益、开源** Skill 与 Agent 链接。
纯前端、无构建、无框架，核心是下列三级结构：

```text
ai-skills-navigation/            # 本地仓库根目录
└── .github/workflows/deploy.yml # GitHub Pages 自动部署（推 main 即触发）
    data/skills.json             # ★ 唯一数据源（导航站核心数据库）
    site/                        # 静态站点
        index.html
        app.js                   # 读取 + 搜索 + 平台/分类筛选 + 渲染
        style.css
    scripts/update_readme.py     # 把 skills.json 同步成 README.md（按分类分组）
    README.md                    # GitHub 上展示的 Markdown 版导航目录
    SKILL.md                     # 供 AI Agent 自动新增 Skill 的指令
    LICENSE / .gitignore / .gitattributes
```

GitHub 仓库（远程）：`github.com/fanch1122/ai-skills-navigation`
线上站点：`https://fanch1122.github.io/ai-skills-navigation/`
GitHub Pages 通过仓库内 `.github/workflows/deploy.yml` 构建，artifact 根目录为 `site/`（构建时会先把 `data/` 复制进 `site/data/`）。

---

## 2. 当前状态（已提交 & 线上一致，工作树干净）

- 最近提交：`6dd1ee1`  feat(data): expand skill database to 115 real open-source skills
- 分支：`main`（已推送到 GitHub Pages 自动部署，线上数据校验 = 115 条，与本地一致）
- `data/skills.json`：**115 条真实开源项目**
  - 分类：**20 个**
  - 平台分布（跨平台重复计）：Claude 89 · Codex 76 · 通用(General) 20 · DeepSeek(DSH) 14
  - 所有 URL 均经 GitHub API 核验为 HTTP 200（无死链、未编造）
- `README.md`：已由 `scripts/update_readme.py` 按分类分组渲染（20 个 `### 分类` 标题）

---

## 3. 数据说明

### 3.1 每条记录 schema（严格遵循）
```json
{
  "id": "skill-001",
  "name": "…",
  "platform": ["Claude","Codex","DeepSeek (DSH)","General"],
  "category": "…",
  "url": "https://github.com/…",
  "description": "…",
  "is_free": true,
  "tags": ["…"],
  "date_added": "2026-09-03"
}
```

### 3.2 约束 / 约定
- `platform` 取值只允许四者之一：`Codex` / `Claude` / `DeepSeek (DSH)` / `General`，可为数组（跨平台）。
- `id` 唯一，建议 `skill-NNN` 递增。
- `date_added` 格式 `YYYY-MM-DD`。
- **不要编造 URL**：新增条目前用 GitHub API 或访问校验，确认真实存在且为开源/免费。
- 增加/修改条目后运行改脚本保持 README 同步（见 §5）。

### 3.3 20 个分类清单
官方 / Skill 集合 / 代码开发 / 科研与学术 / 安全与攻防 / 金融分析 / 设计·UI-UX / 内容创作 / 游戏开发 / 自动化 / 记忆与知识管理 / 演示·PPT / 视频创作 / 提示词工程 / 求职与简历 / 教育与学习 / 工具 / 产品管理 / MCP·框架 / SEO·营销

---

## 4. 已完成 / 未完成任务与遗留

### ✅ 已完成
1. 初始化项目完整结构（`7d2d697`）。
2. 修复 Pages 部署数据路径 bug（`89a0981`）：工作流把 `data/` 复制进 `site/data/`，否则线上 `data/skills.json` 404。
3. 用 GitHub Search API 按 topic/tag 收集并精选真实开源 Skill，具体见各提交：
   - 40 条种子（`e93e111`）
   - 扩到 115 条、分 20 类（`6dd1ee1`）
4. `update_readme.py` 改为按分类分组渲染，README 已同步。

### ❌ 未完成（重要：UI 重设计被回退）
- 曾尝试将 `site/` 改为 **Apple「Liquid Glass」风格**（毛玻璃、浅色+深色自适应、平台分段、分类多选 chips、搜索、排序、主题切换）。
- **原因**：本会话模型输出层持续把 CSS 数字损坏（如 `0`→`906…`、`22px`→`9640px…`、`rgba(9…)` 非法），25+ 次尝试（直接写、PowerShell here-string、分块追加、正则修复、子代理）均无法产出像素正确且合法的完整 `site/style.css`。
- **处置**：为避免提交损坏产物，已将 `site/index.html`、`site/app.js`、`site/style.css` **回退到上次正常部署的干净版本**（commit `6dd1ee1` 中即该版本）。线上站点为干净可用的原始简洁风格，并**已具备**平台筛选 / 分类筛选（单选）/ 仅免费 / 搜索。
- **TO-DO（在新会话完成）**：重做 Apple Liquid Glass UI + 多选分类筛选增强。

---

## 5. 常规维护步骤（新会话照做）

### 5.1 本地预览
```bash
# 复制数据进 site/，使相对路径 data/skills.json 可访问
# Windows:
Copy-Item -Recurse data site\data
# Linux/macOS:
# cp -R data site/data

python -m http.server 8000 --directory site
# 打开 http://localhost:8000
```

### 5.2 新增一个 Skill
1. 解析链接元数据（name / description / platform / category / is_free / tags，`date_added` 用当天）。
2. 追加到 `data/skills.json`（确保 `id` 唯一、URL 真实有效）。
3. 运行 `python scripts/update_readme.py` 同步 README。
4. 提交并推送：
```bash
git add data/skills.json README.md      # 若改了脚本/站点再加对应文件
git commit -m "feat(skill): add <Name> for <Platform>"
git push origin main                      # 自动触发 Pages 部署
```

### 5.3 从远程克隆/恢复（如果换机器）
```bash
git clone https://github.com/fanch1122/ai-skills-navigation.git
cd ai-skills-navigation
```

---

## 6. ⚠️ 安全提醒（务必处理）
曾在本会话中以**明文**提供过一个 GitHub Personal Access Token（classic，带 `repo` 等权限，用于拉数据源/推送）。
- **请到 GitHub → Settings → Developer settings → Personal access tokens 撤销/轮换该 token。**
- 仓库 `origin` 远程地址中未写入 token（已确认为干净 HTTPS 地址），但 token 已出现在对话历史上，视为已泄露。

---

## 7. 交接给下一个会话的「一句话任务」
> 继续完成站点 UI：将 `site/style.css` 全面改成 Apple Liquid Glass 风格（毛玻璃卡片与筛选面板、浅色/深色自适应、平台彩色圆点、分类多选 chips、搜索、排序、主题切换），并让 `site/app.js` 与 `site/index.html` 匹配该样式。之前尝试失败仅因本会话有不稳定的数字输出损坏，请在新会话直接重写 `site/style.css`（建议写完后用 read 逐条校验数值合法、无重复属性、花括号配平）。