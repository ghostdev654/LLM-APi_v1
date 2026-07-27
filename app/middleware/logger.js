import chalk from "chalk";
import { logRequest } from "../database.js";

export function requestLogger(req, _res, next) {
  logRequest(req.path).catch(() => {});
  console.log(
    chalk.blue("➡️ Request:"),
    chalk.green(req.method),
    chalk.yellow(req.path),
    chalk.gray(`IP: ${req.ip}\n`)
  );
  next();
}
