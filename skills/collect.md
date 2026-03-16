---
name: collect
description: Collect and save content from a URL or text to Obsidian. Use when user wants to save web content, articles, or reference material to their vault.
user_invocable: true
---

# /collect — Collect Content to Obsidian

Fetch, summarize, and save web content or text to the Obsidian vault.

## Process

1. If a URL is provided, use WebFetch to get the content first
2. Summarize and structure the content as a note
3. Call `obsi collect` or `obsi note` to save

## For URLs:

```bash
# Step 1: Run obsi collect — CLI outputs ◆ agent: prompt with instructions
obsi collect "<url>"
# Step 2: Follow the prompt: WebFetch the URL, extract title and key points
# Step 3: Run the obsi note command shown in the prompt
```

## For text:

```bash
obsi collect --text "<user provided text>" --title "<title>" [--area "<area>"]
```

## Content structure for collected notes:

```markdown
## Source

[Article Title](url)

## 要点

- Point 1
- Point 2

## 笔记

User's additional context or thoughts
```

## After collection:
- Report what was saved and where
- Suggest relevant tags if none were provided
