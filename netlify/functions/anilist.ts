import {type Handler} from "@netlify/functions";
import fetch from "node-fetch";
import {type AnilistInfo} from "../../src/components/Info/Anilist.js";

const handler: Handler = async () => {
  const anilist = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Accept": "application/json",
    },
    body: JSON.stringify({
      query: `
        query ($userName: String) {
          MediaList (userName: $userName, type: ANIME, startedAt_greater: 1, sort: UPDATED_TIME_DESC) {
            media {
              title {
                romaji
              }
              episodes
              coverImage {
                medium
              }
              siteUrl
            }
            progress
            score (format: POINT_10)
            startedAt {
              day
              month
              year
            }
            updatedAt
            completedAt {
              day
              month
              year
            }
          }
        }
      `,
      variables: {
        userName: "Taevas",
      },
    }),
  });
  if (anilist.status !== 200) {
    // log the issue in netlify, return 404 to the user anyway
    console.log(await anilist.json());
    return {
      statusCode: 404,
      body: "",
    };
  }

  const json = (await anilist.json() as any).data.MediaList;
  const anime: AnilistInfo = {
    title: json.media.title.romaji,
    episodes: {
      watched: json.progress,
      total: json.media.episodes,
    },
    score: json.score,
    startDate: json.startedAt.year ? new Date(`${json.startedAt.year}-${json.startedAt.month}-${json.startedAt.day}`).toISOString() : new Date().toISOString(),
    updateDate: new Date(json.updatedAt * 1000).toISOString(),
    endDate: json.completedAt.year ? new Date(`${json.completedAt.year}-${json.completedAt.month}-${json.completedAt.day}`).toISOString() : new Date().toISOString(),
    cover: json.media.coverImage.medium,
    url: json.media.siteUrl,
  };

  anime.startDate = anime.startDate.substring(0, anime.startDate.indexOf("T"));
  anime.updateDate = anime.updateDate.substring(0, anime.updateDate.indexOf("T"));
  anime.endDate = anime.endDate.substring(0, anime.endDate.indexOf("T"));
  
  return {
    statusCode: 200,
    body: JSON.stringify(anime),
  };
};

export {handler};
