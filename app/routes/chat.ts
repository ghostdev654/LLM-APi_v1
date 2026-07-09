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

import { Router } from "express";
import { runChatCompletion } from "../services/llama";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { systemPrompt, userPrompt } = req.body;

    if (!systemPrompt || !userPrompt) {
      return res.status(400).json({ error: "systemPrompt or userPrompt missing." });
    }

    const response = await runChatCompletion(
      systemPrompt,
      userPrompt
    );

    res.json({ response });
  } catch (error) {
    console.error("Error en /api/chat:", error);
    res.status(500).json({ error: "Internal error in chat." });
  }
});

export default router;