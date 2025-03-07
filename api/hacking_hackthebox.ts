import {type HacktheboxInfo} from "#Infos/Hacking/Hackthebox.tsx";
import type { Handler } from "..";

export const hacking_hackthebox: Handler = async () => {
  const hackthebox = await (await fetch("https://www.hackthebox.com/api/v4/profile/activity/1063999")).json() as {
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
