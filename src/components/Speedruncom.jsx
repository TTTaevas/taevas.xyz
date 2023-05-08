import { useState, useEffect } from "react";

export default function Speedruncom() {
	const [speedruncom, setSpeedruncom] = useState({})
  const getSpeedruncom = async () => {
    const response = await fetch("/.netlify/functions/speedruncom").then(r => r.json())
    setSpeedruncom(response)
  }

  useEffect(() => {
    getSpeedruncom()
  }, [])

	if (speedruncom.game === undefined) {
		return <></>
	}

	let game = speedruncom.game
	speedruncom.details.forEach((d) => game += ` - ${d}`)

	return (
		<div id="speedruncom">
			<p>My last speedrun:</p>
			<img alt="game thumbnail" src={speedruncom.thumbnail}></img>
			<a href={speedruncom.link}>#{speedruncom.place} on {game}</a>
			<p><strong>{speedruncom.date}</strong></p>
		</div>
	)
}
