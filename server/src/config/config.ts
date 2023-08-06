import dotenv from "dotenv";
import path from "path";

dotenv.config();

const config = {
  server: {
    rootDir: process.env.ROOT_DIR || path.resolve(__dirname, "..", ".."),
    port: process.env.PORT,
    jwt: {
      secret: process.env.SECRET_KEY,
    },
  },
  db: {
    connection: {
      url: `${process.env.DB_URL}/${process.env.DB_NAME}`,
    },
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD,
    username: process.env.REDIS_USER,
  },
};

export default config;
