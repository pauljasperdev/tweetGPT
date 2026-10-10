import { readRuntimeConfig } from "./config.js";
import { createTweetGptServer } from "./server.js";

const config = readRuntimeConfig();
const server = createTweetGptServer({ config });

server.listen(config.port, config.host, () => {
  console.log(
    `TweetGPT helper listening on http://${config.host}:${config.port} mode=${config.mode} model=${config.provider}/${config.model}`,
  );
});

function shutdown(signal: NodeJS.Signals): void {
  console.log(`Received ${signal}; shutting down TweetGPT helper.`);
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 5_000).unref();
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
