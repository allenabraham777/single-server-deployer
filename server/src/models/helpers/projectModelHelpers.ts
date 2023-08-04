import Project from "models/Project";

export const createProject = async (
  repository: string,
  preBuildCommand: string,
  buildCommand: string,
  startCommand: string
) => {
  const newProject = new Project({
    repository,
    preBuildCommand,
    buildCommand,
    startCommand,
  });
  const project = await newProject.save();
  console.log({ project });
};
