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

	let details = speedruncom.details.map((d) => <p>{d}</p>)

	return (
		<Info
			title="speedrun.com"
			link="https://www.speedrun.com/Taevas/"
			description="Speedrun"
			elements={[
				<div className="flex">
					<img alt="game thumbnail" src={speedruncom.thumbnail} className="h-32 my-auto mb-2"></img>
					<div className="my-auto ml-2">
						<p className="mb-2">Placed <strong>#{speedruncom.place}</strong> on:</p>
						<p><strong>{speedruncom.game}</strong></p>
						{details}
					</div>
				</div>,
				<p className="mt-2"><strong>{speedruncom.date}</strong></p>,
				<a className="button_link" href={speedruncom.link} target="_blank">Run Details</a>
			]}
		/>
	)
}
