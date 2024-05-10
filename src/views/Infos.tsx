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
    <div className="hidden lg:inline-block text-white static m-auto lg:bg-gradient-to-r from-sky-600 to-indigo-600
    border-solid border-white lg:border-l-4 h-screen lg:fixed lg:right-0 lg:overflow-y-auto">
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
