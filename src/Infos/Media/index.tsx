import React from "react";
import Info from "../Info.tsx";
import Lastfm from "./Lastfm.tsx";
import Anilist from "./Anilist.tsx";

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
