import React from "react";
import Link from "../Link.js";

export default function TextLink({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  return (
    <Link
      classes="block border-2 border-white bg-blue-950 hover:brightness-125 active:brightness-90
        text-white leading-[40px] text-lg font-bold
        w-40 mx-auto mt-4"
      link={link}
      text={text}
    />
  );
}
