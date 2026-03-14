---
name: periodic
description: Append content to today's daily note in Periodic folder. Use when user wants to log something to their diary for today only.
user_invocable: true
---

# /periodic — Append to Today's Diary

Append content to today's daily note in `Periodic/YYYY-MM-DD.md` only.

## Process

1. Extract content to log from user message
2. Optionally identify a heading
3. Call `obsi daily` — this is the ONLY allowed command

## Command

```bash
obsi daily "<content>" [--heading "## <heading>"]
# or
obsi daily --content "<content>" [--heading "## <heading>"]
```

## Rules

- Only today's file — never create notes elsewhere
- If user wants a permanent note, suggest `/input` or `/distill`
- File is auto-created at `Periodic/YYYY-MM-DD.md` if it doesn't exist
