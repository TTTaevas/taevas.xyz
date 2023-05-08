import { useState, useEffect } from "react";

export default function Hackthebox() {
	const [hackthebox, setHackthebox] = useState({})
  const getHackthebox = async () => {
    const response = await fetch("/.netlify/functions/hackthebox").then(r => r.json())
    setHackthebox(response)
  }

  useEffect(() => {
    getHackthebox()
  }, [])

	if (hackthebox.name === undefined) {
		return <></>
	}

	return (
		<div id="hackthebox">
			<p>Latest machine pwned on HackTheBox:</p>
			<img alt="machine thumbnail" src={hackthebox.machine_avatar}></img>
			<a href={`https://www.hackthebox.com/achievement/machine/1063999/${hackthebox.id}`}>{hackthebox.name}'s {hackthebox.type} {hackthebox.date_diff}</a>
		</div>
	)
}
