import { fileURLToPath } from "node:url";
import path from "node:path";
import { getLlama } from "node-llama-cpp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const MODEL_PATH = path.join(
  __dirname,
  "..",
  "models",
  "llama-3.2-1b-instruct-q4_k_m.gguf"
);

let _embeddingContext = null;

async function getEmbeddingContext() {
  if (_embeddingContext) return _embeddingContext;

  console.log("[Embeddings] Loading model...");
  const llama = await getLlama();
  const model = await llama.loadModel({ modelPath: MODEL_PATH });
  _embeddingContext = await model.createEmbeddingContext();
  console.log("[Embeddings] Model loaded");
  return _embeddingContext;
}

export async function runEmbeddings(text) {
  const ctx = await getEmbeddingContext();
  const result = await ctx.getEmbeddingFor(text);
  return [...result.vector];
}
