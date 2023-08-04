import { Request, Response, NextFunction } from "express";
import colors from "colors";
import LoggerService from "services/LoggerService";

const loggerService = LoggerService.getInstance();

const routeLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const startTime = new Date();
  const { method, originalUrl } = req;

  res.on("finish", () => {
    const { statusCode } = res;
    const responseTime = `${new Date().getTime() - startTime.getTime()}`;

    let statusWithColor: string = `${statusCode}`;

    if (statusCode >= 500) {
      statusWithColor = colors.yellow(statusWithColor);
    } else if (statusCode >= 400) {
      statusWithColor = colors.red(statusWithColor);
    } else {
      statusWithColor = colors.green(statusWithColor);
    }

    loggerService.log(
      `[ROUTE] ${statusWithColor}: ${colors.blue(method)} ${colors.cyan(
        originalUrl
      )} ${colors.gray(`${responseTime}ms`)}`
    );
  });
  next();
};

export default routeLoggerMiddleware;
