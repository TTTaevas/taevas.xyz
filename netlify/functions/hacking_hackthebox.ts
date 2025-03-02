import {type Handler} from "@netlify/functions";
import {type HacktheboxInfo} from "#Infos/Hacking/Hackthebox.js";

const handler: Handler = async () => {
  const hackthebox = await (await fetch("https://www.hackthebox.com/api/v4/profile/activity/1063999")).json() as {
    profile: {
      activity: HacktheboxInfo[];
    };
  };

  const pwn = hackthebox.profile.activity.find((a: HacktheboxInfo) => a?.object_type === "machine");
  if (!pwn) {
    return {
      statusCode: 404,
      body: "",
    };
  }
  
  pwn.machine_avatar = `https://www.hackthebox.com${pwn.machine_avatar}`;
  pwn.date = pwn.date.substring(0, pwn.date.indexOf("T"));
  
  return {
    statusCode: 200,
    body: JSON.stringify(pwn),
  };
};

export {handler};
