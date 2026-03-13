import type { ExecutionEngine, NoteOptions, SearchOptions, SearchResult, VaultStats } from './types.js';
export declare class DirectFileEngine implements ExecutionEngine {
    createNote(opts: NoteOptions): Promise<string>;
    appendDaily(content: string, heading?: string): Promise<void>;
    search(query: string, opts?: SearchOptions): Promise<SearchResult[]>;
    readNote(path: string): Promise<{
        frontmatter: Record<string, unknown>;
        body: string;
    }>;
    getStats(): Promise<VaultStats>;
    private resolveTargetDir;
}
