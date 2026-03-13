interface NoteCommandOptions {
    content?: string;
    area?: string;
    project?: string;
    resource?: string;
    tags?: string;
    fromFile?: string;
    fromStdin?: boolean;
    source?: string;
    type?: string;
}
export declare function noteCommand(title: string, opts: NoteCommandOptions): Promise<void>;
export {};
