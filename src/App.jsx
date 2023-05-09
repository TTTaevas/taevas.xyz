import React from "react";
import "./App.css";

import Lastfm from "./components/Lastfm";
import Speedruncom from "./components/Speedruncom";
import Hackthebox from "./components/hackthebox";
import Github from "./components/github";
import Osu from "./components/osu";
import Anilist from "./components/anilist";

function App() {
  return (
    <div className="App">
      <h1>Simple website thingie</h1>
      <Lastfm/>
      <Speedruncom/>
      <Hackthebox/>
      <Github/>
      <Osu/>
      <Anilist/>
    </div>
  );
}

export default App;
