import React, {useState, useEffect} from "react";
import Website from "../../Website.js";
import ButtonLink from "../../Link/ButtonLink.js";

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
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getSpeedruncom = async () => {
    setSpeedruncom(await fetch("/.netlify/functions/speedruncom").then(async r => r.json()));
  };

  useEffect(() => {
    getSpeedruncom().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (speedruncom) {
      try {
        setElements([
          <div key={"data"} className="flex pb-2">
            <img alt="game thumbnail" src={speedruncom.thumbnail} className="h-32 m-auto" />
            <div className="m-auto pl-2">
              <p className="mb-2">Placed <strong>#{speedruncom.place}</strong> on:</p>
              <p className="font-bold">{speedruncom.game}</p>
              {speedruncom.details.map((d, i) => <p key={`detail-${i}`}>{d}</p>)}
            </div>
          </div>,
          <p key={"date"} className="mt-2 font-bold">{speedruncom.date}</p>,
          <ButtonLink key={"more"} link={speedruncom.link} text="Run Details" />,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [speedruncom]);

  return (
    <Website
      name="Speedrun.com"
      link="https://www.speedrun.com/Taevas/"
      elements={elements}
      error={error}
    />
  );
}
