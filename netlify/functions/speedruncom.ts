import {type Handler} from "@netlify/functions";
import {api} from "./shared/api.js";
import {type SpeedruncomInfo} from "../../src/components/Info/Speedrunning/Speedruncom.js";

const handler: Handler = async () => {
  // using the API's embedding would be stupid here, as that'd create lag due to irrelevant runs
  const speedruncom = await api<{
    data: {
      place: number;
      run: {
        weblink: string;
        game: string;
        level: string | undefined;
        category: string | undefined;
        date: string;
      };
    }[];
  }>("https://www.speedrun.com/api/v1/users/j03v45mj/personal-bests");

  const detailsToRequest = [new Promise((resolve) => {
    resolve(api<{
      data: {
        names: {
          international: string;
        };
        assets: {
          "cover-tiny": {
            uri: string;
          }; 
        };
      };
    }>(`https://www.speedrun.com/api/v1/games/${speedruncom.data[0].run.game}`));
  })];

  if (speedruncom.data[0].run.level) {
    detailsToRequest.push(new Promise((resolve) => {
      resolve(api<{
        data: {
          name: string;
        };
      }>(`https://www.speedrun.com/api/v1/levels/${speedruncom.data[0].run.level}`));
    }));
  }

  if (speedruncom.data[0].run.category) {
    detailsToRequest.push(new Promise((resolve) => {
      resolve(api<{
        data: {
          name: string;
        };
      }>(`https://www.speedrun.com/api/v1/categories/${speedruncom.data[0].run.category}`));
    }));
  }

  const details = await Promise.all(detailsToRequest) as [Record<string, any>];

  const run: SpeedruncomInfo = {
    place: speedruncom.data[0].place,
    link: speedruncom.data[0].run.weblink,
    date: speedruncom.data[0].run.date,
    thumbnail: details[0].data.assets["cover-tiny"].uri,
    game: details[0].data.names.international,
    details: details.slice(1).map((d) => (d.data as {name: string}).name),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(run),
  };
};

export {handler};
