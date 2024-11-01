import React, {Component} from "react";
import AnimateHeight from "react-animate-height";
import type Translatable from "./Translatable.js";
import {type TabDetails, TabContext} from "../contexts.js";

export default class Tab extends Component<{
  setTabs: React.Dispatch<React.SetStateAction<TabDetails[]>>;
  id: string;
  name: ReturnType<typeof Translatable>;
  elements: React.JSX.Element[];
  logo?: JSX.Element;
  position?: string;
}> {
  static contextType = TabContext;
  context!: React.ContextType<typeof TabContext>;
  private readonly div = React.createRef<HTMLDivElement>();
  private readonly header = React.createRef<HTMLDivElement>();

  render() {
    return (
      <TabContext.Consumer>
        {tabs => (
          <AnimateHeight
            className={`absolute w-full lg:w-[525px] lg:rounded-xl ${this.props.position}
              bg-blue-600/75 hover:bg-blue-600/90 active:bg-blue-600/90 backdrop-brightness-75 backdrop-contrast-150 backdrop-blur
              shadow-[12px_12px_0_0] shadow-blue-950/75
              ${tabs.find((t) => t.id === this.props.id)?.priority ?? "z-50"}`}
            ref={this.div}
            duration={250}
            height={tabs.map((t) => t.id).includes(this.props.id) ? "auto" : 0}
          >
            <div ref={this.header} className="relative bg-white lg:rounded-xl h-12 hover:brightness-110 lg:hover:cursor-grab lg:active:cursor-move">
              {this.props.logo ? <div className="absolute start-0 h-0 ml-2 invisible lg:visible fill-gray-600">{this.props.logo}</div> : <></>}
              <div className="absolute end-0 w-0 sm:w-10 mr-1 mt-1 invisible lg:visible cursor-pointer
          rounded-full fill-red-500 hover:fill-black hover:bg-red-500 active:brightness-50" onClick={() => {
                this.props.setTabs(tabs.filter((t) => t.id !== this.props.id));
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                  <path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"/>
                </svg>
              </div>
              <h3 className="text-4xl text-center font-bold text-blue-700 overflow-hidden truncate select-none pt-1">
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
        )}
      </TabContext.Consumer>
    );
  }

  componentDidMount(): void {
    let isDown = false;
    let offsetx = 0;
    let offsety = 0;
  
    this.header.current?.addEventListener("pointerdown", (e) => {
      if (e.button === 0) {
        isDown = true;

        if (this.div.current) {
          offsetx = this.div.current.offsetLeft - e.clientX;
          offsety = this.div.current.offsetTop - e.clientY;
        }
      }
    });

    document.addEventListener("pointerup", (e) => {
      if (e.button === 0) {
        isDown = false;
      }
    });

    this.div.current?.addEventListener("pointerdown", () => {
      const tabs = this.context;
      this.props.setTabs(tabs.map((tab) => {
        if (tab.id === this.props.id) {
          return {id: tab.id, priority: "z-40"};
        } else {
          const newPriority = tab.priority === "z-40" ? "z-30" :
            tab.priority === "z-30" ? "z-20" : "z-10";
          return {id: tab.id, priority: newPriority};
        }
      }));
    });

    document.addEventListener("pointermove", (e) => {
      if (e.clientX < 0 || e.clientY < 0) return;
      if (e.clientX > window.innerWidth || e.clientY > window.innerHeight) return;

      if (this.div.current && isDown && window.innerWidth >= 1024) {
        this.div.current.style.left = `${e.clientX + offsetx}px`;
        this.div.current.style.top = `${e.clientY + offsety}px`;
      }
    });
  }
}
