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
import { runEmbeddings } from "../services/embeddings";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Missing Text." });
    }

    const embedding = await runEmbeddings(text);

    res.json({ embedding });
  } catch (error) {
    console.error("Error en /api/embeddings:", error);
    res.status(500).json({ error: "Internal error in embeddings." });
  }
});

export default router;