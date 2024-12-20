import dotenv from "dotenv";
import assert from "assert";

dotenv.config();

const {
  PORT,
  HOST,
  HOST_URL,
  NODE_ENV,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
} = process.env;

assert(PORT, "Port is required");
assert(HOST, "Host is required");

export default {
  port: PORT,
  nodeEnv: NODE_ENV,
  host: HOST,
  hostUrl: HOST_URL,
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  },
  cloudinaryConfig: {
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_API_KEY,
    api_secret: CLOUD_API_SECRET,
  },
};
