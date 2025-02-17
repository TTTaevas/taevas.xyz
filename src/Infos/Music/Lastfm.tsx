import React, {useState, useEffect} from "react";
import {format} from "timeago.js";
import Website from "../Website.js";
import Link from "#parts/Link.js";

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
  const [lastfm, setLastfm]: [LastfmInfo, React.Dispatch<React.SetStateAction<LastfmInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getLastfm = async () => {
    setLastfm(await fetch("/.netlify/functions/lastfm").then(async r => r.json()));
  };

  const updateLastFm = () => {
    getLastfm().catch(() => {
      setError(true);
    });
  };

  useEffect(() => {
    updateLastFm();

    const timer = setInterval(() => {
      updateLastFm();
    }, 2 * 60 * 1000);
    return () => {
      clearInterval(timer); 
    };
  }, []);

  useEffect(() => {
    if (lastfm) {
      try {
        const date = new Date(Number(lastfm.date) * 1000);
        const dateParagraph = !lastfm.listening ? <p key="date" className="text-left mt-1">
          When: <span className="font-bold">{format(date)}</span>
        </p> : <></>;

        setElements([
          <div key="data" className="flex leading-[18px]">
            <img alt="album thumbnail" src={lastfm.image} className="m-auto h-24 w-24"/>
            <div className="m-auto pl-4 w-fit">
              <p className="mb-2">{lastfm.listening ? "I'm currently listening to" : "Last listened to"}</p>
              <Link classes="mt-1 px-1 py-2 inline-block w-full font-bold leading-[18px] bg-white text-blue-800" link={lastfm.url} text={lastfm.name}/>
            </div>
          </div>,
          <p key="artist" className="text-left mt-4">Artist: <span className="font-bold">{lastfm.artist}</span></p>,
          <p key="album" className="text-left mt-1">Album: <span className="font-bold">{lastfm.album}</span></p>,
          dateParagraph,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [lastfm]);

  return (
    <Website
      name="Last.fm"
      link="https://www.last.fm/user/TTTaevas"
      elements={elements}
      error={error}
    />
  );
}
