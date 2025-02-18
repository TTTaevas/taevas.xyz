import React, {useState, useEffect} from "react";
import {format} from "timeago.js";
import Website from "../Website.js";
import Link from "#parts/Link.js";
import DataHandler from "#Infos/DataHandler.js";

export type LastfmInfo = {
  artist: string;
  name: string;
  album: string;
  image: string;
  listening: boolean;
  url: string;
  date: string;
} | undefined;

export default function Lastfm() {
  const {data, error, setError} = DataHandler<LastfmInfo>("/.netlify/functions/lastfm", 60 * 2);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        const date = new Date(Number(data.date) * 1000);
        const dateParagraph = !data.listening ? <p key="date" className="text-left mt-1">
          When: <span className="font-bold">{format(date)}</span>
        </p> : <></>;

        setElements([
          <div key="data" className="flex leading-[18px]">
            <img alt="album thumbnail" src={data.image} className="m-auto h-24 w-24"/>
            <div className="m-auto pl-4 w-fit">
              <p className="mb-2">{data.listening ? "I'm currently listening to" : "Last listened to"}</p>
              <Link classes="mt-1 px-1 py-2 inline-block w-full font-bold leading-[18px] bg-white text-blue-800" link={data.url} text={data.name}/>
            </div>
          </div>,
          <p key="artist" className="text-left mt-4">Artist: <span className="font-bold">{data.artist}</span></p>,
          <p key="album" className="text-left mt-1">Album: <span className="font-bold">{data.album}</span></p>,
          dateParagraph,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="Last.fm"
      link="https://www.last.fm/user/TTTaevas"
      elements={elements}
      error={error}
    />
  );
}
