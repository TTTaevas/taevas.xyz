import React, {useState, useEffect} from "react";
import Website from "../../Website.js";

export type OsuInfo = {
  country: string;
  ranks: {
    global: number;
    country: number;
  };
} | undefined;

export default function Osu() {
  const [osu, setOsu]: [OsuInfo, React.Dispatch<React.SetStateAction<OsuInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getOsu = async () => {
    setOsu(await fetch("/.netlify/functions/osu_osu").then(async r => r.json()));
  };

  useEffect(() => {
    getOsu().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (osu) {
      try {
        setElements([
          <div key={"osu"} className="flex">
            <img className="m-auto w-16 h-16" alt="osu mode logo" src="/mode-osu.png"/>
            <div className="m-auto">
              <p>Global: <strong>#{osu.ranks.global}</strong></p>
              <p>{osu.country}: <strong>#{osu.ranks.country}</strong></p>
            </div>
          </div>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [osu]);

  return (
    <Website
      name="osu!"
      link="https://osu.ppy.sh/users/7276846/osu"
      elements={elements}
      error={error}
    />
  );
}
