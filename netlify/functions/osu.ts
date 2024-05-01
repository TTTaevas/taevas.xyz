import {type Handler} from "@netlify/functions";
import * as osu from "osu-api-v2-js";
import {type OsuInfo} from "../../src/components/Info/Osu.js";

const handler: Handler = async () => {
  const api = await osu.API.createAsync({id: 11451, secret: process.env.API_OSU!});

  const profile = await Promise.all([
    new Promise((resolve) => {
      resolve(api.getUser(7276846, osu.Ruleset.osu)); 
    }),
    new Promise((resolve) => {
      resolve(api.getUser(7276846, osu.Ruleset.taiko)); 
    }),
    new Promise((resolve) => {
      resolve(api.getUser(7276846, osu.Ruleset.fruits)); 
    }),
    new Promise((resolve) => {
      resolve(api.getUser(7276846, osu.Ruleset.mania)); 
    }),
  ]) as osu.User.Extended[];

  void api.revokeToken();

  const info: OsuInfo = {
    country: (profile[0]).country.name ?? "Unknown",
  };

  for (const ruleset of profile) {
    if (ruleset.rank_history) {
      const stats = ruleset.statistics;
      info[ruleset.rank_history.mode] = {
        global: stats.global_rank ?? 0,
        country: stats.country_rank ?? 0,
      };
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
