import {type Handler} from "@netlify/functions";
import { KitsuclubInfo } from "#Infos/Fediverse/KitsuClub.js";
import { api } from "./shared/api.js";

const handler: Handler = async () => {
  const kitsuclub = await api<{
    id: string
    user: {
      name: string
      username: string
      avatarUrl: string
      emojis: Record<string, string>
    }
    text: string
    renoteCount: number
    repliesCount: number
    reactionCount: number
    createdAt: string
    files: {
      thumbnailUrl: string
      comment: string
    }[]
  }[]>("https://kitsunes.club/api/users/notes", process.env.API_KITSUCLUB, true, JSON.stringify({
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
  }));

  const details = kitsuclub.at(0);
  if (!details) {
    return {
      statusCode: 404,
    };
  }

  const activity: KitsuclubInfo = {
    note_id: details.id,
    user_id: details.user.username,
    username: details.user.name,
    avatar: details.user.avatarUrl,
    emojis: details.user.emojis,
    text: details.text,
    date: details.createdAt,
    images: details.files.map((f) => {
      return {url: f.thumbnailUrl, alt: f.comment};
    })
  };

  return {
    statusCode: 200,
    body: JSON.stringify(activity),
  };
};

export {handler};
