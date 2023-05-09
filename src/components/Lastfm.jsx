import { useState, useEffect } from "react";
import Info from "./structures/info";

export default function Lastfm() {
	const [lastfm, setLastfm] = useState({})
  const getLastfm = async () => {
    const response = await fetch("/.netlify/functions/lastfm").then(r => r.json())
    setLastfm(response)
  }

  useEffect(() => {
    getLastfm()
  }, [])

	if (lastfm.artist === undefined) {
		return <></>
	}
	return (
		<Info
			title="Lastfm"
			description="Music"
			elements={[
				<a href={lastfm.url} target="_blank" className="flex">
					<img alt="album thumbnail" src={lastfm.image} className="my-auto mx-auto h-2/5 w-2/5"></img>
					<div className="my-auto mx-auto w-min">
						<p><strong>{lastfm.artist}</strong></p>
						<p><strong>{lastfm.name}</strong></p>
					</div>
				</a>,
				<p className="mt-3"><strong>{lastfm.album}</strong></p>,
	 			<p>{lastfm.listening ? "(Currently listening!)" : "(Last listened)"}</p>
			]}
		/>
	)
}
