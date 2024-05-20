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

    this.dragbar.current?.addEventListener("mousedown", (e) => {
      dragging = true;
    });

    document.addEventListener("mousemove", (e) => {
      if (dragging && this.dragbar.current && this.collection.current) {
        this.collection.current.style.width = `${Math.min(Math.max(window.innerWidth - e.pageX, 2), window.innerWidth - 20)}px`;
        this.dragbar.current.style.right = `${Math.min(Math.max(window.innerWidth - e.pageX - 20, 0), window.innerWidth - 40)}px`;
      }
    });
    
    document.addEventListener("mouseup", (e) => {
      dragging = false;
    });

    // Mobile support
    this.dragbar.current?.addEventListener("touchmove", (e) => {
      if (this.dragbar.current && this.collection.current) {
        this.collection.current.style.width = `${Math.min(Math.max(window.innerWidth - e.targetTouches[0].pageX, 2), window.innerWidth - 20)}px`;
        this.dragbar.current.style.right = `${Math.min(Math.max(window.innerWidth - e.targetTouches[0].pageX - 20, 0), window.innerWidth - 40)}px`;
      }
    });
  }
}
