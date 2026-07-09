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

import dotenv from "dotenv";
dotenv.config();

export const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "default-token";
export const PORT = process.env.PORT || 3000;

// Configuración de modelos
export const DEFAULT_TEMPERATURE = 0.40;
export const DEFAULT_MAX_TOKENS = 350;