import React, {useState, useEffect} from "react";
import Website from "../../Website.js";

export type FruitsInfo = {
  country: string;
  ranks: {
    global: number;
    country: number;
  };
} | undefined;

export default function Fruits() {
  const [fruits, setFruits]: [FruitsInfo, React.Dispatch<React.SetStateAction<FruitsInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getFruits = async () => {
    setFruits(await fetch("/.netlify/functions/osu_fruits").then(async r => r.json()));
  };

  useEffect(() => {
    getFruits().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (fruits) {
      try {
        setElements([
          <div key={"fruits"} className="flex">
            <img className="m-auto w-16 h-16" alt="fruits mode logo" src="/mode-fruits.png"/>
            <div className="m-auto">
              <p>Global: <strong>#{fruits.ranks.global}</strong></p>
              <p>{fruits.country}: <strong>#{fruits.ranks.country}</strong></p>
            </div>
          </div>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [fruits]);

  return (
    <Website
      name="osu!catch"
      link="https://osu.ppy.sh/users/7276846/fruits"
      elements={elements}
      error={error}
    />
  );
}
