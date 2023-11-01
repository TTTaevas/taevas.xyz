import React, { useState, useEffect } from "react";
import Info from "./structure";

export type WanikaniInfo = {
  resets: {
    data: {
      created_at: string,
      original_level: number,
      target_level: number
    }
  }[],
  lessons: {
    available_at: Date,
    type: string,
    writing: string
    meanings: [{
      meaning: string
    }],
    url: string
  }[]
  reviews: {
    available_at: Date,
    type: string,
    writing: string
    meanings: [{
      meaning: string
    }],
    url: string
  }[]
} | undefined

function Button(lesson: {
  available_at: Date,
  type: string,
  writing: string
  meanings: [{
    meaning: string
  }],
  url: string
}) {
  let colour = lesson.type === "radical" ? "bg-sky-400" : lesson.type === "kanji" ? "bg-pink-500" : "bg-fuchsia-700"
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

  let lessons: React.JSX.Element[] = []
  for (let i = 0; i < Math.min(wanikani.lessons.length, 20); i++) {
    lessons.push(Button(wanikani.lessons[i]))
  }
  let lessons_div = <div className="m-4 font-bold">
    {...lessons}
  </div>

  let reviews: React.JSX.Element[] = []
  for (let i = 0; i < Math.min(wanikani.reviews.length, 20); i++) {
    reviews.push(Button(wanikani.reviews[i]))
  }
  let reviews_div = <div className="m-4 font-bold">
    {...reviews}
  </div>

  return (
    <Info
      type="Japanese"
      websites={[{
        name: "Wanikani",
        link: "https://www.wanikani.com/users/Taevas",
        elements: [
          lessons_div,
          reviews_div,
        ]
      }]}
    />
  )
}
