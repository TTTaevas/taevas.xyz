import {Octokit} from "@octokit/rest";
import {type GithubInfo} from "#Infos/Coding/GitHub.tsx";
import type { Handler } from "..";

export const coding_github: Handler = async () => {
  const octokit = new Octokit({auth: process.env["API_GITHUB"]});
  const github = await octokit.rest.activity.listEventsForAuthenticatedUser({username: "TTTaevas"});

  const publicPush = github.data.find((e) => (e.type === "PushEvent" || e.type === "PullRequestEvent") && e.public);
  const privatePush = github.data.find((e) => (e.type === "PushEvent" || e.type === "PullRequestEvent") && !e.public);
  
  const info: GithubInfo = {
    public: publicPush ? {
      repo: publicPush.repo.name,
      date: publicPush.created_at ? publicPush.created_at.substring(0, publicPush.created_at.indexOf("T")) : "",
    } : undefined,
    private: privatePush ? {
      date: privatePush.created_at ? privatePush.created_at.substring(0, privatePush.created_at.indexOf("T")) : "",
    } : undefined,
  };
  
  return Response.json(info, {status: 200});
};
