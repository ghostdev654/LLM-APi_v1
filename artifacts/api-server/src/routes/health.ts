import { Router, type IRouter } from "express";
import { getStats } from "../lib/database.js";

const router: IRouter = Router();

router.get("/healthz", (_req, res): void => {
  const stats = getStats();
  res.json({
    status: "ok",
    uptime: `${process.uptime().toFixed(0)} seconds`,
    totalRequests: stats.total,
    mostUsedEndpoint: stats.mostUsed?.endpoint ?? null,
    mostUsedCount: stats.mostUsed?.count ?? 0,
  });
});

export default router;
