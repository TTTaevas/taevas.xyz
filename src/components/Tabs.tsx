import React from "react";
import About from "./tabs/About";
import Contact from "./tabs/Contact";
import Projects from "./tabs/Projects";
import Support from "./tabs/Support";

function Tabs({
  lang,
  tab,
  setTab
}: {
  lang: string,
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}) {
	return (
		<div className="bg-blue-500 rounded-t-xl m-auto">
      <About lang={lang} tab={tab} setTab={setTab} />
      <Projects lang={lang} tab={tab} setTab={setTab} />
      <Contact lang={lang} tab={tab} setTab={setTab} />
      <Support lang={lang} tab={tab} setTab={setTab} />
    </div>
	)
}

export default Tabs
