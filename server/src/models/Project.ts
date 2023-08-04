// adminModel.ts

import mongoose, { Schema, Document } from "mongoose";

interface Project extends Document {
  repository: string;
  preBuildCommand: string;
  buildCommand: string;
  startCommand: string;
}

const ProjectSchema: Schema = new Schema({
  repository: { type: String, required: true },
  preBuildCommand: { type: String, required: true },
  buildCommand: { type: String, required: true },
  startCommand: { type: String, required: true },
});

const ProjectrModel = mongoose.model<Project>("Project", ProjectSchema);

export default ProjectrModel;
