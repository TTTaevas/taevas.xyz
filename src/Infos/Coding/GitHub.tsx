import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import DataHandler from "#Infos/DataHandler.js";
import Link from "#parts/Link.js";

export interface GithubInfo {
  public?: {
    repo: string;
    date: string;
  };
  private?: {
    date: string;
  };
}

export default function GitHub() {
  const {data, error, setError} = DataHandler<GithubInfo>("/.netlify/functions/github", 60 * 20);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data && (data.private ?? data.public)) {
      try {
        const elms: React.JSX.Element[] = [];

        if (data.private) {
          elms.push(
            <p key={"github-date-private"} className={data.public ? "mb-2" : ""}>Latest <strong>private</strong> push: <strong>{data.private.date}</strong></p>,
          );
        }
    
        if (data.public) {
          elms.push(
            <p key={"github-date-public"}>Latest <strong>public</strong> push: <strong>{data.public.date}</strong></p>,
          );
          elms.push(
            <Link classes="mt-1 px-1 py-2 inline-block w-full font-bold leading-[18px] bg-white text-blue-800" link={`https://github.com/${data.public.repo}`} text={data.public.repo}/>
          );
        }

        setElements(elms);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="GitHub"
      link="https://github.com/TTTaevas"
      elements={elements}
      error={error}
    />
  );
}
