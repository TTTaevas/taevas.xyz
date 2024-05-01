import {type Handler} from "@netlify/functions";
import {Octokit} from "@octokit/rest";
import {type GithubInfo} from "../../src/components/Info/Git.js";

const handler: Handler = async () => {
  const octokit = new Octokit({auth: process.env.API_GITHUB});
  const github = await octokit.rest.activity.listEventsForAuthenticatedUser({username: "TTTaevas"});

  const publicPush = github.data.find((e) => e.type === "PushEvent" && e.public);
  const privatePush = github.data.find((e) => e.type === "PushEvent" && !e.public);
  
  const info: GithubInfo = {
    public: publicPush ? {
      repo: publicPush.repo.name,
      date: publicPush.created_at ? publicPush.created_at.substring(0, publicPush.created_at.indexOf("T")) : "",
    } : undefined,
    private: privatePush ? {
      date: privatePush.created_at ? privatePush.created_at.substring(0, privatePush.created_at.indexOf("T")) : "",
    } : undefined,
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
