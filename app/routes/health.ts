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
import { getStats } from "../database";

const router = Router();

router.get("/", (req, res) => {
  try {
    const stats = getStats();
    const uptime = process.uptime();

    res.json({
      status: "ok",
      uptime: `${uptime.toFixed(0)} seconds`,
      totalRequests: stats.total,
      mostUsedEndpoint: stats.mostUsed?.endpoint || null,
      mostUsedCount: stats.mostUsed?.count || 0
    });
  } catch (error) {
    console.error("Error en /api/health:", error);
    res.status(500).json({ error: "Internal error in health." });
  }
});

export default router;