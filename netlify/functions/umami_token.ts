/* eslint no-async-promise-executor: 0 */ // Doing promises is needed in order to make multiple requests at once, lowering wait time

import {type Handler} from "@netlify/functions";
import {MongoClient} from "mongodb";

export interface Token {
  access_token: string;
  expires: Date;
}

const handler: Handler = async () => {
  const client = new MongoClient(process.env.URL_MONGODB!);
  await client.connect();

  const db = client.db("tokens");
  const collection = db.collection<Token>("umami");
  const tokens = await collection.find().toArray();

  const now = new Date();
  const token = tokens.find((t) => t.expires > now);
  const expiredTokens = tokens.filter((t) => now > t.expires);

  const promises: Promise<void>[] = [];

  if (!token) {
    promises.push(new Promise(async (resolve) => {
      console.log("Setting a new token for umami...");
      const response = await fetch("https://visitors.taevas.xyz/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `username=${process.env.USERNAME_UMAMI}&password=${process.env.PASSWORD_UMAMI}`
      });
      const json: {token: string} = await response.json();

      // Assume it expires in one day
      const date = new Date();
      date.setHours(date.getHours() + 24);
      const insertion = await collection.insertOne({
        access_token: json.token,
        expires: date,
      });
      console.log(`New umami token in the database: ${insertion.insertedId.toString()}`);
      resolve();
    }));
  }

  if (expiredTokens.length) {
    promises.push(new Promise(async (resolve) => {
      console.log("Deleting old tokens for umami...");
      await Promise.all(expiredTokens.map(async (t) => {
        return new Promise<void>(async (resolve) => {
          const deletion = await collection.deleteOne({_id: t._id});
          if (deletion.deletedCount) {
            console.log(`Old umami token deleted from the database: ${t._id.toString()}`);
          }

          resolve();
        });
      }));
      resolve();
    }));
  }

  await Promise.all(promises);
  void client.close();

  return {
    statusCode: 200,
  };
};

export {handler};
