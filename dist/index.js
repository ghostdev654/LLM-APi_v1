import express from "express";
import rateLimit from "express-rate-limit";
import chatRouter from "./routes/chat.js";
import completionRouter from "./routes/completion.js";
import embeddingsRouter from "./routes/embeddings.js";
import healthRouter from "./routes/health.js";
import adminRouter from "./routes/admin.js";
import { requestLogger } from "./middleware/logger.js";
import { validateInput } from "./middleware/validate.js";
import { PORT } from "./config.js";
import chalk from "chalk";
const app = express();
app.set("trust proxy", 1);
app.use(express.json());
app.use(requestLogger);
app.use(validateInput);
// Rate limiting - 100 requests per 15 minutes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: "Too many requests, please try again later." }
});
app.use(limiter);
// Endpoints
app.use("/api/chat", chatRouter);
app.use("/api/completion", completionRouter);
app.use("/api/embeddings", embeddingsRouter);
app.use("/api/health", healthRouter);
app.use("/api/admin", adminRouter);
app.listen(PORT, () => {
    console.log(chalk.green(`\n🚀 Server running on port ${PORT}\n`));
});
