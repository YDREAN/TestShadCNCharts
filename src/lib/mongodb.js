import { MongoClient } from 'mongodb';

const uri = "mongodb://localhost:27017";  // Utilise l'URI de ta base MongoDB locale
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
