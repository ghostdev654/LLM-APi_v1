# LLM API v1

## 📌 Descripción
LLM API v1 es un servidor Express modular que expone endpoints para interactuar con modelos de lenguaje locales (basados en `node-llama-cpp`). Está diseñado para ser **simple, extensible y seguro**, con middlewares de validación, logging y rate limiting.

---



## 🚀 Cómo funciona el proyecto
1. **Carga del modelo**: al iniciar, se carga un archivo `.gguf` desde la carpeta `models/` usando `node-llama-cpp`.  
2. **Contexto y sesión**: se crea un contexto de chat que permite enviar prompts y recibir respuestas.  
3. **Routers de API**: cada endpoint (`/api/chat`, `/api/completion`, `/api/embeddings`, `/api/health`, `/api/admin`) tiene su propio router modular.  
4. **Middlewares**: validan la entrada, registran las solicitudes en SQLite y aplican rate limiting.  
5. **Respuestas JSON**: todas las respuestas del modelo y del servidor se devuelven en formato JSON.  
---



## 📡 Endpoints principales
- **Chat** → recibe `systemPrompt` y `userPrompt`.  
- **Completion** → recibe un único `prompt`.  
- **Embeddings** → devuelve vectores numéricos.  
- **Health** → estado del servidor y métricas.  
- **Admin** → reinicio de estadísticas con token.  

---



## 📂 Estructura del proyecto
```
app/
 ├── index.ts          # Punto de entrada del servidor
 ├── routes/           # Routers de cada endpoint
 ├── services/         # Lógica de integración con Llama
 ├── middleware/       # Validación y logging
 ├── models/           # Archivos GGUF del modelo
 └── database.ts       # Registro de métricas en SQLite
```



---

## ⚙️ Configuración
1. Clonar el repositorio:
   ```bash
   git clone https://github.com/ghostdev654/LLM-APi_v1.git
   cd LLM-APi_v1
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables en `.env`:
   ```env
   PORT=3000
   DEFAULT_TEMPERATURE=0.7
   DEFAULT_MAX_TOKENS=256
   ADMIN_TOKEN=tu_token_seguro
   ```
4. Ejecutar en modo desarrollo:
   ```bash
   npm run dev
   ```

---

## 📡 Ejemplos de uso
### Completion
```bash
curl -s http://localhost:3000/api/completion \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hola, ¿qué es MRUV en física?"}' | jq
```



### Chat
```bash
curl -s http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"systemPrompt":"Eres un profesor de física","userPrompt":"Explica MRU vs MRUV"}' | jq
```

### Health
```bash
curl -s http://localhost:3000/api/health | jq
```

---



## 🔒 Seguridad
- Middleware de validación en todas las solicitudes POST.  
- Rate limiting activo para evitar abuso.  
- Endpoint `/api/admin` protegido con token.  

---



## 📈 Métricas
El servidor registra:  
- Total de requests.  
- Endpoint más usado.  
- Uptime desde el último arranque.  

---



## 🤝 Contribución
1. Haz un fork del repositorio.  
2. Crea una rama de feature: `git checkout -b feature/nueva-funcionalidad`.  
3. Haz commit de tus cambios: `git commit -m "Agrega nueva funcionalidad"`.  
4. Haz push a la rama: `git push origin feature/nueva-funcionalidad`.  
5. Abre un Pull Request.  

---



## 📜 Licencia
Este proyecto se distribuye bajo licencia MIT.  