import React from "react";
import Tab from "./structure";
import CopyField from "../CopyField";

function Contact({
  lang,
  tab,
  setTab
}: {
  lang: string,
  tab: string
  setTab: React.Dispatch<React.SetStateAction<string>>
}) {
  const s = {
    name: {
      en: "contact",
      fr: "contacter"
    },
    one: {
      en: <p>It's... kinda difficult to communicate with the people you want on the internet, I find emails to not be ideal for real-time communication, some other platforms I won't name enshittify themselves, while others do not quite offer the best user experience in my honest opinion.</p>,
      fr: <p>C'est... plutôt difficile de communiquer avec les gens qu'on veut sur internet, je trouve que les e-mails ne sont pas idéaux pour la communication en temps réel, certaines plateformes dont je ne dirais pas le nom sont devenues horribles, pendant que d'autres n'offrent pas vraiment la meilleure expérience à l'utilisateur, en tout cas je pense.</p>
    },
    two: {
      en: <p>And yet, if I want people to easily contact me, and make communication with them convenient, then I need to settle on <i>something!</i></p>,
      fr: <p>Et pourtant, si je veux que les gens puissent me contacter facilement, et que la communication soit facile, alors je dois bien choisir <i>quelque chose !</i></p>
    },
    three: {
      en: <p className="text-center">So, I've decided to go for the Matrix protocol! Feel free to DM me on this account:</p>,
      fr: <p className="text-center">Alors, j'ai opté pour le protocole Matrix ! N'hésitez pas à m'envoyer un message sur ce compte :</p>
    },
    four: {
      en: <p className="text-center"><a className="button-link text-center" href="https://matrix.to/#/@taevas:matrix.org" target="_blank">(matrix.to link)</a></p>,
      fr: <p className="text-center"><a className="button-link text-center" href="https://matrix.to/#/@taevas:matrix.org" target="_blank">(lien matrix.to)</a></p>
    },
    five: {
      en: <p className="text-center">If you don't feel like using this protocol though, know that my Discord account hasn't gone inactive just yet:</p>,
      fr: <p className="text-center">Si vous ne vous sentez pas d'utiliser ce protocole, sachez que mon compte Discord n'est pas encore totalement inactif :</p>
    },
    six: {
      en: <p className="text-center">(yes I still use a tag)</p>,
      fr: <p className="text-center">(oui j'utilise encore un tag)</p>
    },
  }
  const elements = [(
    <div className="m-4 pb-2 text-white text-left">
      {s.one[lang]}
      <br/>
      {s.two[lang]}
      <br/>
      {s.three[lang]}
      <CopyField text="@taevas:matrix.org" imageUrl="matrix.svg"/>
      {s.four[lang]}
      <br/>
      {s.five[lang]}
      <CopyField text="Taevas#9730" imageUrl="discord.svg"/>
      {s.six[lang]}
    </div>
  )]
  return (
    <Tab tab={tab} setTab={setTab} id="contact" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M16.59 20.41L20.17 24l-3.59 3.59L18 29l5-5l-5-5l-1.41 1.41zm7 0L27.17 24l-3.59 3.59L25 29l5-5l-5-5l-1.41 1.41z"/><path fill="#2e3436" d="M14 23H4V7.91l11.43 7.91a1 1 0 0 0 1.14 0L28 7.91V17h2V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10ZM25.8 7L16 13.78L6.2 7Z"/></svg>}/>
  )
}

export default Contact
