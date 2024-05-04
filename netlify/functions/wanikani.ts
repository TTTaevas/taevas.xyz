import {type Handler} from "@netlify/functions";
import {api} from "./shared/api.js";
import {type WanikaniInfo} from "../../src/components/Info/Japanese/Wanikani.js";

type Subject = {
  id: number;
  object: string;
  data: {
    characters: string;
    slug: string;
    document_url: string;
    meanings: Array<{
      meaning: string;
    }>;
  };
};

type StuffToLearn = {
  available_at: string;
  type: string;
  writing: string;
  meanings: Array<{
    meaning: string;
  }>;
  url: string;
};

function addStuffToLearn(ids: number[], data: Array<{available_at: string; subject_ids: number[]}>, subjects: Subject[]): StuffToLearn[] {
  const arr: StuffToLearn[] = [];

  for (const id of ids) {
    const summaryData = data.find(lesson => lesson.subject_ids.includes(id));
    const subject = subjects.find(subject => subject.id === id);
    if (!summaryData || !subject) {
      console.error("Failed: ", summaryData, subject);
      continue;
    }

    arr.push({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      available_at: summaryData.available_at,
      type: subject.object,
      writing: subject.data.characters || subject.data.slug || subject.data.meanings[0].meaning,
      meanings: subject.data.meanings,
      url: subject.data.document_url,
    });
  }

  return arr;
}

const handler: Handler = async () => {
  const data: any[] = await Promise.all([
    new Promise((resolve) => {
      resolve(api("https://api.wanikani.com/v2/level_progressions", process.env.API_WANIKANI)); 
    }),
    new Promise((resolve) => {
      resolve(api("https://api.wanikani.com/v2/resets", process.env.API_WANIKANI)); 
    }),
    new Promise((resolve) => {
      resolve(api("https://api.wanikani.com/v2/summary", process.env.API_WANIKANI)); 
    }),
  ]);

  const progression: {
    total_count: number;
    data: Array<{
      data: {
        level: number;
        unlocked_at: undefined | string;
        completed_at: undefined | string;
        abandoned_at: undefined | string;
      };
    }>;
  } = data[0];

  const resets: {
    data: [{
      data: {
        created_at: string;
        original_level: number;
        target_level: number;
      };
    }];
  } = data[1];

  const summary: {
    data: {
      lessons: Array<{
        available_at: string;
        subject_ids: number[];
      }>;
      reviews: Array<{
        available_at: string;
        subject_ids: number[];
      }>;
      next_reviews_at: undefined | string;
    };
  } = data[2];

  const subjectIdsLessons: number[] = [];
  const subjectIdsReviews: number[] = [];
  for (const lesson of summary.data.lessons) {
    for (const subjectId of lesson.subject_ids) {
      subjectIdsLessons.push(subjectId);
    }
  }

  for (const review of summary.data.reviews) {
    for (const subjectId of review.subject_ids) {
      subjectIdsReviews.push(subjectId);
    }
  }

  const now = new Date();
  // next_reviews checks what reviews will be available in the next 23 hours
  // summary.data.next_reviews_at checks beyond that, but will be the current time if a review is already available
  const nextReviews = summary.data.reviews
    .map((r: {subject_ids: number[]; available_at: Date | string}) => {
      r.available_at = new Date(r.available_at); return r;
    })
    .filter((r) => r.available_at > now && r.subject_ids.length) as Array<{subject_ids: number[]; available_at: Date}>;
  const moreThingsToReviewAt = nextReviews[0] ? nextReviews[0].available_at.toISOString() : summary.data.next_reviews_at ? summary.data.next_reviews_at : undefined;

  const subjectIdsAll = subjectIdsLessons.concat(subjectIdsReviews);
  const subjects = await api<{data: Subject[]}>(`https://api.wanikani.com/v2/subjects?ids=${subjectIdsAll.toString()}`, process.env.API_WANIKANI);

  const lessons = addStuffToLearn(subjectIdsLessons, summary.data.lessons, subjects.data);
  const reviews = addStuffToLearn(subjectIdsReviews, summary.data.reviews, subjects.data);

  const info: WanikaniInfo = {
    progression,
    resets: resets.data,
    lessons,
    reviews,
    moreThingsToReviewAt,
  };

  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
