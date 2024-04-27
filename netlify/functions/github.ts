import {type Handler} from "@netlify/functions";
import {Octokit} from "@octokit/rest";
import {type GithubInfo} from "../../src/components/Info/Git.js";

const handler: Handler = async () => {
  const octokit = new Octokit({auth: process.env.API_GITHUB});
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const github = await octokit.rest.activity.listEventsForAuthenticatedUser({username: "TTTaevas"});

  if (github.status !== 200) {
    return {
      statusCode: 404,
      body: "",
    };
  }

  const publicPush = github.data.find((e) => e.type === "PushEvent" && e.public);
  const privatePush = github.data.find((e) => e.type === "PushEvent" && !e.public);
  if (!publicPush || !privatePush) {
    return {
      statusCode: 404,
      body: "",
    };
  }
  
  const info: GithubInfo = {
    public: {
      repo: publicPush.repo.name,
      date: publicPush.created_at ? publicPush.created_at.substring(0, publicPush.created_at.indexOf("T")) : "",
    },
    private: {
      date: privatePush.created_at ? privatePush.created_at.substring(0, privatePush.created_at.indexOf("T")) : "",
    },
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify(info),
  };
};

export {handler};
