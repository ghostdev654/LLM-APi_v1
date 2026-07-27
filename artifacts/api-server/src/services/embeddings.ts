import path from "node:path";
import { getLlama } from "node-llama-cpp";
import { logger } from "../lib/logger.js";

const MODEL_PATH = path.resolve(
  process.cwd(),
  "models",
  "smollm2-135m-instruct-q2_k.gguf"
);

type LlamaEmbeddingContext = Awaited<
  ReturnType<Awaited<ReturnType<typeof getLlama>>["loadModel"]>["createEmbeddingContext"]
>;

let _embeddingContext: LlamaEmbeddingContext | null = null;

async function getEmbeddingContext(): Promise<LlamaEmbeddingContext> {
  if (_embeddingContext) return _embeddingContext;

  logger.info({ modelPath: MODEL_PATH }, "Loading embedding context...");
  const llama = await getLlama();
  const model = await llama.loadModel({ modelPath: MODEL_PATH });
  _embeddingContext = await model.createEmbeddingContext();
  logger.info("Embedding context loaded");
  return _embeddingContext;
}

export async function runEmbeddings(text: string): Promise<number[]> {
  const ctx = await getEmbeddingContext();
  const result = await ctx.getEmbeddingFor(text);
  return result.vector;
}
