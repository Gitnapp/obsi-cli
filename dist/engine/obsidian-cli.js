import { execa } from 'execa';
import { DirectFileEngine } from './direct-file.js';
const VAULT_NAME = 'Notee';
// ObsidianCLIEngine delegates to the official `obsidian` CLI when available,
// falls back to DirectFileEngine for operations the CLI doesn't support well.
export class ObsidianCLIEngine {
    fallback = new DirectFileEngine();
    async obsidian(...args) {
        const { stdout } = await execa('obsidian', [`vault=${VAULT_NAME}`, ...args]);
        return stdout;
    }
    async createNote(opts) {
        try {
            const args = ['create', `name=${opts.title}`];
            if (opts.content)
                args.push(`content=${opts.content}`);
            await this.obsidian(...args);
            // Official CLI creates in vault root; we need to move to correct location
            // For now, use direct file for full routing control
            return this.fallback.createNote(opts);
        }
        catch {
            return this.fallback.createNote(opts);
        }
    }
    async appendDaily(content, heading) {
        try {
            const text = heading ? `${heading}\n${content}` : content;
            await this.obsidian('daily:append', `content=${text}`, 'open=false');
        }
        catch {
            await this.fallback.appendDaily(content, heading);
        }
    }
    async search(query, opts) {
        try {
            const args = ['search', `query=${query}`];
            if (opts?.limit)
                args.push(`limit=${opts.limit}`);
            const stdout = await this.obsidian(...args);
            // Parse obsidian CLI search output
            const results = [];
            const lines = stdout.split('\n').filter(l => l.trim());
            for (const line of lines) {
                results.push({
                    path: line.trim(),
                    title: line.trim().replace(/\.md$/, ''),
                    snippet: '',
                });
            }
            return results;
        }
        catch {
            return this.fallback.search(query, opts);
        }
    }
    async readNote(path) {
        return this.fallback.readNote(path);
    }
    async getStats() {
        return this.fallback.getStats();
    }
}
