import { MongoClient } from "mongodb";
import { mongoConnectionString, databaseName } from "../constants/config.js";

export let mongoDb = null;

export async function createDatabaseConnection() {
    try {
        const mongoClient = await MongoClient.connect(mongoConnectionString, { sslValidate: false });
        console.log(`Mongo connection string is: ${mongoConnectionString}`);
        mongoDb = mongoClient.db(databaseName);
        console.log(`Database name is: ${databaseName}`);
    } catch (err) {
        throw err;
    }
}