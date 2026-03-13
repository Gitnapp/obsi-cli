interface OrganizeCommandOptions {
    path?: string;
    area?: string;
}
export declare function organizeCommand(subcommand: string, opts: OrganizeCommandOptions): Promise<void>;
export {};
