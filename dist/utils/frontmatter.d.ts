export interface NoteFrontmatter {
    title: string;
    created: string;
    modified: string;
    source: 'claude-code' | 'web' | 'manual' | 'agent';
    type: 'note' | 'research' | 'project' | 'daily' | 'moc';
    tags: string[];
    area?: string;
    project?: string;
    status: 'active' | 'inbox';
}
export declare function createFrontmatter(overrides: Partial<NoteFrontmatter> & {
    title: string;
}): NoteFrontmatter;
export declare function buildNoteContent(frontmatter: NoteFrontmatter, body: string): string;
export declare function parseNote(content: string): {
    frontmatter: Partial<NoteFrontmatter>;
    body: string;
};
