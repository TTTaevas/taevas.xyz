import React from "react";
import "./App.css";

import Infos from "./components/Infos";

function App() {
  return (
    <div className="App bg-gradient-to-b from-sky-500 to-white md:flex">
      <div className="h-screen w-screen" style={{marginRight: "363px"}}>
        <h1 className="text-8xl font-bold">Hi, I'm Taevas!</h1>
        <h2 className="text-3xl font-bold">If you're here, you're probably interested by who I am and what I do</h2>
        
      </div>
      <div>
        <Infos />
      </div>
    </div>
  );
}

export default App;
