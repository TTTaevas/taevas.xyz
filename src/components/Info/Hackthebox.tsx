import React, {useState, useEffect} from "react";
import Info from "../Info.js";

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
  const getHackthebox = async () => {
    const response = await fetch("/.netlify/functions/hackthebox").then(async r => r.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setHackthebox(response);
  };

  useEffect(() => {
    void getHackthebox();
  }, []);

  if (hackthebox === undefined) {
    return <></>;
  }

  const badge = hackthebox.type === "user" ? <img className="m-auto h-16 w-16" alt="machine thumbnail" src={hackthebox.machine_avatar}/> :
    <a className="m-auto h-16 w-16" href={`https://www.hackthebox.com/achievement/machine/1063999/${hackthebox.id}`} target="_blank" rel="noreferrer">
      <img alt="machine thumbnail" src={hackthebox.machine_avatar}/>
    </a>;

  return (
    <Info
      type="Hacking"
      websites={[{
        name: "HackTheBox",
        link: "https://app.hackthebox.com/profile/1063999",
        elements: [
          <div key={"data"} className="flex">
            {badge}
            <div className="m-auto pl-4">
              <p className="font-bold">{hackthebox.name}</p>
              <p>({hackthebox.type})</p>
            </div>
          </div>,
          <p key={"date"} className="mt-2 font-bold">{hackthebox.date}</p>,
          <a key={"more"} className="button-link" href={`https://app.hackthebox.com/machines/${hackthebox.name}`}>Machine Link</a>,
        ],
      }]}
    />
  );
}
