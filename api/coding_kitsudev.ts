import { type KitsudevInfo } from "#Infos/Coding/KitsuDev.tsx";
import type { Handler } from "..";

export const coding_kitsudev: Handler = async () => {
  const kitsudev = await (await fetch("https://kitsunes.dev/api/v1/users/Taevas/activities/feeds?limit=1")).json() as [{
    repo: {
      full_name: string
      html_url: string
    }
    created: string
  }];

  const info: KitsudevInfo = {
    name: kitsudev[0].repo.full_name,
    url: kitsudev[0].repo.html_url,
    date: kitsudev[0].created
  };

  return Response.json(info, {status: 200});
};
