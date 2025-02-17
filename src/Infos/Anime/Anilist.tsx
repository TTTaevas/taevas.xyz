import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import ButtonLink from "#parts/ButtonLink.js";

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
  const [anilist, setAnilist]: [AnilistInfo, React.Dispatch<React.SetStateAction<AnilistInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getAnilist = async () => {
    setAnilist(await fetch("/.netlify/functions/anilist").then(async r => r.json()));
  };

  useEffect(() => {
    getAnilist().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (anilist) {
      try {
        setElements([
          <div key={"data"} className="flex mb-4">
            <img className="m-auto w-16 h-22" alt="anime cover" src={anilist.cover} />
            <div className="m-auto pl-2">
              <p className="font-bold">{anilist.title}</p>
              <p className="mt-4">Started: <strong>{anilist.startDate}</strong></p>
              {
                anilist.episodes.watched >= anilist.episodes.total ?
                  <p>Finished: <strong>{anilist.endDate}</strong></p> :
                  <p>Ep. {anilist.episodes.watched}: <strong>{anilist.updateDate}</strong></p>
              }
            </div>
          </div>,
          <>
            {
              anilist.episodes.watched >= anilist.episodes.total ?
                <p>I gave it a <strong>{anilist.score}/10</strong></p> :
                <p><strong>{anilist.episodes.watched}/{anilist.episodes.total}</strong> episodes watched</p>
            }
          </>,
          <ButtonLink key={"more"} link={anilist.url} text="Anime Link" />,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [anilist]);

  return (
    <Website
      name="Anilist"
      link="https://anilist.co/user/Taevas/"
      elements={elements}
      error={error}
    />
  );
}
