import React from "react";
import AnimateHeight from "react-animate-height";
import type Translatable from "./Translatable.js";

export default function Tab({
  tab,
  setTab,
  id,
  name,
  elements,
  logo,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  name: ReturnType<typeof Translatable>;
  elements: React.JSX.Element[];
  logo?: JSX.Element;
}) {
  return (
    <AnimateHeight
      id={id}
      duration={300}
      height={tab === id ? "auto" : 0}
    >
      <div className="relative bg-white lg:rounded-t-xl h-12">
        {logo ? <div className="absolute start-0 h-0 ml-2 invisible sm:visible">{logo}</div> : <></>}
        <div className="absolute end-0 w-0 sm:w-10 mr-1 mt-1 cursor-pointer
        rounded-full fill-red-500 hover:fill-black hover:bg-red-500 active:brightness-50" onClick={() => {
          setTab("none");
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"/>
          </svg>
        </div>
        <h3 className="text-5xl text-center overflow-hidden select-none">
          {name}
        </h3>
      </div>
      {
        elements.map((e, i) => 
          <div key={`element-${i}}`}>
            {e}
          </div>,
        )
      }
    </AnimateHeight>
  );
}
