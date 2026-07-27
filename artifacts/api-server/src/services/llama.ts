import { fileURLToPath } from "node:url";
import path from "node:path";
import { getLlama, LlamaChatSession } from "node-llama-cpp";
import { logger } from "../lib/logger.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MODEL_PATH = path.resolve(
  process.cwd(),
  "models",
  "smollm2-135m-instruct-q2_k.gguf"
);

const DEFAULT_TEMPERATURE = Number(process.env["DEFAULT_TEMPERATURE"] ?? 0.4);
const DEFAULT_MAX_TOKENS = Number(process.env["DEFAULT_MAX_TOKENS"] ?? 350);

// Module-level singletons — initialized once on first use.
let _session: LlamaChatSession | null = null;

async function getSession(): Promise<LlamaChatSession> {
  if (_session) return _session;

  logger.info({ modelPath: MODEL_PATH }, "Loading LLM model...");
  const llama = await getLlama();
  const model = await llama.loadModel({ modelPath: MODEL_PATH });
  const context = await model.createContext();
  _session = new LlamaChatSession({ contextSequence: context.getSequence() });
  logger.info("LLM model loaded successfully");
  return _session;
}

export async function runChatCompletion(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const session = await getSession();
  const combinedPrompt = `${systemPrompt}\n\n${userPrompt}`;
  return session.prompt(combinedPrompt, {
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: DEFAULT_MAX_TOKENS,
  });
}

export async function runCompletion(prompt: string): Promise<string> {
  const session = await getSession();
  return session.prompt(prompt, {
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: DEFAULT_MAX_TOKENS,
  });
}
