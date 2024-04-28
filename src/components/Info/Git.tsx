import React, {useState, useEffect} from "react";
import Info from "../Info.js";

export type GithubInfo = {
  public: {
    repo: string;
    date: string;
  };
  private: {
    date: string;
  };
} | undefined;

export type GitlabInfo = {
  date: string;
} | undefined;

export default function Git() {
  const [github, setGithub]: [GithubInfo, React.Dispatch<React.SetStateAction<GithubInfo>>] = useState();
  const [gitlab, setGitlab]: [GitlabInfo, React.Dispatch<React.SetStateAction<GitlabInfo>>] = useState();

  const getGitlab = async () => {
    const response = await fetch("/.netlify/functions/gitlab").then(async r => r.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setGitlab(response);
  };

  const getGithub = async () => {
    const response = await fetch("/.netlify/functions/github").then(async r => r.json());
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setGithub(response);
  };

  useEffect(() => {
    void getGithub();
    void getGitlab();
  }, []);

  if (github === undefined || gitlab === undefined) {
    return <></>;
  }

  return (
    <Info
      type="Coding"
      websites={[{
        name: "GitHub",
        link: "https://github.com/TTTaevas",
        elements: [
          <p key={"github-date-private"}>Latest <strong>private</strong> push: <strong>{github.private.date}</strong></p>,
          <p key={"github-date-public"} className="mt-2">Latest <strong>public</strong> push: <strong>{github.public.date} on {github.public.repo}</strong></p>,
          <a key={"github-link"} className="button-link" href={`https://github.com/${github.public.repo}`} target="_blank" rel="noreferrer">Repo Link</a>,
        ],
      },
      {
        name: "GitLab",
        link: "https://gitlab.com/TTTaevas",
        elements: [
          <p key={"gitlab-date"}>Latest push: <strong>{gitlab.date}</strong></p>,
        ],
      }]}
    />
  );
}
