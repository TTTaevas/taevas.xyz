import React from "react";
import Tab from "./structure";

function Contact({
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
			en: "contact",
			fr: "contacter"
		}
	}
	let elements = [(
		// @ts-ignore (netlify property is unknown to the form element)
		<form className="block w-min m-auto" name="contact" netlify="true">
			<input required type="text" className="form-input w-80 m-1" placeholder="Your name" name="submitted-name" autoComplete="name" />
			<input type="text" className="form-input w-80 m-1" placeholder="How I can contact you back" name="submitted-contact" autoComplete="email" />
			<textarea required className="form-textarea h-60 w-96 m-1" placeholder="Your message" name="submitted-message" />
			<input type="submit" value="Submit" />
		</form>
	)]
	return (
    <Tab tab={tab} setTab={setTab} id="contact" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M16.59 20.41L20.17 24l-3.59 3.59L18 29l5-5l-5-5l-1.41 1.41zm7 0L27.17 24l-3.59 3.59L25 29l5-5l-5-5l-1.41 1.41z"/><path fill="#2e3436" d="M14 23H4V7.91l11.43 7.91a1 1 0 0 0 1.14 0L28 7.91V17h2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10ZM25.8 7L16 13.78L6.2 7Z"/></svg>}/>
	)
}

export default Contact
