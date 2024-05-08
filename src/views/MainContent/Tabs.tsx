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
    <div className="bg-blue-500 rounded-t-xl m-auto lg:mb-8 shadow-[12px_12px_0_0] shadow-blue-950">
      <About tab={tab} setTab={setTab} />
      <Projects tab={tab} setTab={setTab} />
      <Contact tab={tab} setTab={setTab} />
      <Support tab={tab} setTab={setTab} />
    </div>
  );
}
