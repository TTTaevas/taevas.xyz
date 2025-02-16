import {type Handler} from "@netlify/functions";
import * as osu from "osu-api-v2-js";
import {type OsuInfo} from "../../src/components/Info/RhythmGames/Osu.js";
import {MongoClient} from "mongodb";
import {type Token} from "./osu_token.js";

const handler: Handler = async () => {
  const client = new MongoClient(process.env.URL_MONGODB!);
  await client.connect();

  const db = client.db("tokens");
  const collection = db.collection<Token>("osu");
  const token = await collection.findOne();
  void client.close();

  const api = new osu.API({access_token: token?.access_token});
  const profile = await api.getUser(7276846, osu.Ruleset.osu);

  const info: OsuInfo = {
    country: profile.country.name,
    ranks: {
      global: profile.statistics.global_rank ?? 0,
      country: profile.statistics.country_rank ?? 0,
    },
  };

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
