import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import DataHandler from "#Infos/DataHandler.js";

export type GitlabInfo = {
  date: string;
} | undefined;

export default function GitLab() {
  const {data, error, setError} = DataHandler<GitlabInfo>("/.netlify/functions/gitlab", 60 * 20);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        setElements([
          <p key={"gitlab-date"}>Latest push: <strong>{data.date}</strong></p>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="GitLab"
      link="https://gitlab.com/TTTaevas"
      elements={elements}
      error={error}
    />
  );
}
