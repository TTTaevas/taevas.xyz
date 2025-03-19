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
    <div className="hover:font-bold active:font-bold overflow-hidden">
      <a href={link} target="_blank" rel="noreferrer" draggable="false">
        <h2 className="pr-1 py-1 rounded-tr-[10px] bg-white uppercase text-right text-lg font-bold text-indigo-500 transition-all
        hover:brightness-110 hover:pr-16 hover:text-blue-600">
          {name}
        </h2>
      </a>
      <div className="p-4 m-auto max-h-[320px] overflow-auto">
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
                  <MisuseOutline size={48} fill="white"/>
                </div>
                <p className="mx-4">Something went wrong... {"><"}</p>
                <p className="mx-4 mb-2">Please contact me and let me know about it!</p>
              </div> :
              <div className="animate-pulse h-min m-auto">
                <p className="mx-4">Loading...</p>
              </div>
        }
      </div>
    </div>
  );
}
