import React from "react";
import About from "../../components/Tab/About.js";
import Contact from "../../components/Tab/Contact.js";
import Projects from "../../components/Tab/Projects.js";
import Support from "../../components/Tab/Support.js";
import {type TabDetails} from "../../contexts.js";

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
