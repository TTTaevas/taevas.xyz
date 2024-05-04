import {type Handler} from "@netlify/functions";
import fetch from "node-fetch";
import {type GitlabInfo} from "../../src/components/Info/Coding/GitLab.js";

const handler: Handler = async () => {
  const gitlab = await fetch("https://gitlab.com/api/v4/events?action=pushed", {
    method: "GET",
    headers: {
      "PRIVATE-TOKEN": process.env.API_GITLAB!,
      "Content-Type": "application/json",
      // eslint-disable-next-line @typescript-eslint/naming-convention
      "Accept": "application/json",
    },
  });

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const {created_at} = (await gitlab.json() as Record<string, any>)[0];
  if (typeof created_at !== "string") {
    return {
      statusCode: 404,
    };
  }

  const activity: GitlabInfo = {
    date: created_at.substring(0, created_at.indexOf("T")),
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify(activity),
  };
};

export {handler};
