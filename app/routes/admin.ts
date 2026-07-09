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
import { resetStats } from "../database";
import { ADMIN_TOKEN } from "../config";

const router = Router();

router.post("/reset-stats", (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Missing admin Token." });
    }

    if (token !== ADMIN_TOKEN) {
      return res.status(403).json({ error: "Invalid Token." });
    }

    resetStats();
    res.json({ status: "ok", message: "Estadísticas reiniciadas" });
  } catch (error) {
    console.error("Error en /api/admin/reset-stats:", error);
    res.status(500).json({ error: "Internal error in admin." });
  }
});

export default router;