import Project from "models/Project";

export const createProject = async (
  name: string,
  repository: string,
  preBuildCommand: string,
  buildCommand: string,
  startCommand: string,
  env: { key: string; value: string }[]
) => {
  const newProject = new Project({
    name,
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
  const projects = await Project.find().select("_id name repository status");
  return projects;
};
