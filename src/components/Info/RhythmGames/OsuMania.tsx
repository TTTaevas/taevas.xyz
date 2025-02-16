import React, {useState, useEffect} from "react";
import Website from "../../Website.js";

export type ManiaInfo = {
  country: string;
  ranks: {
    global: number;
    country: number;
  };
} | undefined;

export default function Mania() {
  const [mania, setMania]: [ManiaInfo, React.Dispatch<React.SetStateAction<ManiaInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getMania = async () => {
    setMania(await fetch("/.netlify/functions/osu_mania").then(async r => r.json()));
  };

  useEffect(() => {
    getMania().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (mania) {
      try {
        setElements([
          <div key={"mania"} className="flex">
            <img className="m-auto w-16 h-16" alt="mania mode logo" src="/mode-mania.png"/>
            <div className="m-auto">
              <p>Global: <strong>#{mania.ranks.global}</strong></p>
              <p>{mania.country}: <strong>#{mania.ranks.country}</strong></p>
            </div>
          </div>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [mania]);

  return (
    <Website
      name="osu!mania"
      link="https://osu.ppy.sh/users/7276846/mania"
      elements={elements}
      error={error}
    />
  );
}
