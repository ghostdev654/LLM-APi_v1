import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  getLlama,
  LlamaChatSession,
  type LlamaContext,
} from "node-llama-cpp";
import { DEFAULT_TEMPERATURE, DEFAULT_MAX_TOKENS } from "../config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MODEL_PATH = path.join(
  __dirname,
  "..",
  "models",
  "smollm2-135m-instruct-q2_k.gguf"
);

// Lazy singleton — initialized once on first request
let _session: LlamaChatSession | null = null;

async function getSession(): Promise<LlamaChatSession> {
  if (_session) return _session;

  console.log("[LLM] Loading model...");
  const llama = await getLlama();
  const model = await llama.loadModel({ modelPath: MODEL_PATH });
  const context: LlamaContext = await model.createContext();
  _session = new LlamaChatSession({
    contextSequence: context.getSequence(),
  });
  console.log("[LLM] Model loaded successfully");
  return _session;
}

export async function runChatCompletion(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const session = await getSession();
  const prompt = `${systemPrompt}\n\n${userPrompt}`;
  return session.prompt(prompt, {
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
