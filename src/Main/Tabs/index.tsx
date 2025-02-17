import React from "react";
import About from "./About/index.js";
import Contact from "./Contact/index.js";
import Projects from "./Projects/index.js";
import Support from "./Support/index.js";
import {type TabDetails} from "#contexts";

export default function Tabs({
  setTabs,
}: {
  setTabs: React.Dispatch<React.SetStateAction<TabDetails[]>>;
}) {
  return (
    <>
      <About setTabs={setTabs} />
      <Projects setTabs={setTabs} />
      <Contact setTabs={setTabs} />
      <Support setTabs={setTabs} />
    </>
  );
}
