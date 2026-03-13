---
allowed-tools: Bash(obsi *)
description: Save conversation content or ideas as an Obsidian note
---

# /note — Save to Obsidian

Save content from the current conversation to the user's Obsidian vault.

## Instructions

1. If the user said `/note` with no arguments, ask what they want to save. If they say "last", summarize the key points from the recent conversation.
2. Generate a descriptive title for the note.
3. Identify relevant tags from the content.
4. Determine the best classification:
   - Technical discussions → `--area "技术与工具"`
   - Finance/investment → `--area "财富"`
   - Book/reading notes → `--area "阅读"`
   - Health/fitness → `--area "健康"`
   - Business/marketing → `--area "商业"`
   - If unsure, omit the `--area` flag so obsi can auto-classify into the detected areas folder or inbox
5. Run the command:

```bash
obsi note "<title>" --content "<content>" --tags "<comma,separated,tags>" [--area "<area>"] [--project "<project>"] --source claude-code
```

6. Report the created file path to the user.

## Tips
- For long content, write to a temp file first and use `--from-file`
- Use `--project` when the conversation is clearly about a specific project
- obsi now routes notes using the vault's detected folder layout, not only classic PARA names
- The content should be well-structured markdown, not raw conversation dump
