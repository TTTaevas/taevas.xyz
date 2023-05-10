import React from "react";
import "./App.css";

import Lastfm from "./components/Lastfm";
import Speedruncom from "./components/Speedruncom";
import Hackthebox from "./components/hackthebox";
import Github from "./components/github";
import Gitlab from "./components/gitlab";
import Osu from "./components/osu";
import Anilist from "./components/anilist";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Simple website thingie</h1>
      <div className="info_container">
        <Lastfm/>
        <Speedruncom/>
        {/* <Hackthebox/>
        <Github/>
        <Gitlab/>
        <Osu/>
        <Anilist/> */}
      </div>
    </div>
  );
}

export default App;
