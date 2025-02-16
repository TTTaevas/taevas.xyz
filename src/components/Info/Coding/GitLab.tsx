import React, {useState, useEffect} from "react";
import Website from "../../Website.js";

export type GitlabInfo = {
  date: string;
} | undefined;

export default function GitLab() {
  const [gitlab, setGitlab]: [GitlabInfo, React.Dispatch<React.SetStateAction<GitlabInfo>>] = useState();
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getGitlab = async () => {
    setGitlab(await fetch("/.netlify/functions/gitlab").then(async r => r.json()));
  };

  useEffect(() => {
    getGitlab().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (gitlab) {
      try {
        setElements([
          <p key={"gitlab-date"}>Latest push: <strong>{gitlab.date}</strong></p>,
        ]);
      } catch {
        setError(true);
      }
    }
  }, [gitlab]);

  return (
    <Website
      name="GitLab"
      link="https://gitlab.com/TTTaevas"
      elements={elements}
      error={error}
    />
  );
}
