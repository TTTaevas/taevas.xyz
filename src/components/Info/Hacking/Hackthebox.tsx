import React, {useState, useEffect} from "react";
import Website from "../../Website.js";
import ButtonLink from "../../Link/ButtonLink.js";

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
  const [hackthebox, setHackthebox]: [HacktheboxInfo, React.Dispatch<React.SetStateAction<HacktheboxInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getHackthebox = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setHackthebox(await fetch("/.netlify/functions/hackthebox").then(async r => r.json()));
  };

  useEffect(() => {
    getHackthebox().catch(() => {
      setError(true);
    });
  }, []);


  useEffect(() => {
    if (hackthebox) {
      try {
        setElements([
          <div key={"data"} className="flex">
            {
              hackthebox.type === "user" ?
                <img className="m-auto h-16 w-16" alt="machine thumbnail" src={hackthebox.machine_avatar}/> :
                <a className="m-auto h-16 w-16" href={`https://www.hackthebox.com/achievement/machine/1063999/${hackthebox.id}`} target="_blank" rel="noreferrer">
                  <img alt="machine thumbnail" src={hackthebox.machine_avatar}/>
                </a>
            }
            <div className="m-auto pl-4">
              <p className="font-bold">{hackthebox.name}</p>
              <p>({hackthebox.type})</p>
            </div>
          </div>,
          <p key={"date"} className="mt-2 font-bold">{hackthebox.date}</p>,
          <ButtonLink key={"more"} link={`https://app.hackthebox.com/machines/${hackthebox.name}`} text="Machine Link" />,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [hackthebox]);

  return (
    <Website
      name="HackTheBox"
      link="https://app.hackthebox.com/profile/1063999"
      elements={elements}
      error={error}
    />
  );
}
