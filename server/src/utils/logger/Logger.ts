import colors from "colors";
import { getFormattedNow } from "helpers/time";
import LoggerBase from "utils/logger/LoggerBase";

const getTime = () => colors.blue(getFormattedNow());

class Logger extends LoggerBase {
  constructor() {
    super("Logger");
  }

  log(message: string): void {
    console.log(`[${getTime()}] [${this.name}] [LOG] ${colors.green(message)}`);
  }

  error(message: string, source: { filename: string; function: string }): void {
    console.error(
      `[${getTime()}] [${this.name}] [ERROR] At ${colors.yellow(
        source.filename
      )} in ${colors.yellow(source.function)}, Message: ${colors.red(message)}`
    );
  }
}

export default Logger;
