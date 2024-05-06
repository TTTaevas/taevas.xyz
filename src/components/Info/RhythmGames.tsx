import React, {useEffect, useState} from "react";
import Info from "../Info.js";

import Osu from "./RhythmGames/Osu.js";
import Taiko from "./RhythmGames/OsuTaiko.js";
import Fruits from "./RhythmGames/OsuFruits.js";
import Mania from "./RhythmGames/OsuMania.js";

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
      const osu = <Osu key={"osu"}/>;
      const taiko = <Taiko key={"taiko"}/>;
      const fruits = <Fruits key={"fruits"}/>;
      const mania = <Mania key={"mania"}/>;
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
