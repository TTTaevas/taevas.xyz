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
    <Tab tab={tab} name="contact" elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M27.71 4.29a1 1 0 0 0-1.05-.23l-22 8a1 1 0 0 0 0 1.87l8.59 3.43L19.59 11L21 12.41l-6.37 6.37l3.44 8.59A1 1 0 0 0 19 28a1 1 0 0 0 .92-.66l8-22a1 1 0 0 0-.21-1.05Z"/></svg>}/>
	)
}

export default Contact
