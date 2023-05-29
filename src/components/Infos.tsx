import React from "react";
import Lastfm from "./infos/Lastfm";
import Speedruncom from "./infos/Speedruncom";
import Hackthebox from "./infos/Hackthebox";
import Git from "./infos/Git";
import Osu from "./infos/Osu";
import Anilist from "./infos/Anilist";

function Infos() {
	return (
		<div className="h-full fixed right-0 overflow-y-auto border-l-3 border-white border-solid bg-gradient-to-r from-sky-600 to-indigo-600 text-white inline-block static">
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
