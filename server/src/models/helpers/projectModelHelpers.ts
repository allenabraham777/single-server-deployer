import Project from "models/Project";

export const createProject = async (
  repository: string,
  preBuildCommand: string,
  buildCommand: string,
  startCommand: string,
  env: { key: string; value: string }[]
) => {
  const newProject = new Project({
    repository,
    preBuildCommand,
    buildCommand,
    startCommand,
    env,
  });
  const project = await newProject.save();
  return project;
};

export const getProjectById = async (projectId: string) => {
  const project = await Project.findById(projectId);
  return project;
};

export const getAllProjects = async () => {
  const projects = await Project.find();
  return projects;
};
