import React from "react";
import Link from "./Link.tsx";

export default function ButtonLink({
  link,
  text,
}: {
  link: string;
  text: string;
}) {
  return (
    <Link
      classes="block border-2 border-white bg-blue-950 hover:brightness-125 active:brightness-90
        text-white text-center text-lg font-bold
        w-40 py-1.5 mx-auto mt-4"
      link={link}
      text={text}
    />
  );
}
