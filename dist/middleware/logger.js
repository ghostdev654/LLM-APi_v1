import chalk from "chalk";
import { logRequest } from "../database.js";
export function requestLogger(req, _res, next) {
    try {
        logRequest(req.path);
        console.log(chalk.blue("➡️ Request:"), chalk.green(req.method), chalk.yellow(req.path), chalk.gray(`IP: ${req.ip}\n`));
    }
    catch (error) {
        console.error(chalk.red("Error al registrar request:"), error);
    }
    next();
}
