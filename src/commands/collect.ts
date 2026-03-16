import chalk from 'chalk'
import { getEngine } from '../engine/index.js'
import { vaultExists, VAULT_PATH } from '../utils/config.js'

interface CollectCommandOptions {
  text?: string
  title?: string
  area?: string
  tags?: string
}

export async function collectCommand(urlOrEmpty: string | undefined, opts: CollectCommandOptions) {
  if (!vaultExists()) {
    console.log(chalk.red('Vault not found: ' + VAULT_PATH))
    process.exit(1)
  }

  // URL collection: delegate to calling agent
  if (urlOrEmpty && urlOrEmpty.startsWith('http')) {
    const areaHint = opts.area ? ` --area "${opts.area}"` : ''
    const tagsHint = opts.tags ? ` --tags "${opts.tags}"` : ''
    agentPrompt([
      `Fetch the content from: ${urlOrEmpty}`,
      `Extract the title and summarize the key points in Chinese.`,
      `Then save it with:`,
      `  obsi note "<title>" --content "<summary>" --source web --type research${areaHint}${tagsHint}`,
      `Content structure to use:`,
      `  ## Source\\n\\n[title](${urlOrEmpty})\\n\\n## 要点\\n\\n- ...\\n\\n## 笔记\\n\\n...`,
    ])
    return
  }

  // Plain text collection: execute directly
  if (opts.text) {
    const title = opts.title ?? `Collected ${new Date().toISOString().slice(0, 10)}`
    const tags = opts.tags?.split(',').map(t => t.trim()).filter(Boolean) ?? []
    const engine = await getEngine()
    const path = await engine.createNote({
      title,
      content: opts.text,
      area: opts.area,
      tags,
      source: 'web',
      type: 'research',
    })
    console.log(chalk.green('Collected: ') + chalk.cyan(path))
    return
  }

  console.log(chalk.yellow('Provide a URL or --text'))
  console.log('Usage: obsi collect "https://..." or obsi collect --text "..."')
  process.exit(1)
}

function agentPrompt(lines: string[]) {
  console.log(chalk.magenta('◆ agent:'))
  for (const line of lines) {
    console.log('  ' + line)
  }
}
