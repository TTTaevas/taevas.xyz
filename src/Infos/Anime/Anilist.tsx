import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import ButtonLink from "#parts/ButtonLink.js";
import DataHandler from "#Infos/DataHandler.js";

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
  const {data, error, setError} = DataHandler<AnilistInfo>("/.netlify/functions/anilist", 60 * 30);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <div key={"data"} className="flex mb-4">
            <img className="m-auto w-16 h-22" alt="anime cover" src={data.cover} />
            <div className="m-auto pl-2">
              <p className="font-bold">{data.title}</p>
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
          <ButtonLink key={"more"} link={data.url} text="Anime Link" />,
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
