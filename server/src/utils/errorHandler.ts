import { Request, Response, NextFunction } from "express";
import LoggerService from "services/LoggerService";
const loggerService = LoggerService.getInstance();

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;

  if (err.statusCode) {
    statusCode = err.statusCode;
  }

  loggerService.error(err, {
    filename: "utils/errorHandler.ts",
    function: "errorHandler",
  });

  return res.status(statusCode).json({ error: err.message });
};
