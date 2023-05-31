import React from "react";
import Tab from "./structure";

function Contact({
	lang,
	tab
}) {
	let elements = [(
		<form className="block w-min m-auto" name="contact" netlify="true">
			<input required type="text" className="form-input w-80 m-1" placeholder="Your name" name="submitted-name" autoComplete="name" />
			<input type="text" className="form-input w-80 m-1" placeholder="How I can contact you back" name="submitted-contact" autoComplete="email" />
			<textarea required className="form-textarea h-60 w-96 m-1" placeholder="Your message" name="submitted-message" />
			<input type="submit" value="Submit" />
		</form>
	)]
	return (
    <Tab tab={tab} name="contact" elements={elements}/>
	)
}

export default Contact
