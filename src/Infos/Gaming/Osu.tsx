import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import { Ruleset } from "osu-api-v2-js";
import DataHandler from "#parts/DataHandler.tsx";

export type OsuInfo = {
  country: string;
  ranks: {
    global: number;
    country: number;
  };
} | undefined;

export default function Osu(args: {ruleset: Ruleset}) {
  const {data, error, setError} = DataHandler<OsuInfo>(`infos/gaming/osu?ruleset=${args.ruleset}`, 60 * 45);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  const ruleset = Ruleset[args.ruleset];
  let name = ruleset;
  if (name === "osu") {
    name = "";
  } else if (name === "fruits") {
    name = "catch";
  }

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <div key={`osu-${ruleset}`} className="flex">
            <img className="m-auto w-16 h-16" alt={`${ruleset} mode logo`} src={`/assets/osu_rulesets/${ruleset}.png`}/>
            <div className="m-auto">
              <p>Global: <strong>#{data.ranks.global}</strong></p>
              <p>{data.country}: <strong>#{data.ranks.country}</strong></p>
            </div>
          </div>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name={`osu!${name}`}
      link={`https://osu.ppy.sh/users/7276846/${ruleset}`}
      elements={elements}
      error={error}
    />
  );
}
