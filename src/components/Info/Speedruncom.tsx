import React, {useState, useEffect} from "react";
import Info from "../Info.js";

export type SpeedruncomInfo = {
  place: number;
  link: string;
  date: string;
  thumbnail: string;
  game: string;
  details: string[];
} | undefined;

export default function Speedruncom() {
  const [speedruncom, setSpeedruncom]: [SpeedruncomInfo, React.Dispatch<React.SetStateAction<SpeedruncomInfo>>] = useState();
  const getSpeedruncom = async () => {
    const response = await fetch("/.netlify/functions/speedruncom").then(async r => r.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setSpeedruncom(response);
  };

  useEffect(() => {
    void getSpeedruncom();
  }, []);

  if (speedruncom === undefined) {
    return <></>;
  }

  const details = speedruncom.details.map((d, i) => <p key={`detail-${i}`}>{d}</p>);

  return (
    <Info
      type="Speedrun"
      websites={[{
        name: "speedrun.com",
        link: "https://www.speedrun.com/Taevas/",
        elements: [
          <div key={"data"} className="flex pb-2">
            <img alt="game thumbnail" src={speedruncom.thumbnail} className="h-32 m-auto" />
            <div className="m-auto pl-2">
              <p className="mb-2">Placed <strong>#{speedruncom.place}</strong> on:</p>
              <p className="font-bold">{speedruncom.game}</p>
              {details}
            </div>
          </div>,
          <p key={"date"} className="mt-2 font-bold">{speedruncom.date}</p>,
          <a key={"more"} className="button-link" href={speedruncom.link} target="_blank" rel="noreferrer">Run Details</a>,
        ],
      }]}
    />
  );
}
