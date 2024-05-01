import React from "react";
import Lastfm from "../components/Info/Lastfm.js";
import Speedruncom from "../components/Info/Speedruncom.js";
import Hackthebox from "../components/Info/Hackthebox.js";
import Git from "../components/Info/Git.js";
import Osu from "../components/Info/Osu.js";
import Anilist from "../components/Info/Anilist.js";
import Wanikani from "../components/Info/Wanikani.js";

function Infos() {
  return (
    <div id="infos" className="hidden lg:inline-block text-white static m-auto lg:bg-gradient-to-r from-sky-600 to-indigo-600
    border-solid border-white lg:border-l-3 h-screen lg:fixed lg:right-0 lg:overflow-y-auto">
      <Lastfm/>
      {/* <Git/> */}
      <Speedruncom/>
      <Anilist/>
      <Wanikani/>
      <Osu/>
      <Hackthebox/>
    </div>
  );
}

export default Infos;
