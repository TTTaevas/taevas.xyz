import { Handler } from '@netlify/functions'
import { api } from "./shared/api"
import { WanikaniInfo } from '../../src/components/infos/Wanikani'

type Subject = {
  id: number
  object: string
  data: {
    characters: string
    slug: string
    document_url: string
    meanings: {
      meaning: string
    }[]
  }
}

function addStuffToLearn(ids: number[], data: {available_at: string, subject_ids: number[]}[], subjects: Subject[]): {
  available_at: string
  type: string
  writing: string
  meanings: [{
    meaning: string
  }]
  url: string
}[] {
  const arr: any[] = []

  for (let i = 0; i < ids.length; i++) {
    const summary_data = data.find(lesson => lesson.subject_ids.includes(ids[i]))
    const subject = subjects.find(subject => subject.id === ids[i])
    if (!summary_data || !subject) {
      console.error("Failed: ", summary_data, subject)
      continue
    }

    arr.push({
      available_at: summary_data.available_at,
      type: subject.object,
      writing: subject.data.characters || subject.data.slug || subject.data.meanings[0].meaning,
      meanings: subject.data.meanings,
      url: subject.data.document_url
    })
  }

  return arr
}

const handler: Handler = async () => {
  const data: any[] = await Promise.all([
    new Promise((resolve) => resolve(api("https://api.wanikani.com/v2/level_progressions", process.env["API_WANIKANI"]))),
    new Promise((resolve) => resolve(api("https://api.wanikani.com/v2/resets", process.env["API_WANIKANI"]))),
    new Promise((resolve) => resolve(api("https://api.wanikani.com/v2/summary", process.env["API_WANIKANI"])))
  ])

  const progression: {
    total_count: number
    data: {
      data: {
        level: number
        unlocked_at: null | string
        completed_at: null | string
        abandoned_at: null| string
      }
    }[]
  } = data[0]

  const resets: {
    data: [{
      data: {
        created_at: string
        original_level: number
        target_level: number
      }
    }]
  } = data[1]

  const summary: {
    data: {
      lessons: {
        available_at: string
        subject_ids: number[]
      }[],
      reviews: {
        available_at: string
        subject_ids: number[]
      }[],
      next_reviews_at: null | string
    }
  } = data[2]

  const subject_ids_lessons: number[] = []
  const subject_ids_reviews: number[] = []
  for (let i = 0; i < summary.data.lessons.length; i++) {
    for (let e = 0; e < summary.data.lessons[i].subject_ids.length; e++) {
      subject_ids_lessons.push(summary.data.lessons[i].subject_ids[e])
    }
  }
  for (let i = 0; i < summary.data.reviews.length; i++) {
    for (let e = 0; e < summary.data.reviews[i].subject_ids.length; e++) {
      subject_ids_reviews.push(summary.data.reviews[i].subject_ids[e])
    }
  }

  const now = new Date()
  // next_reviews checks what reviews will be available in the next 23 hours
  // summary.data.next_reviews_at checks beyond that, but will be the current time if a review is already available
  const next_reviews = summary.data.reviews
  .map((r: {subject_ids: number[], available_at: Date | string}) => {r.available_at = new Date(r.available_at); return r})
  .filter((r) => r.available_at > now && r.subject_ids.length) as {subject_ids: number[], available_at: Date}[]
  const more_things_to_review_at = next_reviews[0] ? next_reviews[0].available_at.toISOString() : summary.data.next_reviews_at ? summary.data.next_reviews_at : null

  const subject_ids_all = subject_ids_lessons.concat(subject_ids_reviews)
  const subjects = await api<{data: Subject[]}>(`https://api.wanikani.com/v2/subjects?ids=${subject_ids_all.toString()}`, process.env["API_WANIKANI"])

  const lessons = addStuffToLearn(subject_ids_lessons, summary.data.lessons, subjects.data)
  const reviews = addStuffToLearn(subject_ids_reviews, summary.data.reviews, subjects.data)

  const info: WanikaniInfo = {
    progression,
    resets: resets.data,
    lessons,
    reviews,
    more_things_to_review_at
  }

  return {
    statusCode: 200,
    body: JSON.stringify(info)
  }
}

export { handler }
