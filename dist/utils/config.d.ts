export declare const VAULT_PATH: string;
export declare const PARA: {
    readonly resources: "1. Resources";
    readonly projects: "2. Projects";
    readonly areas: "3. Areas";
    readonly archive: "4. Archive";
};
export declare const INBOX_DIR = "Inbox";
export declare const TEMPLATES_DIR: string;
export declare const KNOWN_AREAS: readonly ["健康", "技术与工具", "财富", "阅读", "唱歌", "商业", "服饰", "英语与职业", "饮食", "TEM-8 英语专业八级", "考研"];
export declare function getVaultPath(...segments: string[]): string;
export declare function vaultExists(): boolean;
