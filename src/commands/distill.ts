import chalk from 'chalk'
import { readFile, writeFile, unlink, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, basename } from 'path'
import { glob } from 'glob'
import { getVaultPath, INBOX_DIR, DISTILLED_DIR, KNOWN_AREAS } from '../utils/config.js'
import { parseNote, createFrontmatter, buildNoteContent } from '../utils/frontmatter.js'

interface DistillCommandOptions {
  area?: string
}

export async function distillCommand(filename: string | undefined, opts: DistillCommandOptions) {
  const inputPath = getVaultPath(INBOX_DIR)
  const files = await glob('*.md', { cwd: inputPath }).catch(() => [])

  if (!filename) {
    if (files.length === 0) {
      console.log(chalk.green('Input is empty — nothing to distill.'))
      return
    }
    console.log(chalk.bold(`Input: ${files.length} notes pending distillation\n`))
    files.forEach(f => console.log(chalk.cyan(`  ${f}`)))
    console.log(chalk.dim(`\nUsage: obsi distill <filename> [--area <area>]`))
    console.log(chalk.dim(`Areas: ${KNOWN_AREAS.join(', ')}`))
    return
  }

  const match = files.find(f =>
    f === filename ||
    f === filename + '.md' ||
    f.toLowerCase().includes(filename.toLowerCase())
  )

  if (!match) {
    console.log(chalk.red(`Not found in ${INBOX_DIR}/: ${filename}`))
    if (files.length > 0) console.log(chalk.dim(`Available: ${files.join(', ')}`))
    process.exit(1)
  }

  const srcPath = join(inputPath, match)
  const raw = await readFile(srcPath, 'utf-8')
  const { frontmatter, body } = parseNote(raw)

  const destDir = opts.area
    ? getVaultPath(DISTILLED_DIR, opts.area)
    : getVaultPath(DISTILLED_DIR)

  if (!existsSync(destDir)) {
    await mkdir(destDir, { recursive: true })
  }

  const destPath = join(destDir, match)

  const updated = createFrontmatter({
    title: (frontmatter.title as string) || basename(match, '.md'),
    source: (frontmatter.source as 'claude-code' | 'web' | 'manual' | 'agent') ?? 'manual',
    type: (frontmatter.type as 'note' | 'research' | 'project') ?? 'note',
    tags: (frontmatter.tags as string[]) ?? [],
    area: opts.area ?? (frontmatter.area as string | undefined),
    status: 'active',
  })

  await writeFile(destPath, buildNoteContent(updated, body), 'utf-8')
  await unlink(srcPath)

  const rel = opts.area ? `${DISTILLED_DIR}/${opts.area}/${match}` : `${DISTILLED_DIR}/${match}`
  console.log(chalk.green('Distilled: ') + chalk.cyan(rel))
}
