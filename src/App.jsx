import React from "react";
import "./App.css";

import Lastfm from "./components/Lastfm";
import Speedruncom from "./components/Speedruncom";
import Hackthebox from "./components/hackthebox";
import Github from "./components/github";

function App() {
  return (
    <div className="App">
      <h1>Simple website thingie</h1>
      <Lastfm/>
      <Speedruncom/>
      <Hackthebox/>
      <Github/>
    </div>
  );
}

export default App;
