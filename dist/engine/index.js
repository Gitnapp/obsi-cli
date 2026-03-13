import { isObsidianRunning, isObsidianCLIAvailable } from '../utils/detect.js';
import { ObsidianCLIEngine } from './obsidian-cli.js';
import { DirectFileEngine } from './direct-file.js';
let cachedEngine = null;
export async function getEngine() {
    if (cachedEngine)
        return cachedEngine;
    const running = await isObsidianRunning();
    const cliAvailable = running && (await isObsidianCLIAvailable());
    cachedEngine = cliAvailable ? new ObsidianCLIEngine() : new DirectFileEngine();
    return cachedEngine;
}
export function getEngineMode() {
    if (cachedEngine instanceof ObsidianCLIEngine)
        return 'obsidian-cli';
    return 'direct-file';
}
