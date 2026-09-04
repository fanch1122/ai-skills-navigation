#!/usr/bin/env python3
"""将 data/skills.json 同步生成 README.md 中的导航目录。

用法:
    python scripts/update_readme.py

它会读取 data/skills.json 并在 README.md 的标记区间
<!-- SKILLS-GENERATED-START --> 与 <!-- SKILLS-GENERATED-END --> 之间
重写表格，其余内容保持不变。
"""

import json
import pathlib
import re

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "data" / "skills.json"
README_FILE = ROOT / "README.md"

START_MARK = "<!-- SKILLS-GENERATED-START -->"
END_MARK = "<!-- SKILLS-GENERATED-END -->"

PLATFORM_LABELS = {
    "Codex": "Codex",
    "Claude": "Claude",
    "DeepSeek (DSH)": "DeepSeek",
    "General": "通用",
}


def render_table(skills):
    """生成 README 中使用的 Markdown 表格，按分类分组。"""
    # 按分类分组，分类内按 id 排序
    from collections import OrderedDict

    by_cat = OrderedDict()
    for s in sorted(skills, key=lambda x: (x.get("category", "其他"), x.get("id", ""))):
        by_cat.setdefault(s.get("category", "其他"), []).append(s)

    blocks = []
    for cat, items in by_cat.items():
        rows = [
            f"### {cat}",
            "",
            "| ID | 名称 | 平台 | 免费 | 描述 |",
            "| --- | --- | --- | --- | --- |",
        ]
        for s in items:
            platforms = "、".join(PLATFORM_LABELS.get(p, p) for p in s.get("platform", []))
            free = "✅" if s.get("is_free") else "❌"
            name = s.get("name", "")
            url = s.get("url", "#")
            desc = s.get("description", "").replace("|", "\\|")
            rows.append(
                f"| `{s.get('id', '')}` | [{name}]({url}) | {platforms} | {free} | {desc} |"
            )
        blocks.append("\n".join(rows))
    return "\n\n".join(blocks) + "\n"


def main():
    skills = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    table = render_table(skills)

    readme = README_FILE.read_text(encoding="utf-8")

    pattern = re.compile(
        re.escape(f"{START_MARK}\n") + r".*?" + re.escape(f"\n{END_MARK}"),
        re.DOTALL,
    )
    replacement = f"{START_MARK}\n{table}{END_MARK}"

    if pattern.search(readme):
        new_readme = pattern.sub(lambda _: replacement, readme)
    else:
        # 若标记不存在，则在文件末尾追加一个目录区块。
        section = (
            f"\n## 📚 Skill 目录（自动生成）\n\n{START_MARK}\n{table}{END_MARK}\n"
        )
        new_readme = readme.rstrip("\n") + section

    README_FILE.write_text(new_readme, encoding="utf-8")
    print(f"README.md 已更新，共 {len(skills)} 条记录。")


if __name__ == "__main__":
    main()