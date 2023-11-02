import React, { useState, useEffect } from "react";
import Info from "./structure";

export type SpeedruncomInfo = {
  place: number
  link: string
  date: string
  thumbnail: string
  game: string
  details: string[]
} | undefined

export default function Speedruncom() {
  const [speedruncom, setSpeedruncom]: [SpeedruncomInfo, React.Dispatch<React.SetStateAction<SpeedruncomInfo>>] = useState()
  const getSpeedruncom = async () => {
    const response = await fetch("/.netlify/functions/speedruncom").then(r => r.json())
    setSpeedruncom(response)
  }

  useEffect(() => {
    getSpeedruncom()
  }, [])

  if (speedruncom === undefined) {
    return <></>
  }

  let details = speedruncom.details.map((d) => <p>{d}</p>)

  return (
    <Info
      type="Speedrun"
      websites={[{
        name: "speedrun.com",
        link: "https://www.speedrun.com/Taevas/",
        elements: [
          <div className="flex pb-2">
            <img alt="game thumbnail" src={speedruncom.thumbnail} className="h-32 m-auto" />
            <div className="m-auto pl-2">
              <p className="mb-2">Placed <strong>#{speedruncom.place}</strong> on:</p>
              <p className="font-bold">{speedruncom.game}</p>
              {details}
            </div>
          </div>,
          <p className="mt-2 font-bold">{speedruncom.date}</p>,
          <a className="button-link" href={speedruncom.link} target="_blank">Run Details</a>
        ]
      }]}
    />
  )
}
