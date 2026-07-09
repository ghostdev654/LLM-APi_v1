/*
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

import chalk from "chalk";
import { logRequest } from "../database.js";

export function requestLogger(req, res, next) {
  try {
    logRequest(req.path);

    console.log(
      chalk.blue("➡️ Request:"),
      chalk.green(req.method),
      chalk.yellow(req.path),
      chalk.gray(`IP: ${req.ip}\n`)
    );
  } catch (error) {
    console.error(chalk.red("Error al registrar request:"), error);
  }
  next();
}