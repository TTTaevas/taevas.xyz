import React from "react";

export default function SocialButton({
  title,
  border,
  rotation,
  link,
  image,
  padding = "p-0",
}: {
  title: string;
  border: string;
  rotation: string;
  link: string;
  image: string;
  padding?: string;
}) {
  return (
    <a draggable="false" href={link} rel="me">
      <button title={title} className={`
      m-1 h-12 w-12 bg-white text-black tracking-[-.2em]
      rounded-full border-solid hover:border-dashed active:brightness-95 border-4 hover:border-8 ${border}
      transition-transform duration-75 ${rotation} hover:rotate-0
      `}>
        <img draggable="false" className={`${padding} w-32 absolute right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4`} src={image} alt={title}/>
      </button>
    </a>
  );
}
