import React from "react";
import Lastfm from "./infos/Lastfm";
import Speedruncom from "./infos/Speedruncom";
import Hackthebox from "./infos/Hackthebox";
import Git from "./infos/Git";
import Osu from "./infos/Osu";
import Anilist from "./infos/Anilist";

function Infos() {
	return (
		<div className="hidden md:inline-block text-white static m-auto md:bg-gradient-to-r from-sky-600 to-indigo-600
    border-solid border-white md:border-l-3 h-screen md:fixed md:right-0 md:overflow-y-auto">
      <Lastfm/>
      <Speedruncom/>
      <Git/>
      <Hackthebox/>
      <Anilist/>
      <Osu/>
    </div>
	)
}

export default Infos
