import React from "react";
import Info from "../Info.js";
import Lastfm from "./Music/Lastfm.js";

export default function Anime() {
  const lastfm = <Lastfm key={"Lastfm"}/>;

  return (
    <Info
      type="Music"
      websites={[
        lastfm,
      ]}
    />
  );
}
