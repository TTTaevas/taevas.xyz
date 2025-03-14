import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import { WKLevelProgression, WKReset } from "@bachmacintosh/wanikani-api-types";
import DataHandler from "#Infos/DataHandler.tsx";

export type WanikaniInfo = {
  progression: {
    total_count: number;
    data: WKLevelProgression[];
  };
  resets: WKReset[];
  lessons: Item[];
  reviews: Item[];
  moreThingsToReviewAt: string | null;
} | undefined;

interface Item {
  available_at: string;
  type: string;
  writing: string;
  meanings: {
    meaning: string;
  }[];
  url: string;
}

function Button(item: Item) {
  const colour = item.type === "radical" ? "bg-sky-600" : item.type === "kanji" ? "bg-pink-500" : "bg-fuchsia-700";
  const title = `(${item.type}) ${item.meanings.map((m) => m.meaning).toString().replace(/,/g, ", ")}`;

  return (
    <a href={item.url} target="_blank" rel="noreferrer">
      <button title={title} className={`m-1 p-2 ${colour} border-solid border-white border-2 rounded-md`}>
        {item.writing}
      </button></a>
  );
}

export default function Wanikani() {
  const {data, error, setError} = DataHandler<WanikaniInfo>("japanese_wanikani", 60 * 60);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        const now = new Date();

        let level = <></>;
        const unlockedLevels = data.progression.data.filter(d => typeof d.data.unlocked_at === "string");
        if (unlockedLevels.length) {
          const arr = unlockedLevels.sort((a, b) => new Date(b.data.unlocked_at!).getTime() - new Date(a.data.unlocked_at!).getTime());
          level = <p className="mb-4"><b>Level {arr[0].data.level}</b> reached!<br/>
            <b>{new Date(arr[0].data.unlocked_at!).toISOString().substring(0, 10)}</b></p>;
        }

        let resets = <></>;
        if (data.resets.length) {
          const allResets: React.JSX.Element[] = [];
          for (const dataWrapper of data.resets) {
            const data = dataWrapper.data;
            allResets.push(<p><b>{`${new Date(data.created_at).toISOString().substring(0, 10)}`}</b>{`: Reset my progress from level ${data.original_level} to level ${data.target_level}`}</p>);
          }

          resets = <div className="mb-4">{...allResets}</div>;
        }

        const lessons: React.JSX.Element[] = [];
        const filteredLessons = data.lessons.filter(lesson => new Date(lesson.available_at) < now);
        for (const lesson of filteredLessons) {
          lessons.push(Button(lesson));
        }

        const lessonsDiv = lessons.length ? <div className="mt-2 font-bold text-sm">
        {...lessons}
        </div> : <p>No lesson available for now!</p>;

        const reviews: React.JSX.Element[] = [];
        const filteredReviews = data.reviews.filter(review => new Date(review.available_at) < now);
        for (const review of filteredReviews) {
          reviews.push(Button(review));
        }

        const reviewsDiv = reviews.length ? <div className="mt-2 font-bold text-sm">
        { ...reviews}
        </div> : <p>No review available for now!</p>;

        let whenNextToReview = <></>;
        if (data.moreThingsToReviewAt) {
          const rtf = new Intl.RelativeTimeFormat("en", {style: "long", numeric: "always"});
          const timeDifference = new Date(Math.abs(new Date(data.moreThingsToReviewAt).getTime() - now.getTime()));
          const howManyHours = (timeDifference.getUTCHours() + 1) + ((24 * (timeDifference.getUTCDate() - 1)) * (timeDifference.getUTCMonth() + 1));
          whenNextToReview = <p className="mt-2">{`There will be more stuff to review ${rtf.format(howManyHours, "hour")}!`}</p>;
        }

        setElements([
          resets,
          level,
          <p key={"lessons"} className="text-xl font-bold">Available lessons ({filteredLessons.length})</p>,
          lessonsDiv,
          <p key={"reviews"} className="mt-4 text-xl font-bold">Available reviews ({filteredReviews.length})</p>,
          reviewsDiv,
          whenNextToReview,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="Wanikani"
      link="https://www.wanikani.com/users/Taevas"
      elements={elements}
      error={error}
    />
  );
}
