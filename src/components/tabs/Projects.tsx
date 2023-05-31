import React from "react";
import Tab from "./structure";

function Projects({
	lang,
	tab
}) {
	let elements = [(
		<div>
      <h3>Lorem Ipsum</h3>
      <p>Wow! Projects!</p>
    </div>
	)]
	return (
    <Tab tab={tab} name="projects" elements={elements}/>
	)
}

export default Projects
