import React from "react";
import Tab from "./structure";

function Support({
	lang,
	tab
}) {
	let elements = [(
		<div>
      <h3>Lorem Ipsum</h3>
      <p>Wow! Support!</p>
    </div>
	)]
	return (
    <Tab tab={tab} name="support" elements={elements}/>
	)
}

export default Support
