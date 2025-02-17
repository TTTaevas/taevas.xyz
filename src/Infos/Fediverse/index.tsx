import React from "react";
import Info from "../Info.js";
import KitsuClub from "./KitsuClub.js";

export default function Hacking() {
  const kitsuclub = <KitsuClub key={"kitsuclub"}/>;

  return (
    <Info
      type="Fediverse"
      websites={[
        kitsuclub,
      ]}
    />
  );
}
