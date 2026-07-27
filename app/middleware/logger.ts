import chalk from "chalk";
import type { Request, Response, NextFunction } from "express";
import { logRequest } from "../database.js";

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
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
