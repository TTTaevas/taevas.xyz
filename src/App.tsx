import React from "react";
import {createRoot} from "react-dom/client";

import Infos from "./views/Infos.js";
import MainContent from "./views/MainContent.js";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <div className="App flex text-center bg-gradient-to-tl from-indigo-100 via-sky-300 to-indigo-100 bg-fixed">
      <MainContent/>
      <Infos/>
    </div>
  </React.StrictMode>,
);
