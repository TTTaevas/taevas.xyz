import { type KitsuclubInfo } from "#Infos/Fediverse/KitsuClub.tsx";
import type { Handler } from "..";

export const fediverse_kitsuclub: Handler = async () => {
  const kitsuclub = await (await fetch("https://kitsunes.club/api/users/notes", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env["API_KITSUCLUB"]}`,
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
  })).json() as {
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
  }[];

  const details = kitsuclub.at(Math.max(0, kitsuclub.length - 1));
  if (!details) {
    return new Response("Not Found", {status: 404});
  }

  let scan_text = details.text;
  const emojis_to_get: Promise<void>[] = [];
  while (scan_text.includes(":")) {
    const index_1 = scan_text.indexOf(":");
    const index_2 = scan_text.substring(index_1 + 1).indexOf(":");

    if (index_2 === -1) {
      scan_text = scan_text.substring(index_1 + 1);
    } else {
      const potential_emoji = scan_text.substring(index_1 + 1, index_2 + 1);
      if (!potential_emoji.includes(" ")) {
        emojis_to_get.push(new Promise(async (resolve) => {
          try {
            const fetched_emote_response = await fetch(`https://kitsunes.club/api/emoji?name=${potential_emoji}`);
            const fetched_emote = await fetched_emote_response.json() as {name: string, url: string};
            if (typeof fetched_emote.name === "string" && typeof fetched_emote.url === "string") {
              details.user.emojis[fetched_emote.name] = fetched_emote.url;
            }
          } catch(e) {
            console.error(e);
          }
          resolve();
        }));
      }
      scan_text = scan_text.substring(index_2 + 1);
    }
  }
  await Promise.all(emojis_to_get);

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

  return new Response(new Blob([JSON.stringify(activity)], {
    type: "application/json",
  }), {status: 200});
};
