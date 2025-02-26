import {type Handler} from "@netlify/functions";
import {api} from "./shared/api.js";
import { type KitsudevInfo } from "#Infos/Coding/KitsuDev.js";

const handler: Handler = async () => {
  const kitsudev = await api<[{
    repo: {
      full_name: string
      html_url: string
    }
    created: string
  }]>("https://kitsunes.dev/api/v1/users/Taevas/activities/feeds?limit=1");

  const info: KitsudevInfo = {
    name: kitsudev[0].repo.full_name,
    url: kitsudev[0].repo.html_url,
    date: kitsudev[0].created
  };

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
