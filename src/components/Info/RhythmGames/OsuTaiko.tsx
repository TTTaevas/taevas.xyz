import React, {useState, useEffect} from "react";
import Website from "../../Website.js";

export type TaikoInfo = {
  country: string;
  ranks: {
    global: number;
    country: number;
  };
} | undefined;

export default function Taiko() {
  const [taiko, setTaiko]: [TaikoInfo, React.Dispatch<React.SetStateAction<TaikoInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getTaiko = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setTaiko(await fetch("/.netlify/functions/osu_taiko").then(async r => r.json()));
  };

  useEffect(() => {
    getTaiko().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (taiko) {
      try {
        setElements([
          <div key={"taiko"} className="flex">
            <img className="m-auto w-16 h-16" alt="taiko mode logo" src="/mode-taiko.png"/>
            <div className="m-auto">
              <p>Global: <strong>#{taiko.ranks.global}</strong></p>
              <p>{taiko.country}: <strong>#{taiko.ranks.country}</strong></p>
            </div>
          </div>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [taiko]);

  return (
    <Website
      name="osu!taiko"
      link="https://osu.ppy.sh/users/7276846/taiko"
      elements={elements}
      error={error}
    />
  );
}
