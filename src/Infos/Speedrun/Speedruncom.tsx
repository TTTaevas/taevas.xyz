import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import ButtonLink from "#parts/ButtonLink.js";
import DataHandler from "#Infos/DataHandler.js";

export type SpeedruncomInfo = {
  place: number;
  link: string;
  date: string;
  thumbnail: string;
  game: string;
  details: string[];
  time: string;
  video?: string;
} | undefined;

export default function Speedruncom() {
  const {data, error, setError} = DataHandler<SpeedruncomInfo>("/.netlify/functions/speedruncom", 60 * 60);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <div key={"data"} className="flex pb-2">
            <img alt="game thumbnail" src={data.thumbnail} className="h-32 m-auto" />
            <div className="m-auto pl-2">
              <p className="mb-2">Placed <strong>#{data.place}</strong> on:</p>
              <p className="font-bold">{data.game}</p>
              {data.details.map((d, i) => <p key={`detail-${i}`}>{d}</p>)}
            </div>
          </div>,
          <p key={"date"} className="mt-2 font-bold">{data.date}</p>,
          <ButtonLink key={"more"} link={data.link} text="Run Details" />,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="Speedrun.com"
      link="https://www.speedrun.com/Taevas/"
      elements={elements}
      error={error}
    />
  );
}
