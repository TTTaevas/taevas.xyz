import React, {Component} from "react";
import Media from "./Media/index.tsx";
// import Hacking from "./Hacking/index.tsx";
import Coding from "./Coding/index.tsx";
import Gaming from "./Gaming/index.tsx";
// import Japanese from "./Japanese/index.tsx";
import Fediverse from "./Fediverse/index.tsx";
import Website from "./Website/index.tsx";

export default class Infos extends Component {
  private readonly dragbar = React.createRef<HTMLDivElement>();
  private readonly collection = React.createRef<HTMLDivElement>();

  render() {
    return <div ref={this.collection} className="text-base z-110 lg:z-0 w-[27px] lg:w-[360px] fixed right-0 h-screen outline outline-4 outline-white overflow-y-auto
    bg-linear-to-r from-sky-600 to-indigo-600">
      <div draggable="false" ref={this.dragbar} className="z-100 h-full w-[25px] fixed right-[7px] lg:right-[340px] cursor-ew-resize select-none hover:bg-linear-to-r from-white/80 to-white/1 active:to-white/20"></div>
      <div className="z-90 p-2.5 flex flex-wrap text-white">
        <Media/>
        <Fediverse/>
        <Coding/>
        {/*<Japanese/>*/}
        <Gaming/>
        {/*<Hacking/>*/}
        <Website/>
      </div>
    </div>;
  }

  componentDidMount(): void {
    let dragging = false;

    this.dragbar.current?.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        dragging = true;
      }
    });

    document.addEventListener("mousemove", (e) => {
      if (dragging && this.dragbar.current && this.collection.current) {
        this.collection.current.style.width = `${Math.min(Math.max(window.innerWidth - e.pageX, 2), window.innerWidth - 20)}px`;
        this.dragbar.current.style.right = `${Math.min(Math.max(window.innerWidth - e.pageX - 20, 0), window.innerWidth - 40)}px`;
      }
    });
    
    document.addEventListener("mouseup", (e) => {
      if (e.button === 0) {
        dragging = false;
      }
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
