# obsi

Agent-powered CLI for Obsidian note management. Create, search, and organize notes from the terminal or any AI agent.

By default, obsi now adapts to the vault's real folder layout instead of assuming classic PARA names. In the current `Notee` vault, that means folders like `1-Input/`, `2-Distilled/`, `Projects/`, `3-Archived/`, and `Periodic/` are detected automatically.

## Features

- **Hybrid engine** — Uses Obsidian official CLI when running, falls back to direct file operations when not
- **Smart routing** — Auto-classifies notes into PARA folders based on content keywords
- **Agent-friendly** — JSON-compatible output, stdin support, designed for AI agent workflows
- **Claude Code integration** — Ships as a Claude Code plugin with `/obsi:note`, `/obsi:organize` slash commands

## Install

```bash
git clone https://github.com/Gitnapp/obsi.git
cd obsi
npm install
npm run build
npm link
```

### Initialize

```bash
obsi init
```

Auto-detects Obsidian vaults on your machine and saves the config to `~/.obsirc.json`.

To specify a vault path manually:

```bash
obsi init /path/to/your/vault
```

### Claude Code Plugin

Add to your `~/.claude/settings.json`:

```json
{
  "extraKnownMarketplaces": {
    "obsi-plugins": {
      "source": {
        "source": "github",
        "repo": "Gitnapp/obsi"
      }
    }
  },
  "enabledPlugins": {
    "obsi@obsi-plugins": true
  }
}
```

Restart Claude Code. You'll get `/obsi:note`, `/obsi:organize` commands.

## Commands

### `obsi init`

Configure vault location.

```bash
obsi init                        # Auto-detect vault
obsi init /path/to/vault         # Manual path
```

Config is stored in `~/.obsirc.json`:

```json
{
  "vaultPath": "/path/to/vault",
  "para": {
    "resources": "1-Input",
    "projects": "Projects",
    "areas": "2-Distilled",
    "archive": "3-Archived"
  },
  "inbox": "1-Input",
  "daily": "Periodic",
  "knownAreas": ["技术与工具", "财富", "阅读", "..."]
}
```

`obsi init` inspects the target vault and writes the detected structure into config, so older PARA-style vaults and newer custom layouts can both work.

### `obsi note`

Create a new note in the vault.

```bash
# Auto-classify by content keywords
obsi note "Docker Compose 入门" --content "学习了 docker compose 的多容器编排..." --tags "docker,devops"
# → 2-Distilled/技术与工具/Docker Compose 入门.md

# Specify target area
obsi note "Q1 投资复盘" --content "..." --area "财富"
# → 2-Distilled/财富/Q1 投资复盘.md

# Target a project
obsi note "Auth Flow Design" --content "..." --project "MktGenie"
# → Projects/MktGenie/Auth Flow Design.md

# Save as resource
obsi note "REST API Cheatsheet" --content "..." --resource "Cheatsheets"
# → 1-Input/Cheatsheets/REST API Cheatsheet.md

# Read content from file
obsi note "Meeting Notes" --from-file ./meeting.md --area "商业"

# Pipe from stdin (useful for agents)
echo "Auto-generated content" | obsi note "Agent Output" --from-stdin
```

**Options:**

| Flag | Description |
|------|-------------|
| `-c, --content <text>` | Note body text |
| `-a, --area <name>` | Target area under the detected areas folder, e.g. `2-Distilled/` |
| `-p, --project <name>` | Target project under the detected projects folder, e.g. `Projects/` |
| `-r, --resource <name>` | Target resource folder under the detected resources folder, e.g. `1-Input/` |
| `-t, --tags <tags>` | Comma-separated tags |
| `--from-file <path>` | Read content from a file |
| `--from-stdin` | Read content from stdin |
| `--source <source>` | Source label: `claude-code`, `web`, `manual`, `agent` |
| `--type <type>` | Note type: `note`, `research`, `project` |

### `obsi daily`

Append content to today's daily note.

```bash
# Quick append
obsi daily "Finished obsi CLI development"

# With a heading
obsi daily --heading "## TODO" --content "- [ ] Write unit tests"

# Multi-line content
obsi daily --content "Key takeaway from today's meeting:
- Decision A was made
- Follow up on item B"
```

### `obsi search`

Search across the vault.

```bash
obsi search "agent workflow"
obsi search "投资" --area "财富" --limit 5
obsi search "docker" --tags "devops"
```

**Options:**

| Flag | Description |
|------|-------------|
| `-a, --area <name>` | Limit search to an area |
| `-t, --tags <tags>` | Filter by tags |
| `-l, --limit <n>` | Max results (default: 20) |

### `obsi organize`

Organize and maintain the vault.

```bash
# Review inbox notes pending classification
obsi organize inbox

# Generate Map of Content for an area
obsi organize moc --area "技术与工具"

# Find orphan notes (no tags, no links)
obsi organize orphans

# Show tag statistics
obsi organize tags
obsi organize tags --path "2-Distilled/技术与工具"
```

### `obsi status`

Show vault status and engine info.

```bash
obsi status
# obsi status
# ──────────────────────────────────────────────────
# Vault:     Notee (/Users/bo/.../Obsidian/Notee)
# Obsidian:  running (CLI available)
# Engine:    obsidian-cli
# Notes:     773 | Inbox: 0 pending | Last modified: 5m ago
```

## Note Routing

When no explicit `--area`, `--project`, or `--resource` flag is provided, obsi auto-classifies based on content keywords:

| Keywords detected | Target |
|-------------------|--------|
| code, cli, api, agent, docker, git... | detected areas folder, e.g. `2-Distilled/技术与工具/` |
| 投资, 股票, 基金, finance, trading... | detected areas folder, e.g. `2-Distilled/财富/` |
| 读书, book, reading, 书评... | detected areas folder, e.g. `2-Distilled/阅读/` |
| 健身, exercise, health, workout... | detected areas folder, e.g. `2-Distilled/健康/` |
| 商业, business, marketing, 创业... | detected areas folder, e.g. `2-Distilled/商业/` |
| No confident match | detected inbox folder, e.g. `1-Input/` + `#to-classify` tag |

Requires at least 2 keyword matches for classification confidence. This is intentionally conservative — better to land in Inbox than to be misclassified.

## Frontmatter

Notes created by obsi include YAML frontmatter:

```yaml
---
title: "Note Title"
created: 2026-03-13T14:30:00.000Z
modified: 2026-03-13T14:30:00.000Z
source: agent
type: note
tags:
  - cli
  - automation
status: active
---
```

## Hybrid Engine

obsi automatically selects the best execution engine:

| Condition | Engine | Capabilities |
|-----------|--------|-------------|
| Obsidian running + CLI enabled | `obsidian-cli` | Full: templates, search, daily notes via official CLI |
| Obsidian not running | `direct-file` | Core: file read/write, frontmatter, grep-based search |

Check the current engine with `obsi status`.

## Agent Integration

obsi is designed to be called by any AI agent framework:

```python
# Python
import subprocess
result = subprocess.run(
    ['obsi', 'note', 'Title', '--content', 'Content', '--area', '技术与工具'],
    capture_output=True, text=True
)
```

```typescript
// TypeScript
import { execa } from 'execa'
await execa('obsi', ['note', 'Title', '--content', 'Content', '--area', '技术与工具'])
```

```bash
# Shell script
obsi daily --heading "## Agent Log" --content "Task completed at $(date)"
```

## Project Structure

```
obsi/
├── .claude-plugin/        # Claude Code plugin manifest
│   ├── plugin.json
│   └── marketplace.json
├── commands/              # Claude Code slash commands
│   ├── note.md            # /obsi:note
│   └── organize.md        # /obsi:organize
├── src/
│   ├── index.ts           # CLI entry point (Commander.js)
│   ├── commands/          # Command implementations
│   ├── engine/            # Hybrid execution engine
│   │   ├── types.ts       # ExecutionEngine interface
│   │   ├── obsidian-cli.ts
│   │   └── direct-file.ts
│   ├── routing/
│   │   └── classifier.ts  # Auto-classification logic
│   └── utils/
│       ├── config.ts      # ~/.obsirc.json management
│       ├── vault-structure.ts # Detect real vault folder layout
│       ├── frontmatter.ts # YAML frontmatter helpers
│       └── detect.ts      # Obsidian process detection
├── hooks/
│   └── stop-daily.sh      # Auto-append conversation summary on session end
└── skills/                # Claude Code skills (programmatic)
```

## License

MIT
