import { createClient } from "redis";
import { MongoClient } from "mongodb";
import { Todo } from "../types";
import { redisConfig, mongoConfig, REDIS_KEY, MAX_CACHE_ITEMS } from '../config/db';

// Create a type for Redis client based on what createClient returns
type RedisClientType = ReturnType<typeof createClient>;

class CacheService {
  // Initialize with null and check before using
  private redisClient: RedisClientType | null = null;
  private mongoClient: MongoClient | null = null;
  private isConnected = false;

  constructor() {
    this.initializeClients();
  }

  private async initializeClients() {
    try {
      // Create Redis client with timeout and retry options
      this.redisClient = createClient({
        url: `redis://${redisConfig.username}:${redisConfig.password}@${redisConfig.host}:${redisConfig.port}`,
        socket: {
          connectTimeout: 10000, // 10 seconds timeout
          reconnectStrategy: (retries: number) => {
            // Exponential backoff
            const delay = Math.min(Math.pow(2, retries) * 100, 3000);
            return delay;
          }
        }
      });

      // Set up event handlers for Redis
      this.redisClient.on('error', (err: Error) => console.error('Redis Client Error:', err));
      this.redisClient.on('connect', () => console.log('Connected to Redis server'));
      this.redisClient.on('reconnecting', () => console.log('Reconnecting to Redis server...'));

      // Connect to Redis
      await this.redisClient.connect();

      // Create MongoDB client with options
      this.mongoClient = new MongoClient(mongoConfig.url, {
        serverSelectionTimeoutMS: 5000, // 5 seconds timeout
        connectTimeoutMS: 10000 // 10 seconds connection timeout
      });

      // Connect to MongoDB
      await this.mongoClient.connect();
      console.log('Connected to MongoDB server');
      
      this.isConnected = true;
    } catch (error) {
      console.error('Failed to initialize database connections:', error);
      throw new Error('Database connection failed');
    }
  }

  // Get all todos from cache
  async getAllTodos(): Promise<Todo[]> {
    try {
      if (!this.isConnected || !this.redisClient) await this.initializeClients();
      
      const cachedTodos = await this.redisClient?.get(REDIS_KEY);
      return cachedTodos ? JSON.parse(cachedTodos) : [];
    } catch (error) {
      console.error('Error getting todos from cache:', error);
      return [];
    }
  }

  // Add a new todo to cache
  async addTodo(todo: Todo): Promise<void> {
    try {
      if (!this.isConnected || !this.redisClient) await this.initializeClients();
      
      // Get current todos
      const todos = await this.getAllTodos();
      
      // Add new todo
      todos.push(todo);
      
      // Check if we need to move to MongoDB
      if (todos.length > MAX_CACHE_ITEMS) {
        await this.moveToMongoDB(todos);
        // Clear the cache
        await this.redisClient?.set(REDIS_KEY, JSON.stringify([]));
      } else {
        // Update cache
        await this.redisClient?.set(REDIS_KEY, JSON.stringify(todos));
      }
    } catch (error) {
      console.error('Error adding todo to cache:', error);
      throw error;
    }
  }
  
  // Move todos to MongoDB and clear cache
  private async moveToMongoDB(todos: Todo[]): Promise<void> {
    try {
      if (!this.isConnected || !this.mongoClient) await this.initializeClients();
      
      const db = this.mongoClient?.db(mongoConfig.dbName);
      const collection = db?.collection(mongoConfig.collectionName);
      
      // Insert todos into MongoDB
      if (todos.length > 0 && collection) {
        await collection.insertMany(todos);
        console.log(`Moved ${todos.length} todos to MongoDB`);
      }
    } catch (error) {
      console.error('Error moving todos to MongoDB:', error);
      throw error;
    }
  }
  
  // Get all todos (from both Redis and MongoDB)
  async getAllTodosFromCacheAndDB(): Promise<Todo[]> {
    try {
      if (!this.isConnected || !this.mongoClient) await this.initializeClients();
      
      // Get todos from cache
      const cacheTodos = await this.getAllTodos();
      
      // Get todos from MongoDB
      const db = this.mongoClient?.db(mongoConfig.dbName);
      const collection = db?.collection(mongoConfig.collectionName);
      
      let dbTodos: Todo[] = [];
      if (collection) {
        dbTodos = await collection.find<Todo>({}).toArray();
      }
      
      // Combine and return
      return [...dbTodos, ...cacheTodos];
    } catch (error) {
      console.error('Error getting all todos:', error);
      return [];
    }
  }
  
  // Delete a todo from both Redis and MongoDB
  async deleteTodo(id: string | number): Promise<void> {
    try {
      if (!this.isConnected || !this.redisClient || !this.mongoClient) {
        await this.initializeClients();
      }
      
      // Delete from Redis cache
      const cacheTodos = await this.getAllTodos();
      const updatedCacheTodos = cacheTodos.filter(todo => todo.id !== id);
      await this.redisClient?.set(REDIS_KEY, JSON.stringify(updatedCacheTodos));
      
      // Delete from MongoDB
      const db = this.mongoClient?.db(mongoConfig.dbName);
      const collection = db?.collection(mongoConfig.collectionName);
      
      if (collection) {
        await collection.deleteOne({ id: id });
      }
      
      console.log(`Todo with ID ${id} deleted from both cache and MongoDB`);
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  }
  
  // Ping Redis to check connectivity
  async pingRedis(): Promise<boolean> {
    try {
      if (!this.redisClient) await this.initializeClients();
      const result = await this.redisClient?.ping();
      return result === 'PONG';
    } catch (error) {
      console.error('Redis ping failed:', error);
      return false;
    }
  }
  
  // Close connections
  async close(): Promise<void> {
    if (this.redisClient && 'isOpen' in this.redisClient && this.redisClient.isOpen) {
      await this.redisClient.disconnect();
    }
    if (this.mongoClient) {
      await this.mongoClient.close();
    }
    this.isConnected = false;
  }
}

export default new CacheService();