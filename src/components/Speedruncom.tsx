import React, { useState, useEffect } from "react";
import Info from "./structures/info";

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

	let game = speedruncom.game
	speedruncom.details.forEach((d) => game += ` - ${d}`)

	return (
		<Info
			title="speedrun.com"
			link="https://www.speedrun.com/Taevas/"
			description="Speedrun"
			elements={[
				<a href={speedruncom.link} target="_blank" className="p-0">
					<img alt="game thumbnail" src={speedruncom.thumbnail} className="h-32 mx-auto mb-2"></img>
					<p className="leading-5"><strong>#{speedruncom.place}</strong> on <strong>{game}</strong></p>
				</a>,
				<p className="mt-2"><strong>{speedruncom.date}</strong></p>
			]}
		/>
	)
}
