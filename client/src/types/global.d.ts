export {};

declare global {
  interface IEnv {
    key: string;
    value: string;
  }

  interface IProjectForm {
    name: string;
    repository: string;
    preBuildCommand: string;
    buildCommand: string;
    startCommand: string;
    env: IEnv[];
  }

  interface IProject extends IProjectForm {
    _id: string;
    status: "created" | "building" | "running" | "failed";
    buildHistory: {
      status: string;
      timestamp: Date;
    }[];
    runningProcess: number | null;
  }
}
