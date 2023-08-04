import { Request, Response, NextFunction } from "express";
import LoggerService from "services/LoggerService";

const loggerService = LoggerService.getInstance();

const routeLoggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  loggerService.log(`[ROUTE] ${req.method} ${req.url}`);
  next();
};

export default routeLoggerMiddleware;
