import {Copy, TaskComplete} from "@carbon/icons-react";
import React, {useState} from "react";

// For future reference, note that I use Carbon Design System throughout the site!
export default function CopyField({
  text,
  imageUrl,
}: {
  text: string;
  imageUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 3 * 1000);
      })
      .catch((e) => {
        console.error("Failed to copy:", text, "\nBecause:", e);
      });
  }

  return (
    <div className="flex w-fit mx-auto m-2 pr-4 pl-0 text-lg bg-red-500 hover:shadow-sm">
      {imageUrl ? <div className="bg-red-700 p-4">
        <img src={imageUrl} draggable="false" className="w-8 h-8"/>
      </div> : ""}
      <div className="px-4 py-4">
        {text}
      </div>
      {!copied ?
        <div className="py-4 cursor-pointer" title={`Copy ${text} to your clipboard`} onClick={copy}>
          <Copy size={32} fill="white"/>
        </div> : <div title="Copied!" className="py-4">
          <TaskComplete size={32} fill="white"/>
        </div>
      }
    </div>
  );
}
