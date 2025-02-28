/* eslint no-async-promise-executor: 0 */ // Doing promises is needed in order to make multiple requests at once, lowering wait time

import {type Handler} from "@netlify/functions";
import {InsertOneResult, MongoClient} from "mongodb";

import {API} from "osu-api-v2-js";

export interface Token {
  access_token: string;
  expires: Date;
}

const handler: Handler = async (req) => {
  const service = req.queryStringParameters?.service;
  if (!service) {return {statusCode: 400};}

  const client = new MongoClient(process.env.URL_MONGODB!);
  await client.connect();

  const db = client.db("tokens");
  const collection = db.collection<Token>(service);
  const tokens = await collection.find().toArray();

  const now = new Date();
  const token = tokens.find((t) => t.expires > now);
  const expiredTokens = tokens.filter((t) => now > t.expires);

  const promises: Promise<void>[] = [];

  if (!token) {
    const collections = await db.listCollections().toArray();
    if (!collections.find((c) => c.name === service)) {client.close(); return {statusCode: 400};}

    promises.push(new Promise(async (resolve, reject) => {
      console.log(`Setting a new token for ${service}...`);
      let insertion: InsertOneResult;

      if (service === "osu") {
        const api = await API.createAsync(11451, process.env.API_OSU!);
        insertion = await collection.insertOne({
          access_token: api.access_token,
          expires: api.expires,
        });
      }

      else if (service === "umami") {
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
        insertion = await collection.insertOne({
          access_token: json.token,
          expires: date,
        });
      }

      else {
        console.error(`Service "${service}" doesn't exist! Unable to set a new token...`);
        return reject();
      }

      console.log(`New ${service} token in the database: ${insertion.insertedId.toString()}`);
      resolve();
    }));
  }

  if (expiredTokens.length) {
    promises.push(new Promise(async (resolve) => {
      console.log(`Deleting old tokens for ${service}...`);
      await Promise.all(expiredTokens.map(async (t) => {
        return new Promise<void>(async (resolve) => {
          const deletion = await collection.deleteOne({_id: t._id});
          if (deletion.deletedCount) {
            console.log(`Old ${service} token deleted from the database: ${t._id.toString()}`);
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