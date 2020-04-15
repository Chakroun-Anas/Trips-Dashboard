import dotenv from "dotenv";
dotenv.config();
export default {
  APP_PORT: process.env.APP_PORT || 3004,
  PERSISTANCE_TYPE: process.env.PERSISTANCE_TYPE,
  MongoDB_URL: process.env.MongoDB_URL,
};
