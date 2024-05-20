import React, {Component} from "react";
import Music from "../components/Info/Music.js";
import Speedrun from "../components/Info/Speedrun.js";
import Hacking from "../components/Info/Hacking.js";
import Coding from "../components/Info/Coding.js";
import RhythmGames from "../components/Info/RhythmGames.js";
import Anime from "../components/Info/Anime.js";
import Japanese from "../components/Info/Japanese.js";

export default class Infos extends Component {
  private readonly dragbar = React.createRef<HTMLDivElement>();
  private readonly collection = React.createRef<HTMLDivElement>();

  render() {
    return <div ref={this.collection} className="z-[110] lg:z-[0] w-[27px] lg:w-[360px] fixed right-0 h-screen outline outline-4 outline-white overflow-y-auto
    bg-gradient-to-r from-sky-600 to-indigo-600">
      <div ref={this.dragbar} className="z-[100] h-full w-[25px] fixed right-[7px] lg:right-[335px] cursor-ew-resize"></div>
      <div className="z-[90] p-2.5 flex flex-wrap text-white">
        <Music/>
        <Coding/>
        <Speedrun/>
        <Anime/>
        <Japanese/>
        <RhythmGames/>
        <Hacking/>
      </div>
      
    </div>;
  }

  componentDidMount(): void {
    let dragging = false;

    this.dragbar.current?.addEventListener("pointerdown", (e) => {
      dragging = true;
    });

    document.addEventListener("pointermove", (e) => {
      if (dragging && this.dragbar.current && this.collection.current) {
        this.collection.current.style.width = `${window.innerWidth - e.pageX}px`;
        this.dragbar.current.style.right = `${Math.max(window.innerWidth - e.pageX - 20, 0)}px`;
      }
    });
    
    document.addEventListener("pointerup", (e) => {
      dragging = false;
    });
  }
}
