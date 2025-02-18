import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import ButtonLink from "#parts/ButtonLink.js";
import DataHandler from "#Infos/DataHandler.js";

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
            <p key={"github-date-public"}>Latest <strong>public</strong> push: <strong>{data.public.date} on {data.public.repo}</strong></p>,
          );
          elms.push(
            <ButtonLink key={"more"} link={`https://github.com/${data.public.repo}`} text="Repo Link" />,
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
