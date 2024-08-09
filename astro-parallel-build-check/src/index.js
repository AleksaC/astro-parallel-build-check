#!/usr/bin/env node

import { spawn } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { build } from "astro";

function check() {
  let output = "";

  return new Promise((resolve, reject) => {
    const checkPath = join(dirname(fileURLToPath(import.meta.url)), "check.js");

    const proc = spawn("node", [checkPath]);

    // astro check prints to stdout
    proc.stdout.on("data", (data) => {
      output += data;
    });

    proc.on("exit", (code) => {
      if (code !== 0) {
        reject(new Error(output));
      }
      resolve();
    });
  });
}

let statusCode = 0;
try {
  // TODO: allow passing options
  await Promise.all([build({}), check()]);
} catch (e) {
  console.error(`\n\n${e}`);
  statusCode = 1;
} finally {
  process.exit(statusCode);
}
