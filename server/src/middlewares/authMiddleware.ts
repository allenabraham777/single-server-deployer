// middleware/authMiddleware.ts

import config from "config/config";
import { Request, Response, NextFunction } from "express";
import RequestWithUser from "interfaces/RequestWithUser.interface";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "Authorization token missing" });
  } else {
    try {
      const decoded = jwt.verify(token, config.server.jwt.secret!) as {
        userId: string;
      };

      (req as RequestWithUser).userId = decoded.userId;

      next();
    } catch (error) {
      res.status(403).json({ message: "Invalid or expired token" });
    }
  }
};

export default authMiddleware;
