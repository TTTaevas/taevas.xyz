import React, { useState, useEffect } from "react";
import Info from "../Info.js";

export type AnilistInfo = {
  title: string
  episodes: {
    watched: number
    total: number
  },
  score: number
  startDate: string
  updateDate: string
  endDate: string
  cover: string
  url: string
} | undefined

export default function Anilist() {
  const [anilist, setAnilist]: [AnilistInfo, React.Dispatch<React.SetStateAction<AnilistInfo>>] = useState()
  const getAnilist = async () => {
    const response = await fetch("/.netlify/functions/anilist").then(r => r.json())
    setAnilist(response)
  }

  useEffect(() => {
    getAnilist()
  }, [])

  if (anilist === undefined) {
    return <></>
  }
  return (
    <Info
      type="Anime"
      websites={[{
        name: "Anilist",
        link: "https://anilist.co/user/Taevas/",
        elements: [
          <div className="flex mb-4">
            <img className="m-auto w-16 h-22" alt="anime cover" src={anilist.cover} />
            <div className="m-auto pl-2">
              <p className="font-bold">{anilist.title}</p>
              <p className="mt-4">Started: <strong>{anilist.startDate}</strong></p>
              {
                anilist.episodes.watched >= anilist.episodes.total ?
                  <p>Finished: <strong>{anilist.endDate}</strong></p> :
                  <p>Ep. {anilist.episodes.watched}: <strong>{anilist.updateDate}</strong></p>
              }
            </div>
          </div>,
          <>
            {
              anilist.episodes.watched >= anilist.episodes.total ?
                <p>I gave it a <strong>{anilist.score}/10</strong></p> :
                <p><strong>{anilist.episodes.watched}/{anilist.episodes.total}</strong> episodes watched</p>
            }
          </>,
          <a className="button-link" href={anilist.url} target="_blank">Anime Link</a>
        ]
      }]}
    />
  )
}
