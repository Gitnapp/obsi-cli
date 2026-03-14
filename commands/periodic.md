---
allowed-tools: Bash(obsi daily *)
description: Append content to today's diary note in Periodic folder only
---

# /periodic — Append to Today's Diary

Append content to **today's daily note** in the `Periodic` folder. This command operates exclusively on the current day's file — it never creates notes in other folders.

## Instructions

1. Determine what to append from the arguments:
   - If text is provided → use it directly
   - If asking to log something from the conversation → extract the relevant content
2. Optionally determine a heading to append under (e.g. `## 今日记录`, `## 想法`, `## 任务`).
3. Run:

```bash
# Append plain text
obsi daily "<content>"

# Append under a heading
obsi daily "<content>" --heading "## <heading>"

# Append longer content via --content
obsi daily --content "<content>" [--heading "## <heading>"]
```

4. Report that the content was appended to today's note.

## Rules

- **Only today's diary** — never create new notes, never write to other folders
- If the user asks to save something "to the diary" or "log for today", use this command
- If the user wants a permanent note (not diary), suggest `/input` or `/distill` instead
- Today's file is at `Periodic/YYYY-MM-DD.md` — created automatically if it doesn't exist

## Examples

```bash
# Log a quick thought
obsi daily "Read about Impeccable skills package — looks useful for frontend AI workflows"

# Log under a heading
obsi daily "Finished BBC Iran article summary" --heading "## 今日阅读"

# Append task reflection
obsi daily --content "完成了 obsi 新命令开发：input/distill/periodic" --heading "## 今日完成"
```
