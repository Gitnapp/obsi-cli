---
allowed-tools: Bash(obsi *), WebFetch
description: Summarize and save content to Obsidian 2-Distilled with AI restructuring
---

# /distill — Distill & Save to 2-Distilled

Summarize, structure, and save content to the `2-Distilled` folder. Apply AI judgment to extract key insights, restructure the material, and classify it into the right area.

## Instructions

1. Identify what to distill from the arguments:
   - A URL → fetch it first with WebFetch, then summarize
   - Raw text or conversation content → analyze and restructure
   - A topic/idea → synthesize from the conversation context
2. Produce a well-structured markdown summary with clear headings, key points, and takeaways.
3. Classify into the right area:
   - Technical / tools → `--area "技术与工具"`
   - Finance / investing → `--area "财富"`
   - Reading / books → `--area "阅读"`
   - Health / fitness → `--area "健康"`
   - Business / marketing → `--area "商业"`
   - If unsure, omit `--area` and let obsi auto-classify
4. Run:

```bash
obsi note "<title>" --content "<structured summary>" --tags "<tags>" --area "<area>" --source claude-code
```

5. Report the created file path.

## Content structure

```markdown
## Summary

One-paragraph synthesis of the core idea.

## Key Points

- Point 1
- Point 2

## Details

(Supporting details, quotes, data)

## Source

[Optional link or origin]
```

## Tips

- For long content, write to a temp file first and use `--from-file`
- Use `--project "<name>"` when the note belongs to an active project
- Raw captures in `1-Input` can be distilled here with `/distill`
