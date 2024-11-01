import React from "react";

export default function Link({
  classes,
  link,
  text,
}: {
  classes?: string;
  link: string;
  text: string;
}) {
  return (
    <a
      className={classes ?? ""}
      href={link}
      title={link}
      target="_blank"
      rel="noreferrer"
      draggable="false"
    >
      {text}
    </a>
  );
}
