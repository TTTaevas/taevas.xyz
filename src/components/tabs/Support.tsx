import React from "react";
import Tab from "./structure";

function Support({
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
      en: "support",
      fr: "soutenir"
    },
    thanks: {
      en: "Thanks for even considering supporting me!",
      fr: "Déjà, merci d'envisager de me soutenir !"
    },
    need: {
      en: "Monthly, I would basically only need $3 from 2 people to keep doing what I like without losing much money!",
      fr: "En gros, je n'aurais besoin que de $3 de 2 personnes par mois pour que je puisse continuer de faire ce que j'aime sans perdre top d'argent !"
    },
    where: {
      en: "Only if you want and if you can, you may support me through my Ko-fi page:",
      fr: "Seulement si vous le souhaitez et si vous le pouvez, alors vous pouvez me soutenir sur ma page Ko-fi :"
    }
  }
  let elements = [(
    <div className="m-4 pb-2 text-white">
      <p><b>{s.thanks[lang]}</b></p>
      <br/>
      <p>{s.need[lang]}</p>
      <p>{s.where[lang]}</p>
      <a href='https://ko-fi.com/V7V4J78L0' target='_blank'>
        <img className="h-12 mx-auto my-2" src='https://storage.ko-fi.com/cdn/kofi3.png?v=3' alt='Support me on Ko-fi!' />
      </a>
    </div>
  )]
  return (
    <Tab tab={tab} setTab={setTab} id="support" name={s.name[lang]} elements={elements} image={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#2e3436" d="M27.303 12a2.662 2.662 0 0 0-1.908.806l-.393.405l-.397-.405a2.662 2.662 0 0 0-3.816 0a2.8 2.8 0 0 0 0 3.896L25.002 21l4.209-4.298a2.8 2.8 0 0 0 0-3.896A2.662 2.662 0 0 0 27.303 12zM2 30h2v-5a5.006 5.006 0 0 1 5-5h6a5.006 5.006 0 0 1 5 5v5h2v-5a7.008 7.008 0 0 0-7-7H9a7.008 7.008 0 0 0-7 7zM12 4a5 5 0 1 1-5 5a5 5 0 0 1 5-5m0-2a7 7 0 1 0 7 7a7 7 0 0 0-7-7z"/></svg>}/>
  )
}

export default Support
