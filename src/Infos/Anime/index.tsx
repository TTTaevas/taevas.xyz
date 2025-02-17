import React from "react";
import Info from "../Info.js";
import Anilist from "./Anilist.js";

export default function Anime() {
  const anilist = <Anilist key={"Anilist"}/>;

  return (
    <Info
      type="Anime"
      websites={[
        anilist,
      ]}
    />
  );
}
