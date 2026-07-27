import { Router } from "express";
import { runChatCompletion } from "../services/llama.js";
const router = Router();
router.post("/", async (req, res) => {
    try {
        const { systemPrompt, userPrompt } = req.body;
        if (typeof systemPrompt !== "string" || typeof userPrompt !== "string") {
            res.status(400).json({ error: "systemPrompt and userPrompt are required strings." });
            return;
        }
        const response = await runChatCompletion(systemPrompt, userPrompt);
        res.json({ response });
    }
    catch (error) {
        console.error("Error en /api/chat:", error);
        res.status(500).json({ error: "Internal error in chat." });
    }
});
export default router;
