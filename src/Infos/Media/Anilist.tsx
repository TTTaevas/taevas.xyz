import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import DataHandler from "#parts/DataHandler.tsx";
import Link from "#parts/Link.tsx";

export type AnilistInfo = {
  title: string;
  episodes: {
    watched: number;
    total: number;
  };
  score: number;
  startDate: string;
  updateDate: string;
  endDate: string;
  cover: string;
  url: string;
} | undefined;

export default function Anilist() {
  const {data, error, setError} = DataHandler<AnilistInfo>("infos/media/anilist", 60 * 30);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <div key={"data"} className="flex mb-4">
            <img className="mx-auto w-18 h-24" alt="anime cover" src={data.cover} />
            <div className="m-auto ml-4 w-full">
              <Link classes="text-lg/6 inline-block px-1 py-2 w-full font-bold bg-white text-blue-800" link={data.url} text={data.title}/>
            </div>
          </div>,
          <p key="start" className="text-left">Started: <strong>{data.startDate}</strong></p>,
          <p key="last" className="text-left">{data.episodes.watched >= data.episodes.total ?
            <>Finished: <strong>{data.endDate}</strong></> :
            <>Ep. {data.episodes.watched}: <strong>{data.updateDate}</strong></>}</p>,
          <p key="status" className="text-left">{data.episodes.watched >= data.episodes.total ?
            <>I gave it a <strong>{data.score}/10</strong></> :
            <><strong>{data.episodes.watched}/{data.episodes.total}</strong> episodes watched</>}</p>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="Anilist"
      link="https://anilist.co/user/Taevas/"
      elements={elements}
      error={error}
    />
  );
}
