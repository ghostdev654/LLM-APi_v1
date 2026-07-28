import { getLlama } from "node-llama-cpp";
import { ensureModel } from "./model.js";

let _embeddingContext = null;

async function getEmbeddingContext() {
  if (_embeddingContext) return _embeddingContext;

  console.log("[Embeddings] Loading model...");
  const modelPath = await ensureModel();
  const llama = await getLlama();
  const model = await llama.loadModel({ modelPath });
  _embeddingContext = await model.createEmbeddingContext();
  console.log("[Embeddings] Model loaded");
  return _embeddingContext;
}

export async function runEmbeddings(text) {
  const ctx = await getEmbeddingContext();
  const result = await ctx.getEmbeddingFor(text);
  return [...result.vector];
}
