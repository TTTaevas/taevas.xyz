import React, {useEffect, useState} from "react";
import Info from "../Info.js";

import Osu from "./Osu.js";
import { Ruleset } from "osu-api-v2-js";
import DataHandler from "#Infos/DataHandler.js";

export default function RhythmGames() {
  const {data, error} = DataHandler<boolean>("/.netlify/functions/token?service=osu", 60 * 60 * 8, false);
  const [websites, setWebsites] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      const osu = <Osu ruleset={Ruleset.osu} key={"osu"}/>;
      const taiko = <Osu ruleset={Ruleset.taiko} key={"taiko"}/>;
      const fruits = <Osu ruleset={Ruleset.fruits} key={"fruits"}/>;
      const mania = <Osu ruleset={Ruleset.mania} key={"mania"}/>;
      setWebsites([osu, taiko, fruits, mania]);
    }
  }, [data]);
  
  return (
    <Info
      type="Rhythm Games"
      websites={websites}
      error={error}
    />
  );
}
