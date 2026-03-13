import type { ExecutionEngine } from './types.js';
export declare function getEngine(): Promise<ExecutionEngine>;
export declare function getEngineMode(): string;
export type { ExecutionEngine, NoteOptions, SearchOptions, SearchResult, VaultStats } from './types.js';
