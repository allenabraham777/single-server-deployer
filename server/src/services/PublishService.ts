import path from "path";
import fs from "fs";
import simpleGit from "simple-git";
import { getProjectById } from "models/helpers/projectModelHelpers";
import { execSync, spawn } from "child_process";
import IProject from "interfaces/IProject.interface";
import LoggerService from "services/LoggerService";

const loggerService = LoggerService.getInstance();

class PublishService {
  private projectId: string;
  private project: IProject | null = null;
  constructor(projectId: string) {
    this.projectId = projectId;
  }

  async pullAndBuild() {
    try {
      this.project = (await getProjectById(this.projectId)) as IProject;
      if (!this.project) return;

      const homeDir = path.join(__dirname, "..", "..");
      const projectDir = path.join(homeDir, "deployments");
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }

      const repoDir = path.join(projectDir, this.projectId.toString());
      if (fs.existsSync(repoDir)) {
        fs.rmSync(repoDir, { recursive: true });
      }

      await simpleGit(projectDir).clone(this.project.repository);
      const repoSplit = this.project.repository.split("/");
      const folderName = repoSplit[repoSplit.length - 1].replace(".git", "");
      const oldRepoDir = path.join(projectDir, folderName);
      fs.renameSync(oldRepoDir, repoDir);

      process.chdir(repoDir);

      this.project.status = "building";
      await this.project.save();
      execSync(this.project.preBuildCommand, {
        stdio: "inherit",
        cwd: repoDir,
      });
      execSync(this.project.buildCommand, { stdio: "inherit" });

      let env = this.project.env.reduce((env, { key, value }) => {
        Object.assign(env, { ...env, [key]: value });
        return env;
      }, {});

      env = {
        ...process.env,
        ...env,
      };
      const command = spawn(this.project.startCommand, {
        shell: true,
        env,
      });
      command.stdout.on("data", (data) => {
        loggerService.log(`[PUBLISH AND BUILD LOG]: ${data}`);
      });

      command.stderr.on("data", (data) => {
        loggerService.error(`[PUBLISH AND BUILD ERROR]: ${data}`, {
          filename: "services/PublishService.ts",
          function: "pullAndBuild",
        });
      });

      command.on("close", (code) => {
        loggerService.log(
          `[PUBLISH AND BUILD CLOSE] at project ${
            this.project!.id
          } deployment child process exited with code ${code}`
        );
      });

      this.project.status = "running";
      this.project.runningProcess = command.pid!;
      this.project.buildHistory.push({
        status: this.project.status,
        timestamp: new Date(),
      });
      await this.project.save();

      process.chdir(homeDir);
    } catch (error) {
      console.error("Error pulling and building project:", error);

      if (this.project) {
        this.project.status = "failed";
        this.project.buildHistory.push({
          status: this.project.status,
          timestamp: new Date(),
        });
        this.project.save();
      }
    }
  }
}

export default PublishService;
