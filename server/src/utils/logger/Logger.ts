import { getFormattedNow } from "helpers/time";
import LoggerBase from "utils/logger/LoggerBase";

class Logger extends LoggerBase {
  constructor() {
    super("Logger");
  }

  log(message: string): void {
    console.log(`[${getFormattedNow()}] [${this.name}] [LOG] ${message}`);
  }

  error(message: string): void {
    console.error(`[${getFormattedNow()}] [${this.name}] [ERROR] ${message}`);
  }
}

export default Logger;
