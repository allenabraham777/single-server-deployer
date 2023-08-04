abstract class LoggerBase {
  protected name: string;

  constructor(name: string) {
    this.name = name;
  }

  abstract log(message: string): void;

  abstract error(
    message: string,
    source: { filename: string; function: string }
  ): void;
}

export default LoggerBase;
