import React from "react";
import "./App.css";

import Infos from "./components/Infos";

function App() {
  return (
    <div className="App md:flex">
      <div className="md:w-screen">
        <h1 className="text-3xl font-bold underline">Simple website thingie</h1>
      </div>
      <div className="md:w-96">
        <Infos />
      </div>
    </div>
  );
}

export default App;
