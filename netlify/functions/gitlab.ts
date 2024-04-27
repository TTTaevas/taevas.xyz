import {type Handler} from "@netlify/functions";
import fetch from "node-fetch";
import {type GitlabInfo} from "../../src/components/Info/Git.js";

const handler: Handler = async () => {
  const gitlab = await fetch("https://gitlab.com/api/v4/events?action=pushed", {
    method: "GET",
    headers: {
      "PRIVATE-TOKEN": process.env.API_GITLAB!,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  if (gitlab.status !== 200) {
    return {
      statusCode: 404,
      body: "",
    };
  }

  const json = await gitlab.json() as Record<string, any>;
  const activity: GitlabInfo = {
    date: json[0].created_at.substring(0, json[0].created_at.indexOf("T")),
  };
  
  return {
    statusCode: 200,
    body: JSON.stringify(activity),
  };
};

export {handler};
