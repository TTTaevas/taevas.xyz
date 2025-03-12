import React from "react";

export default function TabButton({
  colors,
  onClick,
  content,
}: {
  colors: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content: string | React.JSX.Element;
}) {
  return (
    <button className={`cursor-pointer text-xl text-white m-2 p-4 border-solid border-white border-4 rounded-md bg-linear-to-t from-70% ${colors} active:brightness-90`} onClick={onClick}>
      {content}
    </button>
  );
}
