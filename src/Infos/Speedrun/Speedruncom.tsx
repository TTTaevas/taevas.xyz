import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import DataHandler from "#Infos/DataHandler.js";
import Link from "#parts/Link.js";
import ButtonLink from "#parts/ButtonLink.js";

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
            <img alt="game thumbnail" src={data.thumbnail} className="h-24 m-auto" />
            <div className="m-auto pl-2">
              <Link key={"more"} classes="mt-1 px-1 py-2 inline-block w-full font-bold leading-[18px] bg-white text-blue-800" link={data.link}
                text={`${data.game} (${data.details.toString()}) in ${data.time}`}/>
              <p className="mt-2">Placed <strong>#{data.place}</strong></p>
              <p className="font-bold">{data.date}</p>
            </div>
          </div>,
          <> {
            data.video ? <ButtonLink key={"youtube"} link={data.video} text="YouTube video"/> : ""
          } </>

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
