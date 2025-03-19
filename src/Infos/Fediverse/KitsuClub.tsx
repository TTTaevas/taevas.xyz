import React, {useState, useEffect} from "react";
import Website from "../Website.tsx";
import DataHandler from "#Infos/DataHandler.tsx";
import Link from "#parts/Link.tsx";

export type KitsuclubInfo = {
  note_id: string
  user_id: string
  username: string
  avatar: string
  emojis: Record<string, string>
  text: string
  date: string
  images: {
    url: string
    alt: string
  }[]
} | undefined;

export default function KitsuClub() {
  const {data, error, setError} = DataHandler<KitsuclubInfo>("fediverse_kitsuclub", 60 * 20);
  const [elements, setElements] = useState([] as React.JSX.Element[]);

  useEffect(() => {
    if (data) {
      try {
        const date = new Date(data.date).toISOString();
        const images: React.JSX.Element[] = data.images.map((i, index) => <img className="mt-2" key={`img-${index}`} src={i.url} alt={i.alt}/>);
        setElements([
          <div key={"kitsuclub-details"} className="text-left mb-2">
            <img key={"kitsuclub-avatar"} src={data.avatar} alt="avatar" className="float-left rounded-lg w-12 mr-2"/>
            <strong key={"kitsuclub-username"} className="inline-flex">{...emojify(data.username, data.emojis)}</strong>
            <br/>
            <time key={"kitsuclub-date"} className="inline-flex text-sm" dateTime={date}>
              {date.substring(0, date.indexOf("T")).concat(" " + date.substring(date.indexOf("T") + 1, date.indexOf(".")) + " UTC")}
            </time>
          </div>,
          // emojis that are only in the post aren't in the response yet :(
          <Link classes="mt-1 px-2 py-2 inline-block font-bold leading-[24px] bg-white text-blue-800 text-left text-sm"
            key={"link"} link={`https://kitsunes.club/notes/${data.note_id}`} text={<p>{
              ...data.text.split("\n").map((te) => emojify(te, data.emojis).concat(<br/>))
                .concat(images)
            }</p>}
          />
        ]);
      } catch {
        setError(true);
      }
    }
  }, [data]);

  return (
    <Website
      name="KitsuClub"
      link={`https://kitsunes.club/@${data?.user_id ?? "taevas"}`}
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
