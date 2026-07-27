import { Router, type IRouter } from "express";
import { runChatCompletion } from "../services/llama.js";

const router: IRouter = Router();

router.post("/chat", async (req, res): Promise<void> => {
  const { systemPrompt, userPrompt } = req.body as {
    systemPrompt?: unknown;
    userPrompt?: unknown;
  };

  if (typeof systemPrompt !== "string" || typeof userPrompt !== "string") {
    res.status(400).json({ error: "systemPrompt and userPrompt are required strings." });
    return;
  }

  const response = await runChatCompletion(systemPrompt, userPrompt);
  res.json({ response });
});

export default router;
