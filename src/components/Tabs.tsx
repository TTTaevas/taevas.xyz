import React from "react";
import About from "./tabs/About";
import Contact from "./tabs/Contact";
import Projects from "./tabs/Projects";
import Support from "./tabs/Support";

function Tabs({
  lang,
  tab
}: {
  lang: string,
  tab: string
}) {
	return (
		<div className="bg-blue-500 rounded-t-xl m-auto">
      <About lang={lang} tab={tab} />
      <Projects lang={lang} tab={tab} />
      <Contact lang={lang} tab={tab} />
      <Support lang={lang} tab={tab} />
    </div>
	)
}

export default Tabs
