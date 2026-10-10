import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { createModelRuntime } from "./auth.js";
import { FIXED_PROVIDER, readRuntimeConfig } from "./config.js";

const config = readRuntimeConfig();
const runtime = await createModelRuntime(config.authPath);
const rl = readline.createInterface({ input, output });

try {
  console.log(`Starting OAuth login for ${FIXED_PROVIDER}.`);
  if (config.authPath) console.log(`Auth path: ${config.authPath}`);

  await runtime.login(FIXED_PROVIDER, "oauth", {
    notify: (event) => {
      switch (event.type) {
        case "auth_url":
          console.log(event.instructions ?? "Open this URL in your browser to authenticate:");
          console.log(event.url);
          break;
        case "device_code":
          console.log(`Open ${event.verificationUri} and enter the code: ${event.userCode}`);
          break;
        case "info":
        case "progress":
          console.log(event.message);
          break;
      }
    },
    prompt: async (prompt) => {
      if (prompt.type === "select") {
        const options = prompt.options.map((option) => `  ${option.id}: ${option.label}`).join("\n");
        return rl.question(`${prompt.message}\n${options}\n> `, { signal: prompt.signal });
      }
      return rl.question(`${prompt.message}: `, { signal: prompt.signal });
    },
  });

  console.log(`Login complete for ${FIXED_PROVIDER}.`);
} finally {
  rl.close();
}
