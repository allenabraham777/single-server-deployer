import mongoose from "mongoose";
import app from "app";
import LoggerService from "services/LoggerService";
import config from "config/config";

const loggerService = LoggerService.getInstance();

mongoose
  .connect(config.db.connection.url)
  .then(() => {
    loggerService.log("Connected to MongoDB");
    app.listen(config.server.port, () => {
      loggerService.log(`Server is running on port ${config.server.port}`);
    });
  })
  .catch((error) => {
    loggerService.error(`Error connecting to MongoDB: ${error}`, {
      filename: "index.ts",
      function: "mongoose.connect",
    });
    process.exit(0);
  });
