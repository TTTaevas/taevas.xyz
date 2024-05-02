import React, {useState, useEffect} from "react";
import Info from "../Info.js";
import {handleError} from "./shared/handleError.js";

export type GithubInfo = {
  public?: {
    repo: string;
    date: string;
  };
  private?: {
    date: string;
  };
};

export type GitlabInfo = {
  date: string;
} | undefined;

export default function Git() {
  const [github, setGithub]: [GithubInfo, React.Dispatch<React.SetStateAction<GithubInfo>>] = useState({});
  const [gitlab, setGitlab]: [GitlabInfo, React.Dispatch<React.SetStateAction<GitlabInfo>>] = useState();
  const [error, setError] = useState(false);

  const getGithub = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setGithub(await fetch("/.netlify/functions/github").then(async r => r.json()));
  };

  const getGitlab = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setGitlab(await fetch("/.netlify/functions/gitlab").then(async r => r.json()));
  };

  useEffect(() => {
    let errors = 0;
    const promises = [
      getGithub().catch(() => {
        errors++;
      }),
      getGitlab().catch(() => {
        errors++;
      }),
    ];
    void Promise.all(promises).then(() => {
      if (errors >= 1) {
        setError(true);
      }
    });
  }, []);


  try {
    const githubElements: React.JSX.Element[] = [];

    if (github.private) {
      githubElements.push(
        <p key={"github-date-private"} className={github.public ? "mb-2" : ""}>Latest <strong>private</strong> push: <strong>{github.private.date}</strong></p>,
      );
    }

    if (github.public) {
      githubElements.push(
        <p key={"github-date-public"}>Latest <strong>public</strong> push: <strong>{github.public.date} on {github.public.repo}</strong></p>,
      );
      githubElements.push(
        <a key={"github-link"} className="button-link" href={`https://github.com/${github.public.repo}`} target="_blank" rel="noreferrer">Repo Link</a>,
      );
    }

    const gitlabElements: React.JSX.Element[] = [];

    if (gitlab) {
      gitlabElements.push(<p key={"gitlab-date"}>Latest push: <strong>{gitlab.date}</strong></p>);
    }

  
    const websites: Array<{
      name: string;
      link: string;
      elements: React.JSX.Element[];
    }> = [];

    if (githubElements.length) {
      websites.push({
        name: "GitHub",
        link: "https://github.com/TTTaevas",
        elements: githubElements,
      });
    }

    if (gitlabElements.length) {
      websites.push({
        name: "GitLab",
        link: "https://gitlab.com/TTTaevas",
        elements: gitlabElements,
      });
    }

    if (websites.length < 2) {
      return handleError("Coding", error);
    }

    return (
      <Info
        type="Coding"
        websites={websites}
      />
    );
  } catch (e) {
    return handleError("Coding", true, e);
  }
}
