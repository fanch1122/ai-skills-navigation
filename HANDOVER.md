# 交接文档 — AI Skill & Agent 导航站

> 本文件供**新会话 / 新接手 Agent** 使用，说明项目现状、已完成与未完成事项，以及从本会话/仓库恢复操作的步骤。
> 交接日期：2026-10-29

---

## 1. 项目是什么

一个静态「AI Skill & Agent 导航站」，收录并分类 **Codex / Claude / DeepSeek (DSH) / General** 等平台的**公益、开源** Skill 与 Agent 链接。

纯前端、无构建、无框架，核心是下列三级结构：

```
ai-skills-navigation/              # 本地仓库根目录
└── .github/workflows/deploy.yml   # GitHub Pages 自动部署（推 main 即触发）
    data/skills.json               # ★ 唯一数据源
    site/                          # 静态站点
        index.html                 # 140 行 — HTML 结构骨架
        app.js                     # 413 行 — 导航状态机 + 渲染引擎
        style.css                  # 641 行 / 193 对花括号配平
    scripts/update_readme.py       # 把 skills.json 同步成 README.md（按分类分组）
    README.md                      # GitHub 上展示的 Markdown 版导航目录
    SKILL.md                       # 供 AI Agent 自动新增 Skill 的指令
    LICENSE / .gitignore / .gitattributes
```

GitHub 仓库：`github.com/fanch1122/ai-skills-navigation`
线上站点：`https://fanch1122.github.io/ai-skills-navigation/`
GitHub Pages 通过 `.github/workflows/deploy.yml` 构建，artifact 根目录为 `site/`。

---

## 2. 当前状态（已提交 & 线上一致，工作树干净）

- 最近提交：`cbcbbd5`  refactor(nav): landing platform cards + grouped sections + breadcrumb
- 分支：`main`（已推送，GitHub Actions run `#40808807679` → success）
- `data/skills.json`：**115 条**真实开源项目，0 死链
  - 分类：**20 个**
  - 平台分布：Claude 89 · Codex 76 · General 20 · DeepSeek (DSH) 14

---

## 3. 导航架构说明（核心理解）

本站在 `cbcbbd5` 进行了**导航架构重构**，核心思想来自 Apple Wayfinding 四问：

### 3.1 两个视图状态

| 视图 | 何时显示 | 核心功能 |
|------|----------|----------|
| **Landing**（首页视图） | 未选平台、未选分类时 | 4 张平台入口卡 + 快速分类 Chips |
| **Browse**（浏览视图） | 选中了平台和/或分类后 | 按分类分组展示 + Sticky 筛选工具栏 |

状态切换逻辑在 `app.js` 的 `updateAll()` 函数中。

### 3.2 关键 UI 组件

| 组件 | HTML class | 渲染位置 | 说明 |
|------|-----------|---------|------|
| 面包屑 | `.breadcrumb` / `.bc-item` | Header 顶部 | 全程可见，回答"我在哪里"，支持逐级返回 |
| 重置按钮 | `#bcReset` | 面包屑右侧 | 一键清除所有筛选，恢复 Landing 视图 |
| 平台入口卡 | `.plat-card` | Landing 页 | 点击进入 Browse，并自动按该平台筛选 |
| 快速分类 Chips | `.qchip` | Landing 页底部 | 选择分类直接进入 Browse |
| Sticky 筛选条 | `#stickyBar` | Header 固定 | 滚动 >80px 出现，搜索/排序/仅免费/平台 chips/分类 chips |
| 平台快速跳转 | `#platNavInner` .pnav-chip | Browse 顶部 | 平台切换（浅层筛选） |
| 分组 Section | `.section-group` + `.section-header` | Browse 区域 | 每个分类独立章节，标题 sticky |
| 可展开卡片 | `.card` + `.card.expanded` | Section 内 | 点击展开，详细描述 + GitHub 直链 |

### 3.3 平台配色映射

```
Codex         → #ff9f0a  (orange)
Claude        → #d97757  (terra cotta)
DeepSeek (DSH)→ #5ac8fa  (sky)
General       → #30d158  (green)
```

`PLATFORM` 配置、平台 icons、描述文案集中在 `app.js` 顶部 `PLATFORM` 常量数组。

---

## 4. 数据说明

### 4.1 每条记录 schema
```json
{
  "id": "skill-001",
  "name": "…",
  "platform": ["Claude","Codex","DeepSeek (DSD)","General"],  // 四者之一或组合
  "category": "…",
  "url": "https://github.com/…",
  "description": "…",
  "is_free": true,
  "tags": ["…"],
  "date_added": "YYYY-MM-DD"
}
```

### 4.2 约束 / 约定
- `platform` 取值只允许：`Codex` / `Claude` / `DeepSeek (DSH)` / `General`，可为数组（跨平台）
- `id` 唯一，格式 `skill-NNN` 递增
- `date_added` 格式 `YYYY-MM-DD`
- **不要编造 URL**：新增条目前用 GitHub API 或访问校验，确认真实存在且为开源/免费
- 新增/修改后运行 `python scripts/update_readme.py` 同步 README

### 4.3 20 个分类清单
> 官方 · Skill 集合 · 代码开发 · 科研与学术 · 安全与攻防 · 金融分析 · 设计·UI-UX · 内容创作 · 游戏开发 · 自动化 · 记忆与知识管理 · 演示·PPT · 视频创作 · 提示词工程 · 求职与简历 · 教育与学习 · 工具 · 产品管理 · MCP·框架 · SEO·营销

---

## 5. 已完成 / 未完成任务

### ✅ 已完成
1. 初始化项目结构（`7d2d697`）
2. 修复 Pages 部署数据路径 bug（`89a0981`）
3. 收集并核验 115 条真实开源 Skill（`6dd1ee1`）
4. `update_readme.py` 按分类分组渲染（`6dd1ee1`）
5. **Apple Design 样式**（`b5e8988`）：typography/optical-sizing、vibrancy、scroll edge fade、spring 动画、`prefers-reduced-motion`、`prefers-contrast: more`、`prefers-reduced-transparency` 降级
6. **导航架构重构**（`cbcbbd5`）：Landing 平台入口卡、面包屑、分组 Section、可展开卡片、Sticky 筛选条

### ❌ 可选继续项（未要求，留给未来）
- `app.js` 中的排序功能（`sortResults`）在 Browse 视图按分类分组时，组内排序方向可细化（如每个 Section 内按名称排序）
- 卡片展开动画可增强为 Apple spring 横向展开
- 深分类下，平台 chips 栏的分类计数（`catChipsWrapEl`）可在筛选时有条件显示（当前在平台未选或不筛选时隐藏）
- 国际化：中文以外的用户可加英文界面
- 移动端卡片宽度在 320px 下可进一步优化
- 搜索历史记录（`localStorage`）
- 经典"网格视图"开关（当前只有分组视图）

---

## 6. 常规维护步骤（新会话照做）

### 6.1 本地预览
```powershell
# 启动本地服务（site/ 为根）
python -m http.server 8000 --directory site
# 浏览器打开 http://localhost:8000
# 注意：本地需要 site/data/skills.json 才能加载数据
# Windows:
Copy-Item -Recurse data site\data
python -m http.server 8000 --directory site
```

### 6.2 新增一个 Skill
1. 解析链接元数据（name / description / platform / category / is_free / tags，`date_added` 用当天）
2. 追加到 `data/skills.json`（确保 `id` 唯一、URL 真实有效）
3. 运行 `python scripts/update_readme.py` 同步 README
4. 提交并推送：
```bash
git add data/skills.json README.md
git commit -m "feat(skill): add <Name> for <Platform>"
git push origin main
# 自动触发 Pages 部署（约 1 分钟）
```

### 6.3 从远程克隆
```bash
git clone https://github.com/fanch1122/ai-skills-navigation.git
cd ai-skills-navigation
```

---

## 7. ⚠️ 安全提醒（务必处理）

曾在本会话中以**明文**提供过一个 GitHub Personal Access Token（classic，带 `repo` 等权限）：
- **请到 GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)撤销/轮换该 token。**
- 仓库 `origin` 远程地址已确认为干净 HTTPS 地址，无 token 嵌入，但 token 已出现在对话历史，视为已泄露。
- 若需操作 GitHub API，请在本地 `.env` 或环境变量中存储 token，不要出现在对话中。

---

## 8. 交接给下一个会话的「一句话任务」

> 项目已完成所有核心需求（导航架构 + Apple Design）。如需继续，从第 5 节的「可选继续项」中挑选，或直接维护 skills.json 数据即可。

---

## 9. 技术债务 & 代码质量记录

| 项目 | 状态 | 说明 |
|------|------|------|
| CSS 花括号配平 | ✅ 193/193 | 经正则验证 |
| CSS 行数 | ✅ 641 行 | 无结构性错误 |
| JS Functions | 17 个 | 经行数统计 |
| JSON 数据完整性 | ✅ 115 条 / 20 分类 | 经 `json.loads` 验证 |
| GitHub Actions | ✅ success `#40808807679` | cbcbbd5 |
| 线上数据一致性 | ✅ 115 条 | 与本地一致 |