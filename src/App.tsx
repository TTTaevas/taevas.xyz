import React from "react";
import {createRoot} from "react-dom/client";

import MainContent from "./Main/index.tsx";
import Infos from "./Infos/index.tsx";


const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <div className="App flex text-center bg-gradient-to-tl from-indigo-100 via-sky-300 to-indigo-100 bg-fixed">
      <MainContent/>
      <Infos/>
    </div>
  </React.StrictMode>,
);
