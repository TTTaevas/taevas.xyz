import { Handler } from '@netlify/functions'
import { api } from "./shared/api"
import { WanikaniInfo } from '../../src/components/infos/Wanikani'

const handler: Handler = async (event, context) => {
  let progression = await api<{
    total_count: number
    data: {
      data: {
        level: number,
        unlocked_at: null | string,
        completed_at: null | string
      }
    }[]
  }>
  ("https://api.wanikani.com/v2/level_progressions", process.env["API_WANIKANI"])

  let resets = await api<{
    data: [{
      data: {
        created_at: string,
        original_level: number,
        target_level: number
      }
    }]
  }>
  ("https://api.wanikani.com/v2/resets", process.env["API_WANIKANI"])

  let summary = await api<{
    data: {
      lessons: [{
        available_at: string
        subject_ids: number[]
      }],
      reviews: [{
        available_at: string
        subject_ids: number[]
      }],
      next_reviews_at: null | string,
    }
  }>
  ("https://api.wanikani.com/v2/summary", process.env["API_WANIKANI"])

  let subject_ids_lessons: number[] = []
  let subject_ids_reviews: number[] = []
  let subject_ids_all: number[] = []
  
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
  subject_ids_all = subject_ids_lessons.concat(subject_ids_reviews)

  let subjects = await api<{
    data: {
      id: number,
      object: string,
      data: {
        characters: string,
        slug: string,
        document_url: string,
        meanings: [{
          meaning: string
        }]
      }
    }[]
  }>
  (`https://api.wanikani.com/v2/subjects?ids=${subject_ids_all.toString()}`, process.env["API_WANIKANI"])

  let lessons: {
    available_at: string,
    type: string,
    writing: string
    meanings: [{
      meaning: string
    }],
    url: string
  }[] = []

  for (let i = 0; i < subject_ids_lessons.length; i++) {
    let summary_data = summary.data.lessons.find(lesson => lesson.subject_ids.includes(subject_ids_lessons[i]))
    let subject = subjects.data.find(subject => subject.id === subject_ids_lessons[i])
    if (!summary_data || !subject) {
      console.error("Failed: ", summary_data, subject)
      continue
    }

    lessons.push({
      available_at: summary_data.available_at,
      type: subject.object,
      writing: subject.data.characters || subject.data.slug || subject.data.meanings[0].meaning,
      meanings: subject.data.meanings,
      url: subject.data.document_url
    })
  }

  let reviews: {
    available_at: string,
    type: string,
    writing: string
    meanings: [{
      meaning: string
    }],
    url: string
  }[] = []

  for (let i = 0; i < subject_ids_reviews.length; i++) {
    let summary_data = summary.data.reviews.find(lesson => lesson.subject_ids.includes(subject_ids_reviews[i]))
    let subject = subjects.data.find(subject => subject.id === subject_ids_reviews[i])
    if (!summary_data || !subject) {
      console.error("Failed: ", summary_data, subject)
      continue
    }

    reviews.push({
      available_at: summary_data.available_at,
      type: subject.object,
      writing: subject.data.characters || subject.data.slug || subject.data.meanings[0].meaning,
      meanings: subject.data.meanings,
      url: subject.data.document_url
    })
  }

  let info: WanikaniInfo = {
    progression,
    resets: resets.data,
    lessons,
    reviews,
    more_things_to_review_at: summary.data.next_reviews_at ? summary.data.next_reviews_at : null
  }

  return {
    statusCode: 200,
    body: JSON.stringify(info)
  }
}

export { handler }
