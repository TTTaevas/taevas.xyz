import React, { useState, useEffect } from "react";
import Info from "./structure";

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
      type="Music"
      websites={[{
        name: "Last.fm",
        link: "https://www.last.fm/user/TTTaevas",
        elements: [
          <div className="flex">
            <img alt="album thumbnail" src={lastfm.image} className="m-auto h-24 w-24" />
            <div className="m-auto pl-4 w-fit">
              <p className="mb-2 font-bold">{lastfm.artist}</p>
              <p className="mt-2 font-bold">{lastfm.name}</p>
            </div>
          </div>,
          <p className="mt-2 font-bold">{lastfm.album}</p>,
          <p className="mt-2">{lastfm.listening ? "(Currently listening!)" : "(Last listened)"}</p>,
          <a className="button-link" href={lastfm.url} target="_blank">Music Details</a>
        ]
      }]}
    />
  )
}
