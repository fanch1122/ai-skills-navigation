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
### MCP / 框架

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-105` | [oraios/serena](https://github.com/oraios/serena) | Claude、Codex | ✅ | 强大的 MCP 编码工具包：语义检索与编辑能力，给 Agent 一个「IDE」。 |
| `skill-106` | [tadata-org fastapi_mcp](https://github.com/tadata-org/fastapi_mcp) | Claude、Codex | ✅ | 把 FastAPI 端点暴露为 MCP 工具，且内置 Auth。 |
| `skill-107` | [bytebase/dbhub](https://github.com/bytebase/dbhub) | Claude、Codex | ✅ | Token 友好的数据库 MCP 服务器：Postgres、MySQL、SQL Server、SQLite。 |
| `skill-108` | [mcp-use/mcp-use](https://github.com/mcp-use/mcp-use) | Claude、Codex | ✅ | 全栈 MCP 框架：为 ChatGPT / Claude 开发 MCP Apps，为 AI Agents 开发 MCP Servers。 |
| `skill-109` | [firecrawl firecrawl-mcp-server](https://github.com/firecrawl/firecrawl-mcp-server) | 通用 | ✅ | Firecrawl 官方 MCP Server：给 Cursor、Claude 等加 Web 抓取与搜索能力。 |
| `skill-110` | [BrowserMCP/mcp](https://github.com/BrowserMCP/mcp) | 通用 | ✅ | Browser MCP：让 AI 应用控制你的浏览器的 MCP 服务器。 |
| `skill-111` | [KnockOutEZ/wigolo](https://github.com/KnockOutEZ/wigolo) | Claude、Codex | ✅ | 本地优先的搜索/抓取/爬取与研究 Web 能力，走 MCP，零 API key、零费用。 |
| `skill-112` | [nitrocloudofficial/nitrostack](https://github.com/nitrocloudofficial/nitrostack) | Claude、Codex | ✅ | 构建、测试、部署生产级 MCP 服务与 AI 原生应用的全栈 TypeScript 框架。 |

### SEO / 营销

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-113` | [Bhanunamikaze Agentic-SEO-Skill](https://github.com/Bhanunamikaze/Agentic-SEO-Skill) | Codex、Claude | ✅ | LLM-first 的 SEO 分析 skill：16 个子技能、10 个专家 agent、88 个工具脚本。 |
| `skill-114` | [AgriciDaniel/codex-seo](https://github.com/AgriciDaniel/codex-seo) | Codex | ✅ | Codex-first 的 SEO 技能套件：26 个工作流、24 个 agent，集成 DataForSEO/Gemini/Firecrawl。 |
| `skill-115` | [tsingyuai/growth-lab](https://github.com/tsingyuai/growth-lab) | Claude、Codex | ✅ | 端到端增长工具：理解产品、接入渠道、研究市场、执行增长行动并基于真实数据自我改进。 |

### Skill 集合

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-009` | [VoltAgent awesome-agent-skills](https://github.com/VoltAgent/awesome-agent-skills) | Claude、Codex、通用 | ✅ | 精选 1000+ 官方与社区 Agent Skills，兼容 Claude Code、Codex、Gemini CLI、Cursor 等。 |
| `skill-010` | [awesome-dsh-plugin](https://github.com/awesome-dsh-plugin/awesome-dsh-plugin) | DeepSeek | ✅ | DeepSeek Harness (dsh) 插件精选列表，收录各色 DSH 插件，CC0 许可。 |
| `skill-011` | [hesreallyhim/awesome-claude-code](https://github.com/hesreallyhim/awesome-claude-code) | Claude | ✅ | 精选的 Claude Code 资源合集：顶级 skills、agents、status lines、开发工具与插件。 |
| `skill-012` | [ComposioHQ awesome-claude-skills](https://github.com/ComposioHQ/awesome-claude-skills) | Claude | ✅ | 精选 Claude Skills、资源与工具，用于自定义 Claude AI 工作流。 |
| `skill-013` | [VoltAgent awesome-codex-subagents](https://github.com/VoltAgent/awesome-codex-subagents) | Codex | ✅ | 130+ 个专门化的 Codex 子智能体（subagents），覆盖广泛开发场景。 |
| `skill-014` | [composio-community awesome-codex-skills](https://github.com/composio-community/awesome-codex-skills) | Codex | ✅ | 精选实用的 Codex Skills，用于在 Codex CLI 与 API 之间自动化工作流。 |
| `skill-015` | [VoltAgent awesome-openclaw-skills](https://github.com/VoltAgent/awesome-openclaw-skills) | 通用 | ✅ | OpenClaw 官方技能注册表的精选合集：5400+ 个技能，已筛选与分类。 |
| `skill-016` | [JimLiu/baoyu-skills](https://github.com/JimLiu/baoyu-skills) | Codex、Claude | ✅ | 宝玉的 Agent Skills 合集，跨 Codex / Claude / OpenClaw 平台。 |
| `skill-017` | [KKKKhazix/khazix-skills](https://github.com/KKKKhazix/khazix-skills) | Codex、Claude | ✅ | 数字生命卡兹克开源的 AI Skills 合集：leader、neat-freak、writer 等。 |
| `skill-018` | [jnMetaCode/superpowers-zh](https://github.com/jnMetaCode/superpowers-zh) | Codex、Claude | ✅ | superpowers 中文增强版：TDD 等工程超能力，兼容 Claude Code、Copilot、Cursor、Gemini 等 16 款工具。 |
| `skill-019` | [sickn33 agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | 通用 | ✅ | AAS Core：本地 agent-first 的 2005+ agentic skills 目录与控制平面。 |
| `skill-020` | [wshobson/agents](https://github.com/wshobson/agents) | Claude、Codex | ✅ | 多 harness 的 agentic 插件市场：Claude Code、Codex、Cursor、Copilot、Antigravity。 |
| `skill-021` | [travisvn/awesome-claude-skills](https://github.com/travisvn/awesome-claude-skills) | Claude | ✅ | 精选 Claude Skills、资源与工具，用于自定义 Claude AI / Claude Code 工作流。 |
| `skill-022` | [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | Claude、Codex | ✅ | 380 个 Claude Code / Agent skills（30+ agents、70+ 命令），覆盖工程、营销、产品、调研与效率。 |
| `skill-023` | [github/awesome-copilot](https://github.com/github/awesome-copilot) | Codex、Claude | ✅ | 社区贡献的 GitHub Copilot 指令、Agents、Skills 与配置。 |
| `skill-024` | [LeoYeAI/openclaw-master-skills](https://github.com/LeoYeAI/openclaw-master-skills) | 通用 | ✅ | MyClaw.ai 每周更新的 1209+ 个最佳 OpenClaw skills 精选。 |
| `skill-025` | [anbeime/skill](https://github.com/anbeime/skill) | Claude、Codex、DeepSeek | ✅ | 最全、更新最快的 AI Agent 技能商店：文档处理、内容创作、编程、ML、自动化工作流，并抓取上万 GitHub 技能项目。 |
| `skill-026` | [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude) | Claude | ✅ | 一站式寻找 Claude Skills、Agents、Commands、Hooks、Plugins 与 Marketplace 集合。 |

### 产品管理

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-101` | [pm-claude-skills (mohitagw15856)](https://github.com/mohitagw15856/pm-claude-skills) | 通用 | ✅ | 1098 个专业 Agent Skills：从 PRD 到事故复盘、搬新国落户等，纯 Markdown、MIT，入选 Anthropic 官方插件目录。 |
| `skill-102` | [phuryn/pm-skills](https://github.com/phuryn/pm-skills) | Claude、Codex | ✅ | PM Skills 市场：100+ agentic skills、命令与插件，覆盖从洞察、策略、执行到发布与增长。 |
| `skill-103` | [deanpeters Product-Manager-Skills](https://github.com/deanpeters/Product-Manager-Skills) | Claude、Codex | ✅ | 基于实战方法的产品管理 skills 框架，兼容 Claude Code、Cowork、Codex 与 AI Agents。 |
| `skill-104` | [cookiy-ai user-research-skill](https://github.com/cookiy-ai/user-research-skill) | Claude、Codex | ✅ | 端到端用户研究 skill：AI 访谈、合成用户、定量调研、被试招募。 |

### 代码开发

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-027` | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | Codex、Claude | ✅ | Addy Osmani 的工程化 Agent Skills：生产级工程、代码审查、性能优化等。 |
| `skill-028` | [Jeffallan/claude-skills](https://github.com/Jeffallan/claude-skills) | Claude | ✅ | 67 个面向全栈开发者的专项 Skills，把 Claude Code 变成结对编程专家。 |
| `skill-029` | [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | Claude | ✅ | 让 AI Agent 像最懒的资深工程师一样思考：最好的代码是没写的那部分。 |
| `skill-030` | [tw93/Waza](https://github.com/tw93/Waza) | Claude | ✅ | 把已知的工程习惯变成 Claude 能跑的 Skills。 |
| `skill-031` | [OthmanAdi/planning-with-files](https://github.com/OthmanAdi/planning-with-files) | Claude、Codex | ✅ | 基于文件的持久化规划：崩溃可恢复的 markdown 计划、会话恢复，兼容 60+ Agent。 |
| `skill-032` | [ciembor/agent-rules-books](https://github.com/ciembor/agent-rules-books) | Codex、Claude | ✅ | 从 Clean Code、重构、DDD、整洁架构等编程书籍提炼的 AGENTS.md 规则 / skills。 |
| `skill-033` | [yynxxxxx/Codex-X](https://github.com/yynxxxxx/Codex-X) | Codex | ✅ | OpenAI Codex 桌面端/CLI 的可视化管理工具：Provider 切换、会话同步、Skills/MCP 管理。 |
| `skill-034` | [samber/cc-skills-golang](https://github.com/samber/cc-skills-golang) | Codex、Claude | ✅ | 一套能直接用的 Golang Agent skills，兼容 Claude Code、Codex、Cursor、Copilot、Gemini。 |

### 内容创作

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-055` | [coreyhaines31 marketingskills](https://github.com/coreyhaines31/marketingskills) | Claude、Codex | ✅ | 面向 Claude Code 与 AI Agent 的营销技能：CRO、文案、SEO、分析与增长工程。 |
| `skill-056` | [zenstory-ai oh-story-claudecode](https://github.com/zenstory-ai/oh-story-claudecode) | Claude | ✅ | 网文/小说写作 skill 包：扫榜、拆文、写作、去 AI 味、封面图全流程（中文）。 |
| `skill-057` | [blader/humanizer](https://github.com/blader/humanizer) | Claude、Codex | ✅ | 去除文本中 AI 写作痕迹的 Agent skill。 |
| `skill-058` | [titanwings/distilly](https://github.com/titanwings/distilly) | Claude、Codex | ✅ | 把他人思考方式蒸馏成可在任意 Agent/Bot 复用的 Skills（前身同事 Skill）。 |

### 安全与攻防

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-042` | [Anthropic-Cybersecurity-Skills](https://github.com/mukul975/Anthropic-Cybersecurity-Skills) | Claude、Codex | ✅ | 817 个结构化网络安全技能，映射 MITRE ATT&CK / NIST CSF 等框架，兼容 20+ 平台。 |
| `skill-043` | [zhaoxuya520/reverse-skill](https://github.com/zhaoxuya520/reverse-skill) | Claude、Codex | ✅ | 逆向/渗透/安全研究技能路由包：AI 自动路由 + 按需自举工具链 + 自动进化知识库，支持 Claude Code、Cursor、Cline 等。 |
| `skill-044` | [duty1g x64dbg-mcp-server](https://github.com/duty1g/x64dbg-mcp-server) | Claude、Codex | ✅ | x64dbg 的 MCP 插件，通过 HTTP 暴露调试器全部功能，供 AI 助手编程式控制。 |
| `skill-045` | [yunwei37 prompt-hacker-collections](https://github.com/yunwei37/prompt-hacker-collections) | Claude、Codex、通用 | ✅ | 提示词攻防、提示注入与逆向工程笔记与示例（中文）。 |

### 官方

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-001` | [anthropics/skills](https://github.com/anthropics/skills) | Claude、Codex、通用 | ✅ | Anthropic 官方公开的 Agent Skills 仓库，提供参考实现与 SKILL.md 模板。 |
| `skill-002` | [DeepSeek Harness（官方）](https://github.com/deepseek-ai/deepseek-harness) | DeepSeek | ✅ | DeepSeek Harness (DSH)：Everything is a Plugin。DeepSeek 官方插件化 Agent Harness。 |
| `skill-003` | [Anthropic Claude Plugins 官方目录](https://github.com/anthropics/claude-plugins-official) | Claude | ✅ | Anthropic 官方维护的高质量 Claude Code Plugins / Skills 目录，覆盖 MCP 与 Skill 插件。 |
| `skill-004` | [vercel-labs/agent-skills](https://github.com/vercel-labs/agent-skills) | Codex、Claude | ✅ | Vercel 官方收集的 Agent Skills，用于在 Vercel 平台上构建与部署。 |
| `skill-005` | [NVIDIA/skills](https://github.com/NVIDIA/skills) | Codex、Claude | ✅ | NVIDIA 产品的 Agent Skills：可装进 Claude Code、Codex，跑通 Physical AI、机器人、仿真、CUDA 与 RAG。 |
| `skill-006` | [microsoft/hve-core](https://github.com/microsoft/hve-core) | 通用 | ✅ | 微软 Hypervelocity Engineering 组件：指令、提示词、Agent 与 Skills，让 GitHub Copilot 发挥最大价值。 |
| `skill-007` | [gh-aw (GitHub Agentic Workflows)](https://github.com/github/gh-aw) | Codex、Claude | ✅ | GitHub 官方 Agentic Workflows：让 Codex、Claude Code、Copilot 结合 GitHub Actions 跑自动化。 |
| `skill-008` | [agentskills/agentskills](https://github.com/agentskills/agentskills) | 通用 | ✅ | Agent Skills 规范与文档（spec），定义可移植的 SKILL.md 标准。 |

### 工具

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-090` | [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Codex、Claude | ✅ | 跨平台桌面 All-in-One 助手：管理 Claude Code、Codex 等的 Provider、Keys、Skills。 |
| `skill-091` | [anywhere-labs/dsh-desktop](https://github.com/anywhere-labs/dsh-desktop) | DeepSeek | ✅ | 为 DeepSeek Harness (DSH) 插件生态打造的现代化桌面端。万物皆插件，桌面本身也是插件。 |
| `skill-092` | [dataelement/dsh-desktop](https://github.com/dataelement/dsh-desktop) | DeepSeek | ✅ | DSHDesktop：DeepSeek Harness 桌面版。 |
| `skill-093` | [zhukunpenglinyutong/desktop-cc-gui](https://github.com/zhukunpenglinyutong/desktop-cc-gui) | Claude、Codex、DeepSeek | ✅ | 多引擎 AI 编码桌面客户端（Tauri）：一个 GUI 容纳 Claude Code、Codex、Gemini、OpenCode、DSH。 |
| `skill-094` | [runkids/skillshare](https://github.com/runkids/skillshare) | Codex、Claude | ✅ | 用一条命令在所有 AI CLI 工具间同步 skills 并简化团队分享，支持 Codex、Claude Code、OpenClaw。 |
| `skill-095` | [jiweiyeah Skills-Manager](https://github.com/jiweiyeah/Skills-Manager) | 通用 | ✅ | 免费开源桌面技能管理器：写一次 skill，同步到 32 个 AI 编码工具，本地优先、MIT。 |
| `skill-096` | [specstoryai/getspecstory](https://github.com/specstoryai/getspecstory) | Claude、Codex | ✅ | 本地优先的 AI IDE/终端 Agent 扩展：把会话历史加工成可复用技能（Lore）。 |
| `skill-097` | [mvanhorn last30days-skill](https://github.com/mvanhorn/last30days-skill) | Claude、Codex | ✅ | 跨 Reddit、X、YouTube、HN、Polymarket 与 Web 研究任意主题近 30 天趋势，汇总成有根据摘要。 |
| `skill-098` | [SharpAI/DeepCamera](https://github.com/SharpAI/DeepCamera) | Claude、DeepSeek、通用 | ✅ | 开源 AI 摄像头技能平台：本地 VLM 视频分析（Qwen、DeepSeek 等），可插拔 AI skills，agentic 安防摄像头。 |
| `skill-099` | [iOfficeAI/OfficeCLI](https://github.com/iOfficeAI/OfficeCLI) | Claude、Codex | ✅ | 为 AI Agent 打造的 Office 套件：读取、编辑、自动化 Word、Excel、PowerPoint，单二进制、无需装 Office。 |
| `skill-100` | [refly-ai/refly](https://github.com/refly-ai/refly) | Claude、Codex | ✅ | 开源 agent skills 构建器：vibe 工作流定义 skills，运行在 Claude Code、Cursor、Codex 等，可发 Bot。 |

### 提示词工程

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-081` | [muratcankoylan Agent-Skills-for-Context-Engineering](https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering) | 通用 | ✅ | 面向上下文工程、多智能体架构与生产级 Agent 系统的技能集合。 |
| `skill-082` | [nidhinjs/prompt-master](https://github.com/nidhinjs/prompt-master) | Claude | ✅ | Claude skill：为任意 AI 工具写出准确提示词，零 token 浪费，保留完整上下文与记忆。 |
| `skill-083` | [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) | Claude、Codex | ✅ | 给 AI「好品味」的技能：阻止 AI 生成无聊、套路化的泛泛内容。 |

### 教育与学习

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-085` | [heilcheng awesome-agent-skills](https://github.com/heilcheng/awesome-agent-skills) | 通用 | ✅ | Agent Skills 教程、指南与技能目录大全。 |
| `skill-086` | [virgiliojr94/book-to-skill](https://github.com/virgiliojr94/book-to-skill) | Claude | ✅ | 把任意技术书籍 PDF 变成 Claude Code skill，随学随用。 |
| `skill-087` | [WenyuChiou awesome-agentic-ai-zh](https://github.com/WenyuChiou/awesome-agentic-ai-zh) | 通用 | ✅ | 三语（繁中/英/简中）Agentic AI 学习路径图：从 LLM 基础到多智能体系统，240+ 精选资源。 |
| `skill-088` | [datawhalechina agent-skills-with-anthropic](https://github.com/datawhalechina/agent-skills-with-anthropic) | Claude | ✅ | 吴恩达 agent-skills-with-anthropic 课程的中文翻译与知识整理教程。 |
| `skill-089` | [didilili ai-agents-from-zero](https://github.com/didilili/ai-agents-from-zero) | 通用 | ✅ | 2026 最系统 AI Agent 速成指南：学习路径 + 实战项目 + 面试题库，覆盖 LangChain/LangGraph/Dify/MCP/skills/RAG。 |

### 求职与简历

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-084` | [amruthpillai/reactive-resume](https://github.com/amruthpillai/reactive-resume) | 通用 | ✅ | 注重隐私的一站式简历构建器：安全、可定制、可移植、开源且永久免费。 |

### 游戏开发

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-059` | [awesome-gamedev-agent-skills](https://github.com/gamedev-skills/awesome-gamedev-agent-skills) | Codex、Claude | ✅ | 67 个针对 AI 编码 Agent 的游戏开发技能：Godot、Unity、Unreal、three.js、Bevy 等，带智能路由。 |
| `skill-060` | [IvanMurzak/Unity-MCP](https://github.com/IvanMurzak/Unity-MCP) | Claude、Codex | ✅ | Unity 引擎的 AI Skills、MCP 工具与 CLI：全 AI 开发与测试循环，任何 C# 方法一行变工具。 |
| `skill-061` | [htdt/godogen](https://github.com/htdt/godogen) | Claude、Codex | ✅ | 用 Claude Code 与 Codex 自主开发 Godot、Bevy、Babylon.js 游戏。 |

### 演示 / PPT

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-076` | [op7418 guizang-ppt-skill](https://github.com/op7418/guizang-ppt-skill) | Codex、Claude | ✅ | 生成精致 HTML 幻灯片 deck：编辑杂志排版、瑞士风格、社交封面与 WebGL 演示运行时。 |
| `skill-077` | [sunchaokun PPT-Design-Skill](https://github.com/sunchaokun/PPT-Design-Skill) | Codex、Claude | ✅ | 高精度 PPT 设计 skill：40000+ 样式、逐像素精度控制、AI 配图、可编辑 PPTX 交付。 |
| `skill-078` | [Gabberflast howard pptx skill](https://github.com/Gabberflast/academic-pptx-skill) | Claude | ✅ | 面向学术场景的 PPTX skill：会议讲座、研讨、答辩、基金汇报，强化行动标题与引证规范。 |

### 科研与学术

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-035` | [K-Dense-AI scientific-agent-skills](https://github.com/K-Dense-AI/scientific-agent-skills) | Claude、Codex | ✅ | 把任意 AI Agent 变成 AI Scientist：165 个科学技能 + 100+ 科学数据库，被 19 万+ 科研人员使用。 |
| `skill-036` | [Imbad0202 academic-research-skills](https://github.com/Imbad0202/academic-research-skills) | Claude | ✅ | Claude Code 学术研究技能：研究→写作→审稿→修订→定稿完整工作流。 |
| `skill-037` | [Yuan1z0825/nature-skills](https://github.com/Yuan1z0825/nature-skills) | Codex | ✅ | 符合 Nature 论文学术表达与科研绘图的 Skills。 |
| `skill-038` | [Orchestra-Research AI-Research-SKILLs](https://github.com/Orchestra-Research/AI-Research-SKILLs) | Claude、Codex | ✅ | 开源的 AI 研究与工程技能库，让任意模型成为 AI 研究 Agent。 |
| `skill-039` | [brycewang-stanford Auto-Empirical-Research-Skills](https://github.com/brycewang-stanford/Auto-Empirical-Research-Skills) | Claude、Codex | ✅ | 23000+ Agent 技能库，覆盖 8 大社会科学学科的实证研究，由 Stanford REAP / CoPaper.AI 维护。 |
| `skill-040` | [brycewang-stanford Awesome-Journal-Skills](https://github.com/brycewang-stanford/Awesome-Journal-Skills) | Claude、Codex | ✅ | 覆盖 AER、Nature、Cell、经济研究 等 200+ 期刊的投稿技能包：选题、规范、审稿回复。 |
| `skill-041` | [wanshuiyin Auto-Research-In-Sleep](https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep) | Claude、Codex | ✅ | ARIS：纯 Markdown 的自主 ML 研究技能，跨模型评审循环与实验自动化。 |

### 自动化

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-062` | [kepano/obsidian-skills](https://github.com/kepano/obsidian-skills) | Claude、Codex | ✅ | 面向 Obsidian 的 Agent Skills：使用 Obsidian CLI 与 Markdown、Bases、JSON Canvas 等开放格式。 |
| `skill-063` | [modlens（DSH 视觉插件）](https://github.com/liustack/modlens) | DeepSeek | ✅ | DeepSeek Harness 视觉插件：给 DeepSeek、GLM 等纯文本模型外挂视觉能力，贴图即得 OCR/版面/语义证据。 |
| `skill-064` | [CowAgent (zhayujie)](https://github.com/zhayujie/CowAgent) | DeepSeek、Claude、Codex | ✅ | 开源超级 AI 助手与 Agent Harness：规划任务、运行工具和 Skills，带记忆与知识自进化（前身 chatgpt-on-wechat）。 |
| `skill-065` | [Q00/ouroboros](https://github.com/Q00/ouroboros) | Claude、Codex、DeepSeek | ✅ | Agent OS：面试门槛 + 分阶段评估 + 预算化进化循环，MCP 服务器，支持 14 种运行时。 |
| `skill-066` | [dongshuyan/compass-skills](https://github.com/dongshuyan/compass-skills) | Claude、Codex | ✅ | 司南：个性化 AI 任务总控 Skills 系统，本地优先的个人对齐 OS。 |
| `skill-067` | [sawyerhood/dev-browser](https://github.com/SawyerHood/dev-browser) | Claude | ✅ | Claude Skill：让你的 Agent 能用网页浏览器（基于 Playwright）。 |
| `skill-068` | [citrolabs/ego-lite](https://github.com/citrolabs/ego-lite) | Codex、Claude | ✅ | 为 AI Agent 打造的最快浏览器自动化：共享你的登录态给 Codex/Claude Code，零成本零配置。 |

### 视频创作

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-079` | [Vincentwei1021 video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | Claude、Codex | ✅ | 用 Remotion 制作电影感产品视频：152 张镜头卡、209 个动效预览与生产级模板。 |
| `skill-080` | [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Claude、Codex | ✅ | 开源 agentic 视频制作系统：12 条制片管线、100+ 工具、700+ agent skill 与制作知识文件。 |

### 记忆与知识管理

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-069` | [topoteretes/cognee](https://github.com/topoteretes/cognee) | 通用 | ✅ | 开源 AI 记忆平台：给 Agent 提供跨会话持久长时记忆，自托管知识图谱引擎。 |
| `skill-070` | [thedotmack/claude-mem](https://github.com/thedotmack/claude-mem) | Claude、Codex | ✅ | 跨会话持久上下文：抓取 Agent 会话、AI 压缩、相关上下文回注，兼容 Claude Code、Codex、Gemini、Copilot 等。 |
| `skill-071` | [Egonex-AI Understand-Anything](https://github.com/Egonex-AI/Understand-Anything) | Claude、Codex | ✅ | 把任意代码变成可探索的知识图谱，兼容 Claude Code、Codex、Cursor、Gemini CLI。 |
| `skill-072` | [MemTensor/MemOS](https://github.com/MemTensor/MemOS) | Claude、Codex、DeepSeek | ✅ | 自进化记忆 OS：超持久记忆、混合检索、跨任务 skill 复用，token 节省约 35%，支持 DSH。 |
| `skill-073` | [zilliztech/memsearch](https://github.com/zilliztech/memsearch) | Claude、Codex、DeepSeek | ✅ | 面向所有 AI Agent 的统一持久记忆层，Markdown + Milvus 驱动，支持 Claude Code、Codex、DSH。 |
| `skill-074` | [doobidoo mcp-memory-service](https://github.com/doobidoo/mcp-memory-service) | Claude、Codex | ✅ | 开源持久记忆服务：REST API + 知识图谱 + 自主整合，适用于 LangGraph、CrewAI、AutoGen 与 Claude。 |
| `skill-075` | [EverMind-AI/EverOS](https://github.com/EverMind-AI/EverOS) | Claude、Codex、DeepSeek | ✅ | 便携记忆层：本地优先、Markdown 原生、用户自有的自进化记忆，兼容 DSH。 |

### 设计 / UI-UX

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-048` | [ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill) | Claude、Codex | ✅ | 为构建专业 UI/UX 提供设计智能的 AI Skill，跨多平台。 |
| `skill-049` | [ConardLi/garden-skills](https://github.com/ConardLi/garden-skills) | Claude | ✅ | ConardLi 开源 Skills 合集：网页设计、知识检索、图像生成等。 |
| `skill-050` | [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | Claude、Codex | ✅ | 38 种编辑级图表类型，自包含 HTML + SVG，无阴影无 Mermaid 泛滥。 |
| `skill-051` | [tt-a1i/archify](https://github.com/tt-a1i/archify) | Claude、Codex | ✅ | 生成美观、可验证的架构/流程/时序/数据流图表——自包含 HTML 带动效，支持导出。 |
| `skill-052` | [nexu-io/html-anything](https://github.com/nexu-io/html-anything) | Codex、Claude | ✅ | agentic HTML 编辑器：75 Skills × 9 种版面，零 API key，可一键分享到微信/X/知乎。 |
| `skill-053` | [nexu-io/open-design](https://github.com/nexu-io/open-design) | Claude、Codex、DeepSeek | ✅ | 开源 Claude Design 替代品：本地优先桌面应用，把编码 Agent 变成设计引擎，支持 HTML/PDF/PPTX/MP4 导出，兼容 DSH。 |
| `skill-054` | [zanwei/design-dna](https://github.com/zanwei/design-dna) | Claude、Codex | ✅ | 把参考 UI（截图/URL）量化为 Design DNA JSON，再据此生成匹配 UI。 |

### 金融分析

| ID | 名称 | 平台 | 免费 | 描述 |
| --- | --- | --- | --- | --- |
| `skill-046` | [Awesome Finance Skills (RKiding)](https://github.com/RKiding/Awesome-finance-skills) | 通用 | ✅ | 开源免费的金融分析 Agent Skills 集合，上手即用。 |
| `skill-047` | [jwangkun claude-for-financial-services-cn](https://github.com/jwangkun/claude-for-financial-services-cn) | Claude | ✅ | 63 个面向 A 股金融从业者的 Claude Skills，基于官方 claude-for-financial-services 深度适配国内市场。 |
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