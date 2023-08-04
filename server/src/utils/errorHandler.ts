import { Request, Response, NextFunction } from "express";

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

  console.error(err);

  return res.status(statusCode).json({ error: err.message });
};
