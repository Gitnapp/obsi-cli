import type { ExecutionEngine, NoteOptions, SearchOptions, SearchResult, VaultStats } from './types.js';
export declare class ObsidianCLIEngine implements ExecutionEngine {
    private fallback;
    private obsidian;
    createNote(opts: NoteOptions): Promise<string>;
    appendDaily(content: string, heading?: string): Promise<void>;
    search(query: string, opts?: SearchOptions): Promise<SearchResult[]>;
    readNote(path: string): Promise<{
        frontmatter: Record<string, unknown>;
        body: string;
    }>;
    getStats(): Promise<VaultStats>;
}
