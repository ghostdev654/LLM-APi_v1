import { Router, type Request, type Response } from "express";
import { runEmbeddings } from "../services/embeddings.js";

const router = Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const { text } = req.body as { text?: unknown };

    if (typeof text !== "string" || text.trim() === "") {
      res.status(400).json({ error: "Missing or invalid text." });
      return;
    }

    const embedding = await runEmbeddings(text);
    res.json({ embedding });
  } catch (error) {
    console.error("Error en /api/embeddings:", error);
    res.status(500).json({ error: "Internal error in embeddings." });
  }
});

export default router;
