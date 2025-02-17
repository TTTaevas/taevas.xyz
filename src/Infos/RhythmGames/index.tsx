import React, {useEffect, useState} from "react";
import Info from "../Info.js";

import Osu from "./Osu.js";
import { Ruleset } from "osu-api-v2-js";

export default function RhythmGames() {
  const [token, setToken] = useState(false);
  const [websites, setWebsites] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getToken = async () => {
    await fetch("/.netlify/functions/osu_token").then((r) => {
      if (r.ok) {
        setToken(true); 
      } else {
        setError(true);
      }
    });
  };

  useEffect(() => {
    getToken().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (token) {
      const osu = <Osu ruleset={Ruleset.osu} key={"osu"}/>;
      const taiko = <Osu ruleset={Ruleset.taiko} key={"taiko"}/>;
      const fruits = <Osu ruleset={Ruleset.fruits} key={"fruits"}/>;
      const mania = <Osu ruleset={Ruleset.mania} key={"mania"}/>;
      setWebsites([osu, taiko, fruits, mania]);
    }
  }, [token]);
  
  return (
    <Info
      type="Rhythm Games"
      websites={websites}
      error={error}
    />
  );
}
