import { RedisConfig, MongoConfig } from "../types";
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const redisConfig: RedisConfig = {
  host: process.env.REDIS_HOST || 'redis-12675.c212.ap-south-1-1.ec2.cloud.redislabs.com',
  port: parseInt(process.env.REDIS_PORT || '12675'),
  username: process.env.REDIS_USERNAME || 'default',
  password: process.env.REDIS_PASSWORD || 'dssYpBnYQrl01GbCGVhVq2e4dYvUrKJB'
};

export const mongoConfig: MongoConfig = {
  url: process.env.MONGO_URL || "mongodb+srv://cyber:good797@database.fuqlu.mongodb.net/",
  dbName: process.env.MONGO_DB_NAME || 'FULLSTACK_TASK',
  collectionName: process.env.MONGO_COLLECTION || 'FULLSTACK_TASK_Rajan'
};

export const REDIS_KEY = process.env.REDIS_KEY || 'FULLSTACK_TASK_Rajan';
export const MAX_CACHE_ITEMS = parseInt(process.env.MAX_CACHE_ITEMS || '50');