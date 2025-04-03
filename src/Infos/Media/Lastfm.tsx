import React, {useState, useEffect} from "react";
import {format} from "timeago.js";
import Website from "../Website.tsx";
import Link from "#parts/Link.tsx";
import DataHandler from "#parts/DataHandler.tsx";

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
  const {data, error, setError} = DataHandler<LastfmInfo>("infos/media/lastfm", 60 * 2);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        const date = new Date(Number(data.date) * 1000);
        setElements([
          <div key="data" className="flex mb-4">
            <img alt="album thumbnail" src={data.image} className="mx-auto h-24 w-24"/>
            <div className="m-auto ml-4 w-full">
              <Link classes="text-lg/6 inline-block px-1 py-2 w-full font-bold bg-white text-blue-800" link={data.url} text={data.name}/>
            </div>
          </div>,
          <p key="artist" className="text-left">Artist: <strong>{data.artist}</strong></p>,
          <p key="album" className="text-left">Album: <strong>{data.album}</strong></p>,
          <>{
            data.listening ?
              <p key="date" className="mt-2 font-bold">Currently listening!</p> :
              <p key="date" className="text-left">When: <strong>{format(date)}</strong></p>
          }</>,
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
