#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const COMPONENTS = {
  "--major": 0,
  "--minor": 1,
  "--patch": 2,
};

const git = (...command) => {
  const proc = spawnSync(...["git", command]);

  if (proc.status !== 0) {
    process.stdout.write(proc.stdout);
    process.stderr.write(proc.stderr);
    process.exit(1);
  }

  return proc;
};

const hasUncommitedChanges = git("status", "-s").stdout.length > 0;

if (hasUncommitedChanges) {
  console.log(
    "There are uncommited changes. Please commit, stash or remove them before running this script!"
  );
  process.exit(1);
}

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageJsonPath = join(
  scriptDir,
  "../astro-parallel-build-check/package.json"
);

const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf-8"));
const { version } = packageJson;

const component = process.argv.length === 3 ? process.argv[2] : "--patch";

const components = version.replace("v", "").split(".");
components[COMPONENTS[component]] = `${+components[COMPONENTS[component]] + 1}`;
const newVersion = components.join(".");

console.log(`Bumping version ${version} to ${newVersion}`);

packageJson.version = newVersion;

writeFileSync(packageJsonPath, `${JSON.stringify(packageJson, null, 2)}\n`);

git("add", packageJsonPath);
git("commit", "-m", `bump package version to ${newVersion}`);
git("tag", `v${newVersion}`);
