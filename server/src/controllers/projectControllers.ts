import { Request, Response } from "express";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AdminUserModel from "models/Admin";
import config from "config/config";
import LoggerService from "services/LoggerService";
import { checkRepoStatus } from "helpers/git";
import { createProject } from "models/helpers/projectModelHelpers";
import { spawn } from "child_process";
import PublishService from "services/PublishService";

const loggerService = LoggerService.getInstance();

const createProjectSchema = z.object({
  repository: z.string().min(4),
  preBuildCommand: z.string().min(3),
  buildCommand: z.string().min(3),
  startCommand: z.string().min(3),
  env: z.array(
    z.object({
      key: z.string().min(1),
      value: z.string().min(1),
    })
  ),
});

export const create = async (req: Request, res: Response) => {
  try {
    const payload = createProjectSchema.parse(req.body);
    const isRepoAvailable = await checkRepoStatus(payload.repository);

    if (!isRepoAvailable) {
      return res.status(404).json({ error: "Unable to find the repo" });
    }

    const repoSplit = payload.repository.split("/");
    const folderName = repoSplit[repoSplit.length - 1].replace(".git", "");

    const project = await createProject(
      payload.repository,
      payload.preBuildCommand,
      payload.buildCommand,
      payload.startCommand,
      payload.env
    );

    const publishService = new PublishService(project._id);
    publishService.pullAndBuild();

    return res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/projectControllers.ts",
      function: "create",
    });
    res.status(400).json({ error: "Unable to create project" });
  }
};
