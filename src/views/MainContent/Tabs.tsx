import React from "react";
import About from "../../components/Tab/About.js";
import Contact from "../../components/Tab/Contact.js";
import Projects from "../../components/Tab/Projects.js";
import Support from "../../components/Tab/Support.js";

export default function Tabs({
  tab,
  setTab,
}: {
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <>
      <About tab={tab} setTab={setTab} />
      <Projects tab={tab} setTab={setTab} />
      <Contact tab={tab} setTab={setTab} />
      <Support tab={tab} setTab={setTab} />
    </>
  );
}
