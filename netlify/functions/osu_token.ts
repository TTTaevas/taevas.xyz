/* eslint-disable @typescript-eslint/naming-convention */
import {type Handler} from "@netlify/functions";
import {API} from "osu-api-v2-js";
import {MongoClient} from "mongodb";

export type Token = {
  access_token: API["access_token"];
  expires: API["expires"];
};

const handler: Handler = async () => {
  const client = new MongoClient(process.env.URL_MONGODB!);
  await client.connect();

  const db = client.db("tokens");
  const collection = db.collection<Token>("osu");
  const tokens = await collection.find().toArray();

  const now = new Date();
  const token = tokens.find((t) => t.expires > now);
  const expiredTokens = tokens.filter((t) => now > t.expires);

  const promises: Array<Promise<void>> = [];

  if (!token) {
    promises.push(new Promise(async (_resolve, _reject) => {
      console.log("Setting a new token for osu!...");
      const api = await API.createAsync({id: 11451, secret: process.env.API_OSU!});
      const insertion = await collection.insertOne({
        access_token: api.access_token,
        expires: api.expires,
      });
      console.log(`New osu! token in the database: ${insertion.insertedId.toString()}`);
    }));
  }

  if (expiredTokens.length) {
    promises.push(new Promise(async (_resolve, _reject) => {
      console.log("Deleting old tokens for osu!...");
      await Promise.all(expiredTokens.map(async (t) => {
        return new Promise(async (_resolve, _reject) => {
          const deletion = await collection.deleteOne({_id: t._id});
          if (deletion.deletedCount) {
            console.log(`Old osu! token deleted from the database: ${t._id.toString()}`);
          }
        });
      }));
    }));
  }

  await Promise.all(promises);
  await client.close();

  return {
    statusCode: 200,
  };
};

export {handler};
