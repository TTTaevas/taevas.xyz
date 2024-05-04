import React, {useState, useEffect} from "react";
import Website from "../../Website.js";

export type LastfmInfo = {
  artist: string;
  name: string;
  album: string;
  image: string;
  listening: boolean;
  url: string;
} | undefined;

export default function Lastfm() {
  const [lastfm, setLastfm]: [LastfmInfo, React.Dispatch<React.SetStateAction<LastfmInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getLastfm = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
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
        setElements([
          <div key={"data"} className="flex">
            <img alt="album thumbnail" src={lastfm.image} className="m-auto h-24 w-24" />
            <div className="m-auto pl-4 w-fit">
              <p className="mb-2 font-bold">{lastfm.artist}</p>
              <p className="mt-2 font-bold">{lastfm.name}</p>
            </div>
          </div>,
          <p key={"album"} className="mt-2 font-bold">{lastfm.album}</p>,
          <p key={"status"} className="mt-2">{lastfm.listening ? "(Currently listening!)" : "(Last listened)"}</p>,
          <a key={"more"} className="button-link" href={lastfm.url} target="_blank" rel="noreferrer">Music Details</a>,
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
