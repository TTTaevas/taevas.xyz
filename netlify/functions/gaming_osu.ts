import { sql } from "bun";
import {type Handler} from "@netlify/functions";
import {type OsuInfo} from "#Infos/Gaming/Osu.js";
import {type Token} from "./token.js";
import * as osu from "osu-api-v2-js";

const handler: Handler = async (req) => {
  const tokens: Token[] = await sql`
    SELECT * FROM tokens
    WHERE service = osu
    LIMIT ${1}
  `;
  const token = tokens.at(0);

  const ruleset = Number(req.queryStringParameters?.ruleset);
  const api = new osu.API({access_token: token?.access_token});
  const profile = await api.getUser(7276846, !isNaN(ruleset) ? ruleset : undefined);

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
