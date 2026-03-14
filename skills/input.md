---
name: input
description: Save raw content to Obsidian inbox (1-Input) without summarizing. Use when user wants to capture something quickly without AI restructuring.
user_invocable: true
---

# /input — Save Raw to Inbox

Save content verbatim to the `1-Input` folder. No summarization, no restructuring.

## Process

1. Take the provided content as-is — do NOT summarize or rewrite
2. Generate a concise title
3. Add obvious tags if any
4. Call `obsi note` with `--inbox` flag

## Command

```bash
obsi note "<title>" --content "<raw content>" --tags "<tags>" --inbox --source claude-code
```

## Rules

- Preserve original text exactly
- Never summarize, restructure, or add analysis
- Always use `--inbox` to route to `1-Input`
- Notes saved here can be distilled later with `/distill`
