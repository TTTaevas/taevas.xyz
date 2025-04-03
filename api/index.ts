import { token } from "./infos/token";
import { github } from "./infos/coding/github";
import { gitlab } from "./infos/coding/gitlab";
import { kitsudev } from "./infos/coding/kitsudev";
import { kitsuclub } from "./infos/fediverse/kitsuclub";
// import { osu } from "./infos/gaming/osu";
import { speedruncom } from "./infos/gaming/speedruncom";
// import { hackthebox } from "./infos/hacking/hackthebox";
// import { wanikani } from "./infos/japanese/wanikani";
import { anilist } from "./infos/media/anilist";
import { lastfm } from "./infos/media/lastfm";
import { umami } from "./infos/website/umami";

const info_routes: Record<string, Handler[]> = {
  coding: [github, gitlab, kitsudev],
  fediverse: [kitsuclub],
  gaming: [speedruncom],
  // hacking: [hackthebox],
  // japanese: [wanikani],
  media: [anilist, lastfm],
  website: [umami],
};

export type Handler = (req: URLSearchParams) => Promise<Response>;

export async function api(pathname: string, parameters: URLSearchParams) {
  if (pathname === "/api/infos/token") {
    return await token(parameters);
  }

  for (const route of Object.keys(info_routes)) {
    for (const endpoint of info_routes[route]) {
      if (pathname === "/api/infos/" + route + "/" + endpoint.name) {
        return await endpoint(parameters);
      }
    }
  }

  return new Response("Not Found", {status: 404});
}
