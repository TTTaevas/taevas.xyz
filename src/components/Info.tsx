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
  const [height, setHeight] = useState<Height>(3);
  
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
      ${!error ? "bg-sky-800" : "bg-purple-800"}`}>
        {type}
      </h2>
      {
        !error ?
          sections.length ?
            <div className="w-80 bg-gradient-to-r from-sky-900 to-indigo-900">
              {sections}
            </div> :
            <div className="flex w-80 bg-gradient-to-r from-sky-900 to-indigo-900 border-t-3">
              <div className="animate-pulse h-min m-auto">
                <div className="animate-spin h-16 w-16 mx-auto mb-2 border-8 border-sky-600 border-r-gray-200 rounded-full"/>
                <p className="mx-4">Loading...</p>
              </div>
            </div> :
          <div className="flex w-80 bg-gradient-to-r from-purple-900 to-pink-900 border-t-3">
            <div className="h-min m-auto">
              <img className="w-16 mb-2 mx-auto" src="/cds/misuse--outline.svg"/>
              <p className="mx-4">Failed to load this info! {"><"}</p>
              <p className="mx-4 mb-2">Please contact me and let me know about it!</p>
            </div>
          </div>
      }
    </div>
  );
}
