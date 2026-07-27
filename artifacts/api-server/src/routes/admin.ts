import { Router, type IRouter } from "express";
import { resetStats } from "../lib/database.js";

const ADMIN_TOKEN = process.env["ADMIN_TOKEN"] ?? "default-token";

const router: IRouter = Router();

router.post("/admin/reset-stats", (req, res): void => {
  const { token } = req.body as { token?: unknown };

  if (!token) {
    res.status(400).json({ error: "Missing admin token." });
    return;
  }

  if (token !== ADMIN_TOKEN) {
    res.status(403).json({ error: "Invalid token." });
    return;
  }

  resetStats();
  res.json({ status: "ok", message: "Stats reset successfully." });
});

export default router;
