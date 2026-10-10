import { readRuntimeConfig } from "./config.js";
import { getAuthStatusSummary, resolveModelAuth } from "./auth.js";
import { FIXED_PROVIDER } from "./config.js";

const requireAuth = process.argv.includes("--require-auth");
const refresh = process.argv.includes("--refresh");
const config = readRuntimeConfig();
const status = await getAuthStatusSummary(config);

console.log(JSON.stringify(status, null, 2));

if (!status.modelExists) {
  console.error(`Model missing: ${FIXED_PROVIDER}/${config.model}`);
  process.exit(2);
}

if (refresh) {
  try {
    await resolveModelAuth(config);
    console.log("Refresh/auth probe: ok");
  } catch (error) {
    console.error(`Refresh/auth probe: ${error instanceof Error ? error.message : String(error)}`);
    process.exit(3);
  }
}

if (requireAuth && !status.configured) {
  console.error("Auth missing. Run: bun run --cwd helper auth:login");
  process.exit(1);
}
