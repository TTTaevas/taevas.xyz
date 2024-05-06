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
      classes="bg-blue-900 text-white leading-[20px]"
      link={link}
      text={text}
    />
  );
}
