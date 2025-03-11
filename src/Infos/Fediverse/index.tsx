import React from "react";
import Info from "../Info.tsx";
import KitsuClub from "./KitsuClub.tsx";

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
