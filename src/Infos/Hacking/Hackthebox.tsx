import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import ButtonLink from "#parts/ButtonLink.tsx";
import DataHandler from "#Infos/DataHandler.tsx";

export type HacktheboxInfo = {
  id: string;
  date_diff: string;
  date: string;
  object_type: string;
  type: string;
  name: string;
  machine_avatar: string;
} | undefined;

export default function Hackthebox() {
  const {data, error, setError} = DataHandler<HacktheboxInfo>("hacking_hackthebox", 60 * 60);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <div key={"data"} className="flex">
            {
              data.type === "user" ?
                <img className="m-auto h-16 w-16" alt="machine thumbnail" src={data.machine_avatar}/> :
                <a className="m-auto h-16 w-16" href={`https://www.hackthebox.com/achievement/machine/1063999/${data.id}`} target="_blank" rel="noreferrer">
                  <img alt="machine thumbnail" src={data.machine_avatar}/>
                </a>
            }
            <div className="m-auto pl-4">
              <p className="font-bold">{data.name}</p>
              <p>({data.type})</p>
            </div>
          </div>,
          <p key={"date"} className="mt-2 font-bold">{data.date}</p>,
          <ButtonLink key={"more"} link={`https://app.hackthebox.com/machines/${data.name}`} text="Machine Link" />,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="HackTheBox"
      link="https://app.hackthebox.com/profile/1063999"
      elements={elements}
      error={error}
    />
  );
}
