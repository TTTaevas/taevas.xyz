import {type LastfmInfo} from "#Infos/Media/Lastfm.tsx";
import type { Handler } from "../..";

const username = "TTTaevas";

export const lastfm: Handler = async () => {
  /** https://www.last.fm/api/show/user.getRecentTracks */
  const lastfm = await (await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${process.env["API_LASTFM"]}&format=json&limit=1`)).json() as {
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

  return Response.json(track, {status: 200});
};
