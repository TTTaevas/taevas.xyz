import { useState, useEffect } from "react";

export default function Anilist() {
	const [anilist, setAnilist] = useState({})
  const getAnilist = async () => {
    const response = await fetch("/.netlify/functions/anilist").then(r => r.json())
    setAnilist(response)
  }

  useEffect(() => {
    getAnilist()
  }, [])

	if (anilist.title === undefined) {
		return <></>
	}
	return (
		<div id="anilist">
			<p>{anilist.episodes.watched >= anilist.episodes.total ? "Last anime watched:" : "Currently watching:"}</p>
			<img alt="anime cover" src={anilist.cover}></img>
			<p><strong>{anilist.title}</strong></p>
			<p>Started on {anilist.startDate.substring(0, anilist.startDate.indexOf("T"))}</p>
			{
				anilist.episodes.watched >= anilist.episodes.total ?
					<div id="finished_anime">
						<p>Finished on {anilist.endDate.substring(0, anilist.endDate.indexOf("T"))}</p>
						<p>Rated it a <strong>{anilist.score}/10</strong></p>
					</div> :
					<div id="inprogress_anime">
						<p>Last watched on {anilist.updateDate.substring(0, anilist.updateDate.indexOf("T"))}</p>
						<p><strong>Currently {anilist.episodes.watched}/{anilist.episodes.total} episodes in</strong></p>
						<p><s>please no spoil</s></p>
					</div>
			}
		</div>
	)
}
