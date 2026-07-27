import { Router } from "express";
import { runCompletion } from "../services/llama.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (typeof prompt !== "string" || prompt.trim() === "") {
      res.status(400).json({ error: "Missing or invalid prompt." });
      return;
    }

    const response = await runCompletion(prompt);
    res.json({ response });
  } catch (error) {
    console.error("Error en /api/completion:", error);
    res.status(500).json({ error: "Internal error in completion." });
  }
});

export default router;
