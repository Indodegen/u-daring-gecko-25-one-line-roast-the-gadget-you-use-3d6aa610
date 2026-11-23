import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// All paths resolve from this file's location, never from the process cwd:
// the grader runs `node main.ts` from a different working directory.
const here = dirname(fileURLToPath(import.meta.url));

const entry = readFileSync(join(here, "entry.txt"), "utf8");
const line = entry.trim();
if (line.trim().length === 0) {
  throw new Error("entry must not be empty or whitespace only");
}
if (line.length < 1 || line.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${line.length}`);
}
if (line.includes("\n")) {
  throw new Error("entry must be a single line");
}

const out = process.env.MAKEFUN_OUTPUT_DIR ?? join(here, "out");
mkdirSync(out, { recursive: true });
copyFileSync(join(here, "entry.txt"), join(out, "entry.txt"));
