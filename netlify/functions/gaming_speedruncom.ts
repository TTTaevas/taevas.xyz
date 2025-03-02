import {type Handler} from "@netlify/functions";
import {type SpeedruncomInfo} from "#Infos/Gaming/Speedruncom.js";

interface Runs {
  data: {
    place: number;
    run: {
      weblink: string;
      game: string;
      level?: string;
      category?: string;
      videos: {
        links: {
          uri: string
        }[]
      }
      date: string;
      times: {
        primary_t: number
      }
    };
  }[]
}

interface Game {
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
}

interface Level {
  data: {
    name: string;
  };
}

const handler: Handler = async () => {
  // using the API's embedding would be stupid here, as that'd create lag due to irrelevant runs
  const speedruncom = await (await fetch("https://www.speedrun.com/api/v1/users/j03v45mj/personal-bests")).json() as Runs;
  const data = speedruncom.data.at(0);

  if (!data) {
    return {
      statusCode: 404,
    };
  }

  const urlsToRequest = [`https://www.speedrun.com/api/v1/games/${data.run.game}`];
  if (data.run.level) {urlsToRequest.push(`https://www.speedrun.com/api/v1/levels/${data.run.level}`);}
  if (data.run.category) {urlsToRequest.push(`https://www.speedrun.com/api/v1/categories/${data.run.category}`);}

  const toRequest = urlsToRequest.map((url) => new Promise(async (resolve) => resolve(await (await fetch(url)).json())));
  const responses = await Promise.all(toRequest) as [Game, Level?, Level?];
  const game = responses[0];
  const details = [responses[1]].concat(responses[2]).filter((d) => d !== undefined);

  const run: SpeedruncomInfo = {
    place: data.place,
    link: data.run.weblink,
    date: data.run.date,
    thumbnail: game.data.assets["cover-tiny"].uri,
    game: game.data.names.international,
    details: details.map((d) => d.data.name),
    time: sec2time(data.run.times.primary_t),
    video: data.run.videos.links.at(0)?.uri,
  };

  while (run.time.startsWith("0") || run.time.startsWith(":")) {
    run.time = run.time.substring(1);
  }

  return {
    statusCode: 200,
    body: JSON.stringify(run),
  };
};

// https://gist.github.com/vankasteelj/74ab7793133f4b257ea3
function sec2time(timeInSeconds: number) {
  const pad = (num: number, size: number) => ("000" + num).slice(size * -1);
  const time = Number(parseFloat(timeInSeconds.toString()).toFixed(3));
  const hours = Math.floor(time / 60 / 60);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = Math.floor(time - minutes * 60);
  const milliseconds = Number(time.toString().slice(-3));
  return pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3);
};

export {handler};
