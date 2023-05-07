import React, { useState } from "react";
import "./App.css";

function App() {
  const [lastfm, setLastfm] = useState("None")
  const getLastfm = async () => {
    const response = await fetch("/.netlify/functions/lastfm")
      .then(response => response.json()
    )
    setLastfm(JSON.stringify(response))
  }

  return (
    <div className="App">
      <h1>Simple last.fm thingie</h1>
      <button id="fetch-btn" onClick={getLastfm}>Fetch</button>
      <p id="response-output">{lastfm}</p>
    </div>
  );
}

export default App;
