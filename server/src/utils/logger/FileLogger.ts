import fs from "fs";
import { getFormattedNow } from "helpers/time";
import LoggerBase from "utils/logger/LoggerBase";

class FileLogger extends LoggerBase {
  private filePath: string;

  constructor(filePath: string) {
    super("File Logger");
    this.filePath = filePath;
  }

  log(message: string): void {
    fs.appendFileSync(
      this.filePath,
      `[${getFormattedNow()}] [${this.name}] [LOG] ${message}\n`
    );
  }

  error(message: string, source: { filename: string; function: string }): void {
    fs.appendFileSync(
      this.filePath,
      `[${getFormattedNow()}] [${this.name}] [ERROR] At ${source.filename} in ${
        source.function
      }, Message: ${message}\n`
    );
  }
}

export default FileLogger;
