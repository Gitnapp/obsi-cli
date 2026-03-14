---
allowed-tools: Bash(obsi *)
description: Save raw content to Obsidian inbox (1-Input) without any summarization
---

# /input — Save to Inbox

Save content as-is to the `1-Input` folder. **Do NOT summarize, restructure, or analyze the content.** Preserve the original text exactly.

## Instructions

1. Take the arguments or content provided — use it verbatim, do not rewrite or summarize.
2. Generate a concise descriptive title from the content.
3. Identify relevant tags if obvious.
4. Run:

```bash
obsi note "<title>" --content "<raw content>" --tags "<tags>" --inbox --source claude-code
```

5. Report the created file path.

## Rules

- **No summarization** — save content exactly as provided or minimally formatted
- **No restructuring** — do not add headers, rewrite paragraphs, or reorganize
- If a URL is provided without extra text, save the URL + any provided description as-is
- If the user provides a long paste, save the full text without cutting it down
- Always route to `1-Input` via `--inbox`

## Tips

- For very long content, write to a temp file first and use `--from-file`
- The note can always be distilled later using `/distill`
