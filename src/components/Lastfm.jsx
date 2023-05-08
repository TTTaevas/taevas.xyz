import { useState, useEffect } from "react";

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
		<div id="lastfm">
			<p>{lastfm.listening ? "Currently listening to:" : "Last listened to:"}</p>
			<img alt="album thumbnail" src={lastfm.image}></img>
			<p><strong>{lastfm.artist}</strong> - {lastfm.name}</p>
			<p>{lastfm.album}</p>
		</div>
	)
	
}
