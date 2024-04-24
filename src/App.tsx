import React, { useEffect, useState } from "react";
import "./App.css";

import Infos from "./views/Infos";
import MainContent from "./views/MainContent";

function App() {
  return (
    <div className="App h-screen bg-gradient-to-b from-sky-500 to-white lg:flex">
      <MainContent />
      <Infos />
    </div>
  );
}

export default App;
