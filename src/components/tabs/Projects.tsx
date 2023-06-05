import React from "react";
import Tab from "./structure";

function Projects({
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
			en: "projects",
			fr: "projets"
		}
	}
	let elements = [(
		<div>
      <h3>Lorem Ipsum</h3>
      <p>Wow! Projects!</p>
    </div>
	)]
	return (
    <Tab tab={tab} setTab={setTab} id="projects" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M10 30H4a2 2 0 0 1-2-2V16a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2ZM4 16v12h6V16Z"/><path fill="#2e3436" d="M28 4H6a2 2 0 0 0-2 2v6h2V6h22v14H14v2h2v4h-2v2h9v-2h-5v-4h10a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z"/></svg>}/>
	)
}

export default Projects
