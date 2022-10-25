import {MongoClient} from 'mongodb';

const {
    MONGO_URL= "mongodb+srv://user:password@server/database"
} = process.env;

export const client = new MongoClient(MONGO_URL);
export const db = client.db();