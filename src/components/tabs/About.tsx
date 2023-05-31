import React from "react";
import Tab from "./structure";

function About({
	lang,
	tab
}) {
	let elements = [(
		<div>
      <h3>Lorem Ipsum</h3>
      <p>Wow! About!</p>
    </div>
	)]
	return (
    <Tab tab={tab} name="about" elements={elements}/>
	)
}

export default About
