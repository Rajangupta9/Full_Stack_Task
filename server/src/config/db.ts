import { RedisConfig, MongoConfig } from "../types";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST ,
  port: parseInt(process.env.REDIS_PORT ),
  username: process.env.REDIS_USERNAME ,
  password: process.env.REDIS_PASSWORD 
};

export const mongoConfig: MongoConfig = {
  url: process.env.MONGO_URL  ,
  dbName: process.env.MONGO_DB_NAME ,
  collectionName: process.env.MONGO_COLLECTION
};

export const REDIS_KEY = process.env.REDIS_KEY || 'FULLSTACK_TASK_Rajan';
export const MAX_CACHE_ITEMS = parseInt(process.env.MAX_CACHE_ITEMS || '50');
