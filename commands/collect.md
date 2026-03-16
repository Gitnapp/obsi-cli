---
allowed-tools: Bash(obsi *), WebFetch
description: Collect and save web content or text to Obsidian vault
---

# /collect — Collect Content to Obsidian

Fetch, summarize, and save web content or text to the Obsidian vault.

## Instructions

### For URLs:

1. Run `obsi collect "<url>"` — the CLI will output a `◆ agent:` prompt block
2. Follow the prompt: fetch the URL with WebFetch, extract title and key points
3. Save with the command shown in the prompt

```bash
obsi collect "https://..."
# → CLI outputs: ◆ agent: fetch + summarize + obsi note command to run
```

### For text:

```bash
obsi collect --text "<text>" --title "<title>" [--area "<area>"]
```

## Content structure for collected notes:

```markdown
## Source

[Article Title](url)

## 要点

- Point 1
- Point 2

## 笔记

(additional context)
```
