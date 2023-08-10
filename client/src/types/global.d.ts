export {};

declare global {
  interface IProject {
    _id: string;
    name: string;
    repository: string;
    preBuildCommand: string;
    buildCommand: string;
    startCommand: string;
    env: {
      key: string;
      value: string;
    }[];
    status: "created" | "building" | "running" | "failed";
    buildHistory: {
      status: string;
      timestamp: Date;
    }[];
    runningProcess: number | null;
  }
}
