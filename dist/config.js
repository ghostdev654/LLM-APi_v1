import dotenv from "dotenv";
dotenv.config();
export const ADMIN_TOKEN = process.env.ADMIN_TOKEN || "default-token";
export const PORT = process.env.PORT || "3000";
// Model defaults
export const DEFAULT_TEMPERATURE = 0.4;
export const DEFAULT_MAX_TOKENS = 350;
