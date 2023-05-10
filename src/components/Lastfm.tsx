import React, { useState, useEffect } from "react";
import Info from "./structures/info";

export type LastfmInfo = {
	artist: string
	name: string
  album: string
  image: string
  listening: Boolean
  url: string
} | undefined

export default function Lastfm() {
	const [lastfm, setLastfm]: [LastfmInfo, React.Dispatch<React.SetStateAction<LastfmInfo>>] = useState()
  const getLastfm = async () => {
    const response = await fetch("/.netlify/functions/lastfm").then(r => r.json())
    setLastfm(response)
  }

  useEffect(() => {
    getLastfm()
  }, [])

	if (lastfm === undefined) {
		return <></>
	}
	return (
		<Info
			title="Last.fm"
			link="https://www.last.fm/user/TTTaevas"
			description="Music"
			elements={[
				<a href={lastfm.url} target="_blank" className="flex">
					<img alt="album thumbnail" src={lastfm.image} className="my-auto mx-auto h-2/5 w-2/5"></img>
					<div className="my-auto mx-auto w-min">
						<p className="leading-4 mb-2"><strong>{lastfm.artist}</strong></p>
						<p className="leading-4 mt-2"><strong>{lastfm.name}</strong></p>
					</div>
				</a>,
				<p><strong>{lastfm.album}</strong></p>,
	 			<p>{lastfm.listening ? "(Currently listening!)" : "(Last listened)"}</p>
			]}
		/>
	)
}
