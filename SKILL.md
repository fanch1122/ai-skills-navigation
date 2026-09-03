---
name: skill-navigator-collector
description: 自动搜集并解析各平台（Codex、Claude、DeepSeek 等）Skill/Prompt 网址，更新至 AI Skill 导航站数据库并提交 GitHub。用于在本仓库新增 Skill 链接、更新 data/skills.json、同步 README.md。Use when the user adds a new skill/public URL or asks to update the AI Skills navigation site.
---

# Skill Navigator Collector

本 Skill 用于维护「AI Skill & Agent 导航站」的数据与网页。当用户输入一个 Skill 链接或公益网址，
请按以下流程处理，确保数据库、网页和 README 保持一致。

## 项目结构

```text
ai-skills-navigation/
├── SKILL.md                 # 本指令文件
├── data/
│   └── skills.json          # 导航站核心数据库（唯一数据源）
├── site/                    # 静态网页
│   ├── index.html
│   ├── app.js
│   └── style.css
├── scripts/
│   └── update_readme.py     # 将 JSON 同步到 README.md
├── README.md                # Markdown 版导航目录
└── .github/workflows/deploy.yml  # GitHub Pages 自动部署
```

## 新增/更新 Skill 的步骤

### 1. 解析网页元数据

当用户提供一个链接时：

- 尽量提取链接标题作为 `name`。
- 总结一句话作为 `description`（简洁、具体，排除已知常识）。
- 判断来源平台写入 `platform`：
  - `Codex` / `Claude` / `DeepSeek (DSH)` / `General`（跨平台通用则用 `General`）。
  - 一个 Skill 可属于多个平台（用数组）。
- 判断 `is_free`：确系公益/免费为 `true`，否则 `false`。
- 分配 `category`：如「科研辅助」「代码开发」「内容创作」「自动化」「提示词工程」等。
- 提取 `tags`（2~4 个，如 ["开源","论文","免费"]）。

### 2. 更新数据库

- 新增记录时生成唯一 `id`（如 `skill-007`），并追加到 `data/skills.json` 数组末尾。
- `date_added` 格式为 `YYYY-MM-DD`（使用当天日期）。
- 遵循下表的字段规范：

| 字段 | 类型 | 说明 | 示例 |
| --- | --- | --- | --- |
| `id` | string | 唯一标识 | `skill-007` |
| `name` | string | 名称 | `Codex CLI Wrapper` |
| `platform` | string[] | 所属平台 | `["Codex"]` |
| `category` | string | 分类 | `自动化` |
| `url` | string | 链接 | `https://github.com/...` |
| `description` | string | 一句话描述 | `...` |
| `is_free` | boolean | 是否免费/公益 | `true` |
| `tags` | string[] | 标签 | `["开源"]` |
| `date_added` | string | 添加日期 | `2026-09-03` |

### 3. 同步 README

运行脚本自动更新 README 中的目录表格：

```bash
python scripts/update_readme.py
```

该脚本会重写 `<!-- SKILLS-GENERATED-START -->` 与 `<!-- SKILLS-GENERATED-END -->`
之间的表格，其余内容保持不变。请勿手工编辑该区间。

### 4. 提交到 GitHub

```bash
git add data/skills.json README.md
git commit -m "feat(skill): add [Skill Name] for [Platform]"
git push origin main
```

> 若网页逻辑有改动，把 `site/`、`scripts/` 等也一并 `git add`。
> 提交信息遵循 Conventional Commits。

## 一致性检查清单

- [ ] `data/skills.json` 是合法 JSON（数组）。
- [ ] 新增记录 `id` 唯一、`date_added` 使用当天日期。
- [ ] `platform` 值只在 `Codex / Claude / DeepSeek (DSH) / General` 中选择。
- [ ] `README.md` 由脚本重新生成，未手工破坏标记区间。
- [ ] 已提交并推送。