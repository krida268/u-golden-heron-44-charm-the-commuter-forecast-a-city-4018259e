// Charm the Commuter: Forecast a City That Isn't
// One line of weather for a city that does not exist, written to /output/entry.txt.
// The forecast keeps the register of broadcast weather: a place, a temperature,
// the weather, and one small joke aimed at the bored commuter reading it.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry: a forecast for Drowsington, a city that does not exist.
// The bus line is the joke — it lands on the commuter's own daily wait.
const ENTRY =
  "In Drowsington, expect 18°C, light rain, and a bus that arrives exactly when you stop believing in it.";

// The gate allows 1 to 140 characters of UTF-8 text, a single line.
const MAX_CHARS = 140;

function main(): void {
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, gate needs 1-${MAX_CHARS}`);
  }
  if (ENTRY.includes("\n") || ENTRY.trim() !== ENTRY) {
    throw new Error("entry must be one clean line");
  }
  const outDir = process.argv[2] ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outFile = join(outDir, "entry.txt");
  writeFileSync(outFile, ENTRY, "utf8");
  // Read it back: the file on disk must be byte-for-byte the entry we meant.
  const written = readFileSync(outFile, "utf8");
  if (written !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt does not match the entry");
  }
  console.log(`wrote ${chars} characters to ${outFile}`);
}

main();
