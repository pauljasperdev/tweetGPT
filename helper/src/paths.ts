import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

function findHelperRoot(startFile: string): string {
  let dir = dirname(startFile);
  for (let i = 0; i < 8; i += 1) {
    if (existsSync(resolve(dir, "package.json"))) return dir;
    const parent = dirname(dir);
    if (parent === dir) break;
    dir = parent;
  }
  // Fallback for compiled files under dist/src.
  return resolve(dirname(startFile), "../..");
}

export const helperRoot = findHelperRoot(fileURLToPath(import.meta.url));

export function fromHelperRoot(...parts: string[]): string {
  return resolve(helperRoot, ...parts);
}

export function resolveHelperPath(pathOrUndefined: string | undefined, fallback: string): string {
  const raw = pathOrUndefined && pathOrUndefined.trim().length > 0 ? pathOrUndefined : fallback;
  return raw.startsWith("/") ? raw : fromHelperRoot(raw);
}
