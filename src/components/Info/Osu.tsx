import React, {useState, useEffect} from "react";
import Info from "../Info.js";
import "../../style/infos/osu.css";

export type OsuInfo = {
  country: string;
  osu: {global: number; country: number};
  taiko: {global: number; country: number};
  fruits: {global: number; country: number};
  mania: {global: number; country: number};
} | undefined;

export default function Osu() {
  const [osu, setOsu]: [OsuInfo, React.Dispatch<React.SetStateAction<OsuInfo>>] = useState();
  const getOsu = async () => {
    const response = await fetch("/.netlify/functions/osu").then(async r => r.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setOsu(response);
  };

  useEffect(() => {
    void getOsu();
  }, []);

  if (osu === undefined) {
    return <></>;
  }

  return (
    <Info
      type="Rhythm games"
      websites={[{
        name: "osu!",
        link: "https://osu.ppy.sh/users/7276846/osu",
        elements: [
          <div key={"osu"} className="flex">
            <img className="m-auto w-16 h-16" alt="osu mode logo" src="/mode-osu.png" />
            <div className="m-auto">
              <p>Global: <strong>#{osu.osu.global}</strong></p>
              <p>{osu.country}: <strong>#{osu.osu.country}</strong></p>
            </div>
          </div>,
        ],
      }, {
        name: "osu!taiko",
        link: "https://osu.ppy.sh/users/7276846/taiko",
        elements: [
          <div key={"osu!taiko"} className="flex">
            <img className="m-auto w-16 h-16" alt="taiko mode logo" src="/mode-taiko.png" />
            <div className="m-auto">
              <p>Global: <strong>#{osu.taiko.global}</strong></p>
              <p>{osu.country}: <strong>#{osu.taiko.country}</strong></p>
            </div>
          </div>,
        ],
      }, {
        name: "osu!catch",
        link: "https://osu.ppy.sh/users/7276846/fruits",
        elements: [
          <div key={"osu!catch"} className="flex">
            <img className="m-auto w-16 h-16" alt="ctb mode logo" src="/mode-fruits.png" />
            <div className="m-auto">
              <p>Global: <strong>#{osu.fruits.global}</strong></p>
              <p>{osu.country}: <strong>#{osu.fruits.country}</strong></p>
            </div>
          </div>,
        ],
      }, {
        name: "osu!mania",
        link: "https://osu.ppy.sh/users/7276846/mania",
        elements: [
          <div key={"osu!mania"} className="flex">
            <img className="m-auto w-16 h-16" alt="mania mode logo" src="/mode-mania.png" />
            <div className="m-auto">
              <p>Global: <strong>#{osu.mania.global}</strong></p>
              <p>{osu.country}: <strong>#{osu.mania.country}</strong></p>
            </div>
          </div>,
        ],
      }]}
    />
  );
}
