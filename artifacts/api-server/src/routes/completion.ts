import { Router, type IRouter } from "express";
import { runCompletion } from "../services/llama.js";

const router: IRouter = Router();

router.post("/completion", async (req, res): Promise<void> => {
  const { prompt } = req.body as { prompt?: unknown };

  if (typeof prompt !== "string" || prompt.trim() === "") {
    res.status(400).json({ error: "Missing or invalid prompt." });
    return;
  }

  const response = await runCompletion(prompt);
  res.json({ response });
});

export default router;
