import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminUserModel from "models/Admin";
import config from "config/config";
import LoggerService from "services/LoggerService";

const loggerService = LoggerService.getInstance();

const adminUserSchema = z.object({
  name: z.string().min(4),
  email: z.string().min(4),
  username: z.string().min(4),
  password: z.string().min(8),
});

const adminUserLoginSchema = z.object({
  username: z.string().min(4),
  password: z.string().min(8),
});

export const signup = async (req: Request, res: Response) => {
  try {
    const payload = adminUserSchema.parse(req.body);

    const existingAdminUser = await AdminUserModel.findOne({});

    if (existingAdminUser) {
      return res.status(400).json({ error: "Admin user already exists" });
    }

    const adminUser = new AdminUserModel(payload);

    await adminUser.save();
    return res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/adminControllers.ts",
      function: "signup",
    });
    res.status(400).json({ error: "Unable to create admin user" });
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const payload = adminUserLoginSchema.parse(req.body);

    const user = await AdminUserModel.findOne({ username: payload.username });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const userId = user._id.toString();
    const token = jwt.sign({ userId }, config.server.jwt.secret!);

    res.status(200).json({ token });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/adminControllers.ts",
      function: "signin",
    });
    res.status(400).json({ error: "Invalid payload" });
  }
};
