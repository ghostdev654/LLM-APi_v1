import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const MODEL_FILENAME = "llama-3.2-1b-instruct-q4_k_m.gguf";
export const MODEL_PATH = path.join(__dirname, "..", "models", MODEL_FILENAME);

const MODEL_URL =
  process.env.MODEL_URL ||
  "https://huggingface.co/bartowski/Llama-3.2-1B-Instruct-GGUF/resolve/main/Llama-3.2-1B-Instruct-Q4_K_M.gguf?download=true";

let downloadPromise = null;

export async function ensureModel() {
  if (fs.existsSync(MODEL_PATH)) return MODEL_PATH;
  if (downloadPromise) return downloadPromise;

  downloadPromise = downloadModel();
  try {
    return await downloadPromise;
  } finally {
    downloadPromise = null;
  }
}

async function downloadModel() {
  fs.mkdirSync(path.dirname(MODEL_PATH), { recursive: true });
  const temporaryPath = `${MODEL_PATH}.download`;
  console.log("[Model] GGUF not found; downloading Llama 3.2 1B Q4_K_M...");

  const response = await fetch(MODEL_URL, { redirect: "follow" });
  if (!response.ok || !response.body) {
    throw new Error(`Model download failed: HTTP ${response.status}`);
  }

  const total = Number(response.headers.get("content-length")) || 0;
  let downloaded = 0;
  let lastProgress = -1;
  const file = fs.createWriteStream(temporaryPath);

  try {
    for await (const chunk of response.body) {
      downloaded += chunk.length;
      if (total) {
        const progress = Math.floor((downloaded / total) * 100);
        if (progress >= lastProgress + 10) {
          lastProgress = progress;
          console.log(`[Model] Download progress: ${progress}%`);
        }
      }
      if (!file.write(chunk)) {
        await new Promise((resolve) => file.once("drain", resolve));
      }
    }
    await new Promise((resolve, reject) => {
      file.end((error) => (error ? reject(error) : resolve()));
    });
    fs.renameSync(temporaryPath, MODEL_PATH);
  } catch (error) {
    file.destroy();
    fs.rmSync(temporaryPath, { force: true });
    throw error;
  }

  console.log("[Model] Download complete");
  return MODEL_PATH;
}