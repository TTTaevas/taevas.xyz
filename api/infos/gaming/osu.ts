import * as osuv2 from "osu-api-v2-js";
import {type OsuInfo} from "#Infos/Gaming/Osu.tsx";
import type { Handler } from "../../index.ts";
import { db, getToken } from "../../../database.ts";

const user_id = 7276846;

export const osu: Handler = async (params) => {
  const token = await getToken(db, "osu");

  let ruleset = params.has("ruleset") ? Number(params.get("ruleset")) : undefined;
  if (ruleset && isNaN(ruleset)) {ruleset = undefined;}
  const api = new osuv2.API({access_token: token?.access_token});
  const profile = await api.getUser(user_id, ruleset);

  const info: OsuInfo = {
    country: profile.country.name,
    ranks: {
      global: profile.statistics.global_rank ?? 0,
      country: profile.statistics.country_rank ?? 0,
    },
  };

  return Response.json(info, {status: 200});
};
