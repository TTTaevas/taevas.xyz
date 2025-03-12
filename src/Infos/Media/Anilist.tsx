import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import DataHandler from "#Infos/DataHandler.tsx";
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
  const {data, error, setError} = DataHandler<AnilistInfo>("media_anilist", 60 * 30);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <div key={"data"} className="flex mb-4">
            <img className="m-auto w-18 h-24" alt="anime cover" src={data.cover} />
            <div className="m-auto pl-2">
              <Link classes="mt-1 px-1 py-2 inline-block w-full font-bold leading-[18px] bg-white text-blue-800" link={data.url} text={data.title}/>
              <p className="mt-4">Started: <strong>{data.startDate}</strong></p>
              {
                data.episodes.watched >= data.episodes.total ?
                  <p>Finished: <strong>{data.endDate}</strong></p> :
                  <p>Ep. {data.episodes.watched}: <strong>{data.updateDate}</strong></p>
              }
            </div>
          </div>,
          <>
            {
              data.episodes.watched >= data.episodes.total ?
                <p>I gave it a <strong>{data.score}/10</strong></p> :
                <p><strong>{data.episodes.watched}/{data.episodes.total}</strong> episodes watched</p>
            }
          </>,
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
