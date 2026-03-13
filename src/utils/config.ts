import { homedir } from 'os'
import { join } from 'path'
import { existsSync, readFileSync, writeFileSync } from 'fs'

const RC_PATH = join(homedir(), '.obsirc.json')

interface ObsiConfig {
  vaultPath: string
  para?: {
    resources?: string
    projects?: string
    areas?: string
    archive?: string
  }
  inbox?: string
  knownAreas?: string[]
}

function loadConfig(): ObsiConfig | null {
  if (!existsSync(RC_PATH)) return null
  try {
    return JSON.parse(readFileSync(RC_PATH, 'utf-8'))
  } catch {
    return null
  }
}

export function saveConfig(config: ObsiConfig): void {
  writeFileSync(RC_PATH, JSON.stringify(config, null, 2), 'utf-8')
}

export function configExists(): boolean {
  return existsSync(RC_PATH)
}

const config = loadConfig()

export const VAULT_PATH = config?.vaultPath ?? ''

export const PARA = {
  resources: config?.para?.resources ?? '1. Resources',
  projects: config?.para?.projects ?? '2. Projects',
  areas: config?.para?.areas ?? '3. Areas',
  archive: config?.para?.archive ?? '4. Archive',
} as const

export const INBOX_DIR = config?.inbox ?? 'Inbox'
export const TEMPLATES_DIR = join(PARA.archive, '_Templates')

export const KNOWN_AREAS: readonly string[] = config?.knownAreas ?? [
  '健康',
  '技术与工具',
  '财富',
  '阅读',
  '唱歌',
  '商业',
  '服饰',
  '英语与职业',
  '饮食',
  'TEM-8 英语专业八级',
  '考研',
]

export function getVaultPath(...segments: string[]): string {
  return join(VAULT_PATH, ...segments)
}

export function vaultExists(): boolean {
  return VAULT_PATH !== '' && existsSync(VAULT_PATH)
}

export { RC_PATH }
