import {type WanikaniInfo} from "#Infos/Japanese/Wanikani.tsx";
import type { WKLevelProgression, WKResetCollection, WKSummary } from "@bachmacintosh/wanikani-api-types";
import type { Handler } from "..";

interface Subject {
  id: number;
  object: string;
  data: {
    characters: string;
    slug: string;
    document_url: string;
    meanings: {
      meaning: string;
    }[];
  };
}

interface StuffToLearn {
  available_at: string;
  type: string;
  writing: string;
  meanings: {
    meaning: string;
  }[];
  url: string;
}

function addStuffToLearn(ids: number[], data: {available_at: string; subject_ids: number[]}[], subjects: Subject[]): StuffToLearn[] {
  const arr: StuffToLearn[] = [];

  for (const id of ids) {
    const summaryData = data.find(lesson => lesson.subject_ids.includes(id));
    const subject = subjects.find(subject => subject.id === id);
    if (!summaryData || !subject) {
      console.error("Failed: ", summaryData, subject);
      continue;
    }

    arr.push({
      available_at: summaryData.available_at,
      type: subject.object,
      writing: subject.data.characters || subject.data.slug || subject.data.meanings[0].meaning,
      meanings: subject.data.meanings,
      url: subject.data.document_url,
    });
  }

  return arr;
}

export const japanese_wanikani: Handler = async () => {
  const urlsToRequest = [
    "https://api.wanikani.com/v2/level_progressions",
    "https://api.wanikani.com/v2/resets",
    "https://api.wanikani.com/v2/summary",
  ];
  const toRequest = urlsToRequest.map((url) => new Promise(async (resolve) => {
    const response = await fetch(url, {headers: {
      "Authorization": `Bearer ${process.env["API_WANIKANI"]}`,
      "Content-Type": "application/json",
    }});
    resolve(await response.json());
  }));

  const data = await Promise.all(toRequest);
  const progression = data[0] as {
    total_count: number;
    data: WKLevelProgression[];
  };
  const resets = data[1] as WKResetCollection;
  const summary = data[2] as WKSummary;

  const subjectIdsLessons: number[] = [];
  for (const lesson of summary.data.lessons) {
    for (const subjectId of lesson.subject_ids) {
      subjectIdsLessons.push(subjectId);
    }
  }

  const subjectIdsReviews: number[] = [];
  for (const review of summary.data.reviews) {
    for (const subjectId of review.subject_ids) {
      subjectIdsReviews.push(subjectId);
    }
  }

  // next_reviews | Checks what reviews will be available in the next 23 hours
  // summary.data.next_reviews_at | Checks beyond that, but will be the current time if a review is already available
  const now = new Date();
  const nextReviews = summary.data.reviews.filter((r) => new Date(r.available_at) > now && r.subject_ids.length);
  const moreThingsToReviewAt = nextReviews.at(0)?.available_at ?? summary.data.next_reviews_at;

  const subjectIdsAll = subjectIdsLessons.concat(subjectIdsReviews);
  const subjects = await (await fetch(`https://api.wanikani.com/v2/subjects?ids=${subjectIdsAll.toString()}`, {headers: {
    "Authorization": `Bearer ${process.env["API_WANIKANI"]}`,
    "Content-Type": "application/json",
  }})).json() as {data: Subject[]};

  const lessons = addStuffToLearn(subjectIdsLessons, summary.data.lessons, subjects.data);
  const reviews = addStuffToLearn(subjectIdsReviews, summary.data.reviews, subjects.data);

  const info: WanikaniInfo = {
    progression,
    resets: resets.data,
    lessons,
    reviews,
    moreThingsToReviewAt,
  };

  return Response.json(info, {status: 200});
};
