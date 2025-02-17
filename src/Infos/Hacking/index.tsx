import React from "react";
import Info from "../Info.js";
import Hackthebox from "./Hackthebox.js";

export default function Hacking() {
  const hackthebox = <Hackthebox key={"hackthebox"}/>;

  return (
    <Info
      type="Hacking"
      websites={[
        hackthebox,
      ]}
    />
  );
}
