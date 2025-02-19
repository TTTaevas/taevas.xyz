import { UmamiInfo } from "#Infos/Website/Umami.js";
import {type Handler} from "@netlify/functions";
import { MongoClient } from "mongodb";
import { Token } from "./umami_token.js";

const handler: Handler = async () => {
  const client = new MongoClient(process.env.URL_MONGODB!);
  await client.connect();

  const db = client.db("tokens");
  const collection = db.collection<Token>("umami");
  const token = await collection.findOne();
  void client.close();

  const api_server = "https://visitors.taevas.xyz/api";
  const website_id = "f196d626-e609-4841-9a80-0dc60f523ed5";
  const now = new Date();
  const response = await fetch(`${api_server}/websites/${website_id}/stats?startAt=${Number(new Date("2025"))}&endAt=${Number(now)}`, {
    headers: {
      "Accept": "application/json",
      "Authorization": `Bearer ${token?.access_token}`
    },
  });

  // From https://github.com/umami-software/api-client/blob/master/src/types.ts
  // Not using the package directly because of serious issues I consider it to have
  const umami = await response.json() as {
    pageviews: { value: number; prev: number };
    visitors: { value: number; prev: number };
    visits: { value: number; prev: number };
    bounces: { value: number; prev: number };
    totaltime: { value: number; prev: number };
  };

  if (!umami) {
    return {
      statusCode: 404,
    };
  }

  const info: UmamiInfo = {
    pageviews: umami.pageviews.value,
    visits: umami.visits.value,
    visitors: umami.visitors.value,
    totaltime: umami.totaltime.value
  };

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
