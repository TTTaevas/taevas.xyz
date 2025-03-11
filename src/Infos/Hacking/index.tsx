import React from "react";
import Info from "../Info.tsx";
import Hackthebox from "./Hackthebox.tsx";

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
