export function validateInput(req, res, next) {
  if (req.method === "POST" && req.body) {
    const { systemPrompt, userPrompt, prompt, text } = req.body;
    const content = systemPrompt || userPrompt || prompt || text;

    if (typeof content === "string" && content.length > 5000) {
      res.status(400).json({ error: "Prompt too long." });
      return;
    }
  }
  next();
}
