import React from "react";

function SocialButton({
  title,
  border,
  rotation,
  link,
  image,
}: {
  title: string;
  border: string;
  rotation: string;
  link: string;
  image: string;
}) {
  return (
    <button title={title} className={`
    m-2 p-1 h-12 w-12 bg-white
    rounded-full border-solid hover:border-dashed border-4 hover:border-8 ${border}
    transition-transform duration-75 ${rotation} hover:rotate-0
    `}>
      <a href={link} target="_blank" rel="noreferrer">
        <img className="h-10 w-10 absolute right-1/2 bottom-1/2 translate-x-2/4 translate-y-2/4 p-1" src={image} alt={title}/>
      </a>
    </button>
  );
}

export default SocialButton;

