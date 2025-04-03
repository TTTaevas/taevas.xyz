import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import DataHandler from "#parts/DataHandler.tsx";

// From https://github.com/umami-software/api-client/blob/master/src/types.ts
export type UmamiInfo = {
  pageviews: { value: number; prev: number };
  visitors: { value: number; prev: number };
  visits: { value: number; prev: number };
  bounces: { value: number; prev: number };
  totaltime: { value: number; prev: number };
} | undefined;

export default function Umami() {
  const {data, error, setError} = DataHandler<UmamiInfo>("infos/website/umami", 60 * 5);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <p className="text-left" key={"info"}>Throughout <b>the last 7 days,</b> my website has been visited <b>{data.visits.value} times!</b></p>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="Analytics"
      link="https://visitors.taevas.xyz/share/DlW6mBQ09DMn0sTQ/taevas.xyz"
      elements={elements}
      error={error}
    />
  );
}