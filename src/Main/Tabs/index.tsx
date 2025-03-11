import React from "react";
import About from "./About/index.tsx";
import Contact from "./Contact/index.tsx";
import Projects from "./Projects/index.tsx";
import Support from "./Support/index.tsx";
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
