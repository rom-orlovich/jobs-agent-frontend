import { MongoClient } from 'mongodb';

if (!process.env.MONGO_DB_URI) {
  throw new Error('Please add your MONGO_DB_URI to .env.local');
}

const uri: string = process.env.MONGO_DB_URI;
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // Is preserved across module reloads caused by HMR (Hot Module Replacement).

  const globalWithMongoClientPromise = global as typeof globalThis & {
    _mongoClientPromise: Promise<MongoClient>;
  };

  if (!globalWithMongoClientPromise._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongoClientPromise._mongoClientPromise = client.connect();
  }

  clientPromise = globalWithMongoClientPromise._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Export a module-scoped MongoClient promise. By doing this in a
// Separate module, the client can be shared across functions.
export default clientPromise;
