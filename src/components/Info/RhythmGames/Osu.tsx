import React, {useState, useEffect} from "react";
import Website from "../../Website.js";
import { Ruleset } from "osu-api-v2-js";

export type OsuInfo = {
  country: string;
  ranks: {
    global: number;
    country: number;
  };
} | undefined;

export default function Osu(args: {ruleset: Ruleset}) {
  const [osu, setOsu]: [OsuInfo, React.Dispatch<React.SetStateAction<OsuInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const ruleset = Ruleset[args.ruleset];
  let name = ruleset;
  if (name === "osu") {
    name = "";
  } else if (name === "fruits") {
    name = "catch";
  }

  const getOsu = async () => {
    setOsu(await fetch(`/.netlify/functions/osu?ruleset=${args.ruleset}`).then(async r => r.json()));
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
          <div key={`osu-${ruleset}`} className="flex">
            <img className="m-auto w-16 h-16" alt={`${ruleset} mode logo`} src={`/mode-${ruleset}.png`}/>
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
      name={`osu!${name}`}
      link={`https://osu.ppy.sh/users/7276846/${ruleset}`}
      elements={elements}
      error={error}
    />
  );
}
