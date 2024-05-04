import {type Handler} from "@netlify/functions";
import * as osu from "osu-api-v2-js";
import {type OsuInfo} from "../../src/components/Info/RhythmGames/Osu.js";

const handler: Handler = async () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const api = new osu.API({access_token: process.env["OSU_TOKEN"]});
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
