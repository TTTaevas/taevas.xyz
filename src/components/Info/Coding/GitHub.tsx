import React, {useState, useEffect} from "react";
import Website from "../../Website.js";
import ButtonLink from "../../Link/ButtonLink.js";

export type GithubInfo = {
  public?: {
    repo: string;
    date: string;
  };
  private?: {
    date: string;
  };
};

export default function GitHub() {
  const [github, setGithub]: [GithubInfo, React.Dispatch<React.SetStateAction<GithubInfo>>] = useState({});
  const [elements, setElements] = useState([] as React.JSX.Element[]);
  const [error, setError] = useState(false);

  const getGithub = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setGithub(await fetch("/.netlify/functions/github").then(async r => r.json()));
  };

  useEffect(() => {
    getGithub().catch(() => {
      setError(true);
    });
  }, []);

  useEffect(() => {
    if (github.private ?? github.public) {
      try {
        const elms: React.JSX.Element[] = [];

        if (github.private) {
          elms.push(
            <p key={"github-date-private"} className={github.public ? "mb-2" : ""}>Latest <strong>private</strong> push: <strong>{github.private.date}</strong></p>,
          );
        }
    
        if (github.public) {
          elms.push(
            <p key={"github-date-public"}>Latest <strong>public</strong> push: <strong>{github.public.date} on {github.public.repo}</strong></p>,
          );
          elms.push(
            <ButtonLink key={"more"} link={`https://github.com/${github.public.repo}`} text="Repo Link" />,
          );
        }

        setElements(elms);
      } catch {
        setError(true);
      }
    }
  }, [github]);

  return (
    <Website
      name="GitHub"
      link="https://github.com/TTTaevas"
      elements={elements}
      error={error}
    />
  );
}
