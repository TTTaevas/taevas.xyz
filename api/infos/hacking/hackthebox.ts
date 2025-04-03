import {type HacktheboxInfo} from "#Infos/Hacking/Hackthebox.tsx";
import type { Handler } from "../..";

const user_id = 1063999;

export const hackthebox: Handler = async () => {
  /** https://documenter.getpostman.com/view/13129365/TVeqbmeq#1b0b22fc-2e45-456a-9a8f-42888375d1a9 */
  const hackthebox = await (await fetch(`https://www.hackthebox.com/api/v4/profile/activity/${user_id}`)).json() as {
    profile: {
      activity: HacktheboxInfo[];
    };
  };

  const pwn = hackthebox.profile.activity.find((a: HacktheboxInfo) => a?.object_type === "machine");
  if (!pwn) {
    return new Response("Not Found", {status: 404});
  }
  
  pwn.machine_avatar = `https://www.hackthebox.com${pwn.machine_avatar}`;
  pwn.date = pwn.date.substring(0, pwn.date.indexOf("T"));

  return Response.json(pwn, {status: 200});
};
