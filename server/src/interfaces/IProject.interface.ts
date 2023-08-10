import { Document } from "mongoose";

interface IProject extends Document {
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

export default IProject;
