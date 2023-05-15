import { MongoClient } from 'mongodb';

const {
  MONGO_URL = 'mongodb://admin:adminpass@localhost/teste',
} = process.env;

export const client = new MongoClient(MONGO_URL);
export const db = client.db();