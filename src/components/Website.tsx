import {MisuseOutline} from "@carbon/icons-react";
import React, {useEffect, useState} from "react";
import AnimateHeight, {type Height} from "react-animate-height";

export default function Website({
  name,
  link,
  elements,
  error,
}: {
  name: string;
  link: string;
  elements: React.JSX.Element[];
  error: boolean;
}) {
  const [height, setHeight] = useState<Height>(15);
  const state = elements.length ? 1 : error ? 2 : 0;

  useEffect(() => {
    if (elements.length) {
      setHeight("auto"); 
    }
  }, [elements]);

  return (
    <div id={name.toLowerCase().match(/[a-z]/g)!.join().replace(/,/g, "")}>
      <a href={link} target="_blank" rel="noreferrer" draggable="false">
        <h2 className="uppercase text-right font-bold pr-1 bg-white text-red-500">
          {name}
        </h2>
      </a>
      <div className={`info p-3 m-auto bg-gradient-to-r
      ${state !== 2 ? "from-sky-900 to-indigo-900" : "from-purple-900 to-pink-900"}
      `}>
        {
          state === 1 ?
            elements.map((e, i) => 
              <AnimateHeight
                key={`element-${i}}`}
                duration={150}
                height={height}
              >
                {e}
              </AnimateHeight>,
            ) :
            state === 2 ?
              <div>
                <div className="w-min mb-2 mx-auto">
                  <MisuseOutline size={48} fill="red"/>
                </div>
                <p className="mx-4">Something went wrong... {"><"}</p>
                <p className="mx-4 mb-2">Please contact me and let me know about it!</p>
              </div> :
              <div className="animate-pulse h-min m-auto">
                {/* <div className="animate-spin h-16 w-16 mx-auto mb-2 border-8 border-sky-600 border-r-gray-200 rounded-full"/> */}
                <p className="mx-4">Loading...</p>
              </div>
        }
      </div>
    </div>
  );
}
