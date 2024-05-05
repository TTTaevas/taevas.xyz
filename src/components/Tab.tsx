import React from "react";
import AnimateHeight from "react-animate-height";

export default function Tab({
  tab,
  setTab,
  id,
  name,
  elements,
  image,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
  id: string;
  name: string;
  elements: React.JSX.Element[];
  image?: string;
}) {
  return (
    <AnimateHeight
      id={id}
      duration={300}
      height={tab === id ? "auto" : 0}
    >
      <div className="relative bg-white lg:rounded-t-xl h-12">
        <h3 className="float-left text-5xl text-left pl-2 overflow-hidden">{name.charAt(0).toUpperCase() + name.slice(1)}</h3>
        {image ? <img src={image} className="absolute w-0 sm:w-12 h-12 inset-x-1/2 ml-[-24px]"/> : <></>}
        <div className="float-right cursor-pointer" onClick={() => {
          setTab("none");
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 32 32"><path fill="red" d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4l6.6 6.6L8 22.6L9.4 24l6.6-6.6l6.6 6.6l1.4-1.4l-6.6-6.6L24 9.4z"/></svg>
        </div>
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
