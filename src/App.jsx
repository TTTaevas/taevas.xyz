import React from "react";
import "./App.css";

import Lastfm from "./components/Lastfm";
import Speedruncom from "./components/Speedruncom";
import Hackthebox from "./components/Hackthebox";
import Github from "./components/Github";
import Gitlab from "./components/Gitlab";
import Osu from "./components/Osu";
import Anilist from "./components/Anilist";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Simple website thingie</h1>
      <div className="info_container">
        <Lastfm/>
        <Speedruncom/>
        <Osu/>
        {/* <Hackthebox/>
        <Github/>
        <Gitlab/>
        <Anilist/> */}
      </div>
    </div>
  );
}

export default App;
