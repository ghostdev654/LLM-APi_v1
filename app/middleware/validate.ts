import type { Request, Response, NextFunction } from "express";

export function validateInput(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (req.method === "POST" && req.body) {
    const { systemPrompt, userPrompt, prompt, text } = req.body as Record<string, unknown>;
    const content = systemPrompt || userPrompt || prompt || text;

    if (typeof content === "string" && content.length > 5000) {
      res.status(400).json({ error: "Prompt too long." });
      return;
    }
  }
  next();
}
