---
allowed-tools: Bash(obsi *)
description: Organize Obsidian vault - process inbox, generate MOC, find orphans
---

# /organize — Organize Obsidian Vault

Help organize the Obsidian vault.

## Instructions

1. Ask the user which operation they want, or infer from context:
   - **inbox** — Process pending notes in Inbox
   - **moc** — Generate/update Map of Content for an area
   - **orphans** — Find notes with no tags or links
   - **tags** — Show tag statistics

2. Run the appropriate command:

```bash
obsi organize inbox
obsi organize moc --area "<area name>"
obsi organize orphans
obsi organize tags [--path "<path>"]
```

3. For inbox processing:
   - Run `obsi organize inbox` — shows pending notes and a `◆ agent:` block
   - Follow the agent prompt: read each note, determine the best area, run the pre-filled `obsi distill "<file>" --area "<area>"` commands

## Available areas for MOC:
健康, 技术与工具, 财富, 阅读, 唱歌, 商业, 服饰, 英语与职业, 饮食
