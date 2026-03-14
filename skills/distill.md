---
name: distill
description: Summarize and save content to Obsidian 2-Distilled. Use when user wants AI to analyze, restructure, and classify content into the knowledge base.
user_invocable: true
---

# /distill — Distill to Knowledge Base

Summarize, restructure, and save content to the `2-Distilled` folder with area classification.

## Process

1. Identify the content to distill (URL, text, or conversation context)
2. Fetch if URL, then analyze and synthesize key insights
3. Classify into the right area
4. Call `obsi note` with `--area` to route to `2-Distilled/<area>`

## Command

```bash
obsi note "<title>" --content "<structured summary>" --tags "<tags>" --area "<area>" --source claude-code
```

## Classification

- Technical / tools → `--area "技术与工具"`
- Finance → `--area "财富"`
- Reading / books → `--area "阅读"`
- Health → `--area "健康"`
- Business → `--area "商业"`
- Unknown → omit area (auto-classify)

## Content structure

```markdown
## Summary
## Key Points
## Details
## Source
```
