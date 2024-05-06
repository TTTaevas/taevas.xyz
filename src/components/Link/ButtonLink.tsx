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
      classes="block border-[3px] border-white bg-blue-950 hover:brightness-90
        text-white leading-[40px] text-lg font-bold
        w-[150px] mx-auto mt-4"
      link={link}
      text={text}
    />
  );
}
