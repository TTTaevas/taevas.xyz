import * as osu from "osu-api-v2-js";
import {type OsuInfo} from "#Infos/Gaming/Osu.tsx";
import {MongoClient} from "mongodb";
import {type Token} from "./token.tsx";
import type { Handler } from "../index.ts";

export const gaming_osu: Handler = async (params) => {
  const client = new MongoClient(process.env["URL_MONGODB"]!);
  await client.connect();

  const db = client.db("tokens");
  const collection = db.collection<Token>("osu");
  const token = await collection.findOne();
  void client.close();

  let ruleset = params.has("ruleset") ? Number(params.get("ruleset")) : undefined;
  if (ruleset && isNaN(ruleset)) {ruleset = undefined;}
  const api = new osu.API({access_token: token?.access_token});
  const profile = await api.getUser(7276846, ruleset);

  const info: OsuInfo = {
    country: profile.country.name,
    ranks: {
      global: profile.statistics.global_rank ?? 0,
      country: profile.statistics.country_rank ?? 0,
    },
  };

  return new Response(new Blob([JSON.stringify(info)], {
    type: "application/json",
  }), {status: 200});
};
