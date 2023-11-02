import React, { useState, useEffect } from "react";
import Info from "./structure";

export type WanikaniInfo = {
  progression: {
    total_count: number
    data: {
      data: {
        level: number,
        unlocked_at: null | string,
        completed_at: null | string
      }
    }[]
  }
  resets: {
    data: {
      created_at: string,
      original_level: number,
      target_level: number
    }
  }[],
  lessons: {
    available_at: string,
    type: string,
    writing: string
    meanings: [{
      meaning: string
    }],
    url: string
  }[]
  reviews: {
    available_at: string,
    type: string,
    writing: string
    meanings: [{
      meaning: string
    }],
    url: string
  }[],
  more_things_to_review_at: string | null
} | undefined

function Button(lesson: {
  available_at: string,
  type: string,
  writing: string
  meanings: [{
    meaning: string
  }],
  url: string
}) {
  let colour = lesson.type === "radical" ? "bg-sky-600" : lesson.type === "kanji" ? "bg-pink-500" : "bg-fuchsia-700"
  let title = `(${lesson.type}) ${lesson.meanings.map((m) => m.meaning).toString().replace(/,/g, ", ")}`

  return (
    <a href={lesson.url} target="_blank">
      <button title={title} className={`m-1 p-2 ${colour} border-solid border-white border-2 rounded-md`}>
        {lesson.writing}
    </button></a>
  )
}

export default function Wanikani() {
  const [wanikani, setWanikani]: [WanikaniInfo, React.Dispatch<React.SetStateAction<WanikaniInfo>>] = useState()
  const getWanikani = async () => {
    const response = await fetch("/.netlify/functions/wanikani").then(r => r.json())
    setWanikani(response)
  }

  useEffect(() => {
    getWanikani()
  }, [])

  if (wanikani === undefined) {
    return <></>
  }

  const now = new Date()

  let level = <></>
  wanikani.progression.data = wanikani.progression.data.sort((a, b) => b.data.level - a.data.level)
  let level_find = wanikani.progression.data.find(d => d.data.unlocked_at)
  if (level_find) {
    level = <p className="mb-4"><b>Level {level_find.data.level}</b> reached!<br/>
    <b>{new Date(level_find.data.unlocked_at || "").toISOString().substring(0, 10)}</b></p>
  }

  let resets = <></>
  if (wanikani.resets.length) {
    let all_resets: React.JSX.Element[] = []
    for (let i = 0; i < wanikani.resets.length; i++) {
      let data = wanikani.resets[i].data
      all_resets.push(<p><b>{`${new Date(data.created_at).toISOString().substring(0, 10)}`}</b>{`: Reset progress from level ${data.original_level} to ${data.target_level}`}</p>)
    }
    resets = <div className="mb-4">{...all_resets}</div>
  }

  let lessons: React.JSX.Element[] = []
  let filtered_lessons = wanikani.lessons.filter(lesson => new Date(lesson.available_at) < now)
  for (let i = 0; i < filtered_lessons.length; i++) {
    lessons.push(Button(filtered_lessons[i]))
  }
  let lessons_div = lessons.length ? <div className="mt-2 font-bold text-sm">
    {...lessons}
  </div> : <p>No lesson available for now!</p>

  let reviews: React.JSX.Element[] = []
  let filtered_reviews = wanikani.reviews.filter(review => new Date(review.available_at) < now)
  for (let i = 0; i < filtered_reviews.length; i++) {
    reviews.push(Button(filtered_reviews[i]))
  }
  let reviews_div = reviews.length ? <div className="mt-2 font-bold text-sm">
    { ...reviews}
  </div> : <p>No review available for now!</p>

  let when_next_to_review = <></>
  if (wanikani.more_things_to_review_at && !reviews.length) {
    const rtf = new Intl.RelativeTimeFormat("en", {style: "long", numeric: "always"})
    let how_many_hours = new Date(Math.abs(new Date(wanikani.more_things_to_review_at).getTime() - now.getTime())).getUTCHours()
    when_next_to_review = <p className="mt-2">{`There will be more stuff to review ${rtf.format(how_many_hours, "hour")}!`}</p>
  }

  return (
    <Info
      type="Japanese"
      websites={[{
        name: "Wanikani",
        link: "https://www.wanikani.com/users/Taevas",
        elements: [
          level,
          resets,
          <p className="text-xl font-bold">Available lessons ({filtered_lessons.length})</p>,
          lessons_div,
          <p className="mt-4 text-xl font-bold">Available reviews ({filtered_reviews.length})</p>,
          reviews_div,
          when_next_to_review
        ]
      }]}
    />
  )
}
