import express, { Request, Response, Application } from "express";
import { errorHandler } from "utils/errorHandler";
import Logger from "utils/logger/Logger";
import FileLogger from "utils/logger/FileLogger";
import LoggerService from "services/LoggerService";
import adminRoutes from "routes/adminRoutes";
import projectRoutes from "routes/projectRoutes";
import routeLoggerMiddleware from "middlewares/routeLogger";
import path from "path";
import config from "config/config";

const app: Application = express();

const fileLoggerPath = path.join(config.server.rootDir, "server.log");

const logger = new Logger();
const fileLogger = new FileLogger(fileLoggerPath);

const loggerService = LoggerService.getInstance();

loggerService.registerLogger(logger);
loggerService.registerLogger(fileLogger);
loggerService.log(`DIRNAME ${fileLoggerPath}`);

app.use(routeLoggerMiddleware);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server running successfully" });
});

app.use("/admin", adminRoutes);
app.use("/project", projectRoutes);

app.use(errorHandler);

export default app;
