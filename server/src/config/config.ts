import dotenv from "dotenv";

dotenv.config();

const config = {
  server: {
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
