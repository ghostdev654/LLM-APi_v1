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

import express from "express";
import rateLimit from "express-rate-limit";
import chatRouter from "./routes/chat";
import completionRouter from "./routes/completion";
import embeddingsRouter from "./routes/embeddings";
import healthRouter from "./routes/health";
import adminRouter from "./routes/admin";
import { requestLogger } from "./middleware/logger";
import { validateInput } from "./middleware/validate";
import { PORT } from "./config";
import chalk from "chalk";

const app = express();
app.set("trust proxy", 1);
app.use(express.json());

app.use(requestLogger);
app.use(validateInput);

// Rate limiting - Added on 08/07/2026 - 21:57 ARG
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Demasiadas solicitudes, intenta más tarde." }
});
app.use(limiter);

// Endpoints  - Added on 07/07/2026 - 22:15 ARG
app.use("/api/chat", chatRouter);
app.use("/api/completion", completionRouter);
app.use("/api/embeddings", embeddingsRouter);
app.use("/api/health", healthRouter);
app.use("/api/admin", adminRouter);

app.listen(PORT, () => {
  console.log(
    chalk.green(`\n🚀 Server running on port ${PORT}\n`)
  );
});