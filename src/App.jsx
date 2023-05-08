import React from "react";
import "./App.css";

import Lastfm from "./components/Lastfm";
import Speedruncom from "./components/Speedruncom";

function App() {
  return (
    <div className="App">
      <h1>Simple website thingie</h1>
      <Lastfm/>
      <Speedruncom/>
    </div>
  );
}

export default App;
