import {MongoClient} from 'mongodb';

const {
    MONGO_URL= "mongodb+srv://todo-user:Q4iFDPLfvoZUOUX9@cluster0.cohsblf.mongodb.net/tests"
} = process.env;

export const client = new MongoClient(MONGO_URL);
export const db = client.db();