import { Router } from "express";
import { getStats } from "../database.js";

const router = Router();

router.get("/", async (_req, res) => {
  try {
    const stats = await getStats();
    const uptime = process.uptime();

    res.json({
      status: "ok",
      uptime: `${uptime.toFixed(0)} seconds`,
      totalRequests: stats.total,
      mostUsedEndpoint: stats.mostUsed?.endpoint ?? null,
      mostUsedCount: stats.mostUsed?.count ?? 0,
    });
  } catch (error) {
    console.error("Error en /api/health:", error);
    res.status(500).json({ error: "Internal error in health." });
  }
});

export default router;
