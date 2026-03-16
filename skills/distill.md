---
name: distill
description: Move a note from Input to Distilled in Obsidian vault. Use when user wants to process, classify, or graduate a note from the inbox to the knowledge base.
user_invocable: true
---

# /distill — Distill Notes from Input

Move notes from `Input/` to `Distilled/`, completing the capture → process workflow.

## Process

1. Run `obsi distill` to see what's pending
2. Read each note to determine the best area
3. Distill each one with the appropriate area

## Steps

### List pending notes:
```bash
obsi distill
```

### Distill a specific note:
```bash
obsi distill "<filename>" --area "<area>"
```

### Classification hints:
- Technical/tools/code → `--area "技术与工具"`
- Finance/investment → `--area "财富"`
- Book/reading notes → `--area "阅读"`
- Health/fitness → `--area "健康"`
- Business/marketing → `--area "商业"`
- Singing/music → `--area "唱歌"`
- If unsure, omit `--area` (saves to Distilled/ root)

### After distilling:
- Report the new file path
- Note: the original file in Input/ is removed
