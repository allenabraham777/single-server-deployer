// adminModel.ts

import mongoose, { Schema } from "mongoose";
import IProject from "interfaces/IProject.interface";

const EnvSchema: Schema = new Schema({
  key: { type: String },
  value: { type: String },
});

const ProjectSchema: Schema = new Schema({
  name: { type: String, required: true },
  repository: { type: String, required: true },
  preBuildCommand: { type: String, required: true },
  buildCommand: { type: String, required: true },
  startCommand: { type: String, required: true },
  env: [EnvSchema],
  status: {
    type: String,
    enum: ["created", "building", "running", "failed"],
    default: "created",
  },
  buildHistory: [
    {
      status: {
        type: String,
        required: true,
      },
      timestamp: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  runningProcess: {
    type: Number,
    default: null,
  },
});

const ProjectrModel = mongoose.model<IProject>("Project", ProjectSchema);

export default ProjectrModel;
