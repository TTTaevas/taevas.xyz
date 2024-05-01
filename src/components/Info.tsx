import React, {useState} from "react";
import AnimateHeight, {type Height} from "react-animate-height";

export default function Info({
  type,
  websites,
  error,
}: {
  type: string;
  websites: Array<{
    name: string;
    link: string;
    elements: React.JSX.Element[];
  }>;
  error?: boolean;
}) {
  const [height, setHeight] = useState<Height>(0);
  
  const sections = websites.map((w, i) => {
    setTimeout(() => { // somehow necessary to not always rerender
      setHeight("auto"); 
    }, 0);

    return (
      <AnimateHeight
        key={w.name}
        id={w.name.toLowerCase().match(/[a-z]/g)!.join().replace(/,/g, "")}
        delay={150 * i}
        duration={150 * (i + 1)}
        height={height}
      >
        <a href={w.link} target="_blank" rel="noreferrer">
          <h2 className="uppercase text-right font-bold pr-1 bg-white text-red-500">
            {w.name}
          </h2>
        </a>
        <div className="info p-3 m-auto">
          {w.elements}
        </div>
      </AnimateHeight>
    );
  });

  return (
    <div className="m-5 flex w-80 border-l-3 border-r-3 border-b-3 border-white border-solid" id={type.toLowerCase()}>
      <h2 className={`[text-orientation:upright] [writing-mode:vertical-rl]
      uppercase text-start text-2xl tracking-[-.1em] font-bold pt-2
      border-r-3 border-t-3 border-white border-solid
      ${!error ? sections.length ? "bg-sky-800" : "bg-indigo-800" : "bg-purple-800"}`}>
        {type}
      </h2>
      {
        !error ?
          sections.length ?
            <div className={"w-80 bg-gradient-to-r from-sky-900 to-indigo-900"}>
              {sections}
            </div> :
            <div className={"w-80 bg-gradient-to-r from-indigo-900 to-purple-900 border-t-3"}>
              {sections} {/** loading */}
            </div> :
          <div className={"w-80 bg-gradient-to-r from-purple-900 to-pink-900 border-t-3"}>
            {sections} {/** error */}
          </div>
      }
    </div>
  );
}
