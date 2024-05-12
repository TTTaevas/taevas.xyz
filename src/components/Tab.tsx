import React, {Component} from "react";
import AnimateHeight from "react-animate-height";
import type Translatable from "./Translatable.js";

export default class Tab extends Component<{
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  name: ReturnType<typeof Translatable>;
  elements: React.JSX.Element[];
  logo?: JSX.Element;
}> {
  private readonly div = React.createRef<HTMLDivElement>();
  private readonly header = React.createRef<HTMLDivElement>();

  render() {
    return (
      <AnimateHeight
        className="absolute lg:w-[50%] bg-blue-600/50 backdrop-brightness-75 backdrop-contrast-150 backdrop-blur rounded-xl m-auto lg:mb-8 shadow-[12px_12px_0_0] shadow-blue-950"
        ref={this.div}
        duration={300}
        height={this.props.tab === this.props.id ? "auto" : 0}
      >
        <div ref={this.header} className="relative bg-white lg:rounded-xl h-12 hover:brightness-110 hover:cursor-grab active:cursor-move">
          {this.props.logo ? <div className="absolute start-0 h-0 ml-2 invisible sm:visible fill-gray-600">{this.props.logo}</div> : <></>}
          <div className="absolute end-0 w-0 sm:w-10 mr-1 mt-1 cursor-pointer
          rounded-full fill-red-500 hover:fill-black hover:bg-red-500 active:brightness-50" onClick={() => {
            this.props.setTab("none");
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
              <path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"/>
            </svg>
          </div>
          <h3 className="text-4xl text-center font-bold text-blue-700 overflow-hidden select-none pt-1">
            {this.props.name} - taevas.xyz
          </h3>
        </div>
        <div className="drop-shadow-2xl">
          {
            this.props.elements.map((e, i) => 
              <div key={`element-${i}}`}>
                {e}
              </div>,
            )
          }
        </div>
      </AnimateHeight>
    );
  }

  componentDidMount(): void {
    let isDown = false;
    let offsetx = 0;
    let offsety = 0;
  
    this.header.current?.addEventListener("mousedown", (e) => {
      isDown = true;

      if (this.div.current) {
        offsetx = this.div.current.offsetLeft - e.clientX;
        offsety = this.div.current.offsetTop - e.clientY;
      }
    });

    this.header.current?.parentElement?.parentElement?.parentElement?.parentElement?.addEventListener("mouseup", () => {
      isDown = false;
    });

    this.div.current?.parentElement?.parentElement?.parentElement?.addEventListener("mousemove", (e) => {
      if (this.div.current && isDown) {
        this.div.current.style.left = `${e.clientX + offsetx}px`;
        this.div.current.style.top = `${e.clientY + offsety}px`;
      }
    });
  }
}
