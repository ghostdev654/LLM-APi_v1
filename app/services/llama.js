import { getLlama, LlamaChatSession } from "node-llama-cpp";
import { DEFAULT_TEMPERATURE, DEFAULT_MAX_TOKENS } from "../config.js";
import { ensureModel } from "./model.js";

let _session = null;

async function getSession() {
  if (_session) return _session;

  console.log("[LLM] Loading model...");
  const modelPath = await ensureModel();
  const llama = await getLlama();
  const model = await llama.loadModel({ modelPath });
  const context = await model.createContext();
  _session = new LlamaChatSession({
    contextSequence: context.getSequence(),
  });
  console.log("[LLM] Model loaded successfully");
  return _session;
}

export async function runChatCompletion(systemPrompt, userPrompt) {
  const session = await getSession();
  const prompt = `${systemPrompt}\n\n${userPrompt}`;
  return session.prompt(prompt, {
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: DEFAULT_MAX_TOKENS,
  });
}

export async function runCompletion(prompt) {
  const session = await getSession();
  return session.prompt(prompt, {
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: DEFAULT_MAX_TOKENS,
  });
}
