import React from "react";
import {createRoot} from "react-dom/client";
import "./App.css";

import Infos from "./views/Infos.js";
import MainContent from "./views/MainContent.js";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <div className="App h-screen w-full m-auto text-center bg-gradient-to-b from-sky-500 to-white lg:flex">
      <MainContent />
      <Infos />
    </div>
  </React.StrictMode>,
);

