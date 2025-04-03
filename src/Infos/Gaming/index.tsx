import React, {useEffect, useState} from "react";
import Info from "../Info.tsx";

import Speedruncom from "./Speedruncom.tsx";
// import Osu from "./Osu.tsx";
// import { Ruleset } from "osu-api-v2-js";
// import DataHandler from "#parts/DataHandler.tsx";

export default function RhythmGames() {
//   const {data, error} = DataHandler<boolean>("infos/token?service=osu", 60 * 60 * 8, false);
  const [websites, setWebsites] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    setWebsites([<Speedruncom key={"speedruncom"}/>]);
  }, []);

  // useEffect(() => {
  //   if (data) {
  //     const osu = <Osu ruleset={Ruleset.osu} key={"osu"}/>;
  //     const taiko = <Osu ruleset={Ruleset.taiko} key={"taiko"}/>;
  //     const fruits = <Osu ruleset={Ruleset.fruits} key={"fruits"}/>;
  //     const mania = <Osu ruleset={Ruleset.mania} key={"mania"}/>;
  //     setWebsites(websites.concat([osu, taiko, fruits, mania]));
  //   }
  // }, [data]);
  
  return (
    <Info
      type="Gaming"
      websites={websites}
      //       error={error}
    />
  );
}
