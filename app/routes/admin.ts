import { Router, type Request, type Response } from "express";
import { resetStats } from "../database.js";
import { ADMIN_TOKEN } from "../config.js";

const router = Router();

router.post("/reset-stats", (req: Request, res: Response): void => {
  try {
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
    res.json({ status: "ok", message: "Estadísticas reiniciadas" });
  } catch (error) {
    console.error("Error en /api/admin/reset-stats:", error);
    res.status(500).json({ error: "Internal error in admin." });
  }
});

export default router;
