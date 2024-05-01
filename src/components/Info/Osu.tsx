import React, {useState, useEffect} from "react";
import Info from "../Info.js";
import "../../style/infos/osu.css";

export type OsuInfo = {
  country: string;
  osu?: {global: number; country: number};
  taiko?: {global: number; country: number};
  fruits?: {global: number; country: number};
  mania?: {global: number; country: number};
};

export default function Osu() {
  const [osu, setOsu]: [OsuInfo, React.Dispatch<React.SetStateAction<OsuInfo>>] = useState({country: "Unknown"});
  const [error, setError] = useState(false);

  const getOsu = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setOsu(await fetch("/.netlify/functions/osu").then(async r => r.json()));
  };

  useEffect(() => {
    getOsu().catch(() => {
      setError(true);
    });
  }, []);


  const generateWebsite = (name: string, interalName: string, data: {global: number; country: number} | undefined) => {
    const website = {
      name,
      link: `https://osu.ppy.sh/users/7276846/${interalName}`,
      elements: [] as React.JSX.Element[],
    };

    if (data) {
      website.elements.push(
        <div key={interalName} className="flex">
          <img className="m-auto w-16 h-16" alt={`${name} mode logo`} src={`/mode-${interalName}.png`} />
          <div className="m-auto">
            <p>Global: <strong>#{data.global}</strong></p>
            <p>{osu.country}: <strong>#{data.country}</strong></p>
          </div>
        </div>,
      );
    }

    return website;
  };

  const osuWebsite = generateWebsite("osu!", "osu", osu.osu);
  const taikoWebsite = generateWebsite("osu!taiko", "taiko", osu.taiko);
  const catchWebsite = generateWebsite("osu!catch", "fruits", osu.fruits);
  const maniaWebsite = generateWebsite("osu!mania", "mania", osu.mania);

  const websites = [
    osuWebsite,
    taikoWebsite,
    catchWebsite,
    maniaWebsite,
  ];

  for (const website of websites) {
    if (!website.elements.length) {
      return (
        <Info
          type="Rhythm games"
          websites={[]}
          error={error}
        />
      );
    }
  }

  return (
    <Info
      type="Rhythm games"
      websites={[
        osuWebsite,
        taikoWebsite,
        catchWebsite,
        maniaWebsite,
      ]}
    />
  );
}
