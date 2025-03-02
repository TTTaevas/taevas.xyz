import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import DataHandler from "#Infos/DataHandler.js";

export type UmamiInfo = {
  pageviews: number
  visits: number
  visitors: number
  totaltime: number
} | undefined;

export default function Umami() {
  const {data, error, setError} = DataHandler<UmamiInfo>("website_umami", 60 * 5);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <p className="text-left" key={"info"}><b>My website has been <br/>viewed {data.pageviews} times <br/>by {data.visitors} unique visitors!</b></p>
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