import React from "react";
import Tab from "./structure";

function About({
	lang,
	tab,
	setTab
}: {
  lang: string,
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}) {
	let s = {
		name: {
			en: "about",
			fr: "à propos"
		}
	}
	let elements = [(
		<div>
      <h3>Lorem Ipsum</h3>
      <p>Wow! About!</p>
    </div>
	)]
	return (
    <Tab tab={tab} setTab={setTab} id="about" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7zm10 28h-2v-5a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v5H2v-5a7 7 0 0 1 7-7h6a7 7 0 0 1 7 7zm0-26h10v2H22zm0 5h10v2H22zm0 5h7v2h-7z"/></svg>}/>
	)
}

export default About
