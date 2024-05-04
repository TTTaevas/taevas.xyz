import React from "react";
import Info from "../Info.js";
import Wanikani from "./Japanese/Wanikani.js";

export default function Japanese() {
  const wanikani = <Wanikani key={"wanikani"}/>;

  return (
    <Info
      type="Japanese"
      websites={[
        wanikani,
      ]}
    />
  );
}
