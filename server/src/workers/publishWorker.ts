import Bull from "bull";
import PublishService from "services/PublishService";
import mongoose from "mongoose";
import config from "config/config";

const publishQueue = new Bull("publish", {
  redis: {
    host: config.redis.host,
    port: parseInt(config.redis.port!),
    password: config.redis.password,
    username: config.redis.username,
    enableReadyCheck: false,
    maxRetriesPerRequest: null,
  },
});

mongoose
  .connect(config.db.connection.url)
  .then(() => {
    publishQueue.process("pullAndBuild", async (job, done) => {
      try {
        console.log("Processing job:", job.data);

        const { projectId } = job.data;
        const publishService = new PublishService(projectId);
        await publishService.pullAndBuild();
        done();
        console.log("Job processed successfully");
      } catch (error) {
        console.error("Error processing job:", error);
      }
    });

    publishQueue.process("redeploy", async (job, done) => {
      const { projectId } = job.data;
      const publishService = new PublishService(projectId);
      await publishService.redeploy();
      done();
    });

    publishQueue.process("stop", async (job, done) => {
      try {
        console.log("Stopping job:", job.data);
        const { projectId } = job.data;
        const publishService = new PublishService(projectId);
        await publishService.stop();
        done();
      } catch (error) {
        console.error("Error stopping job:", error);
      }
    });
  })
  .catch((error) => {});
