import React from "react";
import About from "../../components/Tab/About.js";
import Contact from "../../components/Tab/Contact.js";
import Projects from "../../components/Tab/Projects.js";
import Support from "../../components/Tab/Support.js";

function Tabs({
  lang,
  tab,
  setTab,
}: {
  lang: string;
  tab: string;
  setTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div id="tab" className="bg-blue-500 rounded-t-xl m-auto lg:mb-8">
      <About lang={lang} tab={tab} setTab={setTab} />
      <Projects lang={lang} tab={tab} setTab={setTab} />
      <Contact lang={lang} tab={tab} setTab={setTab} />
      <Support lang={lang} tab={tab} setTab={setTab} />
    </div>
  );
}

export default Tabs;
