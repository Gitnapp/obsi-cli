---
name: organize
description: Organize Obsidian vault - process inbox, generate MOC, find orphans, show tag stats. Use when user wants to tidy up their notes.
user_invocable: true
---

# /organize — Organize Obsidian Vault

Help the user organize their Obsidian vault.

## Available operations:

### Process inbox
```bash
obsi organize inbox
```
Show pending notes and help user classify them.

### Generate MOC (Map of Content)
```bash
obsi organize moc --area "<area name>"
```
Available areas: 健康, 技术与工具, 财富, 阅读, 唱歌, 商业, 服饰, 英语与职业, 饮食

### Find orphan notes
```bash
obsi organize orphans
```

### Show tag statistics
```bash
obsi organize tags [--path "<path>"]
```

## Process:
1. Ask user which operation they want (or infer from context)
2. Run the command
3. For inbox: run `obsi organize inbox`, then follow the `◆ agent:` prompt —
   read each note, pick the best area, run the pre-filled `obsi distill` commands
4. For MOC: show the generated index
