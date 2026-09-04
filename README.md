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
| `skill-001` | [DeepSeek Harness（官方）](https://github.com/deepseek-ai/deepseek-harness) | DeepSeek | 官方 | ✅ | DeepSeek Harness (DSH)：Everything is a Plugin。DeepSeek 官方插件化 Agent Harness，是 DSH 生态的核心。 |
| `skill-002` | [Anthropic Claude Plugins 官方目录](https://github.com/anthropics/claude-plugins-official) | Claude | 官方 | ✅ | Anthropic 官方维护的高质量 Claude Code Plugins / Skills 目录，覆盖 MCP 与 Skill 插件。 |
| `skill-003` | [VoltAgent awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | 通用 | Skill 集合 | ✅ | 精选 1000+ 来自官方团队与社区、兼容 Claude Code / Codex / Gemini CLI / Cursor 等平台的 Agent Skills。 |
| `skill-004` | [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | DeepSeek | Skill 集合 | ✅ | DeepSeek Harness (dsh) 插件精选列表，收录各色 DSH 插件，CC0 许可。 |
| `skill-005` | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Codex、Claude | 代码开发 | ✅ | Addy Osmani 的工程化 Agent Skills：生产级工程、代码审查、性能优化等实用技能包。 |
| `skill-006` | [K-Dense-AI scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | Claude、Codex | 科研辅助 | ✅ | 把任意 AI Agent 变成 AI Scientist：165 个可用的科学技能 + 100+ 科学数据库（生物、化学、医学、药物发现），已被 19 万+ 科研人员使用。 |
| `skill-007` | [Imbad0202 academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | Claude | 科研辅助 | ✅ | Claude Code 学术研究技能：研究→写作→审稿→修订→定稿的完整学术工作流。 |
| `skill-008` | [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | Claude、Codex | 安全 | ✅ | 817 个结构化网络安全技能，映射 MITRE ATT&CK / NIST CSF 等 6 大框架，兼容 Claude Code、Copilot、Codex 等 20+ 平台。 |
| `skill-009` | [Awesome Finance Skills](https://github.com/RKiding/Awesome-finance-skills) | 通用 | 金融分析 | ✅ | 开源免费的金融分析 Agent Skills 集合，上手即用。 |
| `skill-010` | [awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | Codex、Claude | 游戏开发 | ✅ | 67 个针对 AI 编码 Agent 的游戏开发技能：Godot、Unity、Unreal、Phaser、three.js、Bevy 等，带路由智能加载。 |
| `skill-011` | [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Claude、Codex | 设计 | ✅ | 为构建专业 UI/UX 提供设计智能的 AI Skill，跨多平台（Claude Code、Cursor、Copilot 等）。 |
| `skill-012` | [zukun claude-for-financial-services-cn](https://github.com/jwangkun/claude-for-financial-services-cn) | Claude | 金融分析 | ✅ | 63 个面向 A 股金融从业者的 Claude Skills，基于 Anthropic 官方 claude-for-financial-services 深度适配国内市场，已开源。 |
| `skill-013` | [marketingskills (coreyhaines31)](https://github.com/coreyhaines31/marketingskills) | Claude、Codex | 内容创作 | ✅ | 面向 Claude Code 与 AI Agent 的营销技能：CRO、文案、SEO、分析与增长工程。 |
| `skill-014` | [awesome-codex-subagents](https://github.com/VoltAgent/awesome-codex-subagents) | Codex | Skill 集合 | ✅ | 130+ 个专门化的 Codex 子智能体（subagents），覆盖广泛的开发场景。 |
| `skill-015` | [awesome-codex-skills (composio-community)](https://github.com/composio-community/awesome-codex-skills) | Codex | Skill 集合 | ✅ | 精选实用的 Codex Skills，用于在 Codex CLI 和 API 之间自动化工作流。 |
| `skill-016` | [awesome-claude-skills (ComposioHQ)](https://github.com/ComposioHQ/awesome-claude-skills) | Claude | Skill 集合 | ✅ | 精选的 Claude Skills、资源与工具，用于自定义 Claude AI 工作流。 |
| `skill-017` | [awesome-claude-code (hesreallyhim)](https://github.com/hesreallyhim/awesome-claude-code) | Claude | Skill 集合 | ✅ | 精心挑选的 Claude Code 资源合集：顶级 skills、agents、status lines、开发工具与插件。 |
| `skill-018` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | 通用 | 官方 | ✅ | Vercel 官方收集的 Agent Skills，用于为 Vercel 平台构建与部署。 |
| `skill-019` | [NVIDIA/skills](https://github.com/NVIDIA/skills) | Codex、Claude | 官方 | ✅ | NVIDIA 产品的 Agent Skills：可安装进 Claude Code、Codex 等，跑通 Physical AI、机器人、仿真、CUDA 与 RAG 工作流。 |
| `skill-020` | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | Claude、Codex | 自动化 | ✅ | 面向 Obsidian 的 Agent Skills：教你的 Agent 使用 Obsidian CLI 与 Markdown、Bases、JSON Canvas 等开放格式。 |
| `skill-021` | [browserbase/skills](https://github.com/browserbase/skills) | 通用 | 自动化 | ✅ | Browserbase 官方 Agent Skills，用于让 AI Agent 访问和操作网页。 |
| `skill-022` | [microsoft/hve-core (GitHub Copilot)](https://github.com/microsoft/hve-core) | 通用 | 官方 | ✅ | 微软 Hypervelocity Engineering 组件精选：指令、提示词、Agent 与 Skills，让 GitHub Copilot 发挥最大价值。 |
| `skill-023` | [antfu/skills](https://github.com/antfu/skills) | 通用 | Skill 集合 | ✅ | 前端大佬 Anthony Fu 精选的 Agent Skills 集合，开箱即用。 |
| `skill-024` | [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Claude、Codex | 代码开发 | ✅ | 把任意代码库、文档、SQL schema、PDF 变成可查询的知识图谱。本地确定性 AST 解析，零向量库，自带 /graphify skill。 |
| `skill-025` | [CowAgent (zhayujie)](https://github.com/zhayujie/CowAgent) | DeepSeek、Claude、Codex | 自动化 | ✅ | 开源超级 AI 助手与 Agent Harness：规划任务、运行工具和 Skills，带记忆与知识可自进化。轻量、可扩展、一键安装（前身 chatgpt-on-wechat）。 |
| `skill-026` | [Auto-Empirical-Research-Skills](https://github.com/brycewang-stanford/Auto-Empirical-Research-Skills) | 通用 | 科研辅助 | ✅ | 23000+ AI Agent 技能库，覆盖 8 大社会科学学科的实证研究，由 Stanford REAP / CoPaper.AI 维护。 |
| `skill-027` | [Awesome-Journal-Skills](https://github.com/brycewang-stanford/Awesome-Journal-Skills) | Claude、Codex | 科研辅助 | ✅ | 覆盖 AER、QJE、Nature、Cell、经济研究 等 200+ 主流期刊的投稿技能包：选题、表格规范、审稿回复全流程。 |
| `skill-028` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | Claude、Codex | Skill 集合 | ✅ | 380 个 Claude Code / Agent Skills（30+ agents、70+ 自定义命令），覆盖工程、营销、产品、调研、商务与日常效率。 |
| `skill-029` | [pm-claude-skills (mohitagw15856)](https://github.com/mohitagw15856/pm-claude-skills) | 通用 | 产品管理 | ✅ | 1098 个专业 Agent Skills：从 PRD 到事故复盘、搬新国落户等，纯 Markdown、MIT 许可，已入选 Anthropic 官方插件目录。 |
| `skill-030` | [dsh-desktop (anywhere-labs)](https://github.com/anywhere-labs/dsh-desktop) | DeepSeek | 工具 | ✅ | 为 DeepSeek Harness (DSH) 插件生态打造的现代化桌面端。万物皆插件，桌面本身也是插件。 |
| `skill-031` | [modlens（DSH 视觉插件）](https://github.com/liustack/modlens) | DeepSeek | 自动化 | ✅ | 首个 DeepSeek Harness 视觉插件：给 DeepSeek、GLM 等纯文本模型外挂视觉能力，贴图即得 OCR / 版面 / 语义结构化证据。 |
| `skill-032` | [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) | DeepSeek | 代码开发 | ✅ | DeepSeek 原生终端 AI 编码 Agent，围绕 prefix-cache 稳定性设计，可常驻运行。 |
| `skill-033` | [librechat (danny-avila)](https://github.com/danny-avila/LibreChat) | DeepSeek、Claude、Codex | 工具 | ✅ | 增强版自托管 ChatGPT：支持 Agents、MCP、Skills，与 DeepSeek、Anthropic、OpenAI、Gemini 等多模型对接。 |
| `skill-034` | [awesome-agent-skills (heilcheng)](https://github.com/heilcheng/awesome-agent-skills) | 通用 | 教育学习 | ✅ | Agent Skills 教程、指南与技能目录大全，兼容 Claude Code、Codex、GitHub Copilot 等。 |
| `skill-035` | [awesome-freellm-apis](https://github.com/open-free-llm-api/awesome-freellm-apis) | 通用 | 基础设施 | ✅ | 134+ 个免费 LLM API / 40+ 提供商，一键接入 Claude Code、Cursor 和 Codex。 |
| `skill-036` | [gh-aw (GitHub Agentic Workflows)](https://github.com/github/gh-aw) | Codex、Claude | 官方 | ✅ | GitHub 官方 Agentic Workflows：让 Codex、Claude Code、Copilot 结合 GitHub Actions 跑自动化。 |
| `skill-037` | [Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) | 通用 | 提示词工程 | ✅ | 面向上下文工程、多智能体架构与生产级 Agent 系统的全面技能集合。 |
| `skill-038` | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | Claude | 设计 | ✅ | ConardLi 开源 Skills 合集：网页设计、知识检索、图像生成等，CSS 为主。 |
| `skill-039` | [samber/cc-skills-golang](https://github.com/samber/cc-skills-golang) | Codex、Claude | 代码开发 | ✅ | 一套能直接用的 Golang Agent 技能集合，兼容 Claude Code、Codex、Cursor、Copilot、Gemini CLI 等。 |
| `skill-040` | [buildwithclaude (davepoon)](https://github.com/davepoon/buildwithclaude) | Claude | Skill 集合 | ✅ | 一站式寻找 Claude Skills、Agents、Commands、Hooks、Plugins 与 Marketplace 集合，扩展 Claude Code / Desktop / Agent SDK。 |
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