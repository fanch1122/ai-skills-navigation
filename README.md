# 🤖 AI Skill & Agent 导航站

收录 Codex、Claude、DeepSeek (DSH) 等平台的**公益 / 开源** Skill 与 Agent 链接，
并提供可搜索、可按平台/分类筛选的静态网页。

- 📄 网页版本：在仓库根目录直接打开 `site/index.html`，或部署到 GitHub Pages / Vercel
- 🗂️ 数据结构：`data/skills.json`
- 🧭 自动导航：`SKILL.md`（供 AI Agent 调用，自动新增 Skill）

## ✨ 特性

- 按平台筛选：`Codex` / `Claude` / `DeepSeek (DSH)` / `通用`
- 关键词搜索（名称、描述、分类、标签）
- 按分类筛选、只看免费/公益
- GitHub Actions 一键部署到 GitHub Pages

## 🚀 快速开始

```bash
# 将数据目录复制进 site/（使相对路径 data/skills.json 可访问），然后本地预览：
# Windows:
Copy-Item -Recurse data site\data
# Linux/macOS:
# cp -R data site/data

python -m http.server 8000 --directory site
# 浏览器访问 http://localhost:8000
```

> 说明：部署到 GitHub Pages 时工作流会自动把 `data/` 复制进 `site/data/`，
> 因此网页通过相对路径 `data/skills.json` 读取数据库。

## 📦 如何新增一个 Skill

方式一（推荐，交给 AI Agent）：

> 输入一个 Skill 链接或公益网址，Agent 会自动解析元数据、写入 `data/skills.json`、
> 运行 `python scripts/update_readme.py` 并 `git push`。

方式二（手动）——按 `SKILL.md` 中「新增/更新 Skill 的步骤」编辑 `data/skills.json`，
然后运行：

```bash
python scripts/update_readme.py
git add -A
git commit -m "feat(skill): add <Skill Name> for <Platform>"
git push origin main
```

## 📚 Skill 目录（自动生成）

<!-- SKILLS-GENERATED-START -->
| ID | 名称 | 平台 | 分类 | 免费 | 描述 |
| --- | --- | --- | --- | --- | --- |
| `skill-001` | [ArXiv Paper Summarizer](https://github.com/example/arxiv-summarizer) | Claude、Codex | 科研辅助 | ✅ | 自动抓取并总结 ArXiv 论文核心贡献与公式解析，一键生成结构化摘要。 |
| `skill-002` | [DeepSeek Code Refactor](https://github.com/example/dsh-code-refactor) | DeepSeek | 代码开发 | ✅ | 基于 DeepSeek 的 Python 代码重构与性能优化 Prompt/Skill，自动生成优化建议。 |
| `skill-003` | [Codex Test Generator](https://github.com/example/codex-test-generator) | Codex | 代码开发 | ✅ | 根据函数签名自动生成单元测试与边界用例，支持多种测试框架。 |
| `skill-004` | [Claude Content Localizer](https://github.com/example/claude-content-localizer) | Claude | 内容创作 | ❌ | 将中英文内容本地化适配多地区风格，保留术语一致性。 |
| `skill-005` | [DSH Goal Runner](https://github.com/example/dsh-goal-runner) | DeepSeek | 自动化 | ✅ | 基于 DeepSeek Harness 的多轮目标跟踪与任务编排 Skill，支持长跑型自动化。 |
| `skill-006` | [通用 Prompt 优化器](https://github.com/example/prompt-optimizer) | 通用 | 提示词工程 | ✅ | 跨平台通用 Prompt 优化模板，提升指令清晰度与输出质量。 |
<!-- SKILLS-GENERATED-END -->

## 🗂️ 数据字段规范

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `id` | string | 唯一标识，如 `skill-001` |
| `name` | string | Skill 名称 |
| `platform` | string[] | 平台：Codex / Claude / DeepSeek (DSH) / General |
| `category` | string | 分类 |
| `url` | string | 链接 |
| `description` | string | 一句话描述 |
| `is_free` | boolean | 是否免费/公益 |
| `tags` | string[] | 标签 |
| `date_added` | string | 添加日期 |

## 📄 目录结构

```text
.
├── SKILL.md                 # Agent 调用指令
├── data/
│   └── skills.json          # 核心数据库
├── site/                    # 静态网页
│   ├── index.html
│   ├── app.js
│   └── style.css
├── scripts/
│   └── update_readme.py     # JSON → README 同步
├── README.md
└── .github/workflows/deploy.yml  # GitHub Pages 部署
```

## 📜 许可证

MIT