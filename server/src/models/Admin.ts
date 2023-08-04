// adminModel.ts

import mongoose, { Schema, Document, CallbackError } from "mongoose";
import bcrypt from "bcrypt";
import LoggerService from "services/LoggerService";

const loggerService = LoggerService.getInstance();

interface AdminUser extends Document {
  username: string;
  password: string;
}

const AdminUserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

AdminUserSchema.pre<AdminUser>("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: unknown) {
    const error = err as NativeError | CallbackError;
    loggerService.error(`${error}`, {
      filename: "models/Admin.ts",
      function: "AdminUserSchema.pre",
    });
    return next(error);
  }
});

const AdminUserModel = mongoose.model<AdminUser>("AdminUser", AdminUserSchema);

export default AdminUserModel;
