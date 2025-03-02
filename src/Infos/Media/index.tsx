import React from "react";
import Info from "../Info.js";
import Lastfm from "./Lastfm.js";
import Anilist from "./Anilist.js";

export default function Media() {
  const lastfm = <Lastfm key={"Lastfm"}/>;
  const anilist = <Anilist key={"Anilist"}/>;

  return (
    <Info
      type="Media"
      websites={[
        lastfm,
        anilist,
      ]}
    />
  );
}
