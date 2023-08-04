import Logger from "utils/logger/Logger";

class LoggerService {
  private static instance: LoggerService;
  private loggers: Logger[] = [];

  private constructor() {}

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  public registerLogger(logger: Logger): void {
    this.loggers.push(logger);
  }

  public log(message: string): void {
    for (const logger of this.loggers) {
      logger.log(message);
    }
  }

  public error(message: string): void {
    for (const logger of this.loggers) {
      logger.error(message);
    }
  }
}

export default LoggerService;
