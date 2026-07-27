import { Router, type IRouter } from "express";
import { runEmbeddings } from "../services/embeddings.js";

const router: IRouter = Router();

router.post("/embeddings", async (req, res): Promise<void> => {
  const { text } = req.body as { text?: unknown };

  if (typeof text !== "string" || text.trim() === "") {
    res.status(400).json({ error: "Missing or invalid text." });
    return;
  }

  const embedding = await runEmbeddings(text);
  res.json({ embedding });
});

export default router;
