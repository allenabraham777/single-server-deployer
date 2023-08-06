import { Request, Response } from "express";
import { z } from "zod";
import LoggerService from "services/LoggerService";
import { checkRepoStatus } from "helpers/git";
import {
  createProject,
  getAllProjects,
  getProjectById,
} from "models/helpers/projectModelHelpers";
import IProject from "interfaces/IProject.interface";
import Bull from "bull";
import config from "config/config";

const loggerService = LoggerService.getInstance();
const publishQueue = new Bull("publish", {
  redis: {
    host: config.redis.host,
    port: parseInt(config.redis.port!),
    password: config.redis.password,
    username: config.redis.username,
  },
});

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

    const project = await createProject(
      payload.repository,
      payload.preBuildCommand,
      payload.buildCommand,
      payload.startCommand,
      payload.env
    );

    publishQueue.add("pullAndBuild", {
      projectId: project._id.toString(),
    });

    return res.status(201).json({ message: "Project created successfully" });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/projectControllers.ts",
      function: "create",
    });
    res.status(400).json({ error: "Unable to create project" });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const project = await getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    const {
      _id,
      repository,
      preBuildCommand,
      buildCommand,
      startCommand,
      env,
      status,
    } = project;

    const response = {
      _id,
      repository,
      preBuildCommand,
      buildCommand,
      startCommand,
      env,
      status,
    };

    return res
      .status(200)
      .json({ message: "Project found", project: response });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/projectControllers.ts",
      function: "getById",
    });
    res.status(400).json({ error: "Unable to get project" });
  }
};

export const getAll = async (req: Request, res: Response) => {
  try {
    const projects = await getAllProjects();

    const response: Partial<IProject>[] = [];

    projects.forEach((project) => {
      const {
        _id,
        repository,
        preBuildCommand,
        buildCommand,
        startCommand,
        env,
        status,
      } = project;

      response.push({
        _id,
        repository,
        preBuildCommand,
        buildCommand,
        startCommand,
        env,
        status,
      });
    });

    return res
      .status(200)
      .json({ message: "Project found", projects: response });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/projectControllers.ts",
      function: "getAll",
    });
    res.status(400).json({ error: "Unable to get all projects" });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const payload = createProjectSchema.parse(req.body);
    const projectId = req.params.projectId;
    const project = await getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    project.repository = payload.repository;
    project.preBuildCommand = payload.preBuildCommand;
    project.buildCommand = payload.buildCommand;
    project.startCommand = payload.startCommand;
    project.env = payload.env;

    await project.save();

    publishQueue.add("pullAndBuild", { projectId: project._id, project });

    return res
      .status(201)
      .json({ message: "Project updated and redeployed successfully" });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/projectControllers.ts",
      function: "update",
    });
    res.status(400).json({ error: "Unable to update project" });
  }
};

export const redeploy = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const project = await getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    publishQueue.add("redeploy", { projectId: project._id, project });

    return res.status(201).json({ message: "Project redeployed successfully" });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/projectControllers.ts",
      function: "redeploy",
    });
    res.status(400).json({ error: "Unable to redeploy project" });
  }
};

export const stop = async (req: Request, res: Response) => {
  try {
    const projectId = req.params.projectId;
    const project = await getProjectById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    publishQueue.add("stop", { projectId: project._id, project });

    return res.status(201).json({ message: "Project terminated successfully" });
  } catch (error) {
    loggerService.error(`${error}`, {
      filename: "controllers/projectControllers.ts",
      function: "stop",
    });
    res.status(400).json({ error: "Unable to terminate project" });
  }
};
