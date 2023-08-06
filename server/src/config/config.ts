import dotenv from "dotenv";
import path from "path";

dotenv.config();

const config = {
  server: {
    rootDir: process.env.ROOT_DIR || path.join(__dirname, "..", ".."),
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
};

export default config;
