/**
 * This file is part of the LLM-API project, solely developed and maintained by GhostDev.
 * https://github.com/ghostdev654/LLM-APi_v1
 *
 * All rights reserved.
 *
 * - You are NOT allowed to copy, rewrite, modify, redistribute, or reuse this file in any form.
 * - You are NOT allowed to claim this file or any part of this project as your own.
 * - This credit notice must NOT be removed or altered.
 * - This file may ONLY be used within the LLM-API v1 project.
 */

import { fileURLToPath } from "url";
import path from "path";
import { getLlama, LlamaChatSession } from "node-llama-cpp";
import { DEFAULT_TEMPERATURE, DEFAULT_MAX_TOKENS } from "../config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const llama = await getLlama();
const model = await llama.loadModel({
  modelPath: path.join(__dirname, "..", "models", "smollm2-135m-instruct-q2_k.gguf")
});
const context = await model.createContext();
const session = new LlamaChatSession({
  contextSequence: context.getSequence()
});

export async function runChatCompletion(systemPrompt: string, userPrompt: string) {
  const prompt = `${systemPrompt}\n\n${userPrompt}`;
  const response = await session.prompt(prompt, {
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: DEFAULT_MAX_TOKENS
  });
  return response;
}

export async function runCompletion(prompt: string) {
  const response = await session.prompt(prompt, {
    temperature: DEFAULT_TEMPERATURE,
    maxTokens: DEFAULT_MAX_TOKENS
  });
  return response;
}