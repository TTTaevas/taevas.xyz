import { type KitsudevInfo } from "#Infos/Coding/KitsuDev.tsx";
import type { Handler } from "../..";

const username = "Taevas";

export const kitsudev: Handler = async () => {
  /** https://kitsunes.dev/api/swagger#/user/userListActivityFeeds */
  const kitsudev = await (await fetch(`https://kitsunes.dev/api/v1/users/${username}/activities/feeds?limit=1`)).json() as [{
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
