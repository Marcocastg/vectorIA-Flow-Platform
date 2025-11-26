import 'dotenv/config';
import * as joi from 'joi';
interface EnvVars {
  PORT: number;
  DATABASE_URL: string;
  SESSION_SECRET: string;
  TWITCH_CLIENT_ID: string;
  TWITCH_CLIENT_SECRET: string;
  PYTHON_API_URL: string;
  GEMINI_API_KEY: string;
}

const envSchema = joi
  .object({
    PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    SESSION_SECRET: joi.string().required(),
    TWITCH_CLIENT_ID: joi.string().required(),
    TWITCH_CLIENT_SECRET: joi.string().required(),
    PYTHON_API_URL: joi.string().uri().required(),
    GEMINI_API_KEY: joi.string().required(),
  })
  .unknown(true);

const { error, value } = envSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  databaseUrl: envVars.DATABASE_URL,
  sessionSecret: envVars.SESSION_SECRET,
  twitchClientId: envVars.TWITCH_CLIENT_ID,
  twitchClientSecret: envVars.TWITCH_CLIENT_SECRET,
  PYTHON_API_URL: envVars.PYTHON_API_URL,
  GEMINI_API_KEY: envVars.GEMINI_API_KEY,
};
