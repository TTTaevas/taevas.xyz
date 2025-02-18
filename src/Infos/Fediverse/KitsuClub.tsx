import React, {useState, useEffect} from "react";
import Website from "../Website.js";
import DataHandler from "#Infos/DataHandler.js";

export type KitsuclubInfo = {
  id: string
  username: string
  avatar: string
  emojis: Record<string, string>
  text: string
  date: string
} | undefined;

export default function KitsuClub() {
  const {data, error, setError} = DataHandler<KitsuclubInfo>("/.netlify/functions/kitsuclub", 60 * 20);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        const date = new Date(data.date).toISOString();
        setElements([
          <div key={"kitsuclub-details"} className="text-left mb-2">
            <img key={"kitsuclub-avatar"} src={data.avatar} alt="avatar" className="float-left rounded-lg w-12 mr-2"/>
            <strong key={"kitsuclub-username"} className="inline-flex">{...emojify(data.username, data.emojis)}</strong>
            <br/>
            <strong key={"kitsuclub-date"} className="inline-flex text-sm">{date.substring(0, date.indexOf("T"))}</strong>
          </div>,
          <p key={"kitsuclub-text"} className="text-left">{...emojify(data.text, data.emojis)}</p>, // emojis that are only in the post aren't in the response yet :(
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="KitsuClub"
      link={`https://kitsunes.club/@${data?.id ?? "taevas"}`}
      elements={elements}
      error={error}
    />
  );
}

function emojify(text: string, all_emojis: Record<string, string>): (string | React.JSX.Element)[] {
  const emoji_list: string[] = Object.keys(all_emojis);
  const emoji_imgs: string[] = Object.values(all_emojis);
  const to_return: (string | React.JSX.Element)[] = [];

  for (let i = 0; i < emoji_list.length; i++) {
    const emoji_name = emoji_list[i];
    while (text.includes(emoji_name)) {
      const index = text.indexOf(emoji_name);
      to_return.push(text.substring(0, index - 1)); // push whatever text before the emoji
      to_return.push(<img src={emoji_imgs[i]} alt={emoji_name} className="h-6 w-6 mx-1"/>); // push the emoji
      text = text.substring(index + emoji_name.length + 1); // remove whatever text before the emoji and the emoji name
    }
  }
  to_return.push(text); // push whatever text AFTER the last emoji (so all the text if no emoji)

  return to_return;
}
