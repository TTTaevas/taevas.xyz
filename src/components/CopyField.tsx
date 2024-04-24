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
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  }

  return (
    <div className="flex w-fit mx-auto m-2 pr-4 pl-0 text-lg bg-red-500 hover:shadow">
      {imageUrl ? <div className="bg-red-700 p-4">
        <img src={imageUrl} className="w-8 h-8"/>
      </div> : ""}
      <div className="px-4 py-4">
        {text}
      </div>
      {!copied ?
        <div id="copy" className="py-4 cursor-pointer" title={`Copy ${text} to your clipboard`} onClick={copy}>
          <svg className="w-8 h-8" id="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <path fill="white" d="M28,10V28H10V10H28m0-2H10a2,2,0,0,0-2,2V28a2,2,0,0,0,2,2H28a2,2,0,0,0,2-2V10a2,2,0,0,0-2-2Z" transform="translate(0)"/>
            <path fill="white" d="M4,18H2V4A2,2,0,0,1,4,2H18V4H4Z" transform="translate(0)"/>
          </svg>
        </div> : <div id="copied" title="Copied!" className="py-4">
          <svg id="icon" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
            <polygon fill="white" points="22 27.18 19.41 24.59 18 26 22 30 30 22 28.59 20.59 22 27.18"/>
            <path fill="white" d="M25,5H22V4a2.0058,2.0058,0,0,0-2-2H12a2.0058,2.0058,0,0,0-2,2V5H7A2.0058,2.0058,0,0,0,5,7V28a2.0058,2.0058,0,0,0,2,2h9V28H7V7h3v3H22V7h3V18h2V7A2.0058,2.0058,0,0,0,25,5ZM20,8H12V4h8Z"/>
          </svg>
        </div>
      }
    </div>
  );
}
