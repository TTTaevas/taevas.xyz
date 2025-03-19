import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import DataHandler from "#Infos/DataHandler.tsx";
import Link from "#parts/Link.tsx";
import ButtonLink from "#parts/ButtonLink.tsx";

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
  const {data, error, setError} = DataHandler<SpeedruncomInfo>("gaming_speedruncom", 60 * 60);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <div key={"data"} className="flex pb-2">
            <img alt="game thumbnail" src={data.thumbnail} className="h-24 m-auto" />
            <div className="m-auto ml-4 w-full">
              <Link key={"more"} classes="text-lg/6 inline-block px-1 py-2 w-full font-bold bg-white text-blue-800" link={data.link}
                text={`${data.game} (${data.details.toString()}) in ${data.time}`}/>
            </div>
          </div>,
          <p key="placement" className="mt-2">Placed <strong>#{data.place}</strong></p>,
          <p key="date" className="font-bold">{data.date}</p>,
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
