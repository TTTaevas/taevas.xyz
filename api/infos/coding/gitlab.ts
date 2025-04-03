import { Gitlab } from "@gitbeaker/rest";
import {type GitlabInfo} from "#Infos/Coding/GitLab.tsx";
import type { Handler } from "../..";

export const gitlab: Handler = async () => {
  const api = new Gitlab({token: process.env["API_GITLAB"]!});
  const gitlab = await api.Events.all({action: "pushed"});

  const created_at = gitlab.at(0)?.created_at;
  if (typeof created_at !== "string") {
    return new Response("Not Found", {status: 404});
  }

  const activity: GitlabInfo = {
    date: created_at.substring(0, created_at.indexOf("T")),
  };

  return Response.json(activity, {status: 200});
};
