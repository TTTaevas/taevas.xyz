import React, { useState, useEffect } from "react";
import "./App.css";

import Lastfm from "./components/Lastfm";

function App() {
  return (
    <div className="App">
      <h1>Simple last.fm thingie</h1>
      <Lastfm/>
    </div>
  );
}

export default App;
