import {type Handler} from "@netlify/functions";
import { KitsuclubInfo } from "../../src/components/Info/Fediverse/KitsuClub.js";

const handler: Handler = async () => {
  const kitsuclub = await fetch("https://kitsunes.club/api/users/notes", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.API_KITSUCLUB}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "userId": "a2hgd7delf",
      "limit": 1,
      "withReplies": false,
      "withRepliesToSelf": false,
      "withQuotes": true,
      "withRenotes": false,
      "withBots": true,
      "withNonPublic": true,
      "withChannelNotes": false,
      "withFiles": false,
      "allowPartial": false,
    })
  });

  const details = (await kitsuclub.json() as Record<string, any>)[0];
  const activity: KitsuclubInfo = {
    id: details.user.username,
    username: details.user.name,
    avatar: details.user.avatarUrl,
    emojis: details.user.emojis,
    text: details.text,
    date: details.createdAt
  }

  return {
    statusCode: 200,
    body: JSON.stringify(activity),
  };
};

export {handler};
