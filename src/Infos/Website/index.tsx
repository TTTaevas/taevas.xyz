import React from "react";
import Info from "../Info.js";
import Umami from "./Umami.js";

export default function Speedrun() {
  const umami = <Umami key={"umami"}/>;

  return (
    <Info
      type="Website"
      websites={[
        umami,
      ]}
    />
  );
}
