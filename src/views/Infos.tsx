import React from "react";
import Music from "../components/Info/Music.js";
import Speedrun from "../components/Info/Speedrun.js";
import Hacking from "../components/Info/Hacking.js";
import Coding from "../components/Info/Coding.js";
import RhythmGames from "../components/Info/RhythmGames.js";
import Anime from "../components/Info/Anime.js";
import Japanese from "../components/Info/Japanese.js";

export default function Infos() {
  return (
    <div className="invisible lg:visible fixed right-0 h-screen outline outline-4 outline-white overflow-y-auto
    text-white bg-gradient-to-r from-sky-600 to-indigo-600">
      <Music/>
      <Coding/>
      <Speedrun/>
      <Anime/>
      <Japanese/>
      <RhythmGames/>
      <Hacking/>
    </div>
  );
}
