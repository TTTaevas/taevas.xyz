import React from "react";
import "./App.css";

import Lastfm from "./components/Lastfm";
import Speedruncom from "./components/Speedruncom";
import Hackthebox from "./components/Hackthebox";
import Git from "./components/Git";
import Osu from "./components/Osu";
import Anilist from "./components/Anilist";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Simple website thingie</h1>
      <div className="inline-block static md:absolute right-0 top-0">
        <Lastfm/>
        <Speedruncom/>
        <Git/>
        <Hackthebox/>
        <Anilist/>
        {/* <Osu/> */}
      </div>
    </div>
  );
}

export default App;
