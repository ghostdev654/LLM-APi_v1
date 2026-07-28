import { Router } from "express";

const router = Router();

const endpointRows = [
  {
    method: "POST",
    path: "/api/chat",
    description: "Genera una respuesta usando un mensaje de sistema y uno de usuario.",
    body: '{ "systemPrompt": "Responde en español.", "userPrompt": "¿Cómo estás?" }',
    response: '{ "response": "Estoy bien, gracias." }',
  },
  {
    method: "POST",
    path: "/api/completion",
    description: "Completa un texto usando el modelo local.",
    body: '{ "prompt": "Completa: Buenos días, " }',
    response: '{ "response": "¿cómo estás?" }',
  },
  {
    method: "POST",
    path: "/api/embeddings",
    description: "Convierte un texto en un vector numérico.",
    body: '{ "text": "Texto para convertir en embedding." }',
    response: '{ "embedding": [0.0123, -0.0456, "..."] }',
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Devuelve el estado, uptime y estadísticas básicas del servidor.",
    body: "Sin body",
    response: '{ "status": "ok", "uptime": "..." }',
  },
  {
    method: "POST",
    path: "/api/admin/reset-stats",
    description: "Reinicia las estadísticas. Requiere el token de administrador.",
    body: '{ "token": "TU_ADMIN_TOKEN" }',
    response: '{ "status": "ok", "message": "Estadísticas reiniciadas" }',
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

router.get("/", (_req, res) => {
  const baseUrl = `${_req.protocol}://${_req.get("host")}`;
  const rows = endpointRows
    .map(
      (endpoint) => `
        <article class="endpoint">
          <div class="endpoint-header">
            <span class="method ${endpoint.method.toLowerCase()}">${endpoint.method}</span>
            <code>${escapeHtml(endpoint.path)}</code>
          </div>
          <p>${escapeHtml(endpoint.description)}</p>
          <div class="examples">
            <div><strong>Body</strong><pre>${escapeHtml(endpoint.body)}</pre></div>
            <div><strong>Respuesta</strong><pre>${escapeHtml(endpoint.response)}</pre></div>
          </div>
        </article>`
    )
    .join("");

  res.type("html").send(`<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>LLM API · Documentación</title>
  <style>
    :root { color-scheme: dark; --bg: #0b1020; --panel: #121a2d; --line: #263452; --text: #e8edf8; --muted: #9aa8c4; --accent: #72a7ff; --green: #53d39b; }
    * { box-sizing: border-box; }
    body { margin: 0; background: radial-gradient(circle at top, #162344, var(--bg) 48%); color: var(--text); font: 16px/1.6 system-ui, -apple-system, sans-serif; }
    main { width: min(100% - 32px, 980px); margin: 0 auto; padding: 64px 0; }
    .hero { margin-bottom: 36px; }
    .eyebrow { color: var(--accent); font-weight: 700; letter-spacing: .08em; text-transform: uppercase; font-size: .78rem; }
    h1 { font-size: clamp(2.2rem, 6vw, 4rem); line-height: 1.05; margin: 10px 0 14px; }
    h2 { margin-top: 42px; }
    p { color: var(--muted); }
    .hero p { max-width: 680px; font-size: 1.1rem; }
    .base-url { display: inline-block; border: 1px solid var(--line); background: #0d1528; border-radius: 10px; padding: 10px 14px; color: var(--green); }
    .endpoint { background: rgba(18, 26, 45, .9); border: 1px solid var(--line); border-radius: 14px; padding: 22px; margin: 18px 0; box-shadow: 0 10px 30px #0002; }
    .endpoint-header { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
    .method { border-radius: 6px; padding: 2px 8px; font-size: .75rem; font-weight: 800; letter-spacing: .05em; }
    .get { color: #07150f; background: var(--green); } .post { color: #10172a; background: var(--accent); }
    code { color: #dbe7ff; font-size: 1rem; }
    .examples { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
    strong { color: #c6d3ee; font-size: .85rem; }
    pre { overflow-x: auto; background: #080d19; border: 1px solid #1e2940; border-radius: 8px; padding: 12px; color: #b9c9e8; font-size: .82rem; white-space: pre-wrap; }
    footer { color: var(--muted); margin-top: 42px; font-size: .9rem; }
    @media (max-width: 650px) { main { padding: 38px 0; } .examples { grid-template-columns: 1fr; } .endpoint { padding: 16px; } }
  </style>
</head>
<body>
  <main>
    <header class="hero">
      <div class="eyebrow">API local de inferencia</div>
      <h1>LLM API</h1>
      <p>API REST para chat, completions y embeddings con un modelo local optimizado para responder en español.</p>
      <div class="base-url"><code>Base URL: ${escapeHtml(baseUrl)}</code></div>
    </header>
    <h2>Endpoints</h2>
    ${rows}
    <h2>Ejemplo con cURL</h2>
    <pre>curl -X POST ${escapeHtml(baseUrl)}/api/chat \\
  -H "Content-Type: application/json" \\
  -d '{"systemPrompt":"Responde en español.","userPrompt":"¿Cuál es la capital de España?"}'</pre>
    <footer>Las solicitudes POST deben enviar JSON con el header <code>Content-Type: application/json</code>.</footer>
  </main>
</body>
</html>`);
});

export default router;