export interface Todo{
    id: string;
    text: string;
    completed:boolean;
    createdAt: Date;
}
export interface RedisConfig{
    host: string;
    port: number;
    username: string;
    password: string;
}
export interface MongoConfig{
    url: string;
    dbName: string;
    collectionName: string;
}