import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import DataHandler from "#Infos/DataHandler.tsx";
import Link from "#parts/Link.tsx";

export type KitsudevInfo = {
  name: string
  url: string
  date: string;
} | undefined;

export default function KitsuDev() {
  const {data, error, setError} = DataHandler<KitsudevInfo>("coding_kitsudev", 60 * 20);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <p key={"kitsudev-date"}>Latest activity: <strong>{data.date.substring(0, data.date.indexOf("T"))}</strong></p>,
          <Link key={"kitsudev-link"} classes="mt-1 px-1 py-2 inline-block w-full font-bold leading-[18px] bg-white text-blue-800" link={data.url} text={data.name}/>
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="KitsuDev"
      link="https://kitsunes.dev/Taevas"
      elements={elements}
      error={error}
    />
  );
}
