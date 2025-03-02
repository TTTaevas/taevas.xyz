import {type Handler} from "@netlify/functions";
import {type LastfmInfo} from "#Infos/Music/Lastfm.js";

const handler: Handler = async () => {
  const lastfm = await (await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=TTTaevas&api_key=${process.env.API_LASTFM}&format=json&limit=1`)).json() as {
    recenttracks: {
      track: {
        artist: {
          "#text": string;
        };
        image: {
          size: string;
          "#text": string;
        }[];
        album: {
          "#text": string;
        };
        name: string;
        "@attr"?: {
          nowplaying?: string;
        };
        url: string;
        date?: {
          uts: string;
          "#text": string;
        };
      }[];
    };
  };

  const image = lastfm.recenttracks.track[0].image.find((i) => i.size == "large");
  const track: LastfmInfo = {
    artist: lastfm.recenttracks.track[0].artist["#text"],
    name: lastfm.recenttracks.track[0].name,
    album: lastfm.recenttracks.track[0].album["#text"],
    image: image ? image["#text"] : "",
    listening: Boolean(lastfm.recenttracks.track[0]["@attr"]?.nowplaying),
    url: lastfm.recenttracks.track[0].url,
    date: lastfm.recenttracks.track[0].date?.uts ?? String(Date.now()),
  };

  return {
    statusCode: 200,
    body: JSON.stringify(track),
  };
};

export {handler};
