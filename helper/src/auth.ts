import { ModelRuntime } from "@earendil-works/pi-coding-agent";
import type { Model, Api } from "@earendil-works/pi-ai";
import { HelperError } from "./errors.js";
import { FIXED_PROVIDER, type RuntimeConfig } from "./config.js";

export type AuthModelResolution = {
  runtime: ModelRuntime;
  model: Model<Api>;
};

export type AuthStatusSummary = {
  authPath: string | undefined;
  provider: typeof FIXED_PROVIDER;
  model: string;
  modelExists: boolean;
  configured: boolean;
  source?: string;
  registryError?: string;
};

export function createModelRuntime(authPath?: string): Promise<ModelRuntime> {
  return ModelRuntime.create(authPath ? { authPath } : {});
}

export async function getAuthStatusSummary(config: Pick<RuntimeConfig, "authPath" | "model">): Promise<AuthStatusSummary> {
  const runtime = await createModelRuntime(config.authPath);
  const status = runtime.getProviderAuthStatus(FIXED_PROVIDER);

  return {
    authPath: config.authPath,
    provider: FIXED_PROVIDER,
    model: config.model,
    modelExists: Boolean(runtime.getModel(FIXED_PROVIDER, config.model)),
    configured: status.configured,
    source: status.source,
    registryError: runtime.getError(),
  };
}

export async function resolveModelAuth(config: Pick<RuntimeConfig, "authPath" | "model">): Promise<AuthModelResolution> {
  const runtime = await createModelRuntime(config.authPath);

  const model = runtime.getModel(FIXED_PROVIDER, config.model);
  if (!model) {
    throw new HelperError("model_missing", `Model not found: ${FIXED_PROVIDER}/${config.model}`, 502);
  }

  let auth: Awaited<ReturnType<ModelRuntime["getAuth"]>>;
  try {
    auth = await runtime.getAuth(model);
  } catch (error) {
    throw new HelperError(
      "auth_missing",
      `Codex auth missing or invalid: ${error instanceof Error ? error.message : String(error)}`,
      401,
    );
  }
  if (!auth) {
    throw new HelperError(
      "auth_missing",
      "Codex auth missing. Run: bun run --cwd helper auth:login",
      401,
    );
  }

  return { runtime, model };
}
