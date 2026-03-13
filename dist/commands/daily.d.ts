interface DailyCommandOptions {
    content?: string;
    heading?: string;
}
export declare function dailyCommand(text: string | undefined, opts: DailyCommandOptions): Promise<void>;
export {};
