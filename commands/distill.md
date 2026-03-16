---
allowed-tools: Bash(obsi *)
description: Move a note from Input to Distilled
---

# /distill — Distill a Note

Move a note from `Input/` to `Distilled/`, optionally placing it in an area subfolder.

## Instructions

1. Run `obsi distill` with no arguments to see what's pending in Input/
2. For each note, determine the best area and distill it:

```bash
obsi distill                              # list pending notes
obsi distill "<filename>"                 # move to Distilled/ root
obsi distill "<filename>" --area "<area>" # move to Distilled/<area>/
```

## Available areas:
健康, 技术与工具, 财富, 阅读, 唱歌, 商业, 服饰, 英语与职业, 饮食

## Tips
- Filename matching is fuzzy — partial name is enough
- Frontmatter is preserved and `status` is updated to `active`
- The original file in Input/ is removed after distilling
