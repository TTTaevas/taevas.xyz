import {type Handler} from "@netlify/functions";
import {api} from "./shared/api.js";
import {type LastfmInfo} from "../../src/components/Info/Music/Lastfm.js";

const handler: Handler = async () => {
  const lastfm = await api<{
    recenttracks: {
      track: Array<{
        artist: {
          "#text": string;
        };
        image: Array<{
          size: string;
          "#text": string;
        }>;
        album: {
          "#text": string;
        };
        name: string;
        "@attr"?: {
          nowplaying?: string;
        };
        url: string;
      }>;
    };
  }>(`http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=TTTaevas&api_key=${process.env.API_LASTFM}&format=json&limit=1`);

  const image = lastfm.recenttracks.track[0].image.find((i) => i.size == "large");
  const track: LastfmInfo = {
    artist: lastfm.recenttracks.track[0].artist["#text"],
    name: lastfm.recenttracks.track[0].name,
    album: lastfm.recenttracks.track[0].album["#text"],
    image: image ? image["#text"] : "",
    listening: Boolean(lastfm.recenttracks.track[0]["@attr"]?.nowplaying),
    url: lastfm.recenttracks.track[0].url,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(track),
  };
};

export {handler};
