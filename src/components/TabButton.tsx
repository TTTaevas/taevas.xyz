import React from "react";

function TabButton({
  colors,
  onClick,
  content,
}: {
  colors: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  content: string | React.JSX.Element;
}) {
  return (
    <button className={`text-xl text-white m-2 p-4 border-solid border-white border-3 rounded-md bg-gradient-to-t from-70% ${colors}`} onClick={onClick}>
      {content}
    </button>
  );
}

export default TabButton;

