interface SearchCommandOptions {
    area?: string;
    tags?: string;
    limit?: string;
}
export declare function searchCommand(query: string, opts: SearchCommandOptions): Promise<void>;
export {};
