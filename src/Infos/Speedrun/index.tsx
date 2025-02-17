import React from "react";
import Info from "../Info.js";
import Speedruncom from "./Speedruncom.js";

export default function Speedrun() {
  const speedruncom = <Speedruncom key={"speedruncom"}/>;

  return (
    <Info
      type="Speedrun"
      websites={[
        speedruncom,
      ]}
    />
  );
}
