import { MongoClient } from "mongodb";

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://shjneevn:4nhy3u3m@cluster0.yq7rt.mongodb.net/demoAuth?retryWrites=true&w=majority"
  );
  return client;
}
