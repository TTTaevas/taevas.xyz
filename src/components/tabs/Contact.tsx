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
		},
		p_name: {
			en: "Your name",
			fr: "Votre nom"
		},
		p_contact: {
			en: "How I can contact you back",
			fr: "Comment je peux vous recontacter"
		},
		p_message: {
			en: "Your message",
			fr: "Votre message"
		},
		send: {
			en: "Send message",
			fr: "Envoyer le message"
		},
		sent: {
			en: "Message sent!",
			fr: "Message envoyé !"
		}
	}

	const contactMe = (event: any) => {
		event.preventDefault()
		if (!event.target) {
			throw new Error("no event target")
		}

		const myForm = event.target as HTMLFormElement
		const formData = new FormData(myForm)

		fetch("/", {
			method: "POST",
			headers: { "Content-Type": "application/x-www-form-urlencoded" },
			body: new URLSearchParams(formData as any).toString(),
		})
		.then(() => alert(s.sent[lang]))
		.catch((error) => alert(error))
	};

	let elements = [(
		// @ts-ignore (netlify property is unknown to the form element)
		<form 
			data-netlify="true"
			className="block w-min mx-auto my-2"
			method="post"
			name="contact"
			onSubmit={contactMe}
		>
			<input type="hidden" name="form-name" value="contact" />
			<input required type="text" className="form-input w-80 m-1" placeholder={s.p_name[lang]} name="submitted-name" autoComplete="name" />
			<input type="text" className="form-input w-80 m-1" placeholder={s.p_contact[lang]} name="submitted-contact" autoComplete="email" />
			<textarea required className="form-textarea h-60 w-96 m-1" placeholder={s.p_message[lang]} name="submitted-message" />
			<button type="submit" className="cursor-pointer w-80 p-3 m-4 border-solid border-slate-600 border-2 rounded-xl bg-white hover:bg-slate-100">{s.send[lang]}</button>
		</form>
	)]
	return (
    <Tab tab={tab} setTab={setTab} id="contact" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M16.59 20.41L20.17 24l-3.59 3.59L18 29l5-5l-5-5l-1.41 1.41zm7 0L27.17 24l-3.59 3.59L25 29l5-5l-5-5l-1.41 1.41z"/><path fill="#2e3436" d="M14 23H4V7.91l11.43 7.91a1 1 0 0 0 1.14 0L28 7.91V17h2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10ZM25.8 7L16 13.78L6.2 7Z"/></svg>}/>
	)
}

export default Contact
