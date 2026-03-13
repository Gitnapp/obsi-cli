interface CollectCommandOptions {
    text?: string;
    title?: string;
    area?: string;
    resource?: string;
    tags?: string;
}
export declare function collectCommand(urlOrEmpty: string | undefined, opts: CollectCommandOptions): Promise<void>;
export {};
