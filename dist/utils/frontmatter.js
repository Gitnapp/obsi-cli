import matter from 'gray-matter';
export function createFrontmatter(overrides) {
    const now = new Date().toISOString();
    return {
        created: now,
        modified: now,
        source: 'agent',
        type: 'note',
        tags: [],
        status: 'active',
        ...overrides,
    };
}
export function buildNoteContent(frontmatter, body) {
    // Remove undefined values that cause YAML serialization errors
    const clean = Object.fromEntries(Object.entries(frontmatter).filter(([, v]) => v !== undefined));
    return matter.stringify(body, clean);
}
export function parseNote(content) {
    const { data, content: body } = matter(content);
    return { frontmatter: data, body };
}
