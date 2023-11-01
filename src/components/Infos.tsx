import React from "react";
import Lastfm from "./infos/Lastfm";
import Speedruncom from "./infos/Speedruncom";
import Hackthebox from "./infos/Hackthebox";
import Git from "./infos/Git";
import Osu from "./infos/Osu";
import Anilist from "./infos/Anilist";
import Wanikani from "./infos/Wanikani";

function Infos() {
  return (
    <div id="infos" className="hidden lg:inline-block text-white static m-auto lg:bg-gradient-to-r from-sky-600 to-indigo-600
    border-solid border-white lg:border-l-3 h-screen lg:fixed lg:right-0 lg:overflow-y-auto">
      <Lastfm/>
      <Git/>
      <Speedruncom/>
      <Hackthebox/>
      <Anilist/>
      <Osu/>
      {/* <Wanikani/> */}
    </div>
  )
}

export default Infos
