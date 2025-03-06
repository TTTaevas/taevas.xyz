import React from "react";
import Info from "../Info.tsx";
import Wanikani from "./Wanikani.tsx";

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
