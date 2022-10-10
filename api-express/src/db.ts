import {MongoClient} from 'mongodb';


const {
    MONGO_URI = "mongodb+srv://user:password@server/database",
} = process.env;

export const client = new MongoClient(MONGO_URI);
export const db = client.db();