import { execaCommand } from 'execa';
export async function isObsidianRunning() {
    try {
        const { stdout } = await execaCommand('pgrep -x Obsidian');
        return stdout.trim().length > 0;
    }
    catch {
        return false;
    }
}
export async function isObsidianCLIAvailable() {
    try {
        await execaCommand('obsidian --version');
        return true;
    }
    catch {
        return false;
    }
}
