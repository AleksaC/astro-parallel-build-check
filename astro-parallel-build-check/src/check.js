import { check } from "@astrojs/check";

const failed = await check(process.cwd());

if (failed) {
  process.exit(1);
}
